import Link from "next/link";
import { CircleCheck, ArrowRight, Banknote, CreditCard, Smartphone } from "lucide-react";

export default function CheckoutSuccessPage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-20 md:py-28 text-center">
      {/* Icon */}
      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center">
        <CircleCheck className="w-10 h-10 text-green-600" />
      </div>

      {/* Heading */}
      <h1 className="text-2xl md:text-3xl font-extrabold font-[family-name:var(--font-heading)] tracking-tight mb-3 leading-tight">
        Спасибо! С вами свяжутся для подтверждения заказа.
      </h1>

      {/* Description */}
      <p className="text-muted-foreground leading-relaxed mb-6">
        Оператор уточнит адрес, состав заказа и удобное время доставки.
      </p>

      {/* Payment info */}
      <div className="inline-flex items-center gap-4 bg-warm-50 border border-border rounded-2xl px-5 py-3 mb-8">
        <span className="text-xs text-muted-foreground font-medium">Оплата при получении:</span>
        <div className="flex items-center gap-3 text-muted-foreground">
          <Banknote className="w-4 h-4" />
          <Smartphone className="w-4 h-4" />
          <CreditCard className="w-4 h-4" />
        </div>
      </div>

      <p className="text-xs text-muted-foreground mb-8">
        Наличными, переводом или картой курьеру
      </p>

      {/* CTA */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-malina-500 text-white font-semibold px-7 py-3.5 rounded-2xl hover:bg-malina-600 transition-colors shadow-lg shadow-malina-500/20"
      >
        Вернуться на главную
        <ArrowRight className="w-5 h-5" />
      </Link>
    </div>
  );
}
