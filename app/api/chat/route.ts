import { NextResponse } from "next/server";
import { MOCK_RESPONSES } from "@/lib/mock-responses";

const BACKEND_BASE =
	process.env.BACKEND_BASE_URL || "https://chatdku.dukekunshan.edu.cn:8999";
const AUTH_URL = `${BACKEND_BASE}/auth/get-token`;
const CHAT_URL = `${BACKEND_BASE}/api/chat`;

// Cached JWT token
let cachedToken: string | null = null;
let tokenExpiresAt = 0;

async function getJwt(): Promise<string> {
	// Return cached token if still valid (with 30s buffer)
	if (cachedToken && Date.now() < tokenExpiresAt - 30_000) {
		return cachedToken;
	}

	const secret = process.env.JWT_SECRET;
	if (!secret) {
		throw new Error("JWT_SECRET environment variable is not set");
	}

	const response = await fetch(AUTH_URL, {
		method: "POST",
		headers: {
			"X-Secret": secret,
		},
	});

	if (!response.ok) {
		throw new Error(
			`Failed to get JWT token: ${response.status} ${response.statusText}`,
		);
	}

	const data = await response.json();
	const token = data.token || data.access_token;

	if (!token) {
		throw new Error("No token returned from auth endpoint");
	}

	cachedToken = token;

	// Try to extract expiry from JWT payload; default to 30 minutes
	try {
		const payload = JSON.parse(atob(token.split(".")[1]));
		if (payload.exp) {
			tokenExpiresAt = payload.exp * 1000;
		} else {
			tokenExpiresAt = Date.now() + 30 * 60 * 1000;
		}
	} catch {
		tokenExpiresAt = Date.now() + 30 * 60 * 1000;
	}

	return token;
}

export async function POST(request: Request) {
	const body = await request.json();

	// Mock by default in dev; set MOCK_API=false in .env.local to proxy to the backend
	const useMock =
		process.env.NODE_ENV === "development" && process.env.MOCK_API !== "false";
	if (useMock) {
		const fullText =
			MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];
		const encoder = new TextEncoder();

		// Simulate the Planner + Executor phase: block before sending headers so
		// the pipeline loader stays visible for a realistic duration.
		await new Promise((resolve) => setTimeout(resolve, 3000));

		// Thinking-box simulation: emit [THINKING]: step lines first, then
		// stream the response at LLM-like speed so the full UI flow is exercised.
		const thinkingSteps = [
			"[THINKING]:Planning your query...",
			"[THINKING]:Searching knowledge base for relevant documents...",
			"[THINKING]:Querying course and policy database...",
			"[THINKING]:Synthesizing response...",
		];

		const stream = new ReadableStream({
			async start(controller) {
				// Emit each step on its own line with a brief pause so the user
				// can read them one at a time in the thinking box.
				for (const step of thinkingSteps) {
					controller.enqueue(encoder.encode(step + "\n"));
					await new Promise((resolve) => setTimeout(resolve, 400));
				}

				// Stream the actual response in ~4-char chunks at realistic speed.
				for (let i = 0; i < fullText.length; i += 4) {
					controller.enqueue(encoder.encode(fullText.slice(i, i + 4)));
					await new Promise((resolve) => setTimeout(resolve, 25));
				}
				controller.close();
			},
		});
		return new NextResponse(stream, {
			headers: { "Content-Type": "text/plain; charset=utf-8" },
		});
	}

	// Production: proxy to backend with JWT auth
	try {
		const token = await getJwt();

		// Transform request to match backend ChatRequest schema:
		// { messages: List[dict], history: List[tuple] }
		const messages = body.messages || [];
		const history: [string, string][] = (body.history || []).map(
			(entry: { role?: string; content?: string } | [string, string]) => {
				if (Array.isArray(entry)) return entry;
				return [entry.role || "user", entry.content || ""];
			},
		);

		const backendResponse = await fetch(CHAT_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				messages,
				history,
			}),
		});

		if (
			backendResponse.status === 401 ||
			backendResponse.status === 400 ||
			backendResponse.status === 403
		) {
			// Token expired or invalid — clear cache and retry once
			cachedToken = null;
			tokenExpiresAt = 0;
			const freshToken = await getJwt();

			const retryResponse = await fetch(CHAT_URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${freshToken}`,
				},
				body: JSON.stringify({
					messages,
					history,
				}),
			});

			if (!retryResponse.ok) {
				return new NextResponse(`Backend error: ${retryResponse.statusText}`, {
					status: retryResponse.status,
				});
			}

			return new NextResponse(retryResponse.body, {
				headers: { "Content-Type": "text/plain; charset=utf-8" },
			});
		}

		if (!backendResponse.ok) {
			return new NextResponse(`Backend error: ${backendResponse.statusText}`, {
				status: backendResponse.status,
			});
		}

		return new NextResponse(backendResponse.body, {
			headers: { "Content-Type": "text/plain; charset=utf-8" },
		});
	} catch (error) {
		console.error("Chat proxy error:", error);
		return new NextResponse(
			`Error: ${error instanceof Error ? error.message : "Unknown error"}`,
			{ status: 500 },
		);
	}
}
