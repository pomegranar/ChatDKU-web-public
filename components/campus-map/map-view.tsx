import type { RefObject } from "react";
import { Button } from "@/components/ui/button";
import type { Marker } from "./types";
import { getMarkerIconSrc } from "./marker-utils";

export function MapView({
  markers,
  mapImage,
  selectedMarker,
  onSelectMarker,
  currentIndex,
  onIndexChange,
  panelContentRef,
  onAsk,
  language,
}: {
  markers: Marker[];
  mapImage: string;
  selectedMarker: Marker | null;
  onSelectMarker: (marker: Marker | null) => void;
  currentIndex: number;
  onIndexChange: (updater: (prev: number) => number) => void;
  panelContentRef: RefObject<HTMLDivElement | null>;
  onAsk: (reference: string) => void;
  language: "en" | "zh";
}) {
  const isBottomHalf = selectedMarker && selectedMarker.top > 350;
  const activeItem = selectedMarker?.items[currentIndex];
  const isZh = language === "zh";

  const name = activeItem
    ? isZh && activeItem.nameZh
      ? activeItem.nameZh
      : activeItem.name
    : "";
  const desc = activeItem
    ? isZh && activeItem.descriptionZh
      ? activeItem.descriptionZh
      : activeItem.description
    : "";
  const intro = activeItem
    ? isZh && activeItem.introductionZh
      ? activeItem.introductionZh
      : activeItem.introduction
    : "";
  const hours = activeItem
    ? isZh && activeItem.hoursZh
      ? activeItem.hoursZh
      : activeItem.hours
    : "";
  const location = activeItem
    ? isZh && activeItem.locationZh
      ? activeItem.locationZh
      : activeItem.location
    : "";

  const openHoursLabel = isZh ? "开放时间：" : "Open Hours:";
  const locationLabel = isZh ? "位置：" : "Location:";
  const askLabel = isZh ? "向 ChatDKU 询问" : "Ask ChatDKU about this";

  return (
    <div
      className="relative w-full h-full"
      onClick={() => onSelectMarker(null)}
    >
      <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-xl border">
        <img src={mapImage} className="w-full h-full object-cover" alt="map" />
      </div>
      <div className="absolute inset-0">
        {markers.map((marker) => {
          const isSelected = selectedMarker?.id === marker.id;
          return (
            <div
              key={marker.id}
              className="absolute -translate-x-1/2 -translate-y-full z-10 group cursor-pointer"
              style={{ top: marker.top, left: marker.left }}
              onClick={(e) => {
                e.stopPropagation();
                onSelectMarker(marker);
                onIndexChange(() => 0);
              }}
            >
              <img
                src={getMarkerIconSrc(marker, isSelected)}
                alt=""
                className={`relative w-10 md:w-15 h-10 md:h-15 drop-shadow-lg transition-all duration-200 ${
                  isSelected
                    ? "scale-125 drop-shadow-xl"
                    : "group-hover:-translate-y-1 group-hover:scale-110"
                }`}
              />
            </div>
          );
        })}

        {selectedMarker && activeItem && (
          <div
            className="absolute z-50 w-[280px] md:w-[320px] bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            style={{
              top: isBottomHalf
                ? selectedMarker.top - 260
                : selectedMarker.top,
              left: selectedMarker.left + 40,
              maxHeight: "80vh",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onSelectMarker(null)}
              className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-black/70 dark:bg-white/70 text-white dark:text-black hover:bg-black dark:hover:bg-white"
            >
              ✕
            </Button>
            <div ref={panelContentRef} className="flex-1 overflow-y-auto">
              {activeItem.image && (
                <img
                  src={activeItem.image}
                  className="w-full h-32 object-cover"
                  alt=""
                />
              )}
              <div className={`p-4 ${activeItem.image ? "pb-2" : ""}`}>
                <div className="font-semibold text-lg">{name}</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                  {desc}
                </div>
                {intro && (
                  <div className="mt-1 text-xs italic text-neutral-500 dark:text-neutral-400">
                    {intro}
                  </div>
                )}
                <div className="mt-4 text-sm space-y-1">
                  {hours && (
                    <div>
                      <span className="font-medium">{openHoursLabel}</span>{" "}
                      {hours}
                    </div>
                  )}
                  <div className="whitespace-pre-line break-words">
                    <span className="font-medium">{locationLabel}</span>{" "}
                    {location}
                  </div>
                </div>
                <Button
                  className="mt-4 w-full rounded-lg"
                  onClick={() => onAsk(`About ${activeItem.name}`)}
                >
                  {askLabel}
                </Button>
              </div>
            </div>
            {selectedMarker.items.length > 1 && (
              <div className="flex items-center justify-center gap-4 py-2 border-t dark:border-neutral-700">
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={currentIndex === 0}
                  onClick={() => onIndexChange((p) => p - 1)}
                  className="w-8 h-8 rounded-full"
                >
                  ‹
                </Button>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                  {currentIndex + 1} / {selectedMarker.items.length}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={currentIndex === selectedMarker.items.length - 1}
                  onClick={() => onIndexChange((p) => p + 1)}
                  className="w-8 h-8 rounded-full"
                >
                  ›
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}