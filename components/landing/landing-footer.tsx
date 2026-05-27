"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-provider";

export function LandingFooter() {
	const { t } = useLanguage();
	return (
		<footer className="border-t py-6 px-4">
			<div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
				<div className="flex items-center gap-2">
					<span>{t("home.footer.copyright")}</span>
				</div>
				<div className="flex gap-4">
					<Link href="/about" className="hover:text-foreground transition-colors">
						{t("home.footer.about")}
					</Link>
					<Link
						href="/team-credits"
						className="hover:text-foreground transition-colors"
					>
						{t("home.footer.team")}
					</Link>
					<Link href="/login" className="hover:text-foreground transition-colors">
						{t("home.footer.login")}
					</Link>
				</div>
			</div>
		</footer>
	);
}
