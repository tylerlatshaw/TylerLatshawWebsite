import { updateRecord } from "@/database/records";
import { NextResponse } from "next/server";

export type RequestJson = {
    apiKey: string,
    recordId: number | undefined,
    originalRecordName: string,
    newRecordName: string | undefined,
    year: number | undefined,
    imageUrl: string | undefined,
    discogsUrl: string | undefined,
}

export async function POST(request: Request) {

    const { apiKey,
        recordId,
        originalRecordName,
        newRecordName,
        year,
        imageUrl,
        discogsUrl } = await request.json() as RequestJson;

    const formData = {
        apiKey,
        recordId,
        originalRecordName,
        newRecordName,
        year,
        imageUrl,
        discogsUrl,
    };

    let messageData: string = "";
    
    if (apiKey === process.env.NEXT_PUBLIC_API_KEY) {

        newRecordName === undefined? messageData = originalRecordName : messageData = newRecordName!;
        
        await Promise.all([
            updateRecord(formData)
        ]);

        return NextResponse.json({
            status: "Ok",
            message: messageData + " successfully updated!",
        });
    }

    return NextResponse.json({
        status: "Error",
        message: "Authentication Error: Invalid API Key",
    });
}