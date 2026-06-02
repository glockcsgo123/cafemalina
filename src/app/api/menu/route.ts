import { NextRequest, NextResponse } from "next/server";
import { readMenu, writeMenu } from "@/lib/data/db";

function isAdmin(req: NextRequest): boolean {
  return !!req.cookies.get("admin_token")?.value;
}

export async function GET() {
  try {
    const menu = readMenu();
    return NextResponse.json(menu);
  } catch (e) {
    console.error("GET /api/menu error:", e);
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    const menu = readMenu();
    const newItem = { ...body, id: `item-${Date.now()}` };
    menu.push(newItem);
    writeMenu(menu);
    return NextResponse.json(newItem, { status: 201 });
  } catch (e) {
    console.error("POST /api/menu error:", e);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
