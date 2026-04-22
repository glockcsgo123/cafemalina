"use client";

import { Plus, Check } from "lucide-react";
import { useState } from "react";
import { MenuItem } from "@/lib/data/menu";
import { useCartStore } from "@/lib/store/cart";
import { formatPrice } from "@/lib/utils";

interface MenuCardCompactProps {
  item: MenuItem;
}

export function MenuCardCompact({ item }: MenuCardCompactProps) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
      {/* Image placeholder */}
      <div className="aspect-[4/3] bg-warm-200 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/40">
          <span className="text-4xl">🍽</span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-sm leading-tight">{item.name}</h3>
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {item.weight}
          </span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2">
          {item.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-base font-bold">{formatPrice(item.price)}</span>
          <button
            onClick={handleAdd}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg transition-all ${
              added
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-malina-500 text-white hover:bg-malina-600"
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" />
                Добавлено
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                В корзину
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
