"use client";

import {
	useCallback,
	useEffect,
	useId,
	useRef,
	useState,
	type SetStateAction,
} from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Cookies from "js-cookie";

import { AIInput } from "@/components/ui/ai-input";
import { Navbar } from "@/components/navbar";
import { PromptRecs } from "@/components/prompt-recs";
import WelcomeBanner from "@/components/welcome-banner";
import Side from "@/components/side";

const CampusMap = dynamic(() => import("@/components/campus-map"), {
	ssr: false,
});
import { useLanguage } from "@/components/language-provider";
import {
	ChatMessage,
	type MessageRole,
	type MessageVariant,
} from "@/components/chat/chat-message";
import { PipelineLoaderMessage } from "@/components/chat/pipeline-loader-message";
import { ThinkingBox } from "@/components/chat/thinking-box";
import { FeedbackPrompt } from "@/components/chat/feedback-prompt";

import { getStoredEndpoint } from "@/lib/convos";
import {
	buildPipelineSteps,
	configureMarked,
	parseThinkingStream,
	streamFromReader,
	streamText,
} from "@/lib/chat-stream";

export interface ChatPageProps {
	/** Enables the artificial pipeline-loader delay and narrower user bubbles. */
	isDev?: boolean;
	/** Delay before showing the response (dev only). */
	artificialDelayMs?: number;
	/** Delay between fake-stream chunks when real streaming fails. */
	chunkDelayMs?: number;
	/** Enables the campus-map side view. Only used in main app. */
	enableCampusMap?: boolean;
	/** Require chatdku_token cookie in addition to terms acceptance. */
	requireToken?: boolean;
	/** Text rendered under the input once the user starts chatting. */
	disclaimerKey?: "chat.disclaimer" | null;
	/** Literal disclaimer override (for the dev page). */
	disclaimerText?: string;
}

interface ChatMessageState {
	id: string;
	role: MessageRole;
	content: string;
	variant?: MessageVariant;
	/** Whether the feedback prompt should be shown below this (bot) message. */
	showFeedback?: boolean;
}

const CHAT_LOG_ID = "chat-log";

