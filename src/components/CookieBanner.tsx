"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookie_accepted")) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie_accepted", "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 pointer-events-none">
      <div className="max-w-2xl mx-auto bg-[#1A1A1A] text-white rounded-2xl shadow-2xl px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 pointer-events-auto">
        <p className="text-sm text-white/80 flex-1 leading-relaxed">
          Мы используем cookie. Продолжая использование сайта, вы соглашаетесь с{" "}
          <Link href="/privacy" className="text-malina-500 hover:underline">
            политикой конфиденциальности
          </Link>
          .
        </p>
        <button
          onClick={accept}
          className="shrink-0 bg-malina-500 text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-malina-600 active:scale-95 transition-all"
        >
          Принять
        </button>
      </div>
    </div>
  );
}
