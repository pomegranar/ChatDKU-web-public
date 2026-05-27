"use client";

import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/language-provider";
import { Database, CheckCircle, Brain, BarChart3 } from "lucide-react";

export function SeekBenchSection() {
	const { t } = useLanguage();
	const metrics = [
		{ label: t("home.seekbench.metric1"), icon: Database, desc: t("home.seekbench.metric1.desc") },
		{ label: t("home.seekbench.metric2"), icon: CheckCircle, desc: t("home.seekbench.metric2.desc") },
		{ label: t("home.seekbench.metric3"), icon: Brain, desc: t("home.seekbench.metric3.desc") },
	];

	return (
		<section id="seekbench" className="py-16 px-4 bg-muted/30">
			<div className="max-w-5xl mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
					<div className="space-y-4">
						<Badge variant="outline" className="mb-4">
							{t("home.seekbench.badge")}
						</Badge>
						<div className="rounded-2xl bg-emerald-100 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 flex items-center justify-center px-2 py-4">
							<BarChart3 className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />{" "}
							<h3 className="text-2xl mx-1">SeekBench</h3>
						</div>
						<h2 className="text-2xl md:text-3xl font-bold">
							{t("home.seekbench.title")}
						</h2>
						<p className="text-muted-foreground leading-relaxed">
							{t("home.seekbench.desc1")}
						</p>
						<p className="text-muted-foreground leading-relaxed">
							{t("home.seekbench.desc2")}{" "}
							<strong className="text-foreground">
								{t("home.seekbench.desc2Bold")}
							</strong>{" "}
							{t("home.seekbench.desc2End")}
						</p>
					</div>

					<div className="space-y-3">
						{metrics.map(({ label, icon: Icon, desc }) => (
							<div
								key={label}
								className="bg-background rounded-xl p-4 border flex items-start gap-3"
							>
								<Icon className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
								<div>
									<div className="font-semibold text-sm">{label}</div>
									<div className="text-xs text-muted-foreground">{desc}</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
