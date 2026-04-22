"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCartStore, selectTotalItems } from "@/lib/store/cart";
import { useEffect, useState } from "react";

export function Header() {
  const itemCount = useCartStore(selectTotalItems);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold font-[family-name:var(--font-heading)] text-malina-500 tracking-tight">
            Malina
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/menu"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Меню
          </Link>
          <Link
            href="/#delivery"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Доставка
          </Link>
          <Link
            href="/#about"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            О нас
          </Link>
        </nav>

        <Link
          href="/cart"
          className="relative flex items-center justify-center w-10 h-10 rounded-lg hover:bg-secondary transition-colors"
        >
          <ShoppingBag className="w-5 h-5" />
          {mounted && itemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-malina-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
