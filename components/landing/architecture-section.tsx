"use client";

import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/language-provider";

export function ArchitectureSection() {
	const { t } = useLanguage();
	const layers = [
		{
			layer: t("home.arch.layer1"),
			desc: t("home.arch.layer1.desc"),
			color:
				"bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800/40",
			dot: "bg-purple-500",
		},
		{
			layer: t("home.arch.layer2"),
			desc: t("home.arch.layer2.desc"),
			color:
				"bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800/40",
			dot: "bg-blue-500",
		},
		{
			layer: t("home.arch.layer3"),
			desc: t("home.arch.layer3.desc"),
			color:
				"bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/40",
			dot: "bg-emerald-500",
		},
		{
			layer: t("home.arch.layer4"),
			desc: t("home.arch.layer4.desc"),
			color:
				"bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800/40",
			dot: "bg-orange-500",
		},
	];

	return (
		<section id="stack" className="py-16 px-4 bg-muted/30">
			<div className="max-w-5xl mx-auto">
				<div className="text-center mb-12">
					<Badge variant="outline" className="mb-4">
						{t("home.arch.badge")}
					</Badge>
					<h2 className="text-2xl md:text-3xl font-bold mb-3">
						{t("home.arch.title")}
					</h2>
					<p className="text-muted-foreground max-w-xl mx-auto">
						{t("home.arch.subtitle")}
					</p>
				</div>

				<div className="space-y-2.5 max-w-3xl mx-auto">
					{layers.map(({ layer, desc, color, dot }) => (
						<div
							key={layer}
							className={`flex items-center gap-4 rounded-2xl px-5 py-4 border ${color}`}
						>
							<div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${dot}`} />
							<div className="min-w-0">
								<span className="font-semibold text-sm">{layer}</span>
								<span className="text-muted-foreground text-sm">
									{" — "}
									{desc}
								</span>
							</div>
						</div>
					))}
				</div>

				<p className="mt-8 text-center text-sm text-muted-foreground max-w-2xl mx-auto">
					{t("home.arch.footer")}{" "}
					<strong className="text-foreground">
						{t("home.arch.footerBold")}
					</strong>{" "}
					{t("home.arch.footerEnd")}
				</p>
			</div>
		</section>
	);
}
