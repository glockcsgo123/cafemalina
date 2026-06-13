# 🍕 Cafe Malina — TASKS V3
> Актуально: 02.06.2026 | Только мобильные правки и мелкие фиксы
> Выполнять по порядку. Один коммит на каждый блок.

---

## БЛОК 1 — Hero секция на мобильном

### 1.1 Убрать большую картинку пиццы на мобильном, добавить время работы

**Проблема:** На мобильном картинка пиццы/роллов в Hero занимает весь экран после кнопок — огромный пустой визуальный блок.

**Файл:** `src/app/page.tsx` или `src/components/home/Hero.tsx`

**Что сделать:**
- Картинку пиццы скрыть на мобильном: найти `<img>` или `<Image>` с hero-иллюстрацией и добавить класс `hidden md:block`
- Вместо неё на мобильном показать строку с временем работы:

```tsx
{/* Показывать только на мобильном, вместо картинки */}
<div className="flex items-center justify-center gap-2 text-sm text-muted-foreground bg-white/60 rounded-xl px-4 py-3 md:hidden mt-4">
  <Clock className="h-4 w-4 text-[#BE1E5A] flex-shrink-0" />
  <span>Работаем ежедневно <strong>10:00 — 23:00</strong></span>
</div>
```

- Импортировать `Clock` из `lucide-react` если ещё не импортирован

**Результат:** на мобильном вместо огромной картинки — компактная строка с часами работы. На десктопе всё остаётся как есть.

---

## БЛОК 2 — Кнопка звонка не перекрывает контент

### 2.1 Поднять кнопку звонка над нижней навигацией

**Файл:** `src/components/CallButton.tsx`

**Проблема:** На мобильном кнопка звонка накладывается на нижнюю навигацию и перекрывает контент внизу страницы.

**Что сделать:**
```tsx
// Было:
className="fixed bottom-8 right-6 z-50 ..."
// Стало:
className="fixed bottom-20 right-4 z-50 md:bottom-8 md:right-6 ..."
```
- На мобильном: `bottom-20` (выше нижней навбары которая 64px = 16) и `right-4`
- На десктопе: `bottom-8 right-6` как было
- Убрать ВСЕ классы `shadow-*` и `drop-shadow-*` — тени нет совсем

---

## БЛОК 3 — Шапка на мобильном

### 3.1 Убрать текст номера телефона на мобильном

**Файл:** `src/components/layout/Header.tsx`

**Что сделать:** номер телефона показывать только на десктопе, на мобильном — только иконка:

```tsx
<a
  href="tel:+79107403111"
  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
>
  <Phone className="h-4 w-4" />
  <span className="hidden md:inline">+7 (910) 740-31-11</span>
</a>
```

---

## БЛОК 4 — Нижняя навигация на мобильном

### 4.1 Создать MobileNav компонент

**Создать файл:** `src/components/layout/MobileNav.tsx`

```tsx
"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, UtensilsCrossed, ShoppingBag } from "lucide-react"

export function MobileNav() {
  const pathname = usePathname()
  if (pathname.startsWith("/admin")) return null

  const links = [
    { href: "/", icon: Home, label: "Главная" },
    { href: "/menu", icon: UtensilsCrossed, label: "Меню" },
    { href: "/checkout", icon: ShoppingBag, label: "Корзина" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-gray-100">
      <div className="flex items-center justify-around h-16 px-2">
        {links.map(({ href, icon: Icon, label }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-1 px-5 py-2 rounded-xl transition-colors ${
                active
                  ? "text-[#BE1E5A]"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
```

### 4.2 Подключить MobileNav в layout

**Файл:** `src/app/layout.tsx`

- Импортировать `MobileNav`
- Добавить `<MobileNav />` перед закрывающим тегом `</body>`
- Добавить отступ снизу для основного контента на мобильном:

```tsx
// Найти <main> тег и добавить класс:
<main className="min-h-screen pb-16 md:pb-0">
  {children}
</main>
```

---

## БЛОК 5 — Карточки блюд на мобильном

### 5.1 Цена и кнопка в одну строку

