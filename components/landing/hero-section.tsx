"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";

export function HeroSection() {
  const { t } = useLanguage();
  return (
    <section className="relative overflow-hidden py-20 md:py-28 px-4">
      <div className="mx-auto text-center max-w-5xl">
        <h1 className="text-4xl font-serif sm:text-5xl md:text-6xl tracking-tight mb-6 leading-tight">
          {t("home.hero.title1")}
          <br />
          <span className="bg-gradient-to-r from-green-700 to-blue-600 dark:from-green-200 dark:to-blue-300 bg-clip-text text-transparent">
            {t("home.hero.title2")}
          </span>
        </h1>
        <p className="text-lg md:text-xl max-w-4xl mx-auto mb-8 leading-relaxed text-muted-foreground whitespace-nowrap md:whitespace-normal">
          <b className="underline underline-offset-3 text-foreground">ChatDKU</b>{" "}
          {t("home.hero.subtitle")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/login">
            <Button
              size="lg"
              className="rounded-full text-lg px-8 sm:px-10 py-6 shadow-lg shadow-green-400/20 hover:font-semibold transition-all"
            >
              {t("home.hero.cta")}
            </Button>
          </Link>
        </div>
        <div className="mt-10 flex text-base flex-col sm:flex-row items-center justify-center gap-2 text-muted-foreground">
          <span>{t("home.hero.broughtBy")}</span>
          <Link
            href="https://sites.duke.edu/edgeintelligence/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all duration-200 rounded-xl hover:shadow-md hover:border-border border border-transparent"
          >
            <Image
              src="/logos/BL_Edge Intelligence Lab_04.png"
              alt="Edge Intelligence Lab"
              height={28}
              width={200}
              className="dark:hidden rounded-xl"
            />
            <Image
              src="/logos/BL_Edge Intelligence Lab_06.png"
              alt="Edge Intelligence Lab"
              height={28}
              width={200}
              className="hidden dark:block rounded-xl"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}