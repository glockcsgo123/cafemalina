"use client";

import { useState } from "react";
import { menuItems, categories } from "@/lib/data/menu";
import { CategoryTabs } from "@/components/menu/category-tabs";
import { MenuCard } from "@/components/menu/menu-card";
import { ShoppingBag } from "lucide-react";
import { useCartStore, selectTotalItems, selectTotalPrice } from "@/lib/store/cart";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const totalItems = useCartStore(selectTotalItems);
  const totalPrice = useCartStore(selectTotalPrice);

  const filteredItems =
    activeCategory === "all"
      ? menuItems.filter((item) => item.category !== "popular")
      : menuItems.filter((item) => item.category === activeCategory);

  // Group items by category for "all" view
  const groupedByCategory =
    activeCategory === "all"
      ? categories
          .filter((c) => c.id !== "popular")
          .map((cat) => ({
            ...cat,
            items: menuItems.filter((item) => item.category === cat.id),
          }))
          .filter((group) => group.items.length > 0)
      : null;

  return (
    <>
      {/* Page header */}
      <div className="bg-gradient-to-b from-warm-100 to-background pt-8 pb-2">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-extrabold font-[family-name:var(--font-heading)] tracking-tight">
            Меню
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Пицца, роллы, сеты, фаст-фуд и многое другое
          </p>
        </div>
      </div>

      {/* Category tabs */}
      <CategoryTabs
        activeCategory={activeCategory}
        onSelect={setActiveCategory}
      />

      {/* Menu grid */}
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-10">
        {activeCategory === "all" && groupedByCategory ? (
          <div className="space-y-12">
            {groupedByCategory.map((group) => (
              <section key={group.id}>
                <div className="flex items-center gap-3 mb-5">
                  <h2 className="text-xl md:text-2xl font-bold font-[family-name:var(--font-heading)]">
                    {group.name}
                  </h2>
                  <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-md">
                    {group.items.length}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                  {group.items.map((item) => (
                    <MenuCard key={item.id} item={item} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {filteredItems.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>

      {/* Sticky cart bar (mobile) */}
      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:hidden">
          <Link
            href="/cart"
            className="flex items-center justify-between bg-malina-500 text-white rounded-2xl px-5 py-4 shadow-2xl shadow-malina-500/30"
          >
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5" />
              <span className="font-bold text-sm">
                {totalItems} {totalItems === 1 ? "товар" : totalItems < 5 ? "товара" : "товаров"}
              </span>
            </div>
            <span className="font-bold">{formatPrice(totalPrice)}</span>
          </Link>
        </div>
      )}
    </>
  );
}
