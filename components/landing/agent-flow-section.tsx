"use client";

import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/language-provider";
import {
	Search,
	Database,
	CheckCircle,
	RefreshCw,
	Brain,
	ChevronRight,
} from "lucide-react";

export function AgentFlowSection() {
	const { t } = useLanguage();
	const steps = [
		{ step: "1", label: t("home.agent.step1"), icon: Search, desc: t("home.agent.step1.desc") },
		{ step: "2", label: t("home.agent.step2"), icon: Database, desc: t("home.agent.step2.desc") },
		{ step: "3", label: t("home.agent.step3"), icon: CheckCircle, desc: t("home.agent.step3.desc") },
		{ step: "4", label: t("home.agent.step4"), icon: RefreshCw, desc: t("home.agent.step4.desc") },
		{ step: "5", label: t("home.agent.step5"), icon: Brain, desc: t("home.agent.step5.desc") },
	];

	return (
		<section className="py-16 px-4 bg-gradient-to-b from-transparent to-blue-500/10">
			<div className="max-w-5xl mx-auto">
				<div className="text-center mb-12">
					<Badge variant="outline" className="mb-4">
						{t("home.agent.badge")}
					</Badge>
					<h2 className="text-2xl md:text-3xl font-bold mb-3">
						{t("home.agent.title")}
					</h2>
					<p className="text-muted-foreground max-w-xl mx-auto">
						{t("home.agent.subtitle")}
					</p>
				</div>

				{/* Steps — vertical on mobile, horizontal on md+ */}
				<div className="flex flex-col md:flex-row items-stretch md:items-start gap-2 md:gap-1 max-w-4xl mx-auto">
					{steps.map(({ step, label, desc }, i) => (
						<div key={step} className="flex md:flex-col items-center flex-1">
							<div className="flex md:flex-col items-center md:items-center gap-3 md:gap-2 flex-1 md:text-center">
								<div className="flex-shrink-0 w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-sm">
									{step}
								</div>
								<div className="flex-1 md:flex-none">
									<div className="font-semibold text-sm">{label}</div>
									<div className="text-xs text-muted-foreground">{desc}</div>
								</div>
							</div>
							{i < 4 && (
								<>
									<ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0 md:hidden" />
									<div className="hidden md:flex items-center justify-center w-full pt-4">
										<ChevronRight className="h-4 w-4 text-muted-foreground" />
									</div>
								</>
							)}
						</div>
					))}
				</div>

				<div className="mt-10 max-w-2xl mx-auto bg-muted/50 rounded-2xl p-5 border text-sm text-center text-muted-foreground leading-relaxed">
					{t("home.agent.footer1")}{" "}
					<strong className="text-foreground">
						{t("home.agent.footerBold")}
					</strong>{" "}
					{t("home.agent.footer2")}
				</div>
			</div>
		</section>
	);
}
