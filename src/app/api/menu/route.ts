import { NextRequest, NextResponse } from "next/server";
import { readMenu, writeMenu } from "@/lib/data/db";
import { cookies } from "next/headers";

function isAdmin() {
  const jar = cookies();
  return (jar as unknown as { get: (k: string) => { value: string } | undefined }).get("admin_token")?.value === process.env.ADMIN_PASSWORD;
}

export async function GET() {
  const menu = readMenu();
  return NextResponse.json(menu);
}

export async function POST(req: NextRequest) {
  if (!isAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const menu = readMenu();
  const newItem = { ...body, id: `item-${Date.now()}` };
  menu.push(newItem);
  writeMenu(menu);
  return NextResponse.json(newItem, { status: 201 });
}
