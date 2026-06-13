# Cafe Malina — TASKS V5
> Обновление контента меню. Выполнять по порядку. Один коммит на блок.

---

## ПОДГОТОВКА — Заглушки для новых категорий
Разархивируй `placeholders.zip` в `public/images/`:
```bash
unzip -o placeholders.zip -d public/images/
```
Файлы которые появятся:
- `placeholder-fastfood.jpg` 🍟
- `placeholder-udon.jpg` 🍜
- `placeholder-funczoza.jpg` 🍝
- `placeholder-tyakhan.jpg` 🥘
- `placeholder-dessert.jpg` 🍰
- `placeholder-cocktail.jpg` 🥤
- `placeholder-icecream.jpg` 🍦
- `placeholder-sauce.jpg` 🫙
- `placeholder-cheesecake.jpg` 🎂
- `placeholder-beer-set.jpg` 🍺

---

## БЛОК 1 — Правки пиццы (только состав)

В `src/lib/data/menu.ts` найти и исправить description у следующих пицц:

**1. Сырная** — убрать «кунжут» из состава:
```
Было: "соус сырный, сыр моцарелла, кунжут белый, пармезан"
Стало: "соус сырный, сыр моцарелла, пармезан"
```

**2. Пронтиссимо** — убрать «сливочный сыр» из состава:
```
Найти description с "сливочный сыр" у пиццы Пронтиссимо — убрать этот ингредиент
```

**3. Итальянская** — добавить «помидоры» в состав:
```
Найти Итальянскую пиццу — добавить "помидоры" в description
```

**4. Песто** — убрать дублирующийся «соус песто» (написан дважды):
```
Найти пиццу Песто — оставить "соус песто" только один раз в составе
```

**5. Чеддер** (или пицца с чеддером) — добавить «помидоры» в состав:
```
Найти пиццу с чеддером в составе — добавить "помидоры" в description
```

---

## БЛОК 2 — Правки цен роллов

В `menu.ts` найти и изменить `price` у следующих позиций:

| Название | Новая цена |
|----------|-----------|
| Запечённый с креветкой | 435 |
| Запечённый спайси с креветкой | 405 |
| Хонако Hot | 425 |

---

## БЛОК 3 — Удалить позиции из меню

В `menu.ts` полностью удалить следующие позиции (найти по name):
- «Соевый соус» (soevyi-sous)
- «Васаби» (если есть)
- «Имбирь» (если есть)
- «Чайник» (drink-teapot)

Также удалить `public/images/` файлы этих позиций если они есть.

---

## БЛОК 4 — Обновить пивные сеты

Найти «Пивной сет Medium» и «Пивной сет Max», обновить `description` и `price`:

**Пивной сет Medium — 750₽:**
```
description: "фри, луковые кольца, кольца кальмара, гренки, наггетсы, соус 2 шт"
price: 750
image: "/images/placeholder-beer-set.jpg"
```

**Пивной сет Max — 1240₽:**
```
description: "фри, луковые кольца, кольца кальмара, гренки, наггетсы, крылышки, сырные палочки, жареные колбаски, соус 3 шт"
price: 1240
image: "/images/placeholder-beer-set.jpg"
```

---

## БЛОК 5 — Новая категория «Фаст-фуд»

Добавить категорию в массив `categories`:
```typescript
{ id: "fastfood", name: "Фаст-фуд" }
```

Добавить все позиции в массив `menuItems`. Для каждой позиции: `category: "fastfood"`, `image: "/images/placeholder-fastfood.jpg"`:

