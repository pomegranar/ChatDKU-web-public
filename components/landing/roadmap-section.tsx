"use client";

import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/language-provider";
import { Smartphone, Brain, Layers, Zap } from "lucide-react";

export function RoadmapSection() {
	const { t } = useLanguage();
	const items = [
		{ icon: Smartphone, title: t("home.roadmap.mobile"), desc: t("home.roadmap.mobile.desc") },
		{ icon: Brain, title: t("home.roadmap.agents"), desc: t("home.roadmap.agents.desc") },
		{ icon: Layers, title: t("home.roadmap.visual"), desc: t("home.roadmap.visual.desc") },
		{ icon: Zap, title: t("home.roadmap.eval"), desc: t("home.roadmap.eval.desc") },
	];

	return (
		<section className="py-16 px-4 bg-gradient-to-b from-transparent to-emerald-500/10">
			<div className="max-w-5xl mx-auto">
				<div className="text-center mb-10">
					<Badge variant="outline" className="mb-4">
						{t("home.roadmap.badge")}
					</Badge>
					<h2 className="text-2xl md:text-3xl font-bold mb-2">
						{t("home.roadmap.title")}
					</h2>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
					{items.map(({ icon: Icon, title, desc }) => (
						<div
							key={title}
							className=" bg-muted/50 rounded-2xl p-5 border hover:shadow-md hover:bg-muted/80 transition-all duration-200"
						>
							<Icon className="h-6 w-6 mb-3 text-muted-foreground" />
							<h3 className="font-semibold mb-1 text-sm">{title}</h3>
							<p className="text-xs text-muted-foreground">{desc}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
