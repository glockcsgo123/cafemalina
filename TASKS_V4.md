# Cafe Malina — TASKS V4
> Только мобильные баги. Выполнять по порядку.

## 1. Убрать строку «Работаем ежедневно» с главной
В `src/app/page.tsx` или Hero компоненте — найти и удалить блок с иконкой Clock и текстом «Работаем ежедневно 10:00 — 23:00». Удалить полностью.

## 2. Убрать телефон из шапки полностью
В `src/components/layout/Header.tsx` — найти `<a href="tel:...">` с иконкой Phone и номером — удалить весь элемент. На мобильном и десктопе телефона в шапке быть не должно. Телефон остаётся только в плавающей кнопке справа внизу.

## 3. Баг нижней навигации — лишняя кнопка
В `src/components/layout/MobileNav.tsx` заменить компонент на чистый вариант без лишних состояний:
```tsx
"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, UtensilsCrossed, ShoppingBag } from "lucide-react"
import { useCartStore } from "@/lib/store/cart" // путь подправить под проект

export function MobileNav() {
  const pathname = usePathname()
  const cartCount = useCartStore(s => s.items.reduce((n, i) => n + i.quantity, 0))
  if (pathname.startsWith("/admin")) return null

  const links = [
    { href: "/", icon: Home, label: "Главная" },
    { href: "/menu", icon: UtensilsCrossed, label: "Меню" },
    { href: "/checkout", icon: ShoppingBag, label: "Корзина", badge: cartCount },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-gray-100">
      <div className="flex items-center justify-around h-16">
        {links.map(({ href, icon: Icon, label, badge }) => {
          const active = pathname === href
          return (
            <Link key={href} href={href}
              className={`relative flex flex-col items-center gap-1 py-2 px-6 transition-colors ${active ? "text-[#BE1E5A]" : "text-gray-400"}`}>
              <div className="relative">
                <Icon className="h-5 w-5" strokeWidth={active ? 2.5 : 1.8} />
                {badge > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#BE1E5A] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {badge}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium">{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
```

## 4. Баг меню — при «Все» не грузятся картинки
В `src/app/menu/page.tsx` проблема в фильтрации или рендере при категории «все».

Проверить:
- Когда `activeCategory === "all"` — показываются ВСЕ блюда без фильтра
- Ключи (`key`) у карточек должны быть уникальными: `key={item.id}`, не `key={index}`
- `<Image>` компонент Next.js — добавить `unoptimized` или прописать домен в `next.config.ts`:
```ts
// next.config.ts
images: {
  unoptimized: true
}
```
- Убедиться что при смене категории стейт сбрасывается корректно и не кешируется старый список

## 5. Карточки блюд на мобильном — полная оптимизация
В компоненте карточки (MenuCard или аналог):

```tsx
// Обёртка карточки
<div className="flex flex-col rounded-2xl overflow-hidden bg-white border border-gray-100 h-full">

  {/* Фото — строгое соотношение */}
  <div className="relative aspect-[4/3] w-full overflow-hidden">
    <Image src={item.image} alt={item.name} fill
      className="object-cover object-center"
      sizes="(max-width: 768px) 50vw, 25vw"
    />
    {/* Бейдж цены */}
    <span className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-xs font-bold px-2 py-1 rounded-lg">
      {price} ₽
    </span>
  </div>

  {/* Контент */}
  <div className="flex flex-col flex-1 p-3 gap-2">
    <p className="font-semibold text-sm leading-tight line-clamp-2">{item.name}</p>
    {item.description && (
      <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
    )}

    {/* Варианты размеров если есть */}
    {item.variants && item.variants.length > 1 && (
      <div className="flex gap-1.5 flex-wrap">
        {item.variants.map(v => (
          <button key={v.name}
            className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
              selectedVariant?.name === v.name
                ? "bg-[#BE1E5A] text-white border-[#BE1E5A]"
                : "border-gray-200 text-gray-600"
            }`}
            onClick={() => setSelectedVariant(v)}>
            {v.name}
          </button>
        ))}
      </div>
    )}

    {/* Цена + кнопка — всегда в одну строку */}
    <div className="flex items-center justify-between gap-2 mt-auto">
      <span className="font-bold text-sm whitespace-nowrap">{price} ₽</span>
      <button
        className="flex items-center gap-1 bg-[#BE1E5A] text-white text-xs font-semibold px-3 py-2 rounded-xl whitespace-nowrap flex-shrink-0 active:scale-95 transition-transform"
        onClick={handleAdd}>
        + В корзину
      </button>
    </div>
  </div>
</div>
```

Grid для страницы меню на мобильном:
```tsx
<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
```

## 6. Время работы в корзине / оформлении заказа
В компоненте корзины или `src/app/checkout/page.tsx` — добавить блок перед кнопкой «Оформить заказ»:

```tsx
"use client"
// Определить время работы
const now = new Date()
const hour = now.getHours()
const isOpen = hour >= 10 && hour < 23

// JSX — добавить над кнопкой оформления:
<div className={`flex items-center gap-2 text-sm rounded-xl px-4 py-3 mb-4 ${
  isOpen
    ? "bg-green-50 text-green-700"
    : "bg-amber-50 text-amber-700"
}`}>
  <Clock className="h-4 w-4 flex-shrink-0" />
  <span>
    {isOpen
      ? "Принимаем заказы — доставляем до 23:00"
      : "Сейчас не работаем. Доставка ежедневно 10:00 — 23:00"}
  </span>
</div>
```

---

## ✅ Чеклист — проверить после всего

- [ ] На главной НЕТ строки «Работаем ежедневно»
- [ ] В шапке НЕТ телефона ни текстом ни иконкой
- [ ] Нижняя навигация: нет лишних кнопок, счётчик корзины отображается корректно
- [ ] Меню «Все» — загружаются все карточки с фото
- [ ] Меню по категориям — фильтрация работает корректно
- [ ] Карточки на мобильном: цена и кнопка в одну строку, фото не растянуто
- [ ] В корзине/чекауте — блок с временем работы
- [ ] `npm run build` — без ошибок
