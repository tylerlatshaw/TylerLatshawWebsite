import { NextResponse } from "next/server";
import { addRecordToArtist } from "@/database/supabase/records";

import type { AddRecordToArtistType } from "@/app/lib/type-library";

export async function POST(request: Request) {

    const {
        apiKey,
        recordId,
        artistId,
        artistTypeId
    } = await request.json() as AddRecordToArtistType;

    const formData = {
        apiKey,
        recordId,
        artistId,
        artistTypeId
    };

    if (apiKey === process.env.NEXT_PUBLIC_API_KEY) {
        await Promise.all([
            addRecordToArtist(formData)
        ]);

        return NextResponse.json({
            status: "Ok",
            message: "Artist ID: " + formData.artistId + " successfully added!",
        });
    }

    return NextResponse.json({
        status: "Error",
        message: "Authentication Error: Invalid API Key",
    });
}