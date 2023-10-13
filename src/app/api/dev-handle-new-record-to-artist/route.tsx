import { addRecordToArtist } from "@/database/records";
import { NextResponse } from "next/server";

export type RequestJson = {
    apiKey: string,
    recordId: number | undefined,
    artistId: number | undefined,
    artistTypeId: number
}

export async function POST(request: Request) {

    const { apiKey,
        recordId,
        artistId,
        artistTypeId, } = await request.json() as RequestJson;

    var formData = {
        apiKey,
        recordId,
        artistId,
        artistTypeId,
    };

    if (apiKey === process.env.NEXT_PUBLIC_API_KEY) {
        await Promise.all([
            addRecordToArtist(formData)
        ]);

        return NextResponse.json({
            status: "Ok",
            message: "Artist ID: " + formData.artistId + " successfully added!"
        });
    }

    return NextResponse.json({
        status: "Error",
        message: "Authentication Error: Invalid API Key"
    });
}