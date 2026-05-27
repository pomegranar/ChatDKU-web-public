"use client";

import {
	Map,
	Menu,
	MessageCircleQuestion,
	SquarePen,
	LogIn,
} from "lucide-react";
import { Button } from "./ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { ComboBoxResponsive } from "./ui/combobox";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ChatHistoryPanel } from "@/components/chat-history-panel";

import { cn } from "@/lib/utils";

import { useLanguage } from "@/components/language-provider";
import Image from "next/image";

interface SidebarProps {
	onCampusMap: () => void;
	onEndpointChange?: (endpoint: string) => void;
	onNewChat: () => void;
	onConversationSelect: (sessionId: string) => void;

	currentEndpoint?: string;
}

export default function Side({
	onCampusMap,
	onEndpointChange,
	onNewChat,
	onConversationSelect,

	currentEndpoint,
}: SidebarProps) {
	const pathname = usePathname();
	const isDevRoute = pathname === "/dev" || pathname === "/dev/";
	const { t } = useLanguage();

	return (
		<TooltipProvider>
			<div className="fixed z-50">
				<Sheet>
					<SheetTrigger>
						<div className="m-2 p-2 hover:outline-1 cursor-pointer rounded-2xl active:bg-accent">
							<Menu className="" />
						</div>
					</SheetTrigger>
					<SheetContent side="left">
						<SheetHeader>
							<SheetTitle>
								<Link
									href={"/"}
									className="flex items-center gap-x-1 font-inter font-bold"
								>
									<Image
										src="/logos/new_logo.svg"
										alt="Logo"
										className="relative"
										priority
										loading="eager"
										width={30}
										height={30}
									/>
									ChatDKU
								</Link>
							</SheetTitle>
						</SheetHeader>

						<div className="px-2 flex flex-col space-y-1.5 h-full">
							<Button
								variant="inChatbox"
								className="w-full justify-start"
								onClick={onNewChat}
							>
								<SquarePen />
								{t("side.newChat")}
							</Button>
							<Button
								variant="inChatbox"
								className="w-full justify-start"
								onClick={onCampusMap}
							>
								<Map />
								{t("side.campusResources")}
							</Button>

							<Link href="/about">
								<Button variant="inChatbox" className="w-full justify-start">
									<MessageCircleQuestion />
									{t("side.aboutChatDKU")}
								</Button>
							</Link>

							<Link href="https://chatdku.dukekunshan.edu.cn/">
								<Button variant="inChatbox" className="w-full justify-start">
									<LogIn />
									{t("side.loginNetID")}
								</Button>
							</Link>

							<div className={cn(!isDevRoute && "hidden")}>
								<p className="ml-2 mt-4 text-sm text-muted-foreground">
									{t("side.modelSelection")}
								</p>
								<ComboBoxResponsive
									inputValue={currentEndpoint || ""}
									onEndpointChange={onEndpointChange ?? (() => {})}
								/>
							</div>
							<ChatHistoryPanel
								onConversationSelect={onConversationSelect}
								onNewChat={onNewChat}
							/>
						</div>
					</SheetContent>
				</Sheet>
			</div>
		</TooltipProvider>
	);
}
