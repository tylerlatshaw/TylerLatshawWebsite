import { NextResponse } from "next/server";
import { getArtists } from "@/database/records";

export async function GET() {
    const artists = await getArtists();

    return NextResponse.json(artists);
}