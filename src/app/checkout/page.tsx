"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Send, Info, Plus, Minus, Clock } from "lucide-react";
import { useCartStore, selectTotalItems, selectTotalPrice } from "@/lib/store/cart";
import { menuItems } from "@/lib/data/menu";
import { formatPrice } from "@/lib/utils";

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 11);
  let result = "+7";
  if (digits.length > 1) result += " (" + digits.slice(1, 4);
  if (digits.length >= 4) result += ")";
  if (digits.length > 4) result += " " + digits.slice(4, 7);
  if (digits.length > 7) result += "-" + digits.slice(7, 9);
  if (digits.length > 9) result += "-" + digits.slice(9, 11);
  return result;
}

function isPhoneComplete(phone: string): boolean {
  return phone.replace(/\D/g, "").length === 11;
}

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const addItem = useCartStore((s) => s.addItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const totalItems = useCartStore(selectTotalItems);
  const totalPrice = useCartStore(selectTotalPrice);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    addressDetails: "",
    comment: "",
  });
  const [persons, setPersons] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState("cash");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Upsell: soy sauce first, then drinks
  const soySauce = menuItems.find((item) => item.id === "sauce-5");
  const drinkItems = menuItems.filter((item) => item.category === "drinks");
  const upsellItems = [soySauce, ...drinkItems].filter(Boolean) as typeof menuItems;

  const paymentMethods = [
    { id: "cash", icon: "💵", label: "Наличными курьеру" },
    { id: "card", icon: "💳", label: "Картой при получении" },
    { id: "transfer", icon: "📱", label: "Переводом по телефону" },
  ];

  const now = new Date();
  const hour = now.getHours();
  const isOpen = hour >= 10 && hour < 23;

  const isMinOrderMet = totalPrice >= 500;
  const minOrderRemaining = 500 - totalPrice;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Укажите имя";
    if (!form.phone.trim()) newErrors.phone = "Укажите телефон";
    else if (!isPhoneComplete(form.phone)) newErrors.phone = "Введите полный номер телефона";
    if (!form.address.trim()) newErrors.address = "Укажите адрес доставки";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          persons,
          paymentMethod: selectedPayment,
          items: items.map((i) => ({
            name: i.name,
            price: i.price,
            quantity: i.quantity,
          })),
          total: totalPrice,
        }),
      });

      if (!res.ok) throw new Error();

      clearCart();
      router.push("/checkout/success");
    } catch {
      setSubmitError("Не удалось отправить заказ. Попробуйте ещё раз.");
      setSubmitting(false);
    }
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

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const formatted = formatPhone(raw);
    updateField("phone", formatted);
  };

  const handlePhonePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text");
    const formatted = formatPhone(pasted);
    updateField("phone", formatted);
  };

  const canSubmit = !submitting && privacyAccepted && isPhoneComplete(form.phone) && isMinOrderMet;

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

            {/* Телефон с маской */}
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Телефон <span className="text-malina-500">*</span>
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={handlePhoneChange}
                onPaste={handlePhonePaste}
                placeholder="+7 (___) ___-__-__"
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

            {/* Количество персон */}
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Количество персон
              </label>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 bg-secondary rounded-xl p-1">
                  <button
                    type="button"
                    onClick={() => setPersons((p) => Math.max(1, p - 1))}
                    className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-card transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-bold text-sm">
                    {persons}
                  </span>
                  <button
                    type="button"
                    onClick={() => setPersons((p) => Math.min(20, p + 1))}
                    className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-card transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Сколько персон — столько наборов палочек
                </p>
              </div>
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
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-2"
                    >
                      <span className="text-sm truncate flex-1">
                        {item.name}
                        {item.quantity > 1 && (
                          <span className="text-muted-foreground">
                            {" "}
                            x{item.quantity}
                          </span>
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
                  <span className="text-xl font-extrabold">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
              </div>

              {/* Upsell */}
              <div className="bg-card border border-border rounded-2xl p-4">
                <h4 className="text-sm font-bold mb-3">Добавить к заказу?</h4>
                <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
                  {upsellItems.map((uItem) => {
                    const cartQty =
                      items.find((i) => i.id === uItem.id)?.quantity || 0;
                    return (
                      <div
                        key={uItem.id}
                        className="flex flex-col items-center gap-1.5 shrink-0 w-16"
                      >
                        <img
                          src={uItem.image}
                          alt={uItem.name}
                          className="w-14 h-14 rounded-xl object-cover bg-warm-200"
                        />
                        <span className="text-[10px] text-center leading-tight font-medium line-clamp-2">
                          {uItem.name}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {formatPrice(uItem.price)}
                        </span>
                        {cartQty === 0 ? (
                          <button
                            type="button"
                            onClick={() =>
                              addItem({
                                id: uItem.id,
                                name: uItem.name,
                                price: uItem.price,
                                image: uItem.image,
                              })
                            }
                            className="w-7 h-7 rounded-full bg-malina-500 text-white flex items-center justify-center hover:bg-malina-600 transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <div className="flex items-center gap-0.5">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(uItem.id, cartQty - 1)
                              }
                              className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center hover:bg-warm-200 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-5 text-center text-xs font-bold">
                              {cartQty}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(uItem.id, cartQty + 1)
                              }
                              className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center hover:bg-warm-200 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Payment method selector */}
              <div className="bg-card border border-border rounded-2xl p-4">
                <h4 className="text-sm font-bold mb-3">Способ оплаты</h4>
                <div className="space-y-2">
                  {paymentMethods.map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-colors ${
                        selectedPayment === method.id
                          ? "border-[#BE1E5A] bg-[#BE1E5A]/5"
                          : "border-border hover:border-[#BE1E5A]/40"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        className="sr-only"
                        checked={selectedPayment === method.id}
                        onChange={() => setSelectedPayment(method.id)}
                      />
                      <span className="text-lg">{method.icon}</span>
                      <span className="text-sm font-medium">{method.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Working hours */}
              <div className={`flex items-center gap-2 text-sm rounded-xl px-4 py-3 ${
                isOpen ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"
              }`}>
                <Clock className="w-4 h-4 shrink-0" />
                <span>
                  {isOpen
                    ? "Принимаем заказы — доставляем до 23:00"
                    : "Сейчас не работаем. Доставка ежедневно 10:00 — 23:00"}
                </span>
              </div>

              {/* Privacy consent */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={privacyAccepted}
                  onChange={(e) => setPrivacyAccepted(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-malina-500 shrink-0"
                />
                <span className="text-xs text-muted-foreground leading-relaxed">
                  Я соглашаюсь с{" "}
                  <Link
                    href="/privacy"
                    target="_blank"
                    className="text-malina-500 underline hover:text-malina-600"
                  >
                    обработкой персональных данных
                  </Link>
                </span>
              </label>

              {/* Error */}
              {submitError && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700 text-center">
                  {submitError}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={!canSubmit}
                className="w-full flex items-center justify-center gap-2 bg-malina-500 text-white font-bold text-base py-4 rounded-2xl hover:bg-malina-600 active:scale-[0.98] transition-all shadow-lg shadow-malina-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <span>Отправляем...</span>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Оформить заказ
                  </>
                )}
              </button>

              {!isMinOrderMet && (
                <p className="text-sm text-center text-orange-600">
                  Минимальный заказ — 500 ₽. Добавьте ещё на {minOrderRemaining} ₽
                </p>
              )}

              <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
                Нажимая кнопку, вы отправляете заявку на заказ. Оператор свяжется для подтверждения.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
