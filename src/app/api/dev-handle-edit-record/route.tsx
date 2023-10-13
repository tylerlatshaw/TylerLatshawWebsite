import { updateRecord } from "@/database/records";
import { NextResponse } from "next/server";

export type RequestJson = {
    apiKey: string,
    recordId: number | undefined,
    recordName: string | undefined,
    year: number | undefined,
    imageUrl: string | undefined,
    discogsUrl: string | undefined,
}

export async function POST(request: Request) {

    const { apiKey,
        recordId,
        recordName,
        year,
        imageUrl,
        discogsUrl } = await request.json() as RequestJson;

    var formData = {
        apiKey,
        recordId,
        recordName,
        year,
        imageUrl,
        discogsUrl
    };
    
    if (apiKey === process.env.NEXT_PUBLIC_API_KEY) {
        await Promise.all([
            updateRecord(formData)
        ]);

        return NextResponse.json({
            status: "Ok",
            message: recordName + " successfully updated!"
        });
    }

    return NextResponse.json({
        status: "Error",
        message: "Authentication Error: Invalid API Key"
    });
}