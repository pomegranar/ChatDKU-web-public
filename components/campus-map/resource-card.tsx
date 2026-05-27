import { Button } from "@/components/ui/button";
import type { ListItem } from "./types";

/** A single entry in the list view. Buildings get a full-width layout with a
 * "View on the map" button; offices and printers use a side-by-side layout with
 * "Ask ChatDKU" plus an optional "View on map" when a marker exists. */
export function ResourceCard({
	item,
	onAsk,
	onViewOnMap,
}: {
	item: ListItem;
	onAsk: (reference: string) => void;
	onViewOnMap: (markerId: number, itemIndex: number) => void;
}) {
	const isBuilding = item.markerType === "building";
	const hasMapMarker = item.markerId !== -1;

	return (
		<div className="bg-neutral-50 dark:bg-neutral-800 rounded-xl p-3 md:p-4 shadow-sm">
			{item.image && item.markerType !== "office" && (
				<img
					src={item.image}
					alt={item.name}
					className="w-full h-28 md:h-32 object-cover rounded-lg mb-3"
				/>
			)}

			{isBuilding ? (
				<>
					<div>
						<div className="font-semibold text-base md:text-lg">{item.name}</div>
						<div className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 mt-1">
							{item.description}
						</div>
						<div className="mt-2 md:mt-3 text-xs md:text-sm space-y-1">
							{item.hours && (
								<div>
									<span className="font-medium">Open Hours:</span> {item.hours}
								</div>
							)}
							<div className="whitespace-pre-line break-words">
								<span className="font-medium">Location:</span> {item.location}
							</div>
						</div>
					</div>
					<Button
						className="mt-3 md:mt-4 w-full rounded-lg text-sm"
						onClick={() => onViewOnMap(item.markerId, item.itemIndex)}
					>
						View on the map
					</Button>
				</>
			) : (
				<div className="flex flex-col sm:flex-row gap-3">
					<div className="flex-1 min-w-0 break-words">
						<div className="font-semibold text-base md:text-lg">{item.name}</div>
						<div className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 mt-1">
							{item.description}
						</div>
						{item.introduction && (
							<div className="mt-1 text-xs italic text-neutral-500 dark:text-neutral-400">
								{item.introduction}
							</div>
						)}
						<div className="mt-2 md:mt-3 text-xs md:text-sm space-y-1">
							{item.hours && (
								<div>
									<span className="font-medium">Open Hours:</span> {item.hours}
								</div>
							)}
							{hasMapMarker && item.location && (
								<div className="whitespace-pre-line break-words">
									<span className="font-medium">Location:</span> {item.location}
								</div>
							)}
						</div>
					</div>
					<div className="flex flex-row sm:flex-col justify-start sm:justify-center gap-2 sm:gap-3 flex-shrink-0">
						<Button
							className="rounded-lg text-xs md:text-sm"
							onClick={() => onAsk(`About ${item.name}`)}
						>
							Ask ChatDKU
						</Button>
						{hasMapMarker && (
							<Button
								variant="secondary"
								className="rounded-lg text-xs md:text-sm"
								onClick={() => onViewOnMap(item.markerId, item.itemIndex)}
							>
								View on map
							</Button>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
