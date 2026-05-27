"use client";

import { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
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
	const [selectedType, setSelectedType] = useState<MarkerType>("building");
	const [markers, setMarkers] = useState<Marker[]>([]);
	const [extraOfficeItems, setExtraOfficeItems] = useState<ExtraOfficeItem[]>(
		[],
	);
	const [selectedMarker, setSelectedMarker] = useState<Marker | null>(null);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [mapImage, setMapImage] = useState("/mapupdate.png");
	const [viewMode, setViewMode] = useState<"map" | "list">("map");
	const [modalMarker, setModalMarker] = useState<{
		marker: Marker;
		itemIndex: number;
	} | null>(null);
	const isMobile = useMediaQuery("(max-width: 768px)");
	const panelContentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		fetch(`/api/campus-map?type=${selectedType}`)
			.then((res) => res.json())
			.then((data) => {
				setMarkers(data.markers);
				setExtraOfficeItems(data.extraOfficeItems);
			});
	}, [selectedType]);

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect -- switch to list view on mobile transitions
		if (isMobile) setViewMode("list");
	}, [isMobile]);

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

	useEffect(() => {
		if (panelContentRef.current) {
			panelContentRef.current.scrollTop = 0;
		}
	}, [currentIndex]);

	const listItems = buildListItems(selectedType, markers, extraOfficeItems);

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

	return (
		<>
			<div className="w-full flex justify-center items-start p-4 md:p-8">
				<div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full max-w-7xl mx-auto justify-center">
					{isMobile && (
						<FilterButtons selectedType={selectedType} onSelect={handleFilter} />
					)}

					<div className="relative w-full md:w-[1000px] h-[500px] md:h-[650px]">
						{!isMobile && (
							<div className="absolute top-3 left-3 z-20 flex gap-2 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-full p-1 shadow-md border">
								<Button
									variant={viewMode === "map" ? "default" : "ghost"}
									className="rounded-full px-3 py-1.5 text-sm font-medium"
									onClick={() => setViewMode("map")}
								>
									Map
								</Button>
								<Button
									variant={viewMode === "list" ? "default" : "ghost"}
									className="rounded-full px-3 py-1.5 text-sm font-medium"
									onClick={() => setViewMode("list")}
								>
									List
								</Button>
							</div>
						)}

						{!isMobile && viewMode === "map" && (
							<MapView
								markers={markers}
								mapImage={mapImage}
								selectedMarker={selectedMarker}
								onSelectMarker={setSelectedMarker}
								currentIndex={currentIndex}
								onIndexChange={setCurrentIndex}
								panelContentRef={panelContentRef}
								onAsk={onAsk}
							/>
						)}

						{(viewMode === "list" || isMobile) && (
							<ListView
								items={listItems}
								selectedType={selectedType}
								onAsk={onAsk}
								onViewOnMap={handleViewOnMap}
							/>
						)}
					</div>

					{!isMobile && (
						<FilterButtons selectedType={selectedType} onSelect={handleFilter} />
					)}
				</div>
			</div>

			{isMobile && modalMarker && (
				<MapModal
					marker={modalMarker.marker}
					itemIndex={modalMarker.itemIndex}
					mapImage={mapImage}
					onClose={() => setModalMarker(null)}
				/>
			)}
		</>
	);
}
