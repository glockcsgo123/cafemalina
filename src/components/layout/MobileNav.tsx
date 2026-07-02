"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, UtensilsCrossed, ShoppingBag, Truck } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";

export function MobileNav() {
  const pathname = usePathname();
  const cartCount = useCartStore((s) =>
    s.items.reduce((n, i) => n + i.quantity, 0)
  );

  if (pathname.startsWith("/admin")) return null;

  const links = [
    { href: "/", icon: Home, label: "Главная", badge: 0 },
    { href: "/menu", icon: UtensilsCrossed, label: "Меню", badge: 0 },
    { href: "/delivery", icon: Truck, label: "Доставка", badge: 0 },
    { href: "/cart", icon: ShoppingBag, label: "Корзина", badge: cartCount },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-gray-100">
      <div className="flex items-center justify-around h-16">
        {links.map(({ href, icon: Icon, label, badge }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`relative flex flex-col items-center gap-1 py-2 px-6 transition-colors ${
                active ? "text-[#BE1E5A]" : "text-gray-400"
              }`}
            >
              <div className="relative">
                <Icon
                  className="h-5 w-5"
                  strokeWidth={active ? 2.5 : 1.8}
                />
                {badge > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#BE1E5A] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {badge}
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
