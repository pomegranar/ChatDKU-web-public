import { ResourceCard } from "./resource-card";
import type { ListItem, MarkerType } from "./types";

export function ListView({
  items,
  selectedType,
  onAsk,
  onViewOnMap,
  searchQuery,
  onSearchChange,
  language,
  emptyMessage,
  showSearch = true,
}: {
  items: ListItem[];
  selectedType: MarkerType;
  onAsk: (reference: string) => void;
  onViewOnMap: (markerId: number, itemIndex: number) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  language: "en" | "zh";
  emptyMessage: string;
  showSearch?: boolean;
}) {
  const placeholder =
    language === "zh" ? "按名称或缩写搜索..." : "Search by name or abbreviation...";

  return (
    <div className="w-full h-full rounded-3xl overflow-hidden bg-white dark:bg-neutral-900 shadow-xl border flex flex-col">
      {showSearch && (
        <div className="px-3 pt-3 pb-2 md:pt-14 md:px-4 flex items-center gap-2 bg-white dark:bg-neutral-900 z-10">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={placeholder}
              className="w-full px-3 py-1.5 pr-8 text-sm rounded-full border border-gray-300 dark:border-neutral-600 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      )}

      <div
        className={`flex-1 overflow-y-auto px-3 pb-4 md:px-4 ${
          showSearch ? "" : "pt-16"
        }`}
      >
        <div className="space-y-3 md:space-y-4">
          {items.length === 0 ? (
            <div className="text-center text-neutral-500 dark:text-neutral-400 py-10">
              {emptyMessage}
            </div>
          ) : (
            items.map((item, idx) => (
              <ResourceCard
                key={`${item.markerId}-${idx}`}
                item={item}
                onAsk={onAsk}
                onViewOnMap={onViewOnMap}
                language={language}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}