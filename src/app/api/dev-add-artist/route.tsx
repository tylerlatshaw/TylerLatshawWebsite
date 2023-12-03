import { NextResponse } from "next/server";
import { addArtist } from "@/database/records";

import type { AddArtistType } from "@/app/lib/type-library";

export async function POST(request: Request) {

    const {
        apiKey,
        artistName
    } = await request.json() as AddArtistType;

    if (apiKey === process.env.NEXT_PUBLIC_API_KEY) {
        const newValue = await Promise.all([
            addArtist(artistName)
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