import { NextRequest, NextResponse } from "next/server";
import data from "@/data/campus-markers.json";

export async function GET(req: NextRequest) {
	const type = req.nextUrl.searchParams.get("type");

	if (type && !["building", "office", "printer"].includes(type)) {
		return NextResponse.json({ error: "Invalid type" }, { status: 400 });
	}

	const markers = type
		? data.markers.filter((m) => m.type === type)
		: data.markers;

	return NextResponse.json({
		markers,
		extraOfficeItems: type === "office" || !type ? data.extraOfficeItems : [],
	});
}
