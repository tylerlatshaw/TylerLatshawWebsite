import { NextResponse } from "next/server";
import { updateRecord } from "@/database/records";

import type { UpdateRecordType } from "@/app/lib/type-library";

export async function POST(request: Request) {

    const {
        apiKey,
        recordId,
        originalRecordName,
        newRecordName,
        year,
        imageUrl,
        discogsUrl
    } = await request.json() as UpdateRecordType;

    const formData = {
        apiKey,
        recordId,
        originalRecordName,
        newRecordName,
        year,
        imageUrl,
        discogsUrl
    };

    let messageData: string = "";

    if (apiKey === process.env.NEXT_PUBLIC_API_KEY) {

        newRecordName === undefined ? messageData = originalRecordName : messageData = newRecordName!;

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