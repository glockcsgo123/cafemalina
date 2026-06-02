import { MapPin, Phone, Clock } from "lucide-react";
import { siteConfig } from "@/lib/data/site";

export default function AboutPage() {
  const mapsUrl =
    "https://yandex.ru/maps/?text=Курская+обл.+р.п.+Прямицыно+ул.+Коммунистическая+28";

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 md:py-16">
      <h1 className="text-3xl font-extrabold font-[family-name:var(--font-heading)] tracking-tight mb-2">
        О нас
      </h1>
      <p className="text-sm text-muted-foreground mb-10">
        Кафе Малина — пицца и роллы в Прямицыно
      </p>

      <div className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-6">
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          Кафе <strong className="text-foreground">Malina</strong> — это уютное место в р.п. Прямицыно,
          где каждый день готовят свежую пиццу и роллы. Мы используем только свежие ингредиенты и
          готовим каждый заказ индивидуально.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Работаем ежедневно — оформите заказ онлайн или позвоните нам, и мы доставим
          горячее прямо к вашей двери.
        </p>
      </div>

      <div className="space-y-4">
        <a
          href={`tel:${siteConfig.contacts.phoneRaw}`}
          className="flex items-center gap-4 bg-card border border-border rounded-2xl p-5 hover:border-malina-500/30 transition-colors group"
        >
          <div className="w-11 h-11 rounded-xl bg-malina-500/10 flex items-center justify-center shrink-0">
            <Phone className="w-5 h-5 text-malina-500" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Телефон</p>
            <p className="font-semibold group-hover:text-malina-500 transition-colors">
              {siteConfig.contacts.phone}
            </p>
          </div>
        </a>

        <div className="flex items-center gap-4 bg-card border border-border rounded-2xl p-5">
          <div className="w-11 h-11 rounded-xl bg-malina-500/10 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5 text-malina-500" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Режим работы</p>
            <p className="font-semibold">{siteConfig.workingHours.text}</p>
          </div>
        </div>

        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 bg-card border border-border rounded-2xl p-5 hover:border-malina-500/30 transition-colors group"
        >
          <div className="w-11 h-11 rounded-xl bg-malina-500/10 flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5 text-malina-500" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Адрес</p>
            <p className="font-semibold group-hover:text-malina-500 transition-colors">
              {siteConfig.contacts.address}
            </p>
            <p className="text-xs text-malina-500 mt-1">Открыть в Яндекс.Картах →</p>
          </div>
        </a>
      </div>
    </div>
  );
}
