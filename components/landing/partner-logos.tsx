"use client";

import Image from "next/image";
import { useLanguage } from "@/components/language-provider";

export function PartnerLogos() {
	const { t } = useLanguage();
	return (
		<section className=" text-center">
			<div className="mx-auto md:px-20 flex flex-col items-center gap-4 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 dark:from-transparent dark:to-transparent py-5 ">
				<p className="text-white text-sm tracking-wide uppercase font-serif">
					{t("home.partners.label")}
				</p>
				<Image
					src="/partner-logos.png"
					alt="Partner logos"
					width={900}
					height={100}
					className="w-full max-w-3xl h-auto object-contain opacity-90"
				/>
			</div>
		</section>
	);
}
