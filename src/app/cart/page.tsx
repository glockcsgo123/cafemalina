"use client";

import Link from "next/link";
import { ShoppingBag, ArrowRight, ArrowLeft } from "lucide-react";
import { useCartStore, selectTotalItems, selectTotalPrice } from "@/lib/store/cart";
import { siteConfig } from "@/lib/data/site";
import { formatPrice } from "@/lib/utils";
import { CartItemRow } from "@/components/cart/cart-item-row";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const total = useCartStore(selectTotalPrice);
  const count = useCartStore(selectTotalItems);

  const minOrder = siteConfig.delivery.minOrder;
  const freeFrom = siteConfig.delivery.freeDeliveryFrom;

  if (count === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold font-[family-name:var(--font-heading)] tracking-tight">
            Корзина
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {count} {pluralize(count, "позиция", "позиции", "позиций")}
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-muted-foreground hover:text-destructive transition-colors"
        >
          Очистить
        </button>
      </div>

      {/* Items */}
      <div className="space-y-1">
        {items.map((item) => (
          <CartItemRow key={item.id} item={item} />
        ))}
      </div>

      {/* Summary */}
      <div className="mt-8 bg-card border border-border rounded-2xl p-5 md:p-6">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm text-muted-foreground">Сумма заказа</span>
          <span className="text-sm text-muted-foreground">{count} {pluralize(count, "товар", "товара", "товаров")}</span>
        </div>
        <div className="flex items-center justify-between mb-5">
          <span className="text-2xl font-extrabold tracking-tight">{formatPrice(total)}</span>
        </div>

        {total < minOrder && (
          <p className="text-xs text-orange-600 bg-orange-50 border border-orange-100 rounded-xl px-3 py-2 mb-4">
            Минимальная сумма заказа — {formatPrice(minOrder)}. Добавьте ещё {formatPrice(minOrder - total)}.
          </p>
        )}

        <Link
          href={total >= minOrder ? "/checkout" : "#"}
          className={`flex items-center justify-center gap-2 w-full font-bold text-base py-4 rounded-2xl transition-all ${
            total >= minOrder
              ? "bg-malina-500 text-white hover:bg-malina-600 shadow-lg shadow-malina-500/20 active:scale-[0.98]"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
          aria-disabled={total < minOrder}
          onClick={(e) => { if (total < minOrder) e.preventDefault(); }}
        >
          Оформить заказ
          <ArrowRight className="w-5 h-5" />
        </Link>

        {total >= freeFrom && (
          <p className="text-xs text-center text-green-700 mt-3">
            Бесплатная доставка
          </p>
        )}
      </div>

      {/* Continue shopping */}
      <div className="mt-6 text-center">
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Продолжить выбор
        </Link>
      </div>
    </div>
  );
}

function EmptyCart() {
  return (
    <div className="max-w-md mx-auto px-4 py-20 md:py-28 text-center">
      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-warm-100 flex items-center justify-center">
        <ShoppingBag className="w-9 h-9 text-muted-foreground/40" />
      </div>
      <h1 className="text-xl md:text-2xl font-bold font-[family-name:var(--font-heading)] mb-2">
        Корзина пуста
      </h1>
      <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
        Загляните в меню — у нас пицца, роллы, сеты и много вкусного
      </p>
      <Link
        href="/menu"
        className="inline-flex items-center gap-2 bg-malina-500 text-white font-semibold px-7 py-3.5 rounded-2xl hover:bg-malina-600 transition-colors shadow-lg shadow-malina-500/20"
      >
        Перейти в меню
        <ArrowRight className="w-5 h-5" />
      </Link>
    </div>
  );
}

function pluralize(n: number, one: string, few: string, many: string): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 19) return many;
  if (mod10 === 1) return one;
  if (mod10 >= 2 && mod10 <= 4) return few;
  return many;
}
