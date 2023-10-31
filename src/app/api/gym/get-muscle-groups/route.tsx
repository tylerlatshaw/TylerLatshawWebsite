import { getMuscleGroups } from "@/database/gym";
import { NextResponse } from "next/server";

export async function GET() {

    const muscleGroups = await getMuscleGroups();

    return NextResponse.json(muscleGroups);
}