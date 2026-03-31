"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import type { DictionaryKey } from "@/lib/i18n";

interface PromptRecsProps {
	onPromptSelect: (prompt: string) => void;
	onSubmit?: () => void;
}

const promptIcons = [
	"📚", "✅", "🇬", "🏫", "⏰", "💰", "🧧", "💳", "🌟", "💫",
	"📝", "💡", "📊", "🙋", "✈", "🏠", "🧠", "🎓", "💰", "🚀",
	"🏋", "🏥", "🎯", "📊", "🔁", "📑", "📅", "🎖", "🏥", "👨",
	"✈", "🎯",
];

const PROMPT_COUNT = 32;

export function PromptRecs({ onPromptSelect, onSubmit }: PromptRecsProps) {
	const { t } = useLanguage();
	const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

	useEffect(() => {
		const indices = Array.from({ length: PROMPT_COUNT }, (_, i) => i);
		const shuffled = indices.sort(() => Math.random() - 0.5);
		setSelectedIndices(shuffled.slice(0, 3));
	}, []);

	const handlePromptClick = (promptText: string) => {
		onPromptSelect(promptText);

		setTimeout(() => {
			const inputs = document.querySelectorAll('input[type="text"], textarea');

			if (inputs.length > 0) {
				const lastInput = inputs[inputs.length - 1] as HTMLElement;
				lastInput.focus();

				const enterEvent = new KeyboardEvent("keydown", {
					bubbles: true,
					cancelable: true,
					key: "Enter",
					code: "Enter",
					keyCode: 13,
					which: 13,
				});

				lastInput.dispatchEvent(enterEvent);
				console.log("Enter key event dispatched on input");
			}

			const sendButton = document.querySelector(
				'button[aria-label="Send message"], button:has(svg[data-icon="paper-plane"]), button:has(svg[data-testid="send-icon"])',
			);
			if (sendButton instanceof HTMLElement) {
				sendButton.click();
				console.log("Send button clicked");
			}

			if (onSubmit) {
				onSubmit();
				console.log("onSubmit called");
			}
		}, 10);
	};

	return (
		<div className="flex flex-col sm:flex-row gap-2 pt-2 justify-center w-full mx-auto">
			{selectedIndices.map((idx) => {
				const text = t(`prompts.${idx}` as DictionaryKey);
				const icon = promptIcons[idx] || "💬";
				return (
					<Button
						key={`${idx}-${text}`}
						variant="outline"
						className="flex items-center shadow-none gap-2 px-4 py-2 text-xs rounded-3xl transition-colors w-full md:max-w-[280px] sm:max-w-[230px] h-auto whitespace-normal"
						onClick={() => handlePromptClick(text)}
					>
						<span className="text-lg flex-shrink-0">{icon}</span>
						<span className="text-left break-words">{text}</span>
					</Button>
				);
			})}
		</div>
	);
}
