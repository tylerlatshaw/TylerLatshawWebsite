import { getRecords } from "@/database/records";
import { NextResponse } from "next/server";

export async function GET() {
    const records = await getRecords();

    return NextResponse.json(records);
}