export function ChatPage({
	isDev = false,
	artificialDelayMs = 0,
	chunkDelayMs,
	enableCampusMap = false,
	requireToken = true,
	disclaimerKey = "chat.disclaimer",
	disclaimerText,
}: ChatPageProps) {
	const [messages, setMessages] = useState<ChatMessageState[]>([]);
	const [pipelineActive, setPipelineActive] = useState(false);
	const [pipelineDismissing, setPipelineDismissing] = useState(false);
	const [thinkingActive, setThinkingActive] = useState(false);
	const [thinkingDismissing, setThinkingDismissing] = useState(false);
	const [thinkingContent, setThinkingContent] = useState("");

	const [showStarter, setShowStarter] = useState(true);
	const [isChatboxCentered, setIsChatboxCentered] = useState(true);
	const [chatHistory, setChatHistory] = useState<[string, string][]>([]);
	const [thinkingMode, setThinkingMode] = useState(false);
	const [searchMode, setSearchMode] = useState("");
	const [inputValue, setInputValue] = useState("");
	const [apiEndpoint, setApiEndpoint] = useState(getStoredEndpoint());
	const [activeView, setActiveView] = useState<"chat" | "campus">("chat");
	const [activeReference, setActiveReference] = useState<string | null>(null);
	const [isSending, setIsSending] = useState(false);

	const chatLogRef = useRef<HTMLDivElement>(null);
	const messageIdCounter = useRef(0);
	const router = useRouter();
	const { t } = useLanguage();
	const instanceId = useId();

	const resolvedChunkDelay = chunkDelayMs ?? (isDev ? 90 : 60);
	const pipelineSteps = buildPipelineSteps(t);

	useEffect(() => {
		configureMarked();
		const termsAccepted = Cookies.get("terms_accepted");
		const token = Cookies.get("chatdku_token");
		if (
			!termsAccepted ||
			(requireToken && !token && process.env.NODE_ENV !== "development")
		) {
			router.push("/login");
		}
	}, [router, requireToken]);

	const scrollToBottom = useCallback(() => {
		const el = chatLogRef.current;
		if (!el) return;
		el.scrollTo(0, el.scrollHeight);
	}, []);

	useEffect(() => {
		scrollToBottom();
	}, [messages, pipelineActive, thinkingActive, scrollToBottom]);

	const nextId = useCallback(() => {
		messageIdCounter.current += 1;
		return `${instanceId}-${messageIdCounter.current}`;
	}, [instanceId]);

	const pushMessage = useCallback(
		(msg: Omit<ChatMessageState, "id">) => {
			const id = nextId();
			setMessages((prev) => [...prev, { ...msg, id }]);
			return id;
		},
		[nextId],
	);

	const updateMessage = useCallback(
		(id: string, patch: Partial<Omit<ChatMessageState, "id">>) => {
			setMessages((prev) =>
				prev.map((m) => (m.id === id ? { ...m, ...patch } : m)),
			);
		},
		[],
	);

	const sendFeedback = useCallback(
		async (userInput: string, answer: string, reason: string) => {
			try {
				await fetch("/api/feedback", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						userInput,
						botAnswer: answer,
						feedbackReason: reason,
					}),
				});
			} catch (error) {
				console.error("Failed to save feedback:", error);
			}
		},
		[],
	);

	const handleSubmit = useCallback(
		async (value: string) => {
			if (!value.trim() || isSending) return;
			setIsSending(true);

			let finalValue = value.trim();
			if (activeReference) {
				finalValue = `${activeReference}, ${finalValue}`;
				setActiveReference(null);
			}

			setShowStarter(false);
			setIsChatboxCentered(false);

			pushMessage({ role: "user", content: finalValue });

			setPipelineDismissing(false);
			setPipelineActive(true);

			try {
				const fetchChat = () => {
					if (finalValue.toLowerCase() === "test") {
						return fetch("/mdtest.md");
					}
					return fetch("/api/chat", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							messages: [{ role: "user", content: finalValue }],
							history: chatHistory,
						}),
					});
				};

				setChatHistory((prev) => [...prev, ["user", finalValue]]);

				// Dev: stall briefly so the pipeline loader is visible against fast
				// local mocks.
				const [response] = await Promise.all([
					fetchChat(),
					artificialDelayMs > 0
						? new Promise((r) => setTimeout(r, artificialDelayMs))
						: Promise.resolve(),
				]);

				if (!response.ok) throw new Error("Failed to fetch response");

				// Dismiss the pipeline loader (awaits fade-out).
				await dismissPipeline(setPipelineDismissing, setPipelineActive);

				// bot message is created lazily: only once response text arrives so
				// the DOM never contains an empty message container.
				let botId: string | null = null;
				const ensureBotId = (): string => {
					if (!botId) botId = pushMessage({ role: "bot", content: "" });
					return botId;
				};

				// Track thinking-box state via local flags (avoids stale-closure issues
				// with React state reads inside the onProgress callback).
				let hasThinking = false;
				let thinkingDismissScheduled = false;
				let fullResponseText = "";

				const streamResult = await streamFromReader(
					response,
					(accumulated) => {
						const { thinking, response: responseText } =
							parseThinkingStream(accumulated);
						fullResponseText = responseText;

						// Activate thinking box on first [THINKING]: line.
						if (thinking && !hasThinking) {
							hasThinking = true;
							setThinkingDismissing(false);
							setThinkingActive(true);
						}
						if (hasThinking) setThinkingContent(thinking);

						// As soon as response text begins, schedule thinking-box dismissal
						// and start streaming the response as markdown simultaneously.
						if (responseText && hasThinking && !thinkingDismissScheduled) {
							thinkingDismissScheduled = true;
							setThinkingDismissing(true);
							setTimeout(() => {
								setThinkingActive(false);
								setThinkingDismissing(false);
								setThinkingContent("");
							}, 260);
						}

						// No [THINKING]: markers → identical to original streaming behavior.
						// Has markers → stream response into the bot message as markdown.
						if (responseText || !hasThinking) {
							updateMessage(ensureBotId(), {
								content: responseText || accumulated,
							});
						}
					},
				);

				// Edge case: stream ended with only thinking lines and no response.
				if (hasThinking && !thinkingDismissScheduled) {
					await dismissThinking(
						setThinkingDismissing,
						setThinkingActive,
						setThinkingContent,
					);
				}

				// Fallback when real streaming failed.
				if (!streamResult.success) {
					let fallback = streamResult.text
						? parseThinkingStream(streamResult.text).response ||
							streamResult.text
						: "";
					if (!fallback) {
						try {
							fallback = await response.text();
						} catch {
							fallback = "Error: Failed to read response";
						}
					}
					fullResponseText = fallback;
					const id = ensureBotId();
					updateMessage(id, { content: "" });
					await streamText(
						fallback,
						(acc) => updateMessage(id, { content: acc }),
						resolvedChunkDelay,
					);
				}

				const finalBotId = ensureBotId();
				setChatHistory((prev) => [...prev, ["bot", fullResponseText]]);
				updateMessage(finalBotId, { showFeedback: true });
			} catch (error) {
				await dismissPipeline(setPipelineDismissing, setPipelineActive);
				setThinkingActive(false);
				setThinkingDismissing(false);
				setThinkingContent("");
				pushMessage({
					role: "bot",
					variant: "error",
					content: `Error: ${error instanceof Error ? error.message : "An unknown error occurred"}`,
				});
			} finally {
				setIsSending(false);
			}
		},
		[
			isSending,
			activeReference,
			chatHistory,
			artificialDelayMs,
			resolvedChunkDelay,
			pushMessage,
			updateMessage,
		],
	);

	const resetChat = () => {
		setActiveView("chat");
		setShowStarter(true);
		setIsChatboxCentered(true);
		setChatHistory([]);
		setInputValue("");
		setMessages([]);
		setPipelineActive(false);
		setPipelineDismissing(false);
		setThinkingActive(false);
		setThinkingDismissing(false);
		setThinkingContent("");
	};

	return (
		<>
			<Side
				onCampusMap={() => {
					if (!enableCampusMap) return;
					setActiveView("campus");
					setShowStarter(false);
					setIsChatboxCentered(false);
				}}
				onEndpointChange={setApiEndpoint}
				currentEndpoint={apiEndpoint}
				onNewChat={resetChat}
				onConversationSelect={() => {}}
			/>
			<div className="flex flex-col min-h-screen relative selection:bg-zinc-800 selection:text-white dark:selection:bg-white dark:selection:text-black">
				<header className="sticky top-0 z-20 w-full">
					<Navbar />
				</header>

				<main className="flex-1 w-full flex flex-col items-center pt-16 relative">
					{activeView === "chat" && (
						<div
							id={CHAT_LOG_ID}
							ref={chatLogRef}
							className="w-full max-w-3xl mx-auto space-y-4 p-4 pb-42 overflow-y-auto"
						>
							{messages.map((msg) => (
								<ChatMessage
									key={msg.id}
									role={msg.role}
									content={msg.content}
									variant={msg.variant}
									isDev={isDev}
								>
									{msg.showFeedback && (
										<FeedbackPrompt
											onSubmit={(reason) =>
												sendFeedback(
													findUserPrompt(messages, msg.id) ?? "",
													msg.content,
													reason,
												)
											}
										/>
									)}
								</ChatMessage>
							))}
							{pipelineActive && (
								<PipelineLoaderMessage
									steps={pipelineSteps}
									dismissing={pipelineDismissing}
								/>
							)}
							{thinkingActive && (
								<ThinkingBox
									content={thinkingContent}
									dismissing={thinkingDismissing}
								/>
							)}
						</div>
					)}
					{enableCampusMap && activeView === "campus" && (
						<CampusMap
							onAsk={(reference) => {
								setActiveReference(reference);
								setActiveView("chat");
								setIsChatboxCentered(false);
								setInputValue("");
							}}
						/>
					)}
				</main>

				{activeView === "chat" && (
					<div
						className={`w-full max-w-[95vw] p-2 pt-0 transition-all duration-300 ${
							isChatboxCentered
								? "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
								: "fixed bottom-0 left-1/2 -translate-x-1/2 rounded-t-3xl backdrop-blur-md bg-gradient-to-b from-transparent to-background md:backdrop-blur-none z-10"
						}`}
					>
						{showStarter && (
							<div className="w-full flex justify-center">
								<div className="flex flex-col items-center p-4 w-4/5 md:max-w-1/2 sm:max-w-4/5">
									<WelcomeBanner />
								</div>
							</div>
						)}
						<div>
							<AIInput
								thinkingMode={thinkingMode}
								onThinkingModeChange={setThinkingMode}
								searchMode={searchMode}
								onSearchModeChange={(value: SetStateAction<string>) =>
									setSearchMode(value)
								}
								onInputChange={setInputValue}
								onEndpointChange={setApiEndpoint}
								activeReference={activeReference}
								onClearReference={() => setActiveReference(null)}
								loading={isSending}
								onSubmit={handleSubmit}
							/>
							{isChatboxCentered && (
								<div
									className={`transition-all duration-300 ${inputValue ? "opacity-0 max-h-0 overflow-hidden" : "opacity-100 max-h-96"}`}
								>
									<PromptRecs
										onPromptSelect={(prompt) => {
											const aiInput = document.getElementById(
												"ai-input",
											) as HTMLTextAreaElement | null;
											if (!aiInput) return;
											aiInput.value = prompt;
											aiInput.dispatchEvent(
												new Event("input", { bubbles: true }),
											);
											aiInput.dispatchEvent(
												new KeyboardEvent("keydown", {
													key: "Enter",
													code: "Enter",
													bubbles: true,
													cancelable: true,
													shiftKey: false,
												}),
											);
										}}
									/>
								</div>
							)}
						</div>
						{!isChatboxCentered && (disclaimerKey || disclaimerText) && (
							<p className="text-center text-[11px]/3 pb-1 sm:py-0 sm:leading-1 leading-3 tracking-tight text-muted-foreground drop-shadow-background drop-shadow-xl">
								{disclaimerText ?? (disclaimerKey ? t(disclaimerKey) : "")}
							</p>
						)}
					</div>
				)}
			</div>
		</>
	);
}

const findUserPrompt = (
	messages: ChatMessageState[],
	botId: string,
): string | null => {
	const idx = messages.findIndex((m) => m.id === botId);
	for (let i = idx - 1; i >= 0; i -= 1) {
		if (messages[i].role === "user") return messages[i].content;
	}
	return null;
};

const dismissPipeline = async (
	setDismissing: (v: boolean) => void,
	setActive: (v: boolean) => void,
) => {
	setDismissing(true);
	// pipelineLoader's dismiss transition is ~220ms. Waiting here keeps the
	// existing behavior where the bot message only appears after the loader
	// finishes fading out.
	await new Promise((r) => setTimeout(r, 240));
	setActive(false);
	setDismissing(false);
};

// Mirrors dismissPipeline for the thinking box (240ms CSS transition + buffer).
const dismissThinking = async (
	setDismissing: (v: boolean) => void,
	setActive: (v: boolean) => void,
	setContent: (v: string) => void,
) => {
	setDismissing(true);
	await new Promise((r) => setTimeout(r, 260));
	setActive(false);
	setDismissing(false);
	setContent("");
};

export default ChatPage;
