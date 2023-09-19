"use client";

import { addDatabaseLog } from "@/database/log";
import { NextResponse } from "next/server";

export async function GET(request: Request) {

    const data = await addDatabaseLog();

    return NextResponse.json({ log: data });
}