import { NextResponse } from "next/server";
import { deleteRecordToGenre } from "@/database/supabase/records";

import type { DeleteRecordToGenreType } from "@/app/lib/type-library";

export async function POST(request: Request) {

    const { 
        apiKey,
        recordId,
        genreId 
    } = await request.json() as DeleteRecordToGenreType;

    const formData = {
        apiKey,
        recordId,
        genreId
    };

    if (apiKey === process.env.NEXT_PUBLIC_API_KEY) {
        await Promise.all([
            deleteRecordToGenre(formData)
        ]);

        return NextResponse.json({
            status: "Ok",
            message: "Genre ID: " + formData.genreId + " successfully deleted!",
        });
    }

    return NextResponse.json({
        status: "Error",
        message: "Authentication Error: Invalid API Key",
    });
}