"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { MenuItem } from "@/lib/data/menu";
import { useCartStore } from "@/lib/store/cart";

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
    addItem({
      id: cartId,
      name: hasVariants
        ? `${item.name} (${item.variants![selectedVariant].label})`
        : item.name,
      price: currentPrice,
      image: item.image,
    });
  };

  return (
    <div className="flex flex-col rounded-2xl overflow-hidden bg-card border border-border hover:shadow-md hover:border-malina-500/20 transition-all duration-200 h-full">
      {/* Фото */}
      <button
        type="button"
        onClick={() => onOpenModal?.(item)}
        className="relative aspect-[4/3] w-full overflow-hidden bg-warm-200 focus:outline-none shrink-0"
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover object-center hover:scale-105 transition-transform duration-300"
        />
        {/* Бейдж веса */}
        {item.weight && (
          <span className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-0.5 rounded-md">
            {item.weight}
          </span>
        )}
        {/* Бейдж цены */}
        <span className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-xs font-bold px-2 py-1 rounded-lg shadow-sm">
          {currentPrice} ₽
        </span>
      </button>

      {/* Контент */}
      <div className="flex flex-col flex-1 p-3 gap-2">
        <button
          type="button"
          onClick={() => onOpenModal?.(item)}
          className="text-left focus:outline-none"
        >
          <p className="font-semibold text-sm leading-tight line-clamp-2 hover:text-malina-500 transition-colors">
            {item.name}
          </p>
        </button>

        {item.description && (
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        )}

        {/* Варианты размеров */}
        {hasVariants && (
          <div className="flex gap-1 flex-wrap">
            {item.variants!.map((v, i) => (
              <button
                key={v.label}
                type="button"
                onClick={() => setSelectedVariant(i)}
                className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                  selectedVariant === i
                    ? "bg-[#BE1E5A] text-white border-[#BE1E5A]"
                    : "border-border text-muted-foreground hover:border-[#BE1E5A]/40"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        )}

        {/* Цена + кнопка */}
        <div className="flex items-center justify-between gap-2 mt-auto">
          <span className="font-bold text-sm whitespace-nowrap">
            {currentPrice} ₽
          </span>

          {quantity === 0 ? (
            <button
              type="button"
              onClick={handleAdd}
              className="flex items-center gap-1 bg-[#BE1E5A] text-white text-xs font-semibold px-3 py-2 rounded-xl whitespace-nowrap flex-shrink-0 active:scale-95 transition-transform"
            >
              <Plus className="w-3.5 h-3.5" />
              В корзину
            </button>
          ) : (
            <div className="flex items-center gap-0.5 bg-secondary rounded-xl p-1 flex-shrink-0">
              <button
                type="button"
                onClick={() => updateQuantity(cartId, quantity - 1)}
                className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-card transition-colors"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-6 text-center text-sm font-bold">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => updateQuantity(cartId, quantity + 1)}
                className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-card transition-colors"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
