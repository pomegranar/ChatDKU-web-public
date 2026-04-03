"use client";

import { useState, useEffect, useRef } from "react";

type SubItem = {
	name: string;
	description: string;
	hours?: string;
	location: string;
	image?: string;
	introduction?: string;
};

type Marker = {
	id: number;
	type: "building" | "office" | "printer";
	top: number;
	left: number;
	items: SubItem[];
};

const markers: Marker[] = [
	{
		id: 1,
		type: "building",
		top: 320,
		left: 370,
		items: [
			{
				name: "Academic Building",
				description: "Abbreviation: AB",
				hours: "Open 24 hours",
				location: "DKU Campus",
				image: "/photos/AB.jpg",
			},
		],
	},
	{
		id: 2,
		type: "building",
		top: 340,
		left: 175,
		items: [
			{
				name: "Conference Center",
				description: "Abbreviation: CC",
				hours: "Open 24 hours",
				location: "DKU Campus",
				image: "/photos/CC.jpg",
			},
		],
	},
	{
		id: 3,
		type: "building",
		top: 480,
		left: 290,
		items: [
			{
				name: "Innovation Building",
				description: "Abbreviation: IB",
				hours: "Open 24 hours",
				location: "DKU Campus",
				image: "/photos/IB.jpg",
			},
		],
	},
	{
		id: 4,
		type: "building",
		top: 312,
		left: 238,
		items: [
			{
				name: "Water Pavilion",
				description: "",
				hours: "Open 24 hours",
				location: "DKU Campus",
				image: "/photos/Water Pavilion.jpg",
			},
		],
	},
	{
		id: 5,
		type: "building",
		top: 390,
		left: 580,
		items: [
			{
				name: "Library",
				description: "Abbreviation: LIB",
				hours: "8:00 - 23:00",
				location: "DKU Campus",
				image: "/photos/LIB.jpg",
			},
		],
	},
	{
		id: 6,
		type: "building",
		top: 470,
		left: 470,
		items: [
			{
				name: "Wuhan-Duke Research Institute",
				description: "Abbreviation: WDR",
				hours: "Open 24 hours",
				location: "DKU Campus",
				image: "/photos/WDR.jpg",
			},
		],
	},
	{
		id: 7,
		type: "building",
		top: 305,
		left: 585,
		items: [
			{
				name: "Community Center West",
				description: "Abbreviation: CCTW",
				hours: "Open 24 hours",
				location: "DKU Campus",
				image: "/photos/CCTW.jpg",
			},
		],
	},
	{
		id: 8,
		type: "building",
		top: 300,
		left: 685,
		items: [
			{
				name: "Community Center East",
				description: "Abbreviation: CCTE",
				hours: "Open 24 hours",
				location: "DKU Campus",
				image: "/photos/CCTE.jpg",
			},
		],
	},
	{
		id: 9,
		type: "building",
		top: 295,
		left: 840,
		items: [
			{
				name: "Sports Complex",
				description: "Abbreviation: SC",
				hours: "Weekdays: 7:00 - 21:00 Weekends: 10:00 - 15:00",
				location: "DKU Campus",
				image: "/photos/SC.jpg",
			},
		],
	},
	{
		id: 10,
		type: "building",
		top: 165,
		left: 860,
		items: [
			{
				name: "Soccer Field",
				description: "",
				hours: "Open 24 hours",
				location: "DKU Campus",
				image: "/photos/Soccer.jpg",
			},
		],
	},
	{
		id: 11,
		type: "building",
		top: 180,
		left: 661,
		items: [
			{
				name: "Undergraduate Residence Halls",
				description: "",
				hours: "Open 24 hours",
				location: "DKU Campus",
				image: "/photos/Residence.jpg",
			},
		],
	},
	{
		id: 12,
		type: "building",
		top: 390,
		left: 755,
		items: [
			{
				name: "Administrative Building",
				description: "Abbreviation: ADB",
				hours: "Open 24 hours",
				location: "DKU Campus",
				image: "/photos/ADB.jpg",
			},
		],
	},
	{
		id: 13,
		type: "building",
		top: 483,
		left: 755,
		items: [
			{
				name: "Visitor Center",
				description: "Abbreviation: VC",
				hours: "Open 24 hours",
				location: "DKU Campus",
				image: "/photos/VC.jpg",
			},
		],
	},
	{
		id: 14,
		type: "building",
		top: 335,
		left: 430,
		items: [
			{
				name: "Academic Avenue",
				description: "",
				hours: "Open 24 hours",
				location: "DKU Campus",
				image: "/photos/Avenue.jpg",
			},
		],
	},
	{
		id: 15,
		type: "office",
		top: 300,
		left: 685,
		items: [
			{
				name: "Office of Career Services",
				description: "careerservices@dukekunshan.edu.cn",
				hours: "Weekdays: 9:00 - 17:30",
				location: "CCTE 1019",
				image: "/photos/career.png",
				introduction:
					"Providing career development services to help students achieve their professional goals",
			},
			{
				name: "Health Services",
				description: "campushealth@dukekunshan.edu.cn",
				hours: "Weekdays: 9:00 - 12:00 & 13:00 - 17:30",
				location: "CCTE 4200",
				image: "/photos/Health.png",
				introduction:
					"Offering high-quality primary care and health education to the DKU community",
			},
			{
				name: "Office of Student Experience",
				description: "",
				location: "CCTE 4100 suite",
				image: "/photos/Experience.png",
				introduction:
					"Developing students holistically through transformative co-curricular experiences",
			},
			{
				name: "Campus Engagement",
				description: "dkucampusengagement@dukekunshan.edu.cn",
				location: "CCTE 2019",
				image: "/photos/Engagement.png",
				introduction:
					"Creating a welcoming community to support student transition and personal growth",
			},
			{
				name: "Chinese Student Services",
				description: "dku-chinese-student-services@dukekunshan.edu.cn",
				hours: "Weekdays: 9:00-12:00 & 13:00-17:30",
				location: "CCTE 4100",
				image: "/photos/Chinese.png",
				introduction:
					"Cultivating ethically responsible citizens through community and leadership programs",
			},
			{
				name: "International Student Services",
				description: "DKU-ISS@dukekunshan.edu.cn",
				hours: "Weekdays: 9:00-17:30",
				location: "CCTE 4111 & 4121",
				image: "/photos/ISS.png",
				introduction:
					"Assisting international students with visas, residence permits, and cultural integration",
			},
			{
				name: "Counseling and Wellness Services (CAWS)",
				description: "caws@dukekunshan.edu.cn",
				hours: "Weekdays: 9:00-12:00 & 13:00-17:30",
				location: "CCTE 4300",
				image: "/photos/CAWS.png",
				introduction:
					"Promoting mental health and well-being through support and intervention services",
			},
			{
				name: "Student Conduct",
				description: "studentconduct@dukekunshan.edu.cn",
				hours: "Weekdays: 9:00-17:30",
				location: "CCTE 4100 suite",
				image: "/photos/Conduct.png",
				introduction:
					"Educating students on rights and responsibilities, administering non-academic conduct",
			},
			{
				name: "Case Management",
				description: "Dku-ocm@dukekunshan.edu.cn",
				hours: "Weekdays: 9:00-12:00 & 13:00-17:30",
				location: "CCTE 4126",
				image: "/photos/Case.png",
				introduction:
					"Identifying and supporting students facing obstacles to success and holistic wellness",
			},
			{
				name: "Student Accessibility Services Office (SASO)",
				description: "SASO@dukekunshan.edu.cn",
				hours: "Weekdays: 9:00-12:00 & 13:00-17:30",
				location: "CCTE 4116",
				image: "/photos/Accessibility.png",
				introduction:
					"Providing reasonable accommodations for students with disabilities to ensure equal access",
			},
		],
	},
	{
		id: 16,
		type: "office",
		top: 390,
		left: 580,
		items: [
			{
				name: "Library Information Desk",
				description: "dkulibrary@dukekunshan.edu.cn",
				hours: "Weekdays: 9:00 - 21:00 Weekends: 14:00 - 21:00",
				location: "LIB 1F Information Desk",
				image: "/photos/library.png",
				introduction:
					"Serving as the central hub for library inquiries and research assistance",
			},
			{
				name: "DKU Information Technology (DKU IT)",
				description: "service-desk@dukekunshan.edu.cn",
				hours: "Weekdays: 9:00-17:30",
				location: "LIB 1F DKU IT Service Desk or AB2004",
				image: "/photos/IT.png",
				introduction:
					"Providing computing and technology support for students, faculty, and staff",
			},
		],
	},
	{
		id: 17,
		type: "office",
		top: 320,
		left: 370,
		items: [
			{
				name: "Writing and Language Studio",
				description: "DKU_WLS@dukekunshan.edu.cn",
				hours: "",
				location: "AB 2101",
				image: "/photos/WLS.png",
				introduction:
					"Supporting writing and multilingual communication skills across the community",
			},
		],
	},
	{
		id: 18,
		type: "printer",
		top: 390,
		left: 580,
		items: [
			{
				name: "Library Printer",
				description: "",
				hours: "Open 24 hours",
				location:
					"\n1F Rooms 1010, 1118 – Ricoh (Color) \n2F Rooms 2022, 2120 – Ricoh (Color) \n3F Rooms 3109, 3113 – Ricoh (Color) \n4F Room 4115 – Ricoh (Color) ",
			},
		],
	},
	{
		id: 19,
		type: "printer",
		top: 320,
		left: 370,
		items: [
			{
				name: "Academic Building Printer",
				description: "",
				hours: "Open 24 hours",
				location:
					"\n1F Across from Room 1075 – Ricoh (BW) \n2F Room 2013 – Ricoh (Color) \n2F Near Room 2A33 – Ricoh (Color) \n2F Room 2004 – Ricoh (Color) \n3F Near Room 3221 – Ricoh (Color) \n3F Near Room 3031 – Ricoh (Color) ",
			},
		],
	},
	{
		id: 20,
		type: "printer",
		top: 340,
		left: 175,
		items: [
			{
				name: "Conference Center Printer",
				description: "",
				hours: "Open 24 hours",
				location:
					"\n1F Near Room 1071 – Ricoh (Color) \n2F Near Room 2056 – Ricoh (Color) \n2F Near Room 2095 – Ricoh (Color)  ",
			},
		],
	},
	{
		id: 21,
		type: "printer",
		top: 190,
		left: 225,
		items: [
			{
				name: "Student Residences Hall Printer",
				description: "",
				hours: "Open 24 hours",
				location: "\n2F Main Lounge – Ricoh (BW)  ",
			},
		],
	},
	{
		id: 22,
		type: "printer",
		top: 180,
		left: 661,
		items: [
			{
				name: "Undergraduate Residence Hall Printer",
				description: "",
				hours: "Open 24 hours",
				location:
					"\nA#1102, B#1001, C#1102, D#1001, E#1102, F#1001, G#1102, H#1001 – Ricoh (BW)   ",
			},
		],
	},
	{
		id: 23,
		type: "printer",
		top: 240,
		left: 487,
		items: [
			{
				name: "Graduate Center Printer",
				description: "",
				hours: "Open 24 hours",
				location: "\n1F Room 1102 – Ricoh (BW) ",
			},
		],
	},
	{
		id: 24,
		type: "printer",
		top: 480,
		left: 290,
		items: [
			{
				name: "Innovation Building Printer",
				description: "",
				hours: "Open 24 hours",
				location:
					"\n1F West Hallway – Ricoh (Color) \n1F East Hallway – Ricoh (Color) \n2F Rooms 2016, 2031, 2062 – Ricoh (Color) \n3F Rooms 3028, 3031 (Stapler), 3088 – Ricoh (Color/BW)  ",
			},
		],
	},
	{
		id: 25,
		type: "printer",
		top: 390,
		left: 755,
		items: [
			{
				name: "Administration Building Printer",
				description: "",
				hours: "Open 24 hours",
				location:
					"\n1F Rooms 1021, 1107A, 1208 – Ricoh (Color) \n2F Rooms 2003, 2203C – Ricoh (Color) \n3F Rooms 3003, 3014, 3201A – Ricoh (Color) \n4F Rooms 4003, 4201 – Ricoh (Color)  ",
			},
		],
	},
	{
		id: 26,
		type: "printer",
		top: 295,
		left: 840,
		items: [
			{
				name: "Sports Complex Printer",
				description: "",
				hours: "Open 24 hours",
				location: "\n2F Room 2108 – Ricoh (Color)  ",
			},
		],
	},
	{
		id: 27,
		type: "printer",
		top: 300,
		left: 685,
		items: [
			{
				name: "Community Center E Printer",
				description: "",
				hours: "Open 24 hours",
				location:
					"\n1F Room 1019D – Ricoh (Color) \n4F Room 4132 – Ricoh (Color) ",
			},
		],
	},
	{
		id: 28,
		type: "printer",
		top: 470,
		left: 470,
		items: [
			{
				name: "WHU-DUKE Research Institute Printer",
				description: "",
				hours: "Open 24 hours",
				location:
					"\n1F Room 1129 – Ricoh (Color) \n1F Near Room 1012– Ricoh (Color) \n2F Rooms 2129, 2212 – Ricoh (Color) \n3F Rooms 3212, 3131 (Stapler) – Ricoh (Color) ",
			},
		],
	},
	{
		id: 29,
		type: "office",
		top: 480,
		left: 290,
		items: [
			{
				name: "DKU Innovation and Entrepreneurship Initiative (DKU InE)",
				description: "dku-innovation@dukekunshan.edu.cn",
				location: "IB 2F",
				image: "/photos/INE.png",
				introduction:
					"Fostering creativity, social responsibility, and visionary entrepreneurship",
			},
			{
				name: "Center for Teaching and Learning",
				description: "dku_ctl@dukekunshan.edu.cn",
				location: "IB 3018",
				image: "/photos/learning.png",
				introduction:
					"Supporting faculty with innovative, evidence-based teaching practices",
			},
		],
	},
	{
		id: 30,
		type: "office",
		top: 390,
		left: 755,
		items: [
			{
				name: "Office of Undergraduate Advising",
				description: "advising@dukekunshan.edu.cn / DKU-arc@dukekunshan.edu.cn",
				location: "ADB 1F",
				image: "/photos/Advising.png",
				introduction:
					"Guiding students through the interdisciplinary DKU curriculum",
			},
			{
				name: "Office of Assessment",
				description: "dku_assessment@dukekunshan.edu.cn",
				location: "ADB 1020",
				image: "/photos/Assessment.png",
				introduction:
					"Leading assessment to improve teaching, learning, and institutional effectiveness",
			},
			{
				name: "Office of the Registrar",
				description: "dku-registrar@dukekunshan.edu.cn",
				location: "ADB 1107",
				image: "/photos/Registrar.png",
				introduction:
					"Managing academic records, calendars, and registration services",
			},
		],
	},
	{
		id: 31,
		type: "office",
		top: 340,
		left: 175,
		items: [
			{
				name: "Language and Culture Center",
				description: "DKU-LCC@dukekunshan.edu.cn",
				location: "CC 1070",
				image: "/photos/Language.png",
				introduction:
					"Offering language courses in English, Chinese, and additional languages",
			},
		],
	},
	{
		id: 32,
		type: "office",
		top: 180,
		left: 661,
		items: [
			{
				name: "Residence Life",
				description: "residencelife@dukekunshan.edu.cn",
				hours: "Weekdays: 9:00-17:30",
				location:
					"\nGraduate Apartments 1110 suite\nBuilding 15A 1101\nBuilding 15C 1101\nBuilding 15E 1101\nBuilding 15G 1101",
				image: "/photos/Residence.png",
				introduction:
					"Building inclusive campus communities and managing residential life programs",
			},
		],
	},
	{
		id: 33,
		type: "office",
		top: 295,
		left: 840,
		items: [
			{
				name: "Athletics",
				description: "sports@dukekunshan.edu.cn",
				location: "SC 2F",
				image: "/photos/Athletes.png",
				introduction:
					"Cultivating values through sport, fitness, and wellness for student success",
			},
		],
	},
];

