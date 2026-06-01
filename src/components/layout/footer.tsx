import Link from "next/link";
import { MapPin, Phone, Clock, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/data/site";
import { categories } from "@/lib/data/menu";

export function Footer() {
  const { contacts, workingHours, social } = siteConfig;

  return (
    <footer className="bg-[#1A1A1A] text-white mt-0">
      {/* CTA strip */}
      <div className="border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-malina-500/20 flex items-center justify-center shrink-0">
              <span className="text-lg">&#127829;</span>
            </div>
            <p className="text-sm text-white/70">
              Голодны? Доставим горячую пиццу и роллы {siteConfig.delivery.deliveryTime}
            </p>
          </div>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 bg-malina-500 text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-malina-600 transition-colors shrink-0"
          >
            Заказать
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-extrabold font-[family-name:var(--font-heading)] text-malina-500 mb-3">
              {siteConfig.shortName}
            </h3>
            <p className="text-sm text-white/40 leading-relaxed mb-4">
              Пицца, роллы, сеты и фаст-фуд с доставкой по городу.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3">
              {social.telegram && (
                <a href={social.telegram} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white transition-colors text-xs">TG</a>
              )}
              {social.instagram && (
                <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white transition-colors text-xs">IG</a>
              )}
              {social.vk && (
                <a href={social.vk} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white transition-colors text-xs">VK</a>
              )}
              {social.whatsapp && (
                <a href={social.whatsapp} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white transition-colors text-xs">WA</a>
              )}
            </div>
          </div>

          {/* Меню */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white/25 mb-4">
              Меню
            </h4>
            <ul className="space-y-2.5">
              {categories.filter(c => c.id !== "popular").map((cat) => (
                <li key={cat.id}>
                  <Link
                    href="/menu"
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white/25 mb-4">
              Контакты
            </h4>
            <div className="space-y-3">
              <a href={`tel:${contacts.phoneRaw}`} className="flex items-center gap-2.5 text-sm text-white/50 hover:text-white transition-colors">
                <Phone className="w-4 h-4 shrink-0 text-white/25" />
                <span>{contacts.phone}</span>
              </a>
              <div className="flex items-start gap-2.5 text-sm text-white/50">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-white/25" />
                <span>{contacts.address}</span>
              </div>
            </div>
          </div>

          {/* Время работы */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white/25 mb-4">
              Режим работы
            </h4>
            <div className="flex items-center gap-2.5 text-sm text-white/50 mb-3">
              <Clock className="w-4 h-4 shrink-0 text-white/25" />
              <span>{workingHours.text}</span>
            </div>
            <p className="text-xs text-white/30">
              {siteConfig.payment.note}
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-white/25">
            &copy; 2026 {siteConfig.name}
          </span>
          <span className="text-xs text-white/25">
            Все права защищены
          </span>
        </div>
      </div>
    </footer>
  );
}
