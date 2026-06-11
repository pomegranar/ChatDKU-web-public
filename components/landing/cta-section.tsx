"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
	const { t } = useLanguage();
	return (
		<section className="py-20 px-4 bg-muted/30">
			<div className="max-w-2xl mx-auto text-center">
				<h2 className="text-3xl md:text-4xl font-bold mb-4">
					{t("home.cta.title")}
				</h2>
				<p className="text-muted-foreground mb-8 leading-relaxed">
					{t("home.cta.desc")}
				</p>
				<Link href="/login">
					<Button size="lg" className="rounded-full px-10">
						{t("home.cta.button")} <ArrowRight className="ml-2 h-4 w-4" />
					</Button>
				</Link>
			</div>
		</section>
	);
}
