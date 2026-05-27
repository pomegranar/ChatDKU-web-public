"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export interface ThinkingBoxProps {
	content: string;
	dismissing?: boolean;
}

export function ThinkingBox({ content, dismissing }: ThinkingBoxProps) {
	const [entered, setEntered] = useState(false);
	const scrollRef = useRef<HTMLDivElement>(null);

	// Double-rAF: ensures the browser paints the element at opacity 0 before
	// the CSS transition to opacity 1 begins.
	useEffect(() => {
		let cancelled = false;
		const r1 = requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				if (!cancelled) setEntered(true);
			});
		});
		return () => {
			cancelled = true;
			cancelAnimationFrame(r1);
		};
	}, []);

	// Pin scroll to bottom as content streams in.
	useEffect(() => {
		const el = scrollRef.current;
		if (el) el.scrollTop = el.scrollHeight;
	}, [content]);

	const visible = entered && !dismissing;
	const wrapperStyle: React.CSSProperties = {
		opacity: visible ? 1 : 0,
		transform: !entered
			? "translateY(6px)"
			: dismissing
				? "translateY(-6px)"
				: "translateY(0px)",
		transition: "opacity 240ms ease-out, transform 240ms ease-out",
	};

	return (
		<div className="flex w-full">
			<div className="flex flex-col items-start w-full sm:max-w-[85%]">
				<div
					className="flex flex-col lg:flex-row gap-3 px-4 py-2 w-full"
					style={wrapperStyle}
				>
					<div className="flex-shrink-0">
						<div className="w-8 h-8 rounded-full bg-transparent flex items-center justify-center">
							<Image
								src="/logos/new_logo.svg"
								alt="ChatDKU"
								width={32}
								height={32}
								className="p-1.5 opacity-60"
							/>
						</div>
					</div>
					<div className="flex-1 min-w-0">
						<div
							ref={scrollRef}
							className="h-[120px] overflow-hidden rounded-xl bg-muted/20 border border-border/30 px-3 py-2.5 select-none"
						>
							<p className="font-mono text-[11px] leading-relaxed text-muted-foreground/55 whitespace-pre-wrap break-words m-0 pointer-events-none">
								{content}
								{!dismissing && (
									<span className="inline-block w-px h-[0.8em] bg-muted-foreground/40 ml-0.5 align-text-bottom animate-pulse" />
								)}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
