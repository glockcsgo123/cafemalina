"use client";

import { useState } from "react";
import { Star } from "lucide-react"; // used in section header
import { menuItems, MenuItem } from "@/lib/data/menu";
import { PopularCard } from "@/components/menu/popular-card";
import { MenuItemModal } from "@/components/menu/MenuItemModal";
import { Reveal } from "@/components/ui/reveal";

export function RecommendedSection() {
  const [modalItem, setModalItem] = useState<MenuItem | null>(null);
  const recommendedItems = menuItems.filter((item) => item.recommended);

  if (recommendedItems.length === 0) return null;

  return (
    <>
      <section className="py-12 md:py-14 bg-gradient-to-b from-background to-warm-50">
        <div className="max-w-6xl mx-auto px-4">
          <Reveal>
            <div className="flex items-end justify-between mb-10">
              <div>
                <div className="inline-flex items-center gap-2 bg-malina-500/10 text-malina-600 text-xs font-bold px-3 py-1.5 rounded-full mb-3">
                  <Star className="w-3.5 h-3.5 fill-malina-500" />
                  Рекомендуем
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold font-[family-name:var(--font-heading)] tracking-tight">
                  Рекомендуем попробовать
                </h2>
                <p className="text-muted-foreground text-sm mt-1.5">
                  Выбор наших поваров
                </p>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {recommendedItems.map((item, i) => (
              <Reveal key={item.id} delay={i * 100}>
                <div className="relative">
                  <div className="absolute top-3 left-3 z-10 bg-[#BE1E5A]/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                    Рекомендуем
                  </div>
                  <PopularCard
                    item={item}
                    onOpenModal={() => setModalItem(item)}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <MenuItemModal item={modalItem} onClose={() => setModalItem(null)} />
    </>
  );
}
