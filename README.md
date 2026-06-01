# Cafe Malina

Сайт кафе Malina — пицца и роллы с доставкой в Прямицыно, Курская область.

## Стек

- **Next.js 16** (App Router)
- **React 19**
- **Tailwind CSS 4**
- **shadcn/ui**
- **Zustand 5** (корзина)
- **TypeScript**

## Структура

```
src/
├── app/                  # Страницы (Next.js App Router)
│   ├── page.tsx          # Главная
│   ├── menu/page.tsx     # Меню
│   ├── cart/page.tsx     # Корзина
│   ├── checkout/         # Оформление заказа + success
│   ├── layout.tsx        # Общий layout
│   └── globals.css       # Стили, цвета, анимации
├── components/
│   ├── layout/           # Header, Footer
│   ├── menu/             # Карточки меню, табы категорий
│   ├── cart/             # Строка товара в корзине
│   └── ui/               # Кнопки, Reveal-анимация
└── lib/
    ├── data/
    │   ├── site.ts       # Контакты, доставка, оплата, SEO
    │   └── menu.ts       # Категории и блюда
    ├── store/cart.ts      # Zustand-стор корзины
    └── utils.ts           # Утилиты (formatPrice)
```

## Как редактировать данные

**Контакты, доставка, оплата** — `src/lib/data/site.ts`

**Меню (блюда, цены, категории)** — `src/lib/data/menu.ts`

После изменений пересоберите сайт:

```bash
npm run build
```

## Запуск

```bash
npm install
npm run build
npx next start -p 3000
```

## Логика заказа

На сайте нет онлайн-оплаты. Заказ — это заявка: клиент заполняет форму, оператор перезванивает для подтверждения. Оплата при получении (наличные, перевод, карта).
