import { NextRequest, NextResponse } from "next/server";
import { readOrders, writeOrders } from "@/lib/data/db";
import { formatPrice } from "@/lib/utils";

function isAdmin(req: NextRequest): boolean {
  return !!req.cookies.get("admin_token")?.value;
}

// ---------- VK уведомление ----------

async function sendVkNotification(order: Record<string, unknown>): Promise<string> {
  const token = process.env.VK_BOT_TOKEN;
  const peerId = process.env.VK_CHAT_PEER_ID;

  if (!token || !peerId) {
    return "VK_NOT_CONFIGURED";
  }

  const items = (order.items as { name: string; price: number; quantity: number }[]) ?? [];
  const itemLines = items
    .map((i) => `  ${i.name} ×${i.quantity} — ${formatPrice(i.price * i.quantity)}`)
    .join("\n");

  const paymentLabels: Record<string, string> = {
    cash: "Наличными",
    card: "Картой",
    transfer: "Переводом",
  };
  const payment = paymentLabels[order.paymentMethod as string] ?? String(order.paymentMethod ?? "");

  const lines = [
    `🔔 НОВЫЙ ЗАКАЗ`,
    ``,
    `👤 ${order.name}`,
    `📞 ${order.phone}`,
    `📍 ${order.address}${order.addressDetails ? `, ${order.addressDetails}` : ""}`,
    ``,
    `🛒 Состав:`,
    itemLines,
    ``,
    `💰 Итого: ${formatPrice(order.total as number)}`,
    `💳 Оплата: ${payment}`,
  ];

  if (order.persons && Number(order.persons) > 1) lines.push(`👥 Персон: ${order.persons}`);
  if (order.comment) lines.push(`💬 ${order.comment}`);

  const params = new URLSearchParams({
    peer_id: peerId,
    random_id: String(Math.floor(Math.random() * 1e9)),
    message: lines.join("\n"),
    access_token: token,
    v: "5.199",
  });

  const res = await fetch("https://api.vk.com/method/messages.send", {
    method: "POST",
    body: params,
  });
  const data = await res.json();

  if (data.error) {
    console.error("VK error:", data.error);
    return `VK_ERROR: ${data.error.error_msg}`;
  }

  return "OK";
}

// ---------- Роуты ----------

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const orders = readOrders();
  return NextResponse.json(orders);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.name || !body.phone || !body.address) {
      return NextResponse.json({ error: "Заполните обязательные поля" }, { status: 400 });
    }

    const newOrder = {
      ...body,
      id: `order-${Date.now()}`,
      status: "new",
      createdAt: new Date().toISOString(),
    };

    // Сохраняем заказ
    const orders = readOrders();
    orders.unshift(newOrder);
    writeOrders(orders);

    // Ждём VK (await — не fire-and-forget, Vercel не закроет функцию раньше времени)
    const vkStatus = await sendVkNotification(newOrder);
    console.log(`Order ${newOrder.id} | VK: ${vkStatus}`);

    return NextResponse.json({ ...newOrder, vkStatus }, { status: 201 });
  } catch (e) {
    console.error("POST /api/orders error:", e);
    return NextResponse.json({ error: "Не удалось сохранить заказ" }, { status: 500 });
  }
}
