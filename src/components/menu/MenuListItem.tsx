"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { MenuItem } from "@/lib/data/menu";
import { useCartStore } from "@/lib/store/cart";

interface Props {
  item: MenuItem;
}

export function MenuListItem({ item }: Props) {
  const hasVariants = item.variants && item.variants.length > 1;
  const [selectedVariant, setSelectedVariant] = useState(0);

  const currentPrice = hasVariants
    ? item.variants![selectedVariant].price
    : item.price;

  const cartId = hasVariants
    ? `${item.id}__${item.variants![selectedVariant].label}`
    : item.id;

  const addItem = useCartStore((s) => s.addItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const qty = useCartStore(
    (s) => s.items.find((i) => i.id === cartId)?.quantity ?? 0
  );

  function handleAdd() {
    addItem({
      id: cartId,
      name: hasVariants
        ? `${item.name} (${item.variants![selectedVariant].label})`
        : item.name,
      price: currentPrice,
      image: item.image,
    });
  }

  return (
    <div className="flex items-center justify-between gap-3 py-3 border-b border-gray-100 last:border-0">
      {/* Название, состав, вес */}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm leading-tight">{item.name}</p>
        {item.description && (
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
            {item.description}
          </p>
        )}
        {item.weight && (
          <p className="text-xs text-muted-foreground">{item.weight}</p>
        )}
        {hasVariants && (
          <div className="flex gap-1.5 mt-1.5 flex-wrap">
            {item.variants!.map((v, i) => (
              <button
                key={v.label}
                type="button"
                onClick={() => setSelectedVariant(i)}
                className={`text-xs px-2 py-0.5 rounded-full border transition-colors ${
                  selectedVariant === i
                    ? "bg-[#BE1E5A] text-white border-[#BE1E5A]"
                    : "border-gray-200 text-gray-500"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Цена + кнопка */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="font-bold text-sm whitespace-nowrap">
          {currentPrice} ₽
        </span>
        {qty === 0 ? (
          <button
            type="button"
            onClick={handleAdd}
            className="w-8 h-8 rounded-full bg-[#BE1E5A] text-white flex items-center justify-center active:scale-95 transition-transform flex-shrink-0"
          >
            <Plus className="h-4 w-4" />
          </button>
        ) : (
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => updateQuantity(cartId, qty - 1)}
              className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center active:scale-95 transition-transform"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="text-sm font-bold w-4 text-center">{qty}</span>
            <button
              type="button"
              onClick={handleAdd}
              className="w-7 h-7 rounded-full bg-[#BE1E5A] text-white flex items-center justify-center active:scale-95 transition-transform"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
