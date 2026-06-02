"use client";

import { Phone } from "lucide-react";
import { usePathname } from "next/navigation";

export function CallButton() {
  const pathname = usePathname();

  if (pathname === "/checkout") return null;

  return (
    <a
      href="tel:+79107403111"
      className="fixed bottom-6 right-6 z-50 group flex items-center gap-0 hover:gap-3 overflow-hidden transition-all duration-300"
      aria-label="Позвонить"
    >
      {/* Tooltip */}
      <span className="max-w-0 group-hover:max-w-[160px] overflow-hidden whitespace-nowrap text-sm font-semibold text-white bg-[#BE1E5A] px-0 group-hover:px-3 py-3 rounded-l-2xl transition-all duration-300">
        +7 (910) 740-31-11
      </span>
      {/* Button */}
      <span className="w-14 h-14 rounded-full bg-[#BE1E5A] flex items-center justify-center shadow-lg shadow-[#BE1E5A]/40 hover:bg-malina-600 transition-colors shrink-0">
        <Phone className="w-6 h-6 text-white" />
      </span>
    </a>
  );
}
