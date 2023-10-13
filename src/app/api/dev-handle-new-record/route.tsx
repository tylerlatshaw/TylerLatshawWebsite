import { addRecord } from "@/database/records";
import { NextResponse } from "next/server";

export type RequestJson = {
    apiKey: string
    recordName: string
    artistId: number
    genreId: number[]
    year: number
    imageUrl: string
    discogsUrl: string
}

export async function POST(request: Request) {

    const { apiKey,
        recordName,
        artistId,
        genreId,
        year,
        imageUrl,
        discogsUrl } = await request.json() as RequestJson;

    var formData = {
        apiKey,
        recordName,
        artistId,
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
            message: formData.recordName + " successfully added!"
        });
    }

    return NextResponse.json({
        status: "Error",
        message: "Authentication Error: Invalid API Key"
    });
}