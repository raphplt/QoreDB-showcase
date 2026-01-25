import { NextResponse } from "next/server";

export async function GET() {
	try {
		const response = await fetch(
			"https://github.com/QoreDB/QoreDB/releases/latest/download/latest.json",
			{
				headers: {
					"Cache-Control": "no-cache",
				},
			},
		);

		if (!response.ok) {
			throw new Error(`GitHub responded with ${response.status}`);
		}

		const data = await response.json();
		console.log("GitHub API Data:", JSON.stringify(data).substring(0, 200)); // Log part of data
		return NextResponse.json(data);
	} catch (error) {
		console.error("Failed to fetch latest release:", error);
		return NextResponse.json(
			{ error: "Failed to fetch release data" },
			{ status: 500 },
		);
	}
}
