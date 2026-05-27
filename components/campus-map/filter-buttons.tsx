import { Button } from "@/components/ui/button";
import type { MarkerType } from "./types";

const LABELS: Record<MarkerType, string> = {
	building: "Buildings",
	office: "Offices",
	printer: "Printers",
};

export function FilterButtons({
	selectedType,
	onSelect,
}: {
	selectedType: MarkerType;
	onSelect: (type: MarkerType) => void;
}) {
	return (
		<div className="flex flex-row md:flex-col gap-3 md:gap-4 justify-center md:justify-start mt-2 md:mt-6">
			{(["building", "office", "printer"] as const).map((type) => (
				<Button
					key={type}
					variant={selectedType === type ? "default" : "secondary"}
					className="rounded-xl text-sm md:text-base px-3 md:px-4 py-1.5 md:py-2"
					onClick={() => onSelect(type)}
				>
					{LABELS[type]}
				</Button>
			))}
		</div>
	);
}
