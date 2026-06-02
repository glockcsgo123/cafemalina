"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, UtensilsCrossed, ShoppingBag } from "lucide-react";
import { useCartStore, selectTotalItems } from "@/lib/store/cart";
import { useEffect, useState } from "react";

export function MobileNav() {
  const pathname = usePathname();
  const totalItems = useCartStore(selectTotalItems);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (pathname.startsWith("/admin")) return null;

  const links = [
    { href: "/", icon: Home, label: "Главная" },
    { href: "/menu", icon: UtensilsCrossed, label: "Меню" },
    { href: "/cart", icon: ShoppingBag, label: "Корзина" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-background/95 backdrop-blur-md border-t border-border">
      <div className="flex items-center justify-around h-16 px-2">
        {links.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || (href === "/cart" && pathname === "/checkout");
          return (
            <Link
              key={href}
              href={href}
              className={`relative flex flex-col items-center gap-1 px-5 py-2 rounded-xl transition-colors ${
                active ? "text-[#BE1E5A]" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className="relative">
                <Icon className="h-5 w-5" />
                {href === "/cart" && mounted && totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#BE1E5A] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none">
                    {totalItems > 9 ? "9+" : totalItems}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
