import { NextResponse } from "next/server";
import { addGenre } from "@/database/supabase/records";

import type { AddGenreType } from "@/app/lib/type-library";

export async function POST(request: Request) {

    const {
        apiKey,
        genreName
    } = await request.json() as AddGenreType;

    if (apiKey === process.env.NEXT_PUBLIC_API_KEY) {
        const newValue = await Promise.all([
            addGenre(genreName)
        ]);

        return NextResponse.json({
            status: "Ok",
            message: newValue,
        });
    }

    return NextResponse.json({
        status: "Error",
        message: "Authentication Error: Invalid API Key",
    });
}