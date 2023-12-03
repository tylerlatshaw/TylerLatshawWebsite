import { NextResponse } from "next/server";
import { getRecords } from "@/database/records";

export async function GET() {
    const records = await getRecords();

    return NextResponse.json(records);
}