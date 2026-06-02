import { NextRequest, NextResponse } from "next/server";
import { readOrders, writeOrders } from "@/lib/data/db";

function isAdmin(req: NextRequest): boolean {
  return !!req.cookies.get("admin_token")?.value;
}

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const orders = readOrders();
    return NextResponse.json(orders);
  } catch (e) {
    console.error("GET /api/orders error:", e);
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const orders = readOrders();
    const newOrder = {
      ...body,
      id: `order-${Date.now()}`,
      status: "new",
      createdAt: new Date().toISOString(),
    };
    orders.unshift(newOrder);
    writeOrders(orders);
    return NextResponse.json(newOrder, { status: 201 });
  } catch (e) {
    console.error("POST /api/orders error:", e);
    return NextResponse.json({ error: "Failed to save order" }, { status: 500 });
  }
}
