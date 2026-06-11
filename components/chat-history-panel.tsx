"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle } from "lucide-react";

import { Convo, getSessionMessages, deleteConversation } from "@/lib/convos";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "@/lib/utils";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "./ui/button";
import { useLanguage } from "@/components/language-provider";

interface ChatHistoryPanelProps {
	onConversationSelect: (sessionId: string) => void;
	onNewChat: () => void;
}

/**
 * Searchable chat-history list and its delete-confirmation dialog.
 *
 * NOTE: This feature is intentionally **disabled** in the UI (the list is
 * rendered read-only via `opacity-50`/`pointer-events-none` inside a "history
 * disabled" tooltip). The search/indexing machinery and delete affordance are
 * preserved here, ready to be re-enabled. Relies on a `TooltipProvider` from
 * the parent (Side). Do not delete — see CLEANUP_TODO.md items #6–#8.
 */
export function ChatHistoryPanel({
	onConversationSelect,
	onNewChat,
}: ChatHistoryPanelProps) {
	const { t } = useLanguage();
	const [conversations, setConversations] = useState<Convo[]>([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [messagesIndex, setMessagesIndex] = useState<Record<string, string>>(
		{},
	);
	const [searchResults, setSearchResults] = useState<Convo[]>([]);
	const [deleteId, setDeleteId] = useState<string | null>(null);
	const [isDeleteOpen, setIsDeleteOpen] = useState(false);
	const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

	const filteredConversations = searchQuery.trim()
		? searchResults
		: conversations;

	// Debounced search that matches title and message contents
	useEffect(() => {
		const query = searchQuery.trim().toLowerCase();
		if (!query) return;

		if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
		debounceTimerRef.current = setTimeout(async () => {
			const titleMatches = conversations.filter((c) =>
				c.title.toLowerCase().includes(query),
			);

			// For conversations we haven't indexed yet, fetch messages lazily
			const toIndex = conversations.filter(
				(c) => messagesIndex[c.id] === undefined,
			);

			if (toIndex.length > 0) {
				try {
					const results = await Promise.all(
						toIndex.map(async (c) => {
							const msgs = await getSessionMessages(c.id);
							const combined = msgs
								.map((m) => m.content)
								.join("\n")
								.toLowerCase();
							return [c.id, combined] as const;
						}),
					);
					setMessagesIndex((prev) => {
						const next = { ...prev };
						for (const [id, text] of results) next[id] = text;
						return next;
					});
				} catch {
					// ignore fetch errors here; search will just rely on titles
				}
			}

			// After ensuring index (best-effort), compute final matches
			const contentMatches = conversations.filter((c) => {
				const indexed = messagesIndex[c.id];
				return indexed ? indexed.includes(query) : false;
			});

			const byId: Record<string, Convo> = {};
			[...titleMatches, ...contentMatches].forEach((c) => (byId[c.id] = c));
			setSearchResults(Object.values(byId));
		}, 250);

		return () => {
			if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
		};
	}, [searchQuery, conversations, messagesIndex]);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars -- wired for a delete affordance not yet exposed
	const openDeleteDialog = (id: string) => {
		setDeleteId(id);
		setIsDeleteOpen(true);
	};
	const handleDeleteConversation = async (id: string) => {
		const success = await deleteConversation(id);

		if (success) {
			setConversations((prev) => prev.filter((c) => c.id !== id));

			if (false) {
				onNewChat();
			}
		} else {
			alert("Delete failed");
		}
	};

	return (
		<>
			<Tooltip>
				<TooltipContent>{t("side.historyDisabled")}</TooltipContent>
				<TooltipTrigger className="text-left opacity-50 cursor-not-allowed">
					<div>
						<p className="ml-2 mt-4 text-sm text-muted-foreground">
							{t("side.chatHistory")}
						</p>
						<div className="pb-2">
							<Input
								placeholder={t("side.searchChats")}
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
						</div>
						<ScrollArea className="flex-1 min-h-0 pointer-events-none">
							<div className="space-y-1 pb-4">
								{(searchQuery.trim()
									? filteredConversations
									: conversations
								).length > 0 ? (
									(searchQuery.trim()
										? filteredConversations
										: conversations
									).map((conversation) => (
										<div
											key={conversation.id}
											className={cn(
												"group w-[97%] flex items-center justify-between p-2 pl-3 rounded-md hover:bg-sidebar-accent",
												false && "bg-sidebar-accent",
											)}
										>
											<div
												className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer"
												onClick={() => onConversationSelect(conversation.id)}
											>
												<MessageCircle className="h-4 w-4 shrink-0" />
												<div className="flex-1 min-w-0">
													<Tooltip delayDuration={600}>
														<TooltipTrigger asChild>
															<div className="text-sm font-medium overflow-hidden text-ellipsis whitespace-nowrap max-w-[230px]">
																{conversation.title}
															</div>
														</TooltipTrigger>

														<TooltipContent side="bottom" align="start">
															<p className="max-w-xs break-words">
																{conversation.title}
															</p>
														</TooltipContent>
													</Tooltip>
													<div className="text-xs text-sidebar-foreground/60">
														{conversation.created_at.toLocaleDateString()}
													</div>
												</div>
											</div>
										</div>
									))
								) : (
									<div className="text-sm text-sidebar-foreground/60 text-center py-4">
										{searchQuery.trim()
											? t("side.noMatches")
											: t("side.noConversations")}
									</div>
								)}
							</div>
						</ScrollArea>
					</div>
				</TooltipTrigger>
			</Tooltip>

			{/* A pop-up window confirming deletion */}
			<Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>{t("side.deleteChat")}</DialogTitle>
					</DialogHeader>

					<p className="text-sm text-muted-foreground">
						{t("side.deleteConfirm")}
					</p>

					<DialogFooter className="mt-4 flex justify-end gap-2">
						<Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
							{t("side.cancel")}
						</Button>

						<Button
							className="bg-red-500 hover:bg-red-600 text-white"
							onClick={() => {
								if (deleteId) {
									handleDeleteConversation(deleteId);
								}
								setIsDeleteOpen(false);
							}}
						>
							{t("side.delete")}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
