"use client";

import { categories } from "@/lib/data/menu";
import { cn } from "@/lib/utils";

interface CategoryTabsProps {
  activeCategory: string;
  onSelect: (id: string) => void;
}

export function CategoryTabs({ activeCategory, onSelect }: CategoryTabsProps) {
  return (
    <div className="sticky top-16 z-40 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4">
        <nav
          className="flex gap-1 overflow-x-auto py-3 scrollbar-hide -mx-4 px-4"
          aria-label="Категории меню"
        >
          <button
            onClick={() => onSelect("all")}
            className={cn(
              "shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap",
              activeCategory === "all"
                ? "bg-malina-500 text-white shadow-sm"
                : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-warm-200"
            )}
          >
            Все
          </button>
          {categories
            .filter((c) => c.id !== "popular")
            .map((category) => (
              <button
                key={category.id}
                onClick={() => onSelect(category.id)}
                className={cn(
                  "shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap",
                  activeCategory === category.id
                    ? "bg-malina-500 text-white shadow-sm"
                    : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-warm-200"
                )}
              >
                {category.name}
              </button>
            ))}
        </nav>
      </div>
    </div>
  );
}
