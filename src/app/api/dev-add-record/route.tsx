import { NextResponse } from "next/server";
import { addRecord } from "@/database/records";

import type { AddRecordType } from "@/app/lib/type-library";

export async function POST(request: Request) {

    const {
        apiKey,
        recordName,
        artistId,
        artistTypeId,
        genreId,
        year,
        imageUrl,
        discogsUrl
    } = await request.json() as AddRecordType;

    const formData = {
        apiKey,
        recordName,
        artistId,
        artistTypeId,
        genreId,
        year,
        imageUrl,
        discogsUrl
    };

    if (apiKey === process.env.NEXT_PUBLIC_API_KEY) {
        await Promise.all([
            addRecord(formData)
        ]);

        return NextResponse.json({
            status: "Ok",
            message: formData.recordName + " successfully added!",
        });
    }

    return NextResponse.json({
        status: "Error",
        message: "Authentication Error: Invalid API Key",
    });
}