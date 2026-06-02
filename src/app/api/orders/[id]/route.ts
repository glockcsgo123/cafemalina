import { NextRequest, NextResponse } from "next/server";
import { readOrders, writeOrders } from "@/lib/data/db";
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
  const orders = readOrders();
  const idx = orders.findIndex((o: { id: string }) => o.id === id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  orders[idx] = { ...orders[idx], ...body };
  writeOrders(orders);
  return NextResponse.json(orders[idx]);
}
