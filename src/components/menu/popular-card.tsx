"use client";

import { Plus, Check } from "lucide-react";
import { useState } from "react";
import { MenuItem } from "@/lib/data/menu";
import { useCartStore } from "@/lib/store/cart";
import { formatPrice } from "@/lib/utils";

interface PopularCardProps {
  item: MenuItem;
  featured?: boolean;
}

export function PopularCard({ item, featured = false }: PopularCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  const hasVariants = item.variants && item.variants.length > 1;
  const [selectedVariant, setSelectedVariant] = useState(0);

  const currentPrice = hasVariants
    ? item.variants![selectedVariant].price
    : item.price;

  const cartId = hasVariants
    ? `${item.id}__${item.variants![selectedVariant].label}`
    : item.id;

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
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div
      className={`group relative bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 ${
        featured ? "sm:col-span-2 sm:row-span-2" : ""
      }`}
    >
      {/* Image area */}
      <div
        className={`relative overflow-hidden bg-gradient-to-br from-warm-200 to-warm-300 ${
          featured ? "aspect-[4/3] sm:aspect-square" : "aspect-[4/3]"
        }`}
      >
        {/* Placeholder visual */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
            <span className="text-3xl">
              {item.name.includes("Пицца") || item.name.includes("Пепперони")
                ? "🍕"
                : item.name.includes("Филадельфия") || item.name.includes("ролл")
                ? "🍣"
                : item.name.includes("Сет") || item.name.includes("сет")
                ? "🍱"
                : "🍔"}
            </span>
          </div>
        </div>

        {/* Price badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2.5 py-1 shadow-sm">
          <span className="text-sm font-bold text-foreground">
            {hasVariants ? `от ${formatPrice(item.price)}` : formatPrice(item.price)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className={`p-4 ${featured ? "md:p-5" : ""}`}>
        <h3
          className={`font-bold leading-tight mb-1 ${
            featured ? "text-base md:text-lg" : "text-sm"
          }`}
        >
          {item.name}
        </h3>
        {item.description && (
          <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2">
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
                className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  selectedVariant === i
                    ? "bg-malina-500 text-white"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between gap-2">
          {item.weight && (
            <span className="text-xs text-muted-foreground">{item.weight}</span>
          )}
          {hasVariants && (
            <span className="text-xs font-semibold text-foreground">
              {formatPrice(currentPrice)}
            </span>
          )}
          <button
            type="button"
            onClick={handleAdd}
            className={`flex items-center gap-1.5 font-semibold px-3.5 py-2 rounded-xl transition-all text-xs ml-auto ${
              added
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-malina-500 text-white hover:bg-malina-600 active:scale-95 shadow-sm"
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Готово</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>В корзину</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
