"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import { ArrowUpRight } from "lucide-react";

export function HeroSection() {
	const { t } = useLanguage();
	return (
		<section className="relative overflow-hidden py-24 md:py-24 px-4">
			<div className="flex flex-col lg:flex-row mx-auto items-center justify-around text-center">
				<div className="md:min-w-lg">
					<h1 className="text-4xl font-serif drop-shadow-white/10 drop-shadow-2xl sm:text-5xl md:text-6xl tracking-tight mb-10 leading-tight">
						{t("home.hero.title1")}
						<br />
						<span className=" bg-gradient-to-r  from-green-700 to-blue-600 dark:from-green-200 dark:to-blue-300 bg-clip-text text-transparent">
							{t("home.hero.title2")}
						</span>
					</h1>
					<p className="text-lg md:text-xl max-w-xl mx-auto mb-8 leading-relaxed">
						<b className="underline underline-offset-3">ChatDKU</b>{" "}
						{t("home.hero.subtitle")}
					</p>
					<div className="flex flex-col sm:flex-row gap-3 justify-center">
						<Link href="/login">
							<Button
								size="lg"
								className="rounded-full text-xl px-8 w-auto sm:px-10 py-6 shadow-lg shadow-green-400/20 hover:font-bold "
							>
								{t("home.hero.cta")}
							</Button>
						</Link>
					</div>
					<div className="mt-8 mb-2 flex text-lg pt-5 flex-col sm:flex-row items-center justify-center gap-y-0 text-muted-foreground">
						{t("home.hero.broughtBy")}
						<div className="flex flex-col space-x-1 items-center">
							<Link href="https://sites.duke.edu/edgeintelligence/">
								<Image
									src={"/logos/BL_Edge Intelligence Lab_04.png"}
									alt="Logo for EIL."
									height={30}
									width={230}
									className="dark:hidden border -p-2 border-transparent hover:border-border hover:shadow-black/5 shadow-transparent rounded-2xl shadow-lg transition-all"
								/>
								<Image
									src={"/logos/BL_Edge Intelligence Lab_06.png"}
									alt="Logo for EIL."
									height={30}
									width={230}
									className="hidden dark:block border -p-2 border-transparent hover:border-border hover:shadow-black/5 shadow-transparent rounded-2xl shadow-lg transition-all"
								/>
							</Link>
						</div>
					</div>
				</div>
				<div className="lg:max-w-2/5 text-right md:pl-6 mt-6 scale-105 md:scale-100">
					<video
						autoPlay
						muted
						loop
						playsInline
						preload="auto"
						className="w-full h-auto rounded-sm "
					>
						<source src="/chatdku_promo.webm" type="video/webm" />
						{t("home.hero.videoFallback")}
					</video>
					<Link href="https://youtu.be/SdItulvqdLo">
						<Button variant="link" className="m-2 text-muted-foreground">
							{t("home.hero.watchYouTube")} <ArrowUpRight />
						</Button>
					</Link>
				</div>
			</div>
		</section>
	);
}
