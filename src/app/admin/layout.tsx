"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { UtensilsCrossed, ClipboardList, LogOut, Settings } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen flex bg-secondary/30">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 bg-[#1A1A1A] text-white flex flex-col">
        <div className="px-5 py-5 border-b border-white/10">
          <span className="text-lg font-extrabold text-malina-500">
            Malina Admin
          </span>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          <Link
            href="/admin/menu"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              pathname.startsWith("/admin/menu")
                ? "bg-malina-500 text-white"
                : "text-white/60 hover:text-white hover:bg-white/10"
            }`}
          >
            <UtensilsCrossed className="w-4 h-4" />
            Меню
          </Link>

          <Link
            href="/admin/orders"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              pathname.startsWith("/admin/orders")
                ? "bg-malina-500 text-white"
                : "text-white/60 hover:text-white hover:bg-white/10"
            }`}
          >
            <ClipboardList className="w-4 h-4" />
            Заказы
          </Link>

          <Link
            href="/admin/settings"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              pathname.startsWith("/admin/settings")
                ? "bg-malina-500 text-white"
                : "text-white/60 hover:text-white hover:bg-white/10"
            }`}
          >
            <Settings className="w-4 h-4" />
            Настройки
          </Link>
        </nav>

        <div className="px-3 py-4 border-t border-white/10">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/10 transition-colors w-full"
          >
            <LogOut className="w-4 h-4" />
            Выйти
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