const extraOfficeItems: (SubItem & { id: string })[] = [
	{
		id: "extra-1",
		name: "Office of Academic Affairs",
		description: "dku-academicaffairs@dukekunshan.edu.cn",
		introduction:
			"Advancing inquiry-based teaching to prepare students for complex global challenges",
		location: "",
		image: "",
	},
	{
		id: "extra-2",
		name: "Institute for Global Higher Education",
		description: "",
		introduction:
			"Advancing global education through collaborative research and innovation",
		location: "",
		image: "",
	},
	{
		id: "extra-3",
		name: "Research Support Office",
		description: "research-support@dukekunshan.edu.cn",
		introduction:
			"Administering sponsored research projects and ensuring compliance",
		location: "",
		image: "",
	},
	{
		id: "extra-4",
		name: "Global Education",
		description: "dku-globaledu@dukekunshan.edu.cn",
		introduction:
			"Supporting students with study away opportunities and global learning",
		location: "",
		image: "",
	},
	{
		id: "extra-5",
		name: "Office of Faculty Affairs",
		description: "dku_facultyaffairs@dukekunshan.edu.cn",
		introduction:
			"Supporting faculty in scholarship, teaching, and professional growth",
		location: "",
		image: "",
	},
];

const useIsMobile = () => {
	const [isMobile, setIsMobile] = useState(false);
	useEffect(() => {
		const check = () => setIsMobile(window.innerWidth <= 768);
		check();
		window.addEventListener("resize", check);
		return () => window.removeEventListener("resize", check);
	}, []);
	return isMobile;
};

