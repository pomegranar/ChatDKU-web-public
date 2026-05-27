import { Button } from "@/components/ui/button";
import type { Marker } from "./types";

/** Mobile-only popup: shows the map cropped to a single marker's location. */
export function MapModal({
	marker,
	itemIndex,
	mapImage,
	onClose,
}: {
	marker: Marker;
	itemIndex: number;
	mapImage: string;
	onClose: () => void;
}) {
	const item = marker.items[itemIndex];
	const leftPercent = (marker.left / 1000) * 100;
	const topPercent = (marker.top / 650) * 100;

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
			onClick={onClose}
		>
			<div
				className="relative bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl overflow-hidden"
				style={{ width: "min(90vw, 500px)" }}
				onClick={(e) => e.stopPropagation()}
			>
				<Button
					variant="ghost"
					size="icon"
					onClick={onClose}
					className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-black/70 dark:bg-white/70 text-white dark:text-black hover:bg-black dark:hover:bg-white"
				>
					✕
				</Button>
				<div className="relative w-full" style={{ aspectRatio: "1000 / 650" }}>
					<img
						src={mapImage}
						className="absolute inset-0 w-full h-full object-cover"
						alt="map"
					/>
					<div
						className="absolute -translate-x-1/2 -translate-y-full cursor-pointer"
						style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
					>
						<img
							src="/pointer.png"
							className="w-10 h-10 drop-shadow-lg"
							alt="marker"
						/>
					</div>
				</div>
				<div className="p-3 text-center text-neutral-800 dark:text-neutral-200">
					<div className="font-semibold">{item.name}</div>
					<div className="text-sm text-neutral-600 dark:text-neutral-400">
						{item.location}
					</div>
				</div>
			</div>
		</div>
	);
}
