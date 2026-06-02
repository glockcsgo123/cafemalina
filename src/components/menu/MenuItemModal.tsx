"use client";

import { useEffect, useState } from "react";
import { X, Plus, Minus } from "lucide-react";
import { MenuItem } from "@/lib/data/menu";
import { useCartStore } from "@/lib/store/cart";
import { formatPrice } from "@/lib/utils";

interface MenuItemModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

export function MenuItemModal({ item, onClose }: MenuItemModalProps) {
  const addItem = useCartStore((s) => s.addItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const hasVariants = item?.variants && item.variants.length > 1;
  const currentPrice = hasVariants
    ? item!.variants![selectedVariant].price
    : item?.price ?? 0;

  const cartId = item
    ? hasVariants
      ? `${item.id}__${item.variants![selectedVariant].label}`
      : item.id
    : "";

  const quantity = useCartStore(
    (s) => s.items.find((i) => i.id === cartId)?.quantity || 0
  );

  useEffect(() => {
    if (!item) return;
    setSelectedVariant(0);
    setLightbox(false);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [item]);

  useEffect(() => {
    if (!item) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightbox) setLightbox(false);
        else onClose();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [item, lightbox, onClose]);

  if (!item) return null;

  const handleAdd = () => {
    const cartName = hasVariants
      ? `${item.name} (${item.variants![selectedVariant].label})`
      : item.name;
    addItem({ id: cartId, name: cartName, price: currentPrice, image: item.image });
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 pointer-events-none">
        <div
          className="relative bg-card w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors"
            aria-label="Закрыть"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Photo — click for lightbox */}
          <button
            type="button"
            onClick={() => setLightbox(true)}
            className="relative aspect-[4/3] w-full overflow-hidden bg-warm-200 shrink-0 cursor-zoom-in focus:outline-none"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </button>

          {/* Content */}
          <div className="p-5 overflow-y-auto">
            <h2 className="text-xl font-extrabold font-[family-name:var(--font-heading)] mb-2">
              {item.name}
            </h2>

            {item.description && (
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                {item.description}
              </p>
            )}

            {item.weight && (
              <p className="text-sm text-muted-foreground mb-4">
                <span className="font-medium text-foreground">Вес:</span>{" "}
                {item.weight}
              </p>
            )}

            {hasVariants && (
              <div className="flex gap-2 mb-4">
                {item.variants!.map((v, i) => (
                  <button
                    key={v.label}
                    type="button"
                    onClick={() => setSelectedVariant(i)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                      selectedVariant === i
                        ? "bg-malina-500 text-white"
                        : "bg-secondary text-muted-foreground hover:bg-warm-200"
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between gap-3 mt-3">
              <span className="text-2xl font-extrabold tracking-tight">
                {formatPrice(currentPrice)}
              </span>

              {quantity === 0 ? (
                <button
                  type="button"
                  onClick={handleAdd}
                  className="flex items-center gap-2 bg-malina-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-malina-600 active:scale-95 transition-all shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  В корзину
                </button>
              ) : (
                <div className="flex items-center gap-0.5 bg-secondary rounded-xl p-1">
                  <button
                    type="button"
                    onClick={() => updateQuantity(cartId, quantity - 1)}
                    className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-card transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-9 text-center font-bold">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(cartId, quantity + 1)}
                    className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-card transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <>
          <div
            className="fixed inset-0 z-[60] bg-black/95"
            onClick={() => setLightbox(false)}
          />
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            onClick={() => setLightbox(false)}
          >
            <img
              src={item.image}
              alt={item.name}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setLightbox(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/15 flex items-center justify-center text-white hover:bg-white/25 transition-colors"
              aria-label="Закрыть"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </>
      )}
    </>
  );
}
