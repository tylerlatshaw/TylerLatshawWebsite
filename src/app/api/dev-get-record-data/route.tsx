import { getRecordData } from "@/database/records";
import { NextResponse } from "next/server";

export async function GET() {
    const records = await getRecordData();

    return NextResponse.json(records);
}