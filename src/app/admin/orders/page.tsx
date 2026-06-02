"use client";

import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/utils";

type OrderStatus = "new" | "accepted" | "delivering" | "delivered";

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  name: string;
  phone: string;
  address: string;
  addressDetails?: string;
  comment?: string;
  persons?: number;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
}

const STATUS_LABELS: Record<OrderStatus, string> = {
  new: "Новый",
  accepted: "Принят",
  delivering: "В пути",
  delivered: "Доставлен",
};

const STATUS_COLORS: Record<OrderStatus, string> = {
  new: "bg-orange-100 text-orange-700",
  accepted: "bg-blue-100 text-blue-700",
  delivering: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
};

const STATUS_NEXT: Record<OrderStatus, OrderStatus | null> = {
  new: "accepted",
  accepted: "delivering",
  delivering: "delivered",
  delivered: null,
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

interface StatusData {
  env: Record<string, string>;
  vk: { configured: boolean; apiCheck: string };
  orders: { count: number };
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<StatusData | null>(null);

  useEffect(() => {
    fetch("/api/orders")
      .then((r) => {
        if (!r.ok) throw new Error(`${r.status}`);
        return r.json();
      })
      .then((data) => {
        setOrders(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    fetch("/api/admin/status")
      .then((r) => r.ok ? r.json() : null)
      .then((data) => setStatus(data))
      .catch(() => {});
  }, []);

  const advance = async (order: Order) => {
    const nextStatus = STATUS_NEXT[order.status];
    if (!nextStatus) return;

    const res = await fetch(`/api/orders/${order.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: nextStatus }),
    });
    const updated = await res.json();
    setOrders((prev) => prev.map((o) => (o.id === updated.id ? updated : o)));
  };

  const newCount = orders.filter((o) => o.status === "new").length;

  return (
    <div className="p-6 md:p-8">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-xl font-bold">Заказы</h1>
          {newCount > 0 && (
            <span className="bg-malina-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
              {newCount} новых
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground">{orders.length} всего</p>
      </div>

      {/* Диагностика конфигурации */}
      {status && (
        <div className={`rounded-2xl border p-4 mb-6 text-sm space-y-1 ${
          status.vk.configured ? "bg-green-50 border-green-200" : "bg-amber-50 border-amber-200"
        }`}>
          <p className="font-semibold mb-2">
            {status.vk.configured ? "✅ VK уведомления настроены" : "⚠️ VK уведомления не настроены"}
          </p>
          {Object.entries(status.env).map(([k, v]) => (
            <p key={k} className="text-xs font-mono">{k}: {v}</p>
          ))}
          {status.vk.configured && (
            <p className="text-xs mt-1">Проверка токена: {status.vk.apiCheck}</p>
          )}
          {!status.vk.configured && (
            <p className="text-xs text-amber-700 mt-2">
              Добавьте VK_BOT_TOKEN и VK_CHAT_PEER_ID в Vercel → Settings → Environment Variables
            </p>
          )}
        </div>
      )}

      {loading && (
        <div className="text-center py-12 text-muted-foreground text-sm">
          Загрузка...
        </div>
      )}

      {!loading && orders.length === 0 && (
        <div className="text-center py-12 text-muted-foreground text-sm">
          Заказов пока нет
        </div>
      )}

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-card border border-border rounded-2xl p-5 hover:border-malina-500/20 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="flex-1 space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-bold">{order.name}</p>
                    <a
                      href={`tel:${order.phone}`}
                      className="text-sm text-malina-500 hover:underline"
                    >
                      {order.phone}
                    </a>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-muted-foreground">
                      {formatDate(order.createdAt)}
                    </p>
                    <p className="font-extrabold text-lg">
                      {formatPrice(order.total)}
                    </p>
                  </div>
                </div>

                {/* Address */}
                <p className="text-sm text-muted-foreground">
                  📍 {order.address}
                  {order.addressDetails && `, ${order.addressDetails}`}
                </p>

                {/* Items */}
                <div className="text-sm text-muted-foreground space-y-0.5">
                  {order.items.map((item, i) => (
                    <p key={i}>
                      {item.name}
                      {item.quantity > 1 && (
                        <span className="font-semibold"> × {item.quantity}</span>
                      )}
                    </p>
                  ))}
                </div>

                {/* Extras */}
                {(order.persons || order.comment) && (
                  <div className="text-xs text-muted-foreground space-y-0.5">
                    {order.persons && <p>👥 Персон: {order.persons}</p>}
                    {order.comment && <p>💬 {order.comment}</p>}
                  </div>
                )}
              </div>

              {/* Status & action */}
              <div className="flex sm:flex-col items-center sm:items-end gap-3 shrink-0">
                <span
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                    STATUS_COLORS[order.status]
                  }`}
                >
                  {STATUS_LABELS[order.status]}
                </span>
                {STATUS_NEXT[order.status] && (
                  <button
                    onClick={() => advance(order)}
                    className="text-xs font-semibold text-malina-500 hover:text-malina-600 border border-malina-500/30 hover:border-malina-500 px-3 py-1.5 rounded-xl transition-colors whitespace-nowrap"
                  >
                    → {STATUS_LABELS[STATUS_NEXT[order.status]!]}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
