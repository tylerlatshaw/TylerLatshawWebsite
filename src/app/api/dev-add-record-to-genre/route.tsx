import { NextResponse } from "next/server";
import { addRecordToGenre } from "@/database/records";

import type { AddRecordToGenreType } from "@/app/lib/type-library";

export async function POST(request: Request) {

    const {
        apiKey,
        recordId,
        genreId
    } = await request.json() as AddRecordToGenreType;

    const formData = {
        apiKey,
        recordId,
        genreId
    };

    if (apiKey === process.env.NEXT_PUBLIC_API_KEY) {
        await Promise.all([
            addRecordToGenre(formData)
        ]);

        return NextResponse.json({
            status: "Ok",
            message: "Genre ID: " + formData.genreId + " successfully added!",
        });
    }

    return NextResponse.json({
        status: "Error",
        message: "Authentication Error: Invalid API Key",
    });
}