```typescript
// Простые позиции
{ id: "fri-50",      name: "Фри 50г",      price: 110, weight: "50г",   category: "fastfood", image: "/images/placeholder-fastfood.jpg" },
{ id: "fri-100",     name: "Фри 100г",     price: 155, weight: "100г",  category: "fastfood", image: "/images/placeholder-fastfood.jpg" },
{ id: "fri-150",     name: "Фри 150г",     price: 210, weight: "150г",  category: "fastfood", image: "/images/placeholder-fastfood.jpg" },
{ id: "potato-derevenskiy", name: "Картофель по-деревенски", price: 165, weight: "100г", category: "fastfood", image: "/images/placeholder-fastfood.jpg" },
{ id: "nuggets-6",   name: "Наггетсы 6шт", price: 190, weight: "6шт",  category: "fastfood", image: "/images/placeholder-fastfood.jpg" },
{ id: "nuggets-12",  name: "Наггетсы 12шт",price: 335, weight: "12шт", category: "fastfood", image: "/images/placeholder-fastfood.jpg" },
{ id: "nuggets-18",  name: "Наггетсы 18шт",price: 475, weight: "18шт", category: "fastfood", image: "/images/placeholder-fastfood.jpg" },
{ id: "shrimp-3",    name: "Креветки темпура 3шт", price: 240, weight: "3шт", category: "fastfood", image: "/images/placeholder-fastfood.jpg" },
{ id: "shrimp-6",    name: "Креветки темпура 6шт", price: 420, weight: "6шт", category: "fastfood", image: "/images/placeholder-fastfood.jpg" },
{ id: "shrimp-9",    name: "Креветки темпура 9шт", price: 610, weight: "9шт", category: "fastfood", image: "/images/placeholder-fastfood.jpg" },
{ id: "cheese-sticks", name: "Сырные палочки", price: 229, weight: "5шт", category: "fastfood", image: "/images/placeholder-fastfood.jpg" },
{ id: "onion-rings", name: "Луковые кольца", price: 190, weight: "5шт", category: "fastfood", image: "/images/placeholder-fastfood.jpg" },
{ id: "squid-rings", name: "Кольца кальмара", price: 145, weight: "3шт", category: "fastfood", image: "/images/placeholder-fastfood.jpg" },
{ id: "croutons",    name: "Гренки чесночные", price: 145, weight: "9шт", category: "fastfood", image: "/images/placeholder-fastfood.jpg" },
{ id: "strips",      name: "Стрипсы",      price: 229, weight: "130г",  category: "fastfood", image: "/images/placeholder-fastfood.jpg" },
{ id: "wings",       name: "Крылышки",     price: 215, weight: "5шт",  category: "fastfood", image: "/images/placeholder-fastfood.jpg" },
{ id: "wings-spicy", name: "Крылышки острые", price: 225, weight: "5шт", category: "fastfood", image: "/images/placeholder-fastfood.jpg" },
{ id: "sandwich-fri",name: "Сендвич с фри",price: 295, category: "fastfood", image: "/images/placeholder-fastfood.jpg" },
{ id: "sandwich",    name: "Сендвич",      price: 215, category: "fastfood", image: "/images/placeholder-fastfood.jpg" },
{ id: "potato-sausage", name: "Картофель по-деревенски с колбасками", description: "с охотничьими колбасками, чесночный соус", price: 275, category: "fastfood", image: "/images/placeholder-fastfood.jpg" },
{ id: "potato-bacon",   name: "Картофель по-деревенски с беконом",   description: "с беконом и соусом",                       price: 275, category: "fastfood", image: "/images/placeholder-fastfood.jpg" },
{ id: "fri-sausage", name: "Картофель фри с колбасками", description: "с охотничьими колбасками, чесночный соус", price: 265, category: "fastfood", image: "/images/placeholder-fastfood.jpg" },
{ id: "fri-bacon",   name: "Картофель фри с беконом",   description: "с беконом и соусом",                       price: 265, category: "fastfood", image: "/images/placeholder-fastfood.jpg" },

// Соусы (фаст-фуд)
{ id: "sauce-cheese",  name: "Соус сырный",        price: 45, weight: "30г", category: "fastfood", image: "/images/placeholder-sauce.jpg" },
{ id: "sauce-garlic",  name: "Соус чесночный",     price: 45, weight: "30г", category: "fastfood", image: "/images/placeholder-sauce.jpg" },
{ id: "sauce-tomato",  name: "Соус томатный",      price: 45, weight: "30г", category: "fastfood", image: "/images/placeholder-sauce.jpg" },
{ id: "sauce-sweet",   name: "Соус кисло-сладкий", price: 45, weight: "30г", category: "fastfood", image: "/images/placeholder-sauce.jpg" },
```

---

## БЛОК 6 — Новая категория «Удон, Функоза, Тяхан»

Добавить категорию:
```typescript
{ id: "noodles", name: "Удон, Функоза, Тяхан" }
```

Добавить позиции (`category: "noodles"`):

```typescript
// УДОН
{ id: "udon-chicken",    name: "Удон с курицей",        price: 329, category: "noodles", image: "/images/placeholder-udon.jpg" },
{ id: "udon-bacon",      name: "Удон с беконом",        price: 329, category: "noodles", image: "/images/placeholder-udon.jpg" },
{ id: "udon-seafood",    name: "Удон с морепродуктами", price: 359, category: "noodles", image: "/images/placeholder-udon.jpg" },

// ФУНКОЗА
{ id: "funczoza-chicken", name: "Функоза с курицей",        price: 329, category: "noodles", image: "/images/placeholder-funczoza.jpg" },
{ id: "funczoza-bacon",   name: "Функоза с беконом",        price: 329, category: "noodles", image: "/images/placeholder-funczoza.jpg" },
{ id: "funczoza-seafood", name: "Функоза с морепродуктами", price: 359, category: "noodles", image: "/images/placeholder-funczoza.jpg" },

// ТЯХАН
{ id: "tyakhan-chicken",  name: "Тяхан с курицей",        price: 329, category: "noodles", image: "/images/placeholder-tyakhan.jpg" },
{ id: "tyakhan-bacon",    name: "Тяхан с беконом",        price: 329, category: "noodles", image: "/images/placeholder-tyakhan.jpg" },
{ id: "tyakhan-seafood",  name: "Тяхан с морепродуктами", price: 359, category: "noodles", image: "/images/placeholder-tyakhan.jpg" },
```

