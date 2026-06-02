import { Truck, Clock, Banknote, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/data/site";
import { formatPrice } from "@/lib/utils";

export default function DeliveryPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 md:py-16">
      <h1 className="text-3xl font-extrabold font-[family-name:var(--font-heading)] tracking-tight mb-2">
        Доставка
      </h1>
      <p className="text-sm text-muted-foreground mb-10">
        Привезём горячим прямо к вашей двери
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Зона доставки */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-malina-500/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-malina-500" />
            </div>
            <h2 className="font-bold">Зона доставки</h2>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {siteConfig.delivery.zone}
          </p>
        </div>

        {/* Время */}
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

        {/* Стоимость */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-malina-500/10 flex items-center justify-center">
              <Truck className="w-5 h-5 text-malina-500" />
            </div>
            <h2 className="font-bold">Стоимость доставки</h2>
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              Минимальный заказ —{" "}
              <span className="font-semibold text-foreground">
                {formatPrice(siteConfig.delivery.minOrder)}
              </span>
            </li>
            <li>
              Бесплатная доставка от{" "}
              <span className="font-semibold text-foreground">
                {formatPrice(siteConfig.delivery.freeDeliveryFrom)}
              </span>
            </li>
          </ul>
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
    </div>
  );
}
