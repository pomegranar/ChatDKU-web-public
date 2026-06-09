import { Button } from "@/components/ui/button";
import type { MarkerType } from "./types";

const LABELS: Record<MarkerType, { en: string; zh: string }> = {
  building: { en: "Buildings", zh: "建筑" },
  office: { en: "Offices", zh: "办公室" },
  printer: { en: "Printers", zh: "打印机" },
  amenity: { en: "Amenities", zh: "设施" },
};

export function FilterButtons({
  selectedType,
  onSelect,
  language,
}: {
  selectedType: MarkerType;
  onSelect: (type: MarkerType) => void;
  language: "en" | "zh";
}) {
  return (
    <div className="flex flex-row md:flex-col gap-3 md:gap-4 justify-center md:justify-start mt-2 md:mt-6">
      {(["building", "office", "printer", "amenity"] as const).map((type) => (
        <Button
          key={type}
          variant={selectedType === type ? "default" : "secondary"}
          className="rounded-xl text-sm md:text-base px-3 md:px-4 py-1.5 md:py-2"
          onClick={() => onSelect(type)}
        >
          {language === "zh" ? LABELS[type].zh : LABELS[type].en}
        </Button>
      ))}
    </div>
  );
}