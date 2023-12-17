import { NextResponse } from "next/server";
import { getRecordData } from "@/database/records";

export async function GET() {
    const recordData = await getRecordData();

    return NextResponse.json(recordData);
}