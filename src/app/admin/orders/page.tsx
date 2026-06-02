"use client";

import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/utils";
import { RefreshCw } from "lucide-react";

type OrderStatus = "new" | "accepted" | "delivering" | "delivered";

interface OrderItem { name: string; price: number; quantity: number; }
interface Order {
  id: string;
  name: string;
  phone: string;
  address: string;
  addressDetails?: string;
  comment?: string;
  persons?: number;
  paymentMethod?: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
}

const STATUSES: OrderStatus[] = ["new", "accepted", "delivering", "delivered"];

const STATUS_LABELS: Record<OrderStatus, string> = {
  new: "Новый",
  accepted: "Принят",
  delivering: "В пути",
  delivered: "Доставлен",
};

const STATUS_COLORS: Record<OrderStatus, string> = {
  new:       "bg-orange-100 text-orange-700 border-orange-200",
  accepted:  "bg-blue-100   text-blue-700   border-blue-200",
  delivering:"bg-purple-100 text-purple-700 border-purple-200",
  delivered: "bg-green-100  text-green-700  border-green-200",
};

const PAYMENT_LABELS: Record<string, string> = {
  cash: "Наличными", card: "Картой", transfer: "Переводом",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("ru-RU", {
    day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit",
  });
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [vkOk, setVkOk] = useState<boolean | null>(null);
  const [changing, setChanging] = useState<string | null>(null); // order id being updated

  const load = () => {
    setLoading(true);
    fetch("/api/orders")
      .then((r) => r.ok ? r.json() : [])
      .then((data) => { setOrders(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));

    fetch("/api/admin/status")
      .then((r) => r.ok ? r.json() : null)
      .then((d) => setVkOk(d?.vk?.configured ?? false))
      .catch(() => {});
  };

  useEffect(() => { load(); }, []);

  const setStatus = async (order: Order, status: OrderStatus) => {
    if (order.status === status) return;
    setChanging(order.id);
    // Оптимистичное обновление
    setOrders((prev) => prev.map((o) => o.id === order.id ? { ...o, status } : o));
    try {
      const res = await fetch(`/api/orders/${order.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
        credentials: "same-origin",
      });
      const updated = await res.json();
      if (updated.id) {
        setOrders((prev) => prev.map((o) => o.id === updated.id ? updated : o));
      }
    } catch {
      // откат при ошибке
      setOrders((prev) => prev.map((o) => o.id === order.id ? order : o));
    }
    setChanging(null);
  };

  const newCount = orders.filter((o) => o.status === "new").length;

  return (
    <div className="p-4 md:p-8">

      {/* Заголовок */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold">Заказы</h1>
          {newCount > 0 && (
            <span className="bg-malina-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
              {newCount} новых
            </span>
          )}
          <span className="text-sm text-muted-foreground">{orders.length} всего</span>
        </div>
        <button
          onClick={load}
          disabled={loading}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-40"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          <span className="hidden sm:inline">Обновить</span>
        </button>
      </div>

      {/* VK статус */}
      {vkOk !== null && (
        <div className={`rounded-xl px-4 py-2.5 mb-4 text-sm flex items-center gap-2 ${
          vkOk ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"
        }`}>
          {vkOk
            ? "✅ VK уведомления работают"
            : "⚠️ VK не настроен — добавьте VK_BOT_TOKEN и VK_CHAT_PEER_ID на Vercel"}
        </div>
      )}

      {/* Загрузка */}
      {loading && (
        <div className="text-center py-12 text-muted-foreground text-sm">Загрузка...</div>
      )}

      {!loading && orders.length === 0 && (
        <div className="text-center py-12 text-muted-foreground text-sm">
          Заказов пока нет
        </div>
      )}

      {/* Карточки заказов */}
      <div className="space-y-3">
        {orders.map((order) => (
          <div
            key={order.id}
            className={`bg-card border rounded-2xl p-4 transition-all ${
              order.status === "new" ? "border-orange-300 shadow-sm" : "border-border"
            } ${changing === order.id ? "opacity-60" : ""}`}
          >
            {/* Шапка: имя + время + сумма */}
            <div className="flex items-start justify-between gap-2 mb-3">
              <div>
                <p className="font-bold text-base leading-tight">{order.name}</p>
                <a href={`tel:${order.phone}`} className="text-sm text-malina-500 font-medium">
                  {order.phone}
                </a>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs text-muted-foreground">{formatDate(order.createdAt)}</p>
                <p className="font-extrabold text-lg leading-tight">{formatPrice(order.total)}</p>
                {order.paymentMethod && (
                  <p className="text-xs text-muted-foreground">
                    {PAYMENT_LABELS[order.paymentMethod] ?? order.paymentMethod}
                  </p>
                )}
              </div>
            </div>

            {/* Адрес */}
            <p className="text-sm text-muted-foreground mb-2">
              📍 {order.address}{order.addressDetails ? `, ${order.addressDetails}` : ""}
            </p>

            {/* Состав */}
            <div className="bg-secondary/50 rounded-xl px-3 py-2 mb-3 space-y-0.5">
              {order.items.map((item, i) => (
                <p key={i} className="text-sm">
                  {item.name}
                  {item.quantity > 1 && <span className="text-muted-foreground"> ×{item.quantity}</span>}
                  <span className="text-muted-foreground float-right">{formatPrice(item.price * item.quantity)}</span>
                </p>
              ))}
            </div>

            {/* Доп. инфо */}
            {(order.persons && order.persons > 1 || order.comment) ? (
              <div className="text-xs text-muted-foreground mb-3 space-y-0.5">
                {order.persons && order.persons > 1 && <p>👥 Персон: {order.persons}</p>}
                {order.comment && <p>💬 {order.comment}</p>}
              </div>
            ) : null}

            {/* Статус — 4 кнопки, можно выбрать любой */}
            <div className="flex gap-1.5 flex-wrap">
              {STATUSES.map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(order, s)}
                  disabled={changing === order.id}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all ${
                    order.status === s
                      ? STATUS_COLORS[s] + " ring-2 ring-offset-1 ring-current/30"
                      : "bg-secondary text-muted-foreground border-border hover:bg-warm-200"
                  }`}
                >
                  {STATUS_LABELS[s]}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
