import { ResourceCard } from "./resource-card";
import type { ListItem, MarkerType } from "./types";

export function ListView({
	items,
	selectedType,
	onAsk,
	onViewOnMap,
}: {
	items: ListItem[];
	selectedType: MarkerType;
	onAsk: (reference: string) => void;
	onViewOnMap: (markerId: number, itemIndex: number) => void;
}) {
	return (
		<div className="w-full h-full rounded-3xl overflow-y-auto bg-white dark:bg-neutral-900 shadow-xl border">
			<div className="pt-14 px-3 md:px-4 pb-4">
				<div className="space-y-3 md:space-y-4">
					{items.length === 0 ? (
						<div className="text-center text-neutral-500 dark:text-neutral-400 py-10">
							No {selectedType} available.
						</div>
					) : (
						items.map((item, idx) => (
							<ResourceCard
								key={`${item.markerId}-${idx}`}
								item={item}
								onAsk={onAsk}
								onViewOnMap={onViewOnMap}
							/>
						))
					)}
				</div>
			</div>
		</div>
	);
}
