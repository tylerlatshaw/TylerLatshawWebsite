import { addGenre } from "@/database/records";
import { NextResponse } from "next/server";

export type RequestJson = {
    apiKey: string
    genreName: string
}

export async function POST(request: Request) {

    const { apiKey,
        genreName } = await request.json() as RequestJson;

    if (apiKey === process.env.NEXT_PUBLIC_API_KEY) {
        const newValue = await Promise.all([
            addGenre(genreName)
        ]);

        return NextResponse.json({
            status: "Ok",
            message: newValue
        });
    }

    return NextResponse.json({
        status: "Error",
        message: "Authentication Error: Invalid API Key"
    });
}