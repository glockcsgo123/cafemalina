import { NextRequest, NextResponse } from "next/server";
import { readSettings, writeSettings } from "@/lib/data/db";

export async function GET() {
  const settings = readSettings();
  return NextResponse.json(settings);
}

export async function PUT(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  writeSettings(body);
  return NextResponse.json(body);
}