const MapModal = ({
	marker,
	itemIndex,
	mapImage,
	onClose,
}: {
	marker: Marker;
	itemIndex: number;
	mapImage: string;
	onClose: () => void;
}) => {
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
				<button
					onClick={onClose}
					className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-black/70 dark:bg-white/70 text-white dark:text-black flex items-center justify-center hover:bg-black dark:hover:bg-white"
				>
					✕
				</button>
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
};

export default function CampusMap({
	onAsk,
}: {
	onAsk: (reference: string) => void;
}) {
	const [selectedType, setSelectedType] = useState<
		"building" | "office" | "printer"
	>("building");
	const [selectedMarker, setSelectedMarker] = useState<Marker | null>(null);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [mapImage, setMapImage] = useState("/mapupdate.png");
	const [viewMode, setViewMode] = useState<"map" | "list">("map");
	const [modalMarker, setModalMarker] = useState<{
		marker: Marker;
		itemIndex: number;
	} | null>(null);
	const isMobile = useIsMobile();
	const panelContentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
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

	const filteredMarkers = markers.filter((m) => m.type === selectedType);
	const isBottomHalf = selectedMarker && selectedMarker.top > 350;

	let finalListItems: any[] = [];

	if (selectedType === "building" || selectedType === "printer") {
		finalListItems = filteredMarkers.flatMap((marker) =>
			marker.items.map((item, idx) => ({
				...item,
				markerId: marker.id,
				markerType: marker.type,
				itemIndex: idx,
			})),
		);
	} else if (selectedType === "office") {
		const officeItems = filteredMarkers.flatMap((marker) =>
			marker.items.map((item, idx) => ({
				...item,
				markerId: marker.id,
				markerType: marker.type,
				itemIndex: idx,
			})),
		);
		const extraItems = extraOfficeItems.map((item, idx) => ({
			...item,
			markerId: -1,
			markerType: "office" as const,
			itemIndex: -1,
		}));
		const allOffices = [...officeItems, ...extraItems];
		allOffices.sort((a, b) => a.name.localeCompare(b.name));
		finalListItems = allOffices;
	}

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

	const FilterButtons = () => (
		<div className="flex flex-row md:flex-col gap-3 md:gap-4 justify-center md:justify-start mt-2 md:mt-6">
			{(["building", "office", "printer"] as const).map((type) => (
				<button
					key={type}
					className={`px-3 md:px-4 py-1.5 md:py-2 rounded-xl text-sm md:text-base transition-all hover:scale-105 ${
						selectedType === type
							? "bg-black dark:bg-white text-white dark:text-black shadow-lg"
							: "bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-600"
					}`}
					onClick={() => {
						setSelectedType(type);
						setSelectedMarker(null);
						setCurrentIndex(0);
					}}
				>
					{type === "building"
						? "Buildings"
						: type === "office"
							? "Offices"
							: "Printers"}
				</button>
			))}
		</div>
	);

	return (
		<>
			<div className="w-full flex justify-center items-start p-4 md:p-8">
				<div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full max-w-7xl mx-auto justify-center">
					{isMobile && <FilterButtons />}

					<div className="relative w-full md:w-[1000px] h-[500px] md:h-[650px]">
						{!isMobile && (
							<div className="absolute top-3 left-3 z-20 flex gap-2 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-full p-1 shadow-md border">
								<button
									onClick={() => setViewMode("map")}
									className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all hover:scale-105 ${
										viewMode === "map"
											? "bg-black dark:bg-white text-white dark:text-black shadow"
											: "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
									}`}
								>
									Map
								</button>
								<button
									onClick={() => setViewMode("list")}
									className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all hover:scale-105 ${
										viewMode === "list"
											? "bg-black dark:bg-white text-white dark:text-black shadow"
											: "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
									}`}
								>
									List
								</button>
							</div>
						)}

						{!isMobile && viewMode === "map" && (
							<div
								className="relative w-full h-full"
								onClick={() => setSelectedMarker(null)}
							>
								<div className="absolute inset-0 rounded-3xl overflow-hidden shadow-xl border">
									<img src={mapImage} className="w-full h-full object-cover" />
								</div>
								<div className="absolute inset-0">
									{filteredMarkers.map((marker) => (
										<div
											key={marker.id}
											className="absolute -translate-x-1/2 -translate-y-full z-10 group cursor-pointer"
											style={{ top: marker.top, left: marker.left }}
											onClick={(e) => {
												e.stopPropagation();
												setSelectedMarker(marker);
												setCurrentIndex(0);
											}}
										>
											<img
												src="/pointer.png"
												className="relative w-10 md:w-15 h-10 md:h-15 drop-shadow-lg transition-all duration-200 group-hover:-translate-y-1 group-hover:scale-110"
											/>
										</div>
									))}
									{selectedMarker && (
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
											<button
												onClick={() => setSelectedMarker(null)}
												className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/70 dark:bg-white/70 text-white dark:text-black flex items-center justify-center hover:scale-110 z-10"
											>
												✕
											</button>
											<div
												ref={panelContentRef}
												className="flex-1 overflow-y-auto"
											>
												{selectedMarker.items[currentIndex].image && (
													<img
														src={selectedMarker.items[currentIndex].image}
														className="w-full h-32 object-cover"
													/>
												)}
												<div
													className={`p-4 ${selectedMarker.items[currentIndex].image ? "pb-2" : ""}`}
												>
													<div className="font-semibold text-lg">
														{selectedMarker.items[currentIndex].name}
													</div>
													<div className="text-sm text-neutral-600 dark:text-neutral-400">
														{selectedMarker.items[currentIndex].description}
													</div>
													{/* 地图面板中显示 introduction（仅当存在时） */}
													{selectedMarker.items[currentIndex].introduction && (
														<div className="mt-1 text-xs italic text-neutral-500 dark:text-neutral-400">
															{selectedMarker.items[currentIndex].introduction}
														</div>
													)}
													<div className="mt-4 text-sm space-y-1">
														{selectedMarker.items[currentIndex].hours && (
															<div>
																<span className="font-medium">Open Hours:</span>{" "}
																{selectedMarker.items[currentIndex].hours}
															</div>
														)}
														<div className="whitespace-pre-line break-words">
															<span className="font-medium">Location:</span>{" "}
															{selectedMarker.items[currentIndex].location}
														</div>
													</div>
													<button
														className="mt-4 w-full py-1.5 rounded-lg bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all hover:scale-105"
														onClick={() =>
															onAsk(
																`About ${selectedMarker!.items[currentIndex].name}`,
															)
														}
													>
														Ask ChatDKU about this
													</button>
												</div>
											</div>
											{selectedMarker.items.length > 1 && (
												<div className="flex items-center justify-center gap-4 py-2">
													<button
														disabled={currentIndex === 0}
														onClick={() => setCurrentIndex((p) => p - 1)}
														className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 hover:scale-110 transition-all disabled:opacity-30 text-neutral-800 dark:text-neutral-200"
													>
														‹
													</button>
													<div className="text-sm text-neutral-600 dark:text-neutral-400">
														{currentIndex + 1} / {selectedMarker.items.length}
													</div>
													<button
														disabled={
															currentIndex === selectedMarker.items.length - 1
														}
														onClick={() => setCurrentIndex((p) => p + 1)}
														className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 hover:scale-110 transition-all disabled:opacity-30 text-neutral-800 dark:text-neutral-200"
													>
														›
													</button>
												</div>
											)}
										</div>
									)}
								</div>
							</div>
						)}

						{(viewMode === "list" || isMobile) && (
							<div className="w-full h-full rounded-3xl overflow-y-auto bg-white dark:bg-neutral-900 shadow-xl border">
								<div className="pt-14 px-3 md:px-4 pb-4">
									<div className="space-y-3 md:space-y-4">
										{finalListItems.length === 0 ? (
											<div className="text-center text-neutral-500 dark:text-neutral-400 py-10">
												No {selectedType} available.
											</div>
										) : (
											finalListItems.map((item, idx) => {
												const isBuilding = item.markerType === "building";
												const isOfficeOrPrinter =
													item.markerType === "office" ||
													item.markerType === "printer";
												const hasMapMarker = item.markerId !== -1;

												return (
													<div
														key={`${item.markerId}-${idx}`}
														className="bg-neutral-50 dark:bg-neutral-800 rounded-xl p-3 md:p-4 shadow-sm"
													>
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
																	<div className="font-semibold text-base md:text-lg">
																		{item.name}
																	</div>
																	<div className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 mt-1">
																		{item.description}
																	</div>
																	<div className="mt-2 md:mt-3 text-xs md:text-sm space-y-1">
																		{item.hours && (
																			<div>
																				<span className="font-medium">
																					Open Hours:
																				</span>{" "}
																				{item.hours}
																			</div>
																		)}
																		<div className="whitespace-pre-line break-words">
																			<span className="font-medium">
																				Location:
																			</span>{" "}
																			{item.location}
																		</div>
																	</div>
																</div>
																<button
																	className="mt-3 md:mt-4 w-full py-1.5 text-sm rounded-lg bg-black dark:bg-white text-white dark:text-black transition-all hover:scale-105 hover:bg-neutral-800 dark:hover:bg-neutral-200"
																	onClick={() =>
																		handleViewOnMap(
																			item.markerId,
																			item.itemIndex,
																		)
																	}
																>
																	View on the map
																</button>
															</>
														) : isOfficeOrPrinter ? (
															<div className="flex flex-col sm:flex-row gap-3">
																<div className="flex-1 min-w-0 break-words">
																	<div className="font-semibold text-base md:text-lg">
																		{item.name}
																	</div>
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
																				<span className="font-medium">
																					Open Hours:
																				</span>{" "}
																				{item.hours}
																			</div>
																		)}
																		{hasMapMarker && item.location && (
																			<div className="whitespace-pre-line break-words">
																				<span className="font-medium">
																					Location:
																				</span>{" "}
																				{item.location}
																			</div>
																		)}
																	</div>
																</div>
																<div className="flex flex-row sm:flex-col justify-start sm:justify-center gap-2 sm:gap-3 flex-shrink-0">
																	<button
																		className="px-3 md:px-4 py-1.5 text-xs md:text-sm rounded-lg bg-black dark:bg-white text-white dark:text-black whitespace-nowrap transition-all hover:scale-105 hover:bg-neutral-800 dark:hover:bg-neutral-200"
																		onClick={() => onAsk(`About ${item.name}`)}
																	>
																		Ask ChatDKU
																	</button>
																	{hasMapMarker && (
																		<button
																			className="px-3 md:px-4 py-1.5 text-xs md:text-sm rounded-lg bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 whitespace-nowrap transition-all hover:scale-105 hover:bg-neutral-300 dark:hover:bg-neutral-600"
																			onClick={() =>
																				handleViewOnMap(
																					item.markerId,
																					item.itemIndex,
																				)
																			}
																		>
																			View on map
																		</button>
																	)}
																</div>
															</div>
														) : null}
													</div>
												);
											})
										)}
									</div>
								</div>
							</div>
						)}
					</div>

					{!isMobile && <FilterButtons />}
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
