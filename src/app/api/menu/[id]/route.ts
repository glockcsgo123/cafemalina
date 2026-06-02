import { NextRequest, NextResponse } from "next/server";
import { readMenu, writeMenu } from "@/lib/data/db";
import { cookies } from "next/headers";

function isAdmin() {
  const jar = cookies();
  return (jar as unknown as { get: (k: string) => { value: string } | undefined }).get("admin_token")?.value === process.env.ADMIN_PASSWORD;
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await req.json();
  const menu = readMenu();
  const idx = menu.findIndex((item: { id: string }) => item.id === id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  menu[idx] = { ...menu[idx], ...body };
  writeMenu(menu);
  return NextResponse.json(menu[idx]);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const menu = readMenu();
  const filtered = menu.filter((item: { id: string }) => item.id !== id);
  writeMenu(filtered);
  return NextResponse.json({ ok: true });
}
