"use client";

import { useLanguage } from "@/components/language-provider";
import type { DictionaryKey } from "@/lib/i18n";
import { Sparkles, FileSearch, Smartphone, MapPin, History } from "lucide-react";

interface Feature {
  id: number;
  icon: React.ComponentType<{ className?: string }>;
  titleKey: string;
  descKey: string;
  color: "emerald" | "blue" | "purple" | "orange" | "teal";
  videoSrc?: string;
}

function VideoPlaceholder({
  featureId,
  videoSrc,
}: {
  featureId: number;
  videoSrc?: string;
}) {
  if (videoSrc) {
    return (
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-purple-500/20 to-primary/30 rounded-2xl opacity-0 group-hover:opacity-100 blur-lg transition duration-500" />
        <div className="relative rounded-2xl overflow-hidden aspect-video border border-border shadow-md group-hover:shadow-xl transition-all duration-300">
          <video
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-purple-500/20 to-primary/30 rounded-2xl opacity-0 group-hover:opacity-100 blur-lg transition duration-500" />
      <div className="relative bg-card/50 rounded-2xl aspect-video border border-border shadow-sm group-hover:shadow-md transition-all duration-300" />
    </div>
  );
}

const styles = {
  emerald: {
    lightText: "text-emerald-600 dark:text-emerald-400",
    badgeBorder: "border-emerald-500/30",
    badgeBg: "bg-emerald-500/10",
    bar: "bg-gradient-to-r from-emerald-500 to-emerald-300",
  },
  blue: {
    lightText: "text-blue-600 dark:text-blue-400",
    badgeBorder: "border-blue-500/30",
    badgeBg: "bg-blue-500/10",
    bar: "bg-gradient-to-r from-blue-500 to-blue-300",
  },
  purple: {
    lightText: "text-purple-600 dark:text-purple-400",
    badgeBorder: "border-purple-500/30",
    badgeBg: "bg-purple-500/10",
    bar: "bg-gradient-to-r from-purple-500 to-purple-300",
  },
  orange: {
    lightText: "text-orange-600 dark:text-orange-400",
    badgeBorder: "border-orange-500/30",
    badgeBg: "bg-orange-500/10",
    bar: "bg-gradient-to-r from-orange-500 to-amber-300",
  },
  teal: {
    lightText: "text-teal-600 dark:text-teal-400",
    badgeBorder: "border-teal-500/30",
    badgeBg: "bg-teal-500/10",
    bar: "bg-gradient-to-r from-teal-500 to-teal-300",
  },
};

const features: Feature[] = [
  {
    id: 1,
    icon: Sparkles,
    titleKey: "home.feature1.title",
    descKey: "home.feature1.desc",
    color: "emerald",
    // videoSrc: "/videos/feature1.mp4",
  },
  {
    id: 2,
    icon: FileSearch,
    titleKey: "home.feature2.title",
    descKey: "home.feature2.desc",
    color: "blue",
    // videoSrc: "/videos/feature2.mp4",
  },
  {
    id: 3,
    icon: History,
    titleKey: "home.feature3.title",
    descKey: "home.feature3.desc",
    color: "teal",
    // videoSrc: "/videos/feature3.mp4",
  },
  {
    id: 4,
    icon: Smartphone,
    titleKey: "home.feature4.title",
    descKey: "home.feature4.desc",
    color: "purple",
    // videoSrc: "/videos/feature4.mp4",
  },
  {
    id: 5,
    icon: MapPin,
    titleKey: "home.feature5.title",
    descKey: "home.feature5.desc",
    color: "orange",
    // videoSrc: "/videos/feature5.mp4",
  },
];

export function FeaturesSection() {
  const { t } = useLanguage();

  return (
    <section className="py-14 px-4 md:py-20 lg:py-28">
      <div className="max-w-5xl mx-auto space-y-14 md:space-y-20">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          const isEven = idx % 2 === 1;
          const s = styles[feature.color];

          return (
            <div
              key={feature.id}
              className={`relative flex flex-col ${
                isEven ? "md:flex-row-reverse" : "md:flex-row"
              } gap-6 md:gap-10 lg:gap-14 items-center p-5 md:p-7 lg:p-9 rounded-3xl bg-card/50 border border-border/30 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300`}
            >
              <div className="flex-1 space-y-3 md:space-y-4">
                <div
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-xs font-semibold tracking-wide uppercase ${s.badgeBorder} ${s.badgeBg} ${s.lightText}`}
                >
                  <Icon className="h-3 w-3" />
                  Feature {feature.id}
                </div>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-foreground">
                  {t(feature.titleKey as DictionaryKey)}
                </h3>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-prose">
                  {t(feature.descKey as DictionaryKey)}
                </p>
                <div className={`w-16 h-1 rounded-full ${s.bar}`} />
              </div>

              <div className="flex-1 w-full max-w-sm mx-auto md:max-w-none">
                <VideoPlaceholder
                  featureId={feature.id}
                  videoSrc={feature.videoSrc}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}