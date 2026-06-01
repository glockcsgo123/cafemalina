"use client";

import { Plus, Minus, Trash2 } from "lucide-react";
import { CartItem, useCartStore } from "@/lib/store/cart";
import { formatPrice } from "@/lib/utils";

interface CartItemRowProps {
  item: CartItem;
}

export function CartItemRow({ item }: CartItemRowProps) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex items-center gap-3 md:gap-4 bg-card border border-border rounded-2xl p-3 md:p-4">
      {/* Image placeholder */}
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gradient-to-br from-warm-100 to-warm-200 flex items-center justify-center shrink-0">
        <span className="text-2xl md:text-3xl opacity-60">
          {getEmoji(item.name)}
        </span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm md:text-base leading-tight truncate">
          {item.name}
        </h3>
        <p className="text-sm font-bold mt-1">
          {formatPrice(item.price * item.quantity)}
        </p>
      </div>

      {/* Quantity controls */}
      <div className="flex items-center gap-0.5 bg-secondary rounded-xl p-1 shrink-0">
        <button
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-card transition-colors"
          aria-label="Уменьшить"
        >
          {item.quantity === 1 ? (
            <Trash2 className="w-3.5 h-3.5 text-muted-foreground" />
          ) : (
            <Minus className="w-3.5 h-3.5" />
          )}
        </button>
        <span className="w-7 text-center text-sm font-bold tabular-nums">
          {item.quantity}
        </span>
        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-card transition-colors"
          aria-label="Увеличить"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

function getEmoji(name: string): string {
  if (name.toLowerCase().includes("пицц") || name.toLowerCase().includes("пеппер") || name.toLowerCase().includes("маргар")) return "\u{1F355}";
  if (name.toLowerCase().includes("филадельф") || name.toLowerCase().includes("ролл") || name.toLowerCase().includes("калиф") || name.toLowerCase().includes("драк") || name.toLowerCase().includes("темпур")) return "\u{1F363}";
  if (name.toLowerCase().includes("сет")) return "\u{1F371}";
  if (name.toLowerCase().includes("бургер") || name.toLowerCase().includes("наггетс") || name.toLowerCase().includes("шаурм")) return "\u{1F354}";
  if (name.toLowerCase().includes("картофель") || name.toLowerCase().includes("фри")) return "\u{1F35F}";
  if (name.toLowerCase().includes("крыл") || name.toLowerCase().includes("луков")) return "\u{1F357}";
  if (name.toLowerCase().includes("чизкейк") || name.toLowerCase().includes("тирамису") || name.toLowerCase().includes("фондан")) return "\u{1F370}";
  if (name.toLowerCase().includes("кола") || name.toLowerCase().includes("морс") || name.toLowerCase().includes("лимонад")) return "\u{1F964}";
  return "\u{1F37D}";
}
