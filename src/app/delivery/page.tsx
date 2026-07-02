import { Truck, Clock, Banknote, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/data/site";
import { DELIVERY_ZONES } from "@/lib/delivery";
import { DeliveryMap } from "@/components/delivery/DeliveryMap";

export default function DeliveryPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 pb-24 md:pb-12">
      <h1 className="text-3xl font-extrabold font-[family-name:var(--font-heading)] tracking-tight mb-2">
        Доставка
      </h1>
      <p className="text-sm text-muted-foreground mb-10">
        Привезём горячим прямо к вашей двери
      </p>

      {/* Верхние карточки */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
        {/* Зона доставки */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-malina-500/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-malina-500" />
            </div>
            <h2 className="font-bold">Зоны и минимальный заказ</h2>
          </div>
          <ul className="space-y-2">
            {DELIVERY_ZONES.map((zone) => (
              <li key={zone.id} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: zone.color }}
                  />
                  {zone.label} — до {zone.radius} км
                </span>
                <span className="font-semibold">от {zone.minOrder.toLocaleString("ru")} ₽</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Время и режим */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-malina-500/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-malina-500" />
            </div>
            <h2 className="font-bold">Время доставки</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            {siteConfig.delivery.deliveryTime}
          </p>
          <p className="text-xs text-muted-foreground/70 mt-2">
            {siteConfig.workingHours.text}
          </p>
        </div>

        {/* Стоимость доставки */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-malina-500/10 flex items-center justify-center">
              <Truck className="w-5 h-5 text-malina-500" />
            </div>
            <h2 className="font-bold">Стоимость доставки</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Доставка бесплатная при достижении минимальной суммы для вашей зоны.
          </p>
        </div>

        {/* Оплата */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-malina-500/10 flex items-center justify-center">
              <Banknote className="w-5 h-5 text-malina-500" />
            </div>
            <h2 className="font-bold">Оплата</h2>
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {siteConfig.payment.methods.map((m) => (
              <li key={m.id}>{m.label}</li>
            ))}
          </ul>
          <p className="text-xs text-muted-foreground/70 mt-3">
            {siteConfig.payment.shortNote}
          </p>
        </div>
      </div>

      {/* Карта */}
      <h2 className="text-xl font-bold mb-4">Зоны доставки</h2>
      <DeliveryMap />
    </div>
  );
}
