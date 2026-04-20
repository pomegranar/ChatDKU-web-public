import { NextResponse } from "next/server";

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

// Realistic DKU responses used in dev-mode mock. Long enough to keep the
// thinking box visible for several seconds at realistic streaming speed.
const MOCK_RESPONSES = [
	(_msg: string) =>
		`To register for courses at Duke Kunshan University, log in to the DKU student portal during your designated registration window. Priority is determined by academic standing and credit hours completed.

**Key steps:**

1. **Check your registration time** — Your specific window is listed in the Registrar's portal. Seniors register first, followed by juniors, sophomores, and freshmen.

2. **Review prerequisites** — Make sure you satisfy all prerequisites for your desired courses. The system will block enrollment if requirements are unmet.

3. **Add courses to your shopping cart** — During the browsing period before registration opens, you can stage your selections in your cart.

4. **Submit your registration** — When your window opens, confirm your course selections promptly. High-demand courses fill quickly.

If you encounter a registration hold or need an instructor override, contact the Office of the Registrar at registrar@dukekunshan.edu.cn with your student ID and a brief explanation.`,

	(_msg: string) =>
		`The Credit/No Credit (CR/NC) grading option lets you take up to one course per semester outside your major requirements on a pass/fail basis, without affecting your GPA.

**Eligibility:**
- You must have completed at least one full semester at DKU
- The course cannot count toward your major, divisional, or distributional requirements
- You must not be on academic probation

**Deadline:** CR/NC elections are due approximately five weeks after the semester start. Check the academic calendar on the Registrar's website for exact dates — elections cannot be reversed after the deadline.

**Important notes:**
- A "CR" grade typically requires a D or higher
- Some graduate school applications require official letter grades, so weigh this option carefully before electing CR/NC

To submit a request, fill out the CR/NC Election Form in the Registrar's portal under **Grade Options** and submit it before the published deadline.`,

	(_msg: string) =>
		`Duke Kunshan University offers a range of student support services to help you succeed academically and personally.

**Academic Support:**
The Writing and Language Studio (WLS) provides free tutoring for writing assignments, ESL support, and academic writing workshops. Book appointments through the DKU student portal.

The Quantitative and Computing Lab (QCL) offers peer tutoring in mathematics, statistics, data analysis, and programming. Drop-in hours run Monday–Friday, 2–6 PM in the Academic Building.

**Health and Wellness:**
DKU's Student Wellness Center offers medical consultations, mental health counseling, and wellness programs. Schedule appointments through the wellness portal or by calling the center directly.

**Career Development:**
The Center for Career and Professional Development (CCPD) supports internship searches, résumé reviews, interview preparation, and alumni networking. Career fairs are held each semester with domestic and international employers attending.

For the full list of services, visit the Student Affairs section of the DKU website or stop by the Student Services building during office hours.`,
];

export async function POST(request: Request) {
	const body = await request.json();

	// Mock by default in dev; set MOCK_API=false in .env.local to proxy to the backend
	const useMock =
		process.env.NODE_ENV === "development" && process.env.MOCK_API !== "false";
	if (useMock) {
		const pick =
			MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];
		const fullText = pick(body?.messages?.[0]?.content ?? "");
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
