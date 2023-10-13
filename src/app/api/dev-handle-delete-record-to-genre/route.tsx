import { deleteRecordToGenre } from "@/database/records";
import { NextResponse } from "next/server";

export type RequestJson = {
    apiKey: string
    recordId: number
    genreId: number
}

export async function POST(request: Request) {

    const { apiKey,
        recordId,
        genreId } = await request.json() as RequestJson;

    var formData = {
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
            message: "Genre ID: " + formData.genreId + " successfully deleted!"
        });
    }

    return NextResponse.json({
        status: "Error",
        message: "Authentication Error: Invalid API Key"
    });
}