"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setLanguage(language === "en" ? "zh" : "en")}
      className="text-sm font-medium"
    >
      {language === "en" ? "中文" : "EN"}
    </Button>
  );
}
