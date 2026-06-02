import { NextRequest, NextResponse } from "next/server";
import { readOrders, writeOrders } from "@/lib/data/db";

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
    const orders = readOrders() as { id: string; [k: string]: unknown }[];
    const idx = orders.findIndex((o) => o.id === id);
    if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
    orders[idx] = { ...orders[idx], ...body };
    writeOrders(orders);
    return NextResponse.json(orders[idx]);
  } catch (e) {
    console.error("PUT /api/orders/[id] error:", e);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
