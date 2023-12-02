import { NextResponse } from "next/server";
import { getGenres } from "@/database/supabase/records";

export async function GET() {
    const genres = await getGenres();

    return NextResponse.json(genres);
}