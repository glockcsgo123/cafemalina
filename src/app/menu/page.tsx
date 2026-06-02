"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Search, X, ShoppingBag } from "lucide-react";
import { menuItems, categories, MenuItem } from "@/lib/data/menu";
import { CategoryTabs } from "@/components/menu/category-tabs";
import { MenuCard } from "@/components/menu/menu-card";
import { MenuItemModal } from "@/components/menu/MenuItemModal";
import { Reveal } from "@/components/ui/reveal";
import { useCartStore, selectTotalItems, selectTotalPrice } from "@/lib/store/cart";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

export default function MenuPage() {
  // activeFilter — what the user clicked (controls content: grouped-all vs single category)
  const [activeFilter, setActiveFilter] = useState("all");
  // scrollHighlight — which tab is highlighted while scrolling in "all" mode (never changes content)
  const [scrollHighlight, setScrollHighlight] = useState("all");

  const [searchQuery, setSearchQuery] = useState("");
  const [modalItem, setModalItem] = useState<MenuItem | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const totalItems = useCartStore(selectTotalItems);
  const totalPrice = useCartStore(selectTotalPrice);

  const isSearching = searchQuery.trim().length > 0;
  const isAllMode = activeFilter === "all";

  const searchResults = isSearching
    ? menuItems.filter(
        (item) =>
          item.category !== "popular" &&
          (item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  const groupedByCategory = categories
    .filter((c) => c.id !== "popular")
    .map((cat) => ({
      ...cat,
      items: menuItems.filter((item) => item.category === cat.id),
    }))
    .filter((group) => group.items.length > 0);

  const filteredItems = menuItems.filter(
    (item) => item.category === activeFilter
  );

  // The tab bar shows scrollHighlight when in all-mode, otherwise activeFilter
  const activeTabId = isAllMode ? scrollHighlight : activeFilter;

  const handleCategorySelect = useCallback((id: string) => {
    setActiveFilter(id);
    setScrollHighlight(id);

    if (id === "all") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    // Scroll to section (only visible when switching FROM filtered view to all+scroll)
    // When in all-mode, jump directly to section
    requestAnimationFrame(() => {
      const el = sectionRefs.current[id];
      if (el) {
        const offset = 120;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  }, []);

  // IntersectionObserver — only runs in "all" mode, only updates scrollHighlight (never activeFilter)
  useEffect(() => {
    if (isSearching || !isAllMode) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the topmost intersecting section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setScrollHighlight(visible[0].target.id || "all");
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
    // intentionally no activeFilter/scrollHighlight in deps — observer never changes filter
  }, [isSearching, isAllMode]);

  return (
    <>
      {/* Page header */}
      <div className="bg-gradient-to-b from-warm-100 to-background pt-8 pb-2">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-extrabold font-[family-name:var(--font-heading)] tracking-tight">
            Меню
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Пицца, роллы, сеты и многое другое
          </p>

          {/* Search */}
          <div className="relative mt-4 mb-2">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Найти блюдо..."
              className="w-full h-12 pl-10 pr-10 rounded-xl border border-border bg-card text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#BE1E5A]/20 focus:border-[#BE1E5A] transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Category tabs */}
      {!isSearching && (
        <CategoryTabs
          activeCategory={activeTabId}
          onSelect={handleCategorySelect}
        />
      )}

      {/* Menu grid */}
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-10">
        {isSearching ? (
          <div>
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {searchResults.map((item) => (
                  <MenuCard
                    key={item.id}
                    item={item}
                    onOpenModal={setModalItem}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-muted-foreground">
                <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="font-medium">Ничего не найдено</p>
                <p className="text-sm mt-1">Попробуйте другой запрос</p>
              </div>
            )}
          </div>
        ) : isAllMode ? (
          /* All categories grouped view */
          <div className="space-y-12">
            {groupedByCategory.map((group) => (
              <section
                key={group.id}
                id={group.id}
                ref={(el) => {
                  sectionRefs.current[group.id] = el;
                }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <h2 className="text-xl md:text-2xl font-bold font-[family-name:var(--font-heading)]">
                    {group.name}
                  </h2>
                  <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-md">
                    {group.items.length}
                  </span>
                </div>
                <Reveal>
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                    {group.items.map((item) => (
                      <MenuCard
                        key={item.id}
                        item={item}
                        onOpenModal={setModalItem}
                      />
                    ))}
                  </div>
                </Reveal>
              </section>
            ))}
          </div>
        ) : (
          /* Single category filtered view */
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {filteredItems.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                onOpenModal={setModalItem}
              />
            ))}
          </div>
        )}
      </div>

      {/* Sticky cart bar (mobile) */}
      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 p-4 md:hidden">
          <Link
            href="/cart"
            className="flex items-center justify-between bg-malina-500 text-white rounded-2xl px-5 py-4 shadow-2xl shadow-malina-500/30"
          >
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5" />
              <span className="font-bold text-sm">
                {totalItems}{" "}
                {totalItems === 1
                  ? "товар"
                  : totalItems < 5
                  ? "товара"
                  : "товаров"}
              </span>
            </div>
            <span className="font-bold">{formatPrice(totalPrice)}</span>
          </Link>
        </div>
      )}

      <MenuItemModal item={modalItem} onClose={() => setModalItem(null)} />
    </>
  );
}
