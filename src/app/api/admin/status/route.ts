import { NextRequest, NextResponse } from "next/server";
import { readOrders } from "@/lib/data/db";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const vkToken = process.env.VK_BOT_TOKEN;
  const vkPeerId = process.env.VK_CHAT_PEER_ID;
  const adminPwd = process.env.ADMIN_PASSWORD;

  // Проверяем VK API
  let vkApiOk = false;
  let vkError = "";
  if (vkToken && vkPeerId) {
    try {
      const res = await fetch(
        `https://api.vk.com/method/groups.getById?access_token=${vkToken}&v=5.199`
      );
      const data = await res.json();
      vkApiOk = !data.error;
      if (data.error) vkError = data.error.error_msg;
    } catch (e) {
      vkError = String(e);
    }
  }

  const orders = readOrders();

  return NextResponse.json({
    env: {
      ADMIN_PASSWORD: adminPwd ? "✅ задан" : "❌ не задан",
      VK_BOT_TOKEN: vkToken ? "✅ задан" : "❌ не задан",
      VK_CHAT_PEER_ID: vkPeerId ? `✅ ${vkPeerId}` : "❌ не задан",
      VERCEL: process.env.VERCEL ? `✅ Vercel` : "локально",
    },
    vk: {
      configured: !!(vkToken && vkPeerId),
      apiCheck: vkToken ? (vkApiOk ? "✅ токен валиден" : `❌ ${vkError}`) : "не проверялось",
    },
    orders: {
      count: orders.length,
      latest: orders.slice(0, 3).map((o: Record<string, unknown>) => ({
        id: o.id,
        name: o.name,
        createdAt: o.createdAt,
        status: o.status,
      })),
    },
  });
}
