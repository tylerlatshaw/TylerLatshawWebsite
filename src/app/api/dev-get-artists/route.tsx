import { getArtists } from "@/database/records";
import { NextResponse } from "next/server";

export async function GET() {
    const artists = await getArtists();

    return NextResponse.json(artists);
}