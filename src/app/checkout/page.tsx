"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Send, Info, Banknote, CreditCard, Smartphone } from "lucide-react";
import { useCartStore, selectTotalItems, selectTotalPrice } from "@/lib/store/cart";
import { formatPrice } from "@/lib/utils";

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const totalItems = useCartStore(selectTotalItems);
  const totalPrice = useCartStore(selectTotalPrice);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    addressDetails: "",
    comment: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Укажите имя";
    if (!form.phone.trim()) newErrors.phone = "Укажите телефон";
    else if (form.phone.replace(/\D/g, "").length < 10)
      newErrors.phone = "Некорректный номер телефона";
    if (!form.address.trim()) newErrors.address = "Укажите адрес доставки";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    // Имитация отправки (в реальности — запрос на сервер)
    setTimeout(() => {
      clearCart();
      router.push("/checkout/success");
    }, 800);
  };

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  // Redirect if cart is empty
  if (totalItems === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground mb-4">Корзина пуста</p>
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 bg-malina-500 text-white font-semibold px-6 py-3 rounded-xl"
        >
          Перейти в меню
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/cart"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Назад в корзину
        </Link>
        <h1 className="text-2xl md:text-3xl font-extrabold font-[family-name:var(--font-heading)] tracking-tight">
          Оформление заказа
        </h1>
      </div>

      {/* Info banner */}
      <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-8">
        <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
        <p className="text-sm text-blue-800 leading-relaxed">
          После оформления заказа оператор свяжется с вами для подтверждения. Уточнит адрес, состав и удобное время доставки.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 space-y-5">
            {/* Имя */}
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Имя <span className="text-malina-500">*</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="Как к вам обращаться"
                className={`w-full px-4 py-3 rounded-xl border bg-card text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-malina-500/30 focus:border-malina-500 ${
                  errors.name ? "border-red-300 bg-red-50/50" : "border-border"
                }`}
              />
              {errors.name && (
                <p className="text-xs text-red-600 mt-1.5">{errors.name}</p>
              )}
            </div>

            {/* Телефон */}
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Телефон <span className="text-malina-500">*</span>
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                placeholder="+7 (999) 123-45-67"
                className={`w-full px-4 py-3 rounded-xl border bg-card text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-malina-500/30 focus:border-malina-500 ${
                  errors.phone ? "border-red-300 bg-red-50/50" : "border-border"
                }`}
              />
              {errors.phone && (
                <p className="text-xs text-red-600 mt-1.5">{errors.phone}</p>
              )}
            </div>

            {/* Адрес */}
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Адрес доставки <span className="text-malina-500">*</span>
              </label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => updateField("address", e.target.value)}
                placeholder="Улица, дом"
                className={`w-full px-4 py-3 rounded-xl border bg-card text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-malina-500/30 focus:border-malina-500 ${
                  errors.address ? "border-red-300 bg-red-50/50" : "border-border"
                }`}
              />
              {errors.address && (
                <p className="text-xs text-red-600 mt-1.5">{errors.address}</p>
              )}
            </div>

            {/* Детали адреса */}
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Детали адреса
              </label>
              <input
                type="text"
                value={form.addressDetails}
                onChange={(e) => updateField("addressDetails", e.target.value)}
                placeholder="Подъезд, этаж, квартира, домофон"
                className="w-full px-4 py-3 rounded-xl border border-border bg-card text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-malina-500/30 focus:border-malina-500"
              />
            </div>

            {/* Комментарий */}
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Комментарий к заказу
              </label>
              <textarea
                value={form.comment}
                onChange={(e) => updateField("comment", e.target.value)}
                placeholder="Пожелания, уточнения, аллергии..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-border bg-card text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-malina-500/30 focus:border-malina-500 resize-none"
              />
            </div>
          </div>

          {/* Order summary — sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-4">
              {/* Items */}
              <div className="bg-card border border-border rounded-2xl p-5">
                <h3 className="font-bold text-sm mb-4">Ваш заказ</h3>
                <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-2">
                      <span className="text-sm truncate flex-1">
                        {item.name}
                        {item.quantity > 1 && (
                          <span className="text-muted-foreground"> x{item.quantity}</span>
                        )}
                      </span>
                      <span className="text-sm font-medium whitespace-nowrap">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border pt-3 flex items-center justify-between">
                  <span className="font-bold">Итого</span>
                  <span className="text-xl font-extrabold">{formatPrice(totalPrice)}</span>
                </div>
              </div>

              {/* Payment info */}
              <div className="bg-warm-50 border border-border rounded-2xl p-5">
                <h4 className="text-sm font-semibold mb-3">Оплата при получении</h4>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Banknote className="w-3.5 h-3.5 shrink-0" />
                    Наличными
                  </li>
                  <li className="flex items-center gap-2">
                    <Smartphone className="w-3.5 h-3.5 shrink-0" />
                    Переводом
                  </li>
                  <li className="flex items-center gap-2">
                    <CreditCard className="w-3.5 h-3.5 shrink-0" />
                    Картой
                  </li>
                </ul>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 bg-malina-500 text-white font-bold text-base py-4 rounded-2xl hover:bg-malina-600 active:scale-[0.98] transition-all shadow-lg shadow-malina-500/20 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <span>Отправляем...</span>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Отправить заказ
                  </>
                )}
              </button>

              <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
                Нажимая кнопку, вы отправляете заявку на заказ.
                Оператор свяжется для подтверждения.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
