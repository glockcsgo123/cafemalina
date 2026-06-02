import { NextRequest, NextResponse } from "next/server";
import { readMenu, writeMenu } from "@/lib/data/db";

function isAdmin(req: NextRequest): boolean {
  return !!req.cookies.get("admin_token")?.value;
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id } = await params;
    const body = await req.json();
    const menu = readMenu();
    const idx = menu.findIndex((item: { id: string }) => item.id === id);
    if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
    menu[idx] = { ...menu[idx], ...body };
    writeMenu(menu);
    return NextResponse.json(menu[idx]);
  } catch (e) {
    console.error("PUT /api/menu/[id] error:", e);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id } = await params;
    const menu = readMenu();
    const filtered = menu.filter((item: { id: string }) => item.id !== id);
    writeMenu(filtered);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("DELETE /api/menu/[id] error:", e);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
