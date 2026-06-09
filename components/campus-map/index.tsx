"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useLanguage } from "@/components/language-provider";
import { FilterButtons } from "./filter-buttons";
import { MapView } from "./map-view";
import { ListView } from "./list-view";
import { MapModal } from "./map-modal";
import { Button } from "@/components/ui/button";
import {
  buildListItems,
  type ExtraOfficeItem,
  type Marker,
  type MarkerType,
} from "./types";

export default function CampusMap({
  onAsk,
}: {
  onAsk: (reference: string) => void;
}) {
  const { language } = useLanguage();

  const [selectedType, setSelectedType] = useState<MarkerType>("building");
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [extraOfficeItems, setExtraOfficeItems] = useState<ExtraOfficeItem[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<Marker | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mapImage, setMapImage] = useState("/mapupdate.png");
  const [viewMode, setViewMode] = useState<"map" | "list">("map");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalMarker, setModalMarker] = useState<{
    marker: Marker;
    itemIndex: number;
  } | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const panelContentRef = useRef<HTMLDivElement>(null);

  // Translations for UI strings (not data)
  const t = useMemo(() => {
    const isZh = language === "zh";
    return {
      map: isZh ? "地图" : "Map",
      list: isZh ? "列表" : "List",
      searchPlaceholder: isZh
        ? "按名称或缩写搜索..."
        : "Search by name or abbreviation...",
      noItems: (type: string) =>
        isZh ? `暂无${type}` : `No ${type} available.`,
    };
  }, [language]);

  // Fetch markers and extra office items from API
  useEffect(() => {
    fetch(`/api/campus-map?type=${selectedType}`)
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then((data) => {
        setMarkers(data.markers || []);
        setExtraOfficeItems(data.extraOfficeItems || []);
      })
      .catch(() => {
        setMarkers([]);
        setExtraOfficeItems([]);
      });
  }, [selectedType]);

  const resolvedViewMode = isMobile ? "list" : viewMode;

  // Update map image based on dark/light mode
  useEffect(() => {
    const updateMapImage = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setMapImage(isDark ? "/dark.png" : "/mapupdate.png");
    };
    updateMapImage();
    const observer = new MutationObserver(updateMapImage);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  // Scroll panel to top when changing items
  useEffect(() => {
    if (panelContentRef.current) {
      panelContentRef.current.scrollTop = 0;
    }
  }, [currentIndex]);

  // Build list items
  const listItems = useMemo(
    () => buildListItems(selectedType, markers, extraOfficeItems),
    [selectedType, markers, extraOfficeItems],
  );

  // Filter list items by search query (English + Chinese fields)
  const displayedItems = useMemo(() => {
    if (!searchQuery.trim()) return listItems;
    const q = searchQuery.toLowerCase().trim();
    return listItems.filter((item) => {
      const name = item.name?.toLowerCase() || "";
      const nameZh = item.nameZh?.toLowerCase() || "";
      const desc = item.description?.toLowerCase() || "";
      const descZh = item.descriptionZh?.toLowerCase() || "";
      const intro = item.introduction?.toLowerCase() || "";
      const introZh = item.introductionZh?.toLowerCase() || "";
      const loc = item.location?.toLowerCase() || "";
      const locZh = item.locationZh?.toLowerCase() || "";
      return (
        name.includes(q) ||
        nameZh.includes(q) ||
        desc.includes(q) ||
        descZh.includes(q) ||
        intro.includes(q) ||
        introZh.includes(q) ||
        loc.includes(q) ||
        locZh.includes(q)
      );
    });
  }, [listItems, searchQuery]);

  const handleFilter = (type: MarkerType) => {
    setSelectedType(type);
    setSelectedMarker(null);
    setCurrentIndex(0);
  };

  const handleViewOnMap = (markerId: number, itemIndex: number) => {
    if (markerId === -1) return;
    const targetMarker = markers.find((m) => m.id === markerId);
    if (!targetMarker) return;
    if (isMobile) {
      setModalMarker({ marker: targetMarker, itemIndex });
    } else {
      setViewMode("map");
      setSelectedMarker(targetMarker);
      setCurrentIndex(itemIndex);
    }
  };

  const mapMarkers = useMemo(
    () => markers.filter((m) => m.type === selectedType),
    [markers, selectedType],
  );

  // Chinese label for the current filter (used in "No xxx available")
  const filterLabelZh = {
    building: "建筑",
    office: "办公室",
    printer: "打印机",
    amenity: "设施",
  }[selectedType];

  const emptyMessage =
    language === "zh"
      ? `暂无${filterLabelZh}`
      : `No ${selectedType} available.`;

  return (
    <>
      <div className="w-full flex justify-center items-start p-4 md:p-8">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full max-w-7xl mx-auto justify-center">
          {isMobile && (
            <FilterButtons
              selectedType={selectedType}
              onSelect={handleFilter}
              language={language}
            />
          )}

          <div className="relative w-full md:w-[1000px] h-[500px] md:h-[650px]">
            {/* Desktop: top bar with map/list toggle, search, and language */}
            {!isMobile && (
              <div className="absolute top-3 left-3 right-3 z-20 flex items-center gap-2 pointer-events-none">
                <div className="flex gap-2 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-full p-1 shadow-md border pointer-events-auto">
                  <Button
                    variant={viewMode === "map" ? "default" : "ghost"}
                    className="rounded-full px-3 py-1.5 text-sm font-medium"
                    onClick={() => setViewMode("map")}
                  >
                    {t.map}
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    className="rounded-full px-3 py-1.5 text-sm font-medium"
                    onClick={() => setViewMode("list")}
                  >
                    {t.list}
                  </Button>
                </div>
                {viewMode === "list" && (
                  <div className="flex-1 relative pointer-events-auto">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t.searchPlaceholder}
                      className="w-full px-3 py-1.5 pr-8 text-sm rounded-full border border-gray-300 dark:border-neutral-600 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
                        aria-label="Clear search"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {!isMobile && resolvedViewMode === "map" && (
              <MapView
                markers={mapMarkers}
                mapImage={mapImage}
                selectedMarker={selectedMarker}
                onSelectMarker={setSelectedMarker}
                currentIndex={currentIndex}
                onIndexChange={setCurrentIndex}
                panelContentRef={panelContentRef}
                onAsk={onAsk}
                language={language}
              />
            )}

            {(resolvedViewMode === "list" || isMobile) && (
              <ListView
                items={displayedItems}
                selectedType={selectedType}
                onAsk={onAsk}
                onViewOnMap={handleViewOnMap}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                language={language}
                emptyMessage={emptyMessage}
                showSearch={isMobile}
              />
            )}
          </div>

          {!isMobile && (
            <FilterButtons
              selectedType={selectedType}
              onSelect={handleFilter}
              language={language}
            />
          )}
        </div>
      </div>

      {isMobile && modalMarker && (
        <MapModal
          marker={modalMarker.marker}
          itemIndex={modalMarker.itemIndex}
          mapImage={mapImage}
          onClose={() => setModalMarker(null)}
          language={language}
        />
      )}
    </>
  );
}