import { getGenres } from "@/database/records";
import { NextResponse } from "next/server";

export async function GET() {
    const genres = await getGenres();

    return NextResponse.json(genres);
}