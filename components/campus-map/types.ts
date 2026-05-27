export type MarkerType = "building" | "office" | "printer";

export type SubItem = {
	name: string;
	description: string;
	hours?: string;
	location: string;
	image?: string;
	introduction?: string;
};

export type Marker = {
	id: number;
	type: MarkerType;
	top: number;
	left: number;
	items: SubItem[];
};

export type ExtraOfficeItem = SubItem & { id: string };

export type ListItem = SubItem & {
	markerId: number;
	markerType: Marker["type"];
	itemIndex: number;
	id?: string;
};

/**
 * Flatten the markers (and standalone office items) for the current filter into
 * a single list. Offices additionally fold in `extraOfficeItems` and are sorted
 * alphabetically; buildings and printers keep their marker order.
 */
export function buildListItems(
	selectedType: MarkerType,
	markers: Marker[],
	extraOfficeItems: ExtraOfficeItem[],
): ListItem[] {
	if (selectedType === "building" || selectedType === "printer") {
		return markers.flatMap((marker) =>
			marker.items.map((item, idx) => ({
				...item,
				markerId: marker.id,
				markerType: marker.type,
				itemIndex: idx,
			})),
		);
	}

	const officeItems = markers.flatMap((marker) =>
		marker.items.map((item, idx) => ({
			...item,
			markerId: marker.id,
			markerType: marker.type,
			itemIndex: idx,
		})),
	);
	const extraItems = extraOfficeItems.map((item) => ({
		...item,
		markerId: -1,
		markerType: "office" as const,
		itemIndex: -1,
	}));
	return [...officeItems, ...extraItems].sort((a, b) =>
		a.name.localeCompare(b.name),
	);
}
