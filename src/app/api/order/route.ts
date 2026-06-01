import { formatPrice } from "@/lib/utils";

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface OrderBody {
  name: string;
  phone: string;
  address: string;
  addressDetails?: string;
  comment?: string;
  items: OrderItem[];
  total: number;
}

async function sendVkMessage(message: string) {
  const token = process.env.VK_BOT_TOKEN;
  const peerId = process.env.VK_CHAT_PEER_ID;

  if (!token || !peerId) {
    throw new Error("VK_BOT_TOKEN or VK_CHAT_PEER_ID not configured");
  }

  const params = new URLSearchParams({
    peer_id: peerId,
    random_id: String(Math.floor(Math.random() * 1e9)),
    message,
    access_token: token,
    v: "5.199",
  });

  const res = await fetch("https://api.vk.com/method/messages.send", {
    method: "POST",
    body: params,
  });

  const data = await res.json();

  if (data.error) {
    throw new Error(`VK API error: ${data.error.error_msg}`);
  }

  return data;
}

function buildOrderMessage(order: OrderBody): string {
  const itemLines = order.items
    .map(
      (item) =>
        `  ${item.name} x${item.quantity} — ${formatPrice(item.price * item.quantity)}`
    )
    .join("\n");

  const lines = [
    `🔔 НОВЫЙ ЗАКАЗ`,
    ``,
    `👤 ${order.name}`,
    `📞 ${order.phone}`,
    `📍 ${order.address}`,
  ];

  if (order.addressDetails) {
    lines.push(`🏠 ${order.addressDetails}`);
  }

  lines.push(``, `🛒 Состав заказа:`, itemLines, ``);
  lines.push(`💰 Итого: ${formatPrice(order.total)}`);

  if (order.comment) {
    lines.push(``, `💬 Комментарий: ${order.comment}`);
  }

  return lines.join("\n");
}

export async function POST(request: Request) {
  try {
    const body: OrderBody = await request.json();

    if (!body.name || !body.phone || !body.address || !body.items?.length) {
      return Response.json(
        { error: "Заполните обязательные поля" },
        { status: 400 }
      );
    }

    const message = buildOrderMessage(body);
    await sendVkMessage(message);

    return Response.json({ success: true });
  } catch (error) {
    console.error("Order error:", error);
    return Response.json(
      { error: "Не удалось отправить заказ" },
      { status: 500 }
    );
  }
}
