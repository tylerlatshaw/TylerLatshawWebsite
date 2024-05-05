import { NextResponse } from "next/server";
import { getGenres } from "@/database/records";

export async function GET() {
    const genres = await getGenres();

    return NextResponse.json(genres);
}