**Файл:** компонент карточки (MenuCard.tsx или аналогичный)

**Проблема:** цена 680 ₽ и кнопка «В корзину» не помещаются в одну строку на мобильном — кнопка обрезается.

**Что сделать:**
```tsx
{/* Нижняя часть карточки */}
<div className="flex items-center justify-between gap-2 p-3 pt-0">
  <span className="font-bold text-base whitespace-nowrap">
    {price} ₽
  </span>
  <Button
    size="sm"
    className="whitespace-nowrap flex-shrink-0 h-9 px-3 text-sm"
    onClick={handleAddToCart}
  >
    + В корзину
  </Button>
</div>
```

Ключевые классы:
- На цене: `whitespace-nowrap` — цена и ₽ не переносятся
- На кнопке: `whitespace-nowrap flex-shrink-0` — кнопка не сжимается и не переносит текст
- На контейнере: `gap-2` — минимальный отступ между ценой и кнопкой

---

## БЛОК 6 — Пивные сеты: заглушка

### 6.1 Убрать фото пива, поставить заглушку

**Файл:** `src/lib/data/menu.ts` или `data/menu.json`

Найти блюда «Пивной сет Medium» и «Пивной сет Max», изменить image:
```json
"image": "/images/placeholder-roll.jpg"
```

Удалить файлы `public/images/beer-medium.jpg` и `public/images/beer-max.jpg` — они были сгенерированы автоматически и выглядят неуместно (фото кружки пива на чёрном фоне не подходит для кафе).

---

## БЛОК 7 — Пароль админки

### 7.1 Проверить и исправить авторизацию

**Файл:** `src/app/api/auth/route.ts`

Добавить временный лог для диагностики:
```typescript
export async function POST(request: Request) {
  const { password } = await request.json()
  console.log("Received password:", password)
  console.log("Expected password:", process.env.ADMIN_PASSWORD)
  console.log("Match:", password === process.env.ADMIN_PASSWORD)
  // ...
}
```

Запустить `npm run dev`, попробовать войти с паролем `malina2024`, посмотреть вывод в терминале.

**Частые причины проблемы:**
1. В `.env.local` пароль написан с кавычками: `ADMIN_PASSWORD="malina2024"` → убрать кавычки → `ADMIN_PASSWORD=malina2024`
2. После изменения `.env.local` нужно перезапустить сервер (`Ctrl+C` → `npm run dev`)
3. Сравнение `==` вместо `===`
4. Cookie не устанавливается — проверить что response включает `Set-Cookie` заголовок

После нахождения проблемы — убрать console.log, задеплоить.

---

## ✅ Чеклист после выполнения всех блоков

Проверь каждый пункт на реальном телефоне или в DevTools (390px):

**Hero (главная):**
- [ ] Картинка пиццы НЕ видна на мобильном
- [ ] Вместо неё показывается строка «Работаем ежедневно 10:00 — 23:00»
- [ ] На десктопе картинка пиццы на месте, строка с часами не видна

**Шапка:**
- [ ] На мобильном: логотип + иконка телефона + иконка корзины — всё в одну строку
- [ ] Текст номера телефона НЕ показывается на мобильном

**Нижняя навигация:**
- [ ] Видна нижняя панель: Главная / Меню / Корзина
- [ ] Активная вкладка — малиновая
- [ ] На странице /admin навигация НЕ показывается

**Кнопка звонка:**
- [ ] Находится ВЫШЕ нижней навигации (не перекрывает её)
- [ ] Нет тени
- [ ] На десктопе — в правом нижнем углу как обычно

**Карточки:**
- [ ] Цена «680 ₽» — цифра и знак в одну строку, не переносится
- [ ] Кнопка «+ В корзину» полностью видна, не обрезается по краю

**Пивные сеты:**
- [ ] «Пивной сет Medium» и «Пивной сет Max» — показывают заглушку, не фото пива

**Админка:**
- [ ] Вход с паролем `malina2024` работает
- [ ] `/admin` без логина → редирект на `/admin/login`

Сделай `npm run build` в конце — должно собраться без ошибок.
