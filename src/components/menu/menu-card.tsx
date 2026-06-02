"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { MenuItem } from "@/lib/data/menu";
import { useCartStore } from "@/lib/store/cart";
import { formatPrice } from "@/lib/utils";

interface MenuCardProps {
  item: MenuItem;
  onOpenModal?: (item: MenuItem) => void;
}

export function MenuCard({ item, onOpenModal }: MenuCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);

  const hasVariants = item.variants && item.variants.length > 1;
  const [selectedVariant, setSelectedVariant] = useState(0);

  const currentPrice = hasVariants
    ? item.variants![selectedVariant].price
    : item.price;

  const cartId = hasVariants
    ? `${item.id}__${item.variants![selectedVariant].label}`
    : item.id;

  const quantity = useCartStore(
    (s) => s.items.find((i) => i.id === cartId)?.quantity || 0
  );

  const handleAdd = () => {
    const cartName = hasVariants
      ? `${item.name} (${item.variants![selectedVariant].label})`
      : item.name;

    addItem({
      id: cartId,
      name: cartName,
      price: currentPrice,
      image: item.image,
    });
  };

  return (
    <div className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-md hover:border-malina-500/20 transition-all duration-200">
      {/* Image — click opens modal */}
      <button
        type="button"
        onClick={() => onOpenModal?.(item)}
        className="relative aspect-[4/3] overflow-hidden bg-warm-200 w-full text-left focus:outline-none"
      >
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
        {/* Weight badge */}
        {item.weight && (
          <div className="absolute bottom-2.5 left-2.5 bg-black/60 backdrop-blur-sm text-white text-[11px] font-medium px-2 py-1 rounded-md">
            {item.weight}
          </div>
        )}
      </button>

      {/* Content */}
      <div className="p-4 flex flex-col">
        <button
          type="button"
          onClick={() => onOpenModal?.(item)}
          className="text-left focus:outline-none"
        >
          <h3 className="font-bold text-[15px] leading-tight mb-1.5 hover:text-malina-500 transition-colors">
            {item.name}
          </h3>
        </button>
        {item.description && (
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-3 flex-1">
            {item.description}
          </p>
        )}

        {/* Variant selector */}
        {hasVariants && (
          <div className="flex gap-1 mb-3">
            {item.variants!.map((v, i) => (
              <button
                key={v.label}
                type="button"
                onClick={() => setSelectedVariant(i)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  selectedVariant === i
                    ? "bg-malina-500 text-white"
                    : "bg-secondary text-muted-foreground hover:bg-warm-200 cursor-pointer"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        )}

        {/* Price + Action */}
        <div className="flex items-center justify-between gap-2 mt-auto min-w-0">
          <span className="text-lg font-extrabold tracking-tight whitespace-nowrap">
            {formatPrice(currentPrice)}
          </span>

          {quantity === 0 ? (
            <button
              type="button"
              onClick={handleAdd}
              className="flex items-center gap-1.5 bg-malina-500 text-white font-semibold text-xs px-4 py-2.5 rounded-xl hover:bg-malina-600 active:scale-95 transition-all shadow-sm whitespace-nowrap flex-shrink-0"
            >
              <Plus className="w-4 h-4" />
              В корзину
            </button>
          ) : (
            <div className="flex items-center gap-0.5 bg-secondary rounded-xl p-1">
              <button
                type="button"
                onClick={() => updateQuantity(cartId, quantity - 1)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-card transition-colors"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center text-sm font-bold">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => updateQuantity(cartId, quantity + 1)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-card transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
