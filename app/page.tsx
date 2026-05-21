"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/ui/language-toggle";

export default function UnderConstructionPage() {
	return (
		<div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 text-center">
			<div className="mb-8">
				<Image
					src="/logos/new_logo.svg"
					alt="ChatDKU"
					width={64}
					height={64}
					className="mx-auto mb-4"
				/>
				<span className="font-bold font-inter text-3xl">ChatDKU</span>
			</div>

			{/* Construction sign */}
			<div className="w-full max-w-md border-4 border-yellow-400 rounded-2xl bg-yellow-50 dark:bg-yellow-950/30 p-8 shadow-lg mb-8">
				<div className="flex items-center justify-center gap-3 mb-4">
					<span className="text-4xl">🚧</span>
					<h1 className="text-2xl md:text-3xl font-bold text-yellow-800 dark:text-yellow-200">
						Under Construction
					</h1>
					<span className="text-4xl">🚧</span>
				</div>
				<div className="h-3 w-full rounded-full overflow-hidden bg-yellow-200 dark:bg-yellow-900 mb-6">
					<div
						className="h-full bg-yellow-400 dark:bg-yellow-500 rounded-full"
						style={{ width: "60%" }}
					/>
				</div>
				<p className="text-yellow-700 dark:text-yellow-300 leading-relaxed">
					We&apos;re currently refactoring and cleaning up ChatDKU.
					<br />
					Check back soon — exciting improvements are on the way!
				</p>
			</div>

			<div className="flex items-center gap-4">
				<Link href="/login">
					<Button variant="outline" className="rounded-full px-6">
						Go to App
					</Button>
				</Link>
				<LanguageToggle />
			</div>

			<p className="mt-10 text-xs text-muted-foreground">
				© Duke Kunshan University · Edge Intelligence Lab
			</p>
		</div>
	);
}
