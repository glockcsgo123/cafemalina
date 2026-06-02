import { NextRequest, NextResponse } from "next/server";
import { readSettings, writeSettings, DEFAULT_SETTINGS } from "@/lib/data/db";

export async function GET() {
  try {
    const settings = readSettings();
    return NextResponse.json(settings);
  } catch {
    return NextResponse.json(DEFAULT_SETTINGS);
  }
}

export async function PUT(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    writeSettings(body);
    return NextResponse.json(body);
  } catch {
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
