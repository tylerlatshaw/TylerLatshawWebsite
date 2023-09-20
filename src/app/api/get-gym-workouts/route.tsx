import { NextResponse } from "next/server";
import { getWorkoutTableData } from "@/database/gym";

export async function GET() {

    const data = getWorkoutTableData();

    await Promise.all([
        getWorkoutTableData()
    ]);

    return NextResponse.json({
        data
    });
}