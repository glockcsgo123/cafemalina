"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { UtensilsCrossed, ClipboardList, LogOut, Settings } from "lucide-react";

const NAV = [
  { href: "/admin/menu",     icon: UtensilsCrossed, label: "Меню" },
  { href: "/admin/orders",   icon: ClipboardList,   label: "Заказы" },
  { href: "/admin/settings", icon: Settings,        label: "Настройки" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-secondary/30">

      {/* ── Desktop sidebar ─────────────────────────── */}
      <aside className="hidden md:flex w-56 shrink-0 bg-[#1A1A1A] text-white flex-col">
        <div className="px-5 py-5 border-b border-white/10">
          <span className="text-lg font-extrabold text-malina-500">Malina Admin</span>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                pathname.startsWith(href)
                  ? "bg-malina-500 text-white"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
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

      {/* ── Mobile top header ───────────────────────── */}
      <header className="md:hidden flex items-center justify-between bg-[#1A1A1A] text-white px-4 h-12 shrink-0">
        <span className="font-extrabold text-malina-500 text-base">Malina Admin</span>
        <button
          onClick={logout}
          className="flex items-center gap-1.5 text-white/60 hover:text-white text-xs transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Выйти
        </button>
      </header>

      {/* ── Page content ────────────────────────────── */}
      <main className="flex-1 overflow-auto pb-16 md:pb-0">
        {children}
      </main>

      {/* ── Mobile bottom tab bar ───────────────────── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#1A1A1A] border-t border-white/10">
        <div className="flex items-center justify-around h-14">
          {NAV.map(({ href, icon: Icon, label }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex flex-col items-center gap-0.5 px-6 py-2 transition-colors ${
                  active ? "text-malina-500" : "text-white/40 hover:text-white/70"
                }`}
              >
                <Icon className="w-5 h-5" strokeWidth={active ? 2.5 : 1.8} />
                <span className="text-[10px] font-medium">{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

    </div>
  );
}
