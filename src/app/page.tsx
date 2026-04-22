import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Flame,
  Clock,
  Truck,
  Banknote,
  CreditCard,
  Smartphone,
  Zap,
  ChefHat,
} from "lucide-react";
import { menuItems } from "@/lib/data/menu";
import { siteConfig } from "@/lib/data/site";
import { PopularCard } from "@/components/menu/popular-card";
import { Reveal } from "@/components/ui/reveal";
import { formatPrice } from "@/lib/utils";

export default function HomePage() {
  const popularItems = menuItems.filter((item) => item.category === "popular");

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-malina-700/[0.03] via-orange-50/40 to-amber-50/20" />

        {/* Soft decorative blurs */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-orange-200/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-malina-500/[0.04] rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 w-full">
          <div className="flex flex-col md:flex-row md:items-center md:min-h-[540px]">
            {/* Left — text */}
            <div className="relative z-10 max-w-xl py-16 md:py-24 md:flex-1">
              <div className="inline-flex items-center gap-2 bg-malina-500/10 text-malina-600 text-xs font-bold tracking-wide uppercase px-3.5 py-2 rounded-full mb-6">
                <Flame className="w-3.5 h-3.5" />
                Бесплатная доставка от {formatPrice(siteConfig.delivery.freeDeliveryFrom)}
              </div>
              <h1 className="text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] font-extrabold font-[family-name:var(--font-heading)] leading-[1.05] tracking-tight mb-5">
                Пицца и роллы
                <br />
                <span className="text-malina-500">с доставкой</span>
              </h1>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-md">
                Готовим каждый день: пицца, роллы, сеты, фаст-фуд и десерты — быстро и вкусно.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/menu"
                  className="inline-flex items-center justify-center gap-2 bg-malina-500 text-white font-bold px-8 py-4 rounded-2xl hover:bg-malina-600 hover:shadow-2xl hover:shadow-malina-500/30 active:scale-[0.97] transition-all duration-300 shadow-xl shadow-malina-500/25 text-base"
                >
                  Перейти в меню
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/#delivery"
                  className="inline-flex items-center justify-center gap-2 bg-card/80 backdrop-blur border border-border font-medium px-6 py-4 rounded-2xl hover:bg-card hover:border-malina-500/20 transition-all duration-300 text-sm"
                >
                  <Truck className="w-4 h-4 text-muted-foreground" />
                  Условия доставки
                </Link>
              </div>
            </div>

            {/* Right — hero food composition */}
            <div className="relative md:flex-1 flex items-center justify-center pointer-events-none py-4 md:py-0">
              {/* Warm glow behind composition */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] w-[280px] h-[280px] md:w-[340px] md:h-[340px] lg:w-[380px] lg:h-[380px] bg-gradient-to-br from-malina-500/[0.06] via-orange-200/15 to-warm-200/20 rounded-full blur-3xl animate-[glow-pulse_8s_ease-in-out_infinite]" />

              {/* Food composition */}
              <div className="relative w-[280px] h-[330px] sm:w-[300px] sm:h-[360px] md:w-[420px] md:h-[480px] lg:w-[480px] lg:h-[540px] xl:w-[520px] xl:h-[580px] md:translate-x-[8%] md:-translate-y-[3%] animate-[float_8s_ease-in-out_infinite]">
                <Image
                  src="/branding/hero-malina.png"
                  alt="Пицца и роллы Cafe Malina"
                  fill
                  className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:scale-[1.02] transition-transform duration-700"
                  priority
                  sizes="(max-width: 768px) 70vw, 45vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Быстрые факты */}
      <section className="border-y border-border bg-card">
        <div className="max-w-6xl mx-auto px-4 py-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-0 sm:divide-x divide-border">
            {[
              { icon: ChefHat, text: "Готовим при заказе" },
              { icon: Clock, text: `Доставка ${siteConfig.delivery.deliveryTime}` },
              { icon: Zap, text: "Пицца, роллы, сеты, бургеры" },
            ].map((item) => (
              <div
                key={item.text}
                className="flex items-center justify-center gap-3 px-4"
              >
                <item.icon className="w-5 h-5 text-malina-500 shrink-0" />
                <span className="text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Популярные блюда */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          {/* Section header */}
          <Reveal>
            <div className="flex items-end justify-between mb-10">
              <div>
                <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1.5 rounded-full mb-3">
                  <Flame className="w-3.5 h-3.5" />
                  Популярное
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold font-[family-name:var(--font-heading)] tracking-tight">
                  Хиты заказов
                </h2>
                <p className="text-muted-foreground text-sm mt-1.5">
                  То, что берут снова и снова
                </p>
              </div>
              <Link
                href="/menu"
                className="hidden md:inline-flex items-center gap-1.5 text-sm font-semibold text-malina-500 hover:text-malina-600 transition-colors duration-300"
              >
                Всё меню
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>

          {/* Cards with warm background accent */}
          <div className="relative">
            <div className="absolute -inset-4 md:-inset-8 bg-gradient-to-br from-orange-50/80 via-warm-100/50 to-transparent rounded-3xl -z-10" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {popularItems.map((item, i) => (
                <Reveal key={item.id} delay={i * 100}>
                  <PopularCard item={item} featured={i === 0} />
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={400}>
            <div className="mt-8 text-center md:hidden">
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 bg-malina-500 text-white font-semibold px-6 py-3 rounded-xl text-sm hover:bg-malina-600 transition-colors duration-300"
              >
                Смотреть всё меню
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Доставка и оплата */}
      <section id="delivery" className="bg-gradient-to-b from-warm-100 to-warm-50 border-y border-border py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <Reveal>
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-extrabold font-[family-name:var(--font-heading)] tracking-tight mb-2">
                Доставка и оплата
              </h2>
              <p className="text-muted-foreground text-sm">
                Заказываете, привозим, платите при получении
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {/* Доставка */}
            <Reveal delay={100}>
              <div className="bg-card border border-border rounded-2xl p-6 md:p-8 hover:shadow-lg hover:border-malina-500/15 transition-all duration-300">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl bg-malina-500/10 flex items-center justify-center">
                    <Truck className="w-5 h-5 text-malina-500" />
                  </div>
                  <h3 className="font-bold text-base">Доставка</h3>
                </div>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-malina-500 mt-1.5 shrink-0" />
                    Минимальный заказ — {formatPrice(siteConfig.delivery.minOrder)}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-malina-500 mt-1.5 shrink-0" />
                    Бесплатная доставка от {formatPrice(siteConfig.delivery.freeDeliveryFrom)}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-malina-500 mt-1.5 shrink-0" />
                    Доставка {siteConfig.delivery.deliveryTime}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-malina-500 mt-1.5 shrink-0" />
                    {siteConfig.workingHours.text}
                  </li>
                </ul>
              </div>
            </Reveal>

            {/* Оплата */}
            <Reveal delay={200}>
              <div className="bg-card border border-border rounded-2xl p-6 md:p-8 hover:shadow-lg hover:border-malina-500/15 transition-all duration-300">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl bg-malina-500/10 flex items-center justify-center">
                    <Banknote className="w-5 h-5 text-malina-500" />
                  </div>
                  <h3 className="font-bold text-base">Оплата при получении</h3>
                </div>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-center gap-3">
                    <Banknote className="w-4 h-4 shrink-0 text-foreground/40" />
                    Наличными курьеру
                  </li>
                  <li className="flex items-center gap-3">
                    <CreditCard className="w-4 h-4 shrink-0 text-foreground/40" />
                    Картой при получении
                  </li>
                  <li className="flex items-center gap-3">
                    <Smartphone className="w-4 h-4 shrink-0 text-foreground/40" />
                    Переводом по номеру телефона
                  </li>
                </ul>
                <p className="mt-5 text-xs text-muted-foreground/80 border-t border-border pt-4">
                  Онлайн-оплата не требуется. Оператор свяжется с вами после оформления заказа.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* О Cafe Malina — брендовый блок */}
      <section id="about" className="py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <Reveal>
            <div className="relative bg-gradient-to-br from-malina-500/[0.04] via-warm-100 to-orange-50/50 border border-border rounded-3xl p-8 md:p-14 overflow-hidden hover:shadow-xl hover:border-malina-500/10 transition-all duration-500">
              {/* Decorative element */}
              <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-malina-500/[0.04] rounded-full -translate-y-1/2 translate-x-1/3" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-200/20 rounded-full translate-y-1/2 -translate-x-1/3" />

              <div className="relative max-w-lg mx-auto text-center">
                <span className="inline-block text-4xl mb-4">&#127827;</span>
                <h2 className="text-2xl md:text-3xl font-extrabold font-[family-name:var(--font-heading)] tracking-tight mb-4">
                  Cafe Malina
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-2">
                  Готовим пиццу, роллы, сеты и фаст-фуд каждый день. Свежие ингредиенты,
                  честные порции и быстрая доставка.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Закажите — и доставим {siteConfig.delivery.deliveryTime}. Горячее и вкусное.
                </p>
                <Link
                  href="/menu"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-malina-500 hover:text-malina-600 hover:gap-3 transition-all duration-300"
                >
                  Посмотреть меню
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
