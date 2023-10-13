import { addRecordToGenre } from "@/database/records";
import { NextResponse } from "next/server";

export type RequestJson = {
    apiKey: string,
    recordId: number | undefined,
    genreId: number | undefined,
}

export async function POST(request: Request) {

    const { apiKey,
        recordId,
        genreId, } = await request.json() as RequestJson;

    var formData = {
        apiKey,
        recordId,
        genreId,
    };

    if (apiKey === process.env.NEXT_PUBLIC_API_KEY) {
        await Promise.all([
            addRecordToGenre(formData)
        ]);

        return NextResponse.json({
            status: "Ok",
            message: "Genre ID: " + formData.genreId + " successfully added!"
        });
    }

    return NextResponse.json({
        status: "Error",
        message: "Authentication Error: Invalid API Key"
    });
}