import { NextRequest, NextResponse } from "next/server";
import { readOrders, writeOrders } from "@/lib/data/db";
import { cookies } from "next/headers";

function isAdmin() {
  const jar = cookies();
  return (jar as unknown as { get: (k: string) => { value: string } | undefined }).get("admin_token")?.value === process.env.ADMIN_PASSWORD;
}

export async function GET() {
  if (!isAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const orders = readOrders();
  return NextResponse.json(orders);
}

export async function POST(req: NextRequest) {
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
}
