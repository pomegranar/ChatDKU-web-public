"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/language-provider";
import { Shield, BookOpen, Users } from "lucide-react";

export function SolutionSection() {
	const { t } = useLanguage();
	const points = [
		{ icon: Shield, text: t("home.solution.privacy") },
		{ icon: BookOpen, text: t("home.solution.sources") },
		{ icon: Users, text: t("home.solution.audience") },
	];

	return (
		<section className="py-16 px-4" id="agent">
			<div className="max-w-5xl mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
					<div>
						<Badge variant="outline" className="mb-4">
							{t("home.solution.badge")}
						</Badge>
						<h2 className="text-2xl md:text-3xl font-bold mb-4">
							{t("home.solution.title")}
						</h2>
						<p className="text-muted-foreground mb-6 leading-relaxed">
							{t("home.solution.desc")}
						</p>
						<div className="space-y-3">
							{points.map(({ icon: Icon, text }) => (
								<div key={text} className="flex items-start gap-3">
									<Icon className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
									<span className="text-sm">{text}</span>
								</div>
							))}
						</div>
					</div>

					{/* Mock chat demo */}
					<div className="bg-muted/40 rounded-3xl p-6 border space-y-3">
						<div className="bg-background rounded-2xl p-4 border text-sm">
							<p className="text-muted-foreground text-xs mb-1.5">
								{t("home.solution.demo.you")}
							</p>
							<p>{t("home.solution.demo.question")}</p>
						</div>
						<div className="bg-blue-50 dark:bg-blue-950/40 rounded-2xl p-4 border border-blue-200/50 dark:border-blue-800/50 text-sm">
							<p className="text-blue-600 dark:text-blue-400 text-xs mb-1.5 flex items-center gap-1.5">
								<Image src="/logos/new_logo.svg" alt="" width={12} height={12} />
								ChatDKU
							</p>
							<p
								className="leading-relaxed"
								dangerouslySetInnerHTML={{
									__html: t("home.solution.demo.answer"),
								}}
							/>
							<p className="leading-relaxed mt-2">
								<span
									className="text-xs text-muted-foreground"
									dangerouslySetInnerHTML={{
										__html: t("home.solution.demo.ref"),
									}}
								/>
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
