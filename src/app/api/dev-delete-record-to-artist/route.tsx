import { NextResponse } from "next/server";
import { deleteRecordToArtist } from "@/database/records";

import type { DeleteRecordToArtistType } from "@/app/lib/type-library";

export async function POST(request: Request) {

    const {
        apiKey,
        recordId,
        artistId,
        artistTypeId
    } = await request.json() as DeleteRecordToArtistType;

    const formData = {
        apiKey,
        recordId,
        artistId,
        artistTypeId
    };

    if (apiKey === process.env.NEXT_PUBLIC_API_KEY) {
        await Promise.all([
            deleteRecordToArtist(formData)
        ]);

        return NextResponse.json({
            status: "Ok",
            message: "Artist ID: " + formData.artistId + " successfully deleted!",
        });
    }

    return NextResponse.json({
        status: "Error",
        message: "Authentication Error: Invalid API Key",
    });
}