---

## БЛОК 7 — Новая категория «Десерты»

Добавить категорию:
```typescript
{ id: "desserts", name: "Десерты" }
```

Добавить позиции:
```typescript
{ id: "cheesecake-classic",  name: "Чизкейк классический",         price: 140, category: "desserts", image: "/images/placeholder-cheesecake.jpg" },
{ id: "cheesecake-choco",    name: "Чизкейк шоколадный",           price: 140, category: "desserts", image: "/images/placeholder-cheesecake.jpg" },
{ id: "cheesecake-caramel",  name: "Чизкейк карамельно-ореховый",  price: 155, category: "desserts", image: "/images/placeholder-cheesecake.jpg" },
{ id: "icecream",            name: "Мороженое",                    price: 150, category: "desserts", image: "/images/placeholder-icecream.jpg" },
// Молочный коктейль — варианты объёма
{
  id: "milkshake",
  name: "Молочный коктейль",
  price: 130,
  category: "desserts",
  image: "/images/placeholder-cocktail.jpg",
  variants: [
    { name: "0,4л", price: 130 },
    { name: "0,5л", price: 175 },
  ]
},
```

---

## БЛОК 8 — Обновить напитки и чай

В существующих позициях категории `drinks` обновить цены:

| Позиция | Новая цена |
|---------|-----------|
| Эспрессо | 100 |
| Американо | 110 |
| Капучино | 130 |
| Латте | 140 |
| Чай (чашка) | 50 |

Чайник — удалён в блоке 3. Добавить отдельную позицию если не было:
```typescript
{ id: "tea-cup",    name: "Чай", description: "чашка", price: 50,  category: "drinks", image: "/images/placeholder-udon.jpg" },
```

---

## БЛОК 9 — Обновить условия доставки

В `src/lib/data/site.ts` (или где хранятся настройки сайта) обновить:

```typescript
delivery: {
  minOrderAmount: 500,        // мин. заказ
  freeDeliveryFrom: 1500,     // бесплатная доставка от
  estimatedTime: "60 минут",  // время доставки (было 40, стало 60)
}
```

Найти все места на сайте где написано:
- «Бесплатная доставка от 1000 ₽» → заменить на «Бесплатная доставка от 1500 ₽»
- «Доставка от 40 минут» → заменить на «Доставка от 60 минут»

Файлы где может быть: `page.tsx`, `delivery/page.tsx`, `Footer.tsx`, Hero компонент.

---

## БЛОК 10 — Режим работы будни/выходные

В настройках сайта и на всех страницах где упоминается время работы:

```typescript
workingHours: {
  weekdays: { open: 10, close: 23 },   // пн-пт
  weekends: { open: 11, close: 23 },   // сб-вс
}
```

Обновить текст везде:
```
Было: «Ежедневно 10:00 — 23:00»
Стало: «Пн–Пт: 10:00–23:00, Сб–Вс: 11:00–23:00»
```

Обновить логику в корзине (блок времени работы):
```typescript
const now = new Date()
const hour = now.getHours()
const day = now.getDay() // 0=вс, 6=сб
const isWeekend = day === 0 || day === 6
const openHour = isWeekend ? 11 : 10
const isOpen = hour >= openHour && hour < 23
```

---

## ✅ Чеклист после выполнения

- [ ] Пицца Сырная — нет «кунжут» в составе
- [ ] Пицца Пронтиссимо — нет «сливочный сыр»
- [ ] Пицца Итальянская — есть «помидоры»
- [ ] Пицца Песто — «соус песто» один раз
- [ ] Пицца с чеддером — есть «помидоры»
- [ ] Запечённый с креветкой — 435₽
- [ ] Запечённый спайси с креветкой — 405₽
- [ ] Хонако Hot — 425₽
- [ ] Соевый соус, Васаби, Имбирь, Чайник — удалены из меню
- [ ] Пивной сет Medium — 750₽, правильный состав
- [ ] Пивной сет Max — 1240₽, правильный состав
- [ ] Категория «Фаст-фуд» — все позиции добавлены, заглушки 🍟
- [ ] Категория «Удон, Функоза, Тяхан» — 9 позиций, заглушки 🍜🍝🥘
- [ ] Категория «Десерты» — 5 позиций + молочный коктейль с вариантами
- [ ] Напитки: цены обновлены (эспрессо 100, американо 110, капучино 130, латте 140)
- [ ] «Бесплатная доставка от 1500 ₽» везде на сайте
- [ ] «Доставка от 60 минут» везде на сайте
- [ ] Режим работы: будни 10–23, выходные 11–23
- [ ] Логика в корзине: в выходные открытие с 11:00
- [ ] `npm run build` — без ошибок
