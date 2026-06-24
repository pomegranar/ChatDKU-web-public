"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { useLanguage } from "@/components/language-provider";

function NavLinks({ className }: { className?: string }) {
	const { t } = useLanguage();
	return (
		<div className={`flex items-center gap-1 sm:gap-2 ${className}`}>
			<Link href="#stack">
				<Button variant="link" size="sm" className="px-2">
					{t("home.nav.stack")}
				</Button>
			</Link>
			<Link href="#feature-1">
				<Button variant="link" size="sm" className="px-2">
					{t("home.nav.agent")}
				</Button>
			</Link>
			<Link href="#seekbench">
				<Button variant="link" size="sm" className="px-2">
					{t("home.nav.seekbench")}
				</Button>
			</Link>
			<Link href="/about">
				<Button variant="link" size="sm" className="px-2">
					{t("home.nav.about")}
				</Button>
			</Link>
			<Link href="/team-credits">
				<Button variant="link" size="sm" className="px-2">
					{t("home.nav.team")}
				</Button>
			</Link>
		</div>
	);
}

export function LandingNav() {
	const { t } = useLanguage();
	return (
		<nav className="sticky top-0 z-50  bg-background/80 backdrop-blur-sm rounded-b-sm ">
			<div className="lg:px-20 md:px-10 px-5 mx-auto py-3 sm:py-5 flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Image src="/logos/new_logo.svg" alt="ChatDKU" width={40} height={40} />
					<span className="font-bold font-inter text-3xl">ChatDKU</span>
				</div>
				<div className="flex items-center">
					<NavLinks className="hidden sm:inline-block pr-4" />
					<LanguageToggle />
					<Link href="/login">
						<Button className="rounded-full px-4 mx-2">
							{t("home.nav.login")}
						</Button>
					</Link>
				</div>
			</div>
			<NavLinks className="sm:hidden justify-evenly" />
		</nav>
	);
}
