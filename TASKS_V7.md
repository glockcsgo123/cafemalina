# Cafe Malina — TASKS V7
> Карта доставки с зонами. Яндекс.Карты API.

---

## ПОДГОТОВКА — Переменные окружения

Добавить в `.env.local`:
```
NEXT_PUBLIC_YANDEX_MAPS_API_KEY=6bf9dc71-9c2d-4ac1-a293-69ae9a33201c
```
Добавить в Vercel Environment Variables то же самое.

---

## Зоны доставки (координаты центра кафе)

```typescript
// Координаты кафе
const CAFE_COORDS = { lat: 51.6553, lng: 36.1977 }

// Зоны: радиус в км → минимальный заказ
const DELIVERY_ZONES = [
  { id: 1, radius: 2,  minOrder: 1500, color: "#22c55e", label: "Зона 1" },
  { id: 2, radius: 5,  minOrder: 1800, color: "#eab308", label: "Зона 2" },
  { id: 3, radius: 10, minOrder: 2100, color: "#f97316", label: "Зона 3" },
  { id: 4, radius: 18, minOrder: 2400, color: "#ef4444", label: "Зона 4" },
]
// Вне всех зон — не доставляем
```

---

## БЛОК 1 — Утилита определения зоны

Создать `src/lib/delivery.ts`:

```typescript
export const CAFE_COORDS = { lat: 51.6553, lng: 36.1977 }

export const DELIVERY_ZONES = [
  { id: 1, radius: 2,  minOrder: 1500, color: "#22c55e", label: "Зона 1" },
  { id: 2, radius: 5,  minOrder: 1800, color: "#eab308", label: "Зона 2" },
  { id: 3, radius: 10, minOrder: 2100, color: "#f97316", label: "Зона 3" },
  { id: 4, radius: 18, minOrder: 2400, color: "#ef4444", label: "Зона 4" },
]

// Расстояние между двумя точками в км (формула Haversine)
export function getDistanceKm(
  lat1: number, lng1: number,
  lat2: number, lng2: number
): number {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a =
    Math.sin(dLat/2) ** 2 +
    Math.cos(lat1 * Math.PI/180) *
    Math.cos(lat2 * Math.PI/180) *
    Math.sin(dLng/2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
}

// Определить зону по координатам
export function getDeliveryZone(lat: number, lng: number) {
  const dist = getDistanceKm(CAFE_COORDS.lat, CAFE_COORDS.lng, lat, lng)
  const zone = DELIVERY_ZONES.find(z => dist <= z.radius)
  return zone ?? null // null = вне зоны доставки
}

// Геокодирование адреса через Яндекс
export async function geocodeAddress(address: string): Promise<{ lat: number; lng: number } | null> {
  const apiKey = process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY
  const query = encodeURIComponent(`Курская область, ${address}`)
  const url = `https://geocode-maps.yandex.ru/1.x/?apikey=${apiKey}&geocode=${query}&format=json&results=1`
  try {
    const res = await fetch(url)
    const data = await res.json()
    const pos = data?.response?.GeoObjectCollection?.featureMember?.[0]
      ?.GeoObject?.Point?.pos
    if (!pos) return null
    const [lng, lat] = pos.split(" ").map(Number)
    return { lat, lng }
  } catch {
    return null
  }
}
```

---

## БЛОК 2 — Компонент карты доставки

Создать `src/components/delivery/DeliveryMap.tsx`:

```tsx
"use client"
import { useEffect, useRef, useState } from "react"
import { CAFE_COORDS, DELIVERY_ZONES, geocodeAddress, getDeliveryZone } from "@/lib/delivery"
import { Search, MapPin, CheckCircle, XCircle, Loader2 } from "lucide-react"

declare global {
  interface Window { ymaps: any }
}

export function DeliveryMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<any>(null)
  const [address, setAddress] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{
    zone: typeof DELIVERY_ZONES[0] | null
    found: boolean
  } | null>(null)

  // Загрузка Яндекс.Карт
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY
    if (window.ymaps) { initMap(); return }
    const script = document.createElement("script")
    script.src = `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU`
    script.onload = () => window.ymaps.ready(initMap)
    document.head.appendChild(script)
  }, [])

  function initMap() {
    if (!mapRef.current || mapInstance.current) return
    const map = new window.ymaps.Map(mapRef.current, {
      center: [CAFE_COORDS.lat, CAFE_COORDS.lng],
      zoom: 11,
      controls: ["zoomControl"],
    })
    mapInstance.current = map

    // Метка кафе
    map.geoObjects.add(new window.ymaps.Placemark(
      [CAFE_COORDS.lat, CAFE_COORDS.lng],
      { balloonContent: "Кафе Malina" },
      { preset: "islands#redFoodIcon" }
    ))

    // Круги зон (от большего к меньшему)
    ;[...DELIVERY_ZONES].reverse().forEach(zone => {
      map.geoObjects.add(new window.ymaps.Circle(
        [[CAFE_COORDS.lat, CAFE_COORDS.lng], zone.radius * 1000],
        { balloonContent: `${zone.label} — от ${zone.minOrder} ₽` },
        {
          fillColor: zone.color + "20",
          strokeColor: zone.color,
          strokeWidth: 2,
          fillOpacity: 0.3,
        }
      ))
    })
  }

  async function checkAddress() {
    if (!address.trim()) return
    setLoading(true)
    setResult(null)
    const coords = await geocodeAddress(address)
    if (!coords) {
      setResult({ zone: null, found: false })
      setLoading(false)
      return
    }
    const zone = getDeliveryZone(coords.lat, coords.lng)
    setResult({ zone, found: true })

    // Показать точку на карте
    if (mapInstance.current && window.ymaps) {
      mapInstance.current.geoObjects.each((obj: any) => {
        if (obj.properties?.get("isUserPin")) {
          mapInstance.current.geoObjects.remove(obj)
        }
      })
      const pin = new window.ymaps.Placemark(
        [coords.lat, coords.lng],
        {
          balloonContent: zone
            ? `${zone.label} — от ${zone.minOrder} ₽`
            : "Вне зоны доставки",
          isUserPin: true,
        },
        { preset: zone ? "islands#blueCircleDotIcon" : "islands#grayCircleDotIcon" }
      )
      pin.properties.set("isUserPin", true)
      mapInstance.current.geoObjects.add(pin)
      mapInstance.current.setCenter([coords.lat, coords.lng], 12)
    }
    setLoading(false)
  }

  return (
    <div className="space-y-4">
      {/* Легенда зон */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {DELIVERY_ZONES.map(zone => (
          <div key={zone.id}
            className="flex items-center gap-2 p-3 rounded-xl border bg-white"
            style={{ borderColor: zone.color }}>
            <div className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: zone.color }} />
            <div>
              <p className="text-xs font-semibold">{zone.label}</p>
              <p className="text-xs text-muted-foreground">от {zone.minOrder} ₽</p>
            </div>
          </div>
        ))}
      </div>

      {/* Поле проверки адреса */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={address}
            onChange={e => setAddress(e.target.value)}
            onKeyDown={e => e.key === "Enter" && checkAddress()}
            placeholder="Введите ваш адрес..."
            className="w-full pl-10 pr-4 h-11 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#BE1E5A] focus:ring-2 focus:ring-[#BE1E5A]/20"
          />
        </div>
        <button
          onClick={checkAddress}
          disabled={loading || !address.trim()}
          className="flex items-center gap-2 px-4 h-11 rounded-xl bg-[#BE1E5A] text-white text-sm font-medium disabled:opacity-50 transition-opacity"
        >
          {loading
            ? <Loader2 className="h-4 w-4 animate-spin" />
            : <Search className="h-4 w-4" />
          }
          Проверить
        </button>
      </div>

      {/* Результат проверки */}
      {result && (
        <div className={`flex items-start gap-3 p-4 rounded-xl ${
          result.zone
            ? "bg-green-50 border border-green-200"
            : "bg-red-50 border border-red-200"
        }`}>
          {result.zone ? (
            <>
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-green-800">Доставляем!</p>
                <p className="text-sm text-green-700">
                  Минимальный заказ для вашего адреса — <strong>{result.zone.minOrder} ₽</strong>
                </p>
              </div>
            </>
          ) : (
            <>
              <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-800">Вне зоны доставки</p>
                <p className="text-sm text-red-700">
                  Позвоните нам:{" "}
                  <a href="tel:+79107403111" className="font-medium underline">
                    +7 (910) 740-31-11
                  </a>
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Карта */}
      <div ref={mapRef} className="w-full h-[400px] rounded-2xl overflow-hidden border border-gray-200" />
    </div>
  )
}
```

---

## БЛОК 3 — Страница доставки

Обновить `src/app/delivery/page.tsx` — добавить карту и зоны:

```tsx
import { DeliveryMap } from "@/components/delivery/DeliveryMap"
import { DELIVERY_ZONES } from "@/lib/delivery"

export default function DeliveryPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8 pb-24 md:pb-8">
      <h1 className="text-3xl font-bold mb-2">Доставка</h1>
      <p className="text-muted-foreground mb-8">
        Доставляем ежедневно: Пн–Пт 10:00–23:00, Сб–Вс 11:00–23:00
      </p>

      {/* Условия */}
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <div className="p-4 rounded-2xl bg-white border">
          <h3 className="font-semibold mb-3">Условия доставки</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Доставка бесплатная при достижении минимальной суммы</li>
            <li>• Время доставки от 60 минут</li>
            <li>• Оплата при получении</li>
          </ul>
        </div>
        <div className="p-4 rounded-2xl bg-white border">
          <h3 className="font-semibold mb-3">Зоны и минимальный заказ</h3>
          <ul className="space-y-2">
            {DELIVERY_ZONES.map(zone => (
              <li key={zone.id} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: zone.color }} />
                  до {zone.radius} км
                </span>
                <span className="font-semibold">от {zone.minOrder} ₽</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Карта */}
      <h2 className="text-xl font-bold mb-4">Проверить адрес доставки</h2>
      <DeliveryMap />
    </main>
  )
}
```

---

## БЛОК 4 — Проверка зоны в корзине/чекауте

В форме оформления заказа после поля «Адрес» добавить автопроверку зоны:

```tsx
"use client"
import { useState } from "react"
import { geocodeAddress, getDeliveryZone, DELIVERY_ZONES } from "@/lib/delivery"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"

// Внутри компонента чекаута:
const [zoneLoading, setZoneLoading] = useState(false)
const [deliveryZone, setDeliveryZone] = useState<typeof DELIVERY_ZONES[0] | null | "outside">(null)

// При изменении адреса с debounce 800ms:
async function handleAddressChange(value: string) {
  setAddress(value)
  if (value.length < 5) { setDeliveryZone(null); return }
  clearTimeout(addressTimeout.current)
  addressTimeout.current = setTimeout(async () => {
    setZoneLoading(true)
    const coords = await geocodeAddress(value)
    if (coords) {
      const zone = getDeliveryZone(coords.lat, coords.lng)
      setDeliveryZone(zone ?? "outside")
    }
    setZoneLoading(false)
  }, 800)
}

// JSX — показывать под полем адреса:
{zoneLoading && (
  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
    <Loader2 className="h-3 w-3 animate-spin" /> Определяем зону доставки...
  </p>
)}
{deliveryZone && deliveryZone !== "outside" && (
  <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
    <CheckCircle className="h-3 w-3" />
    Доставляем! Минимальный заказ {deliveryZone.minOrder} ₽
  </p>
)}
{deliveryZone === "outside" && (
  <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
    <XCircle className="h-3 w-3" />
    Адрес вне зоны доставки — позвоните нам
  </p>
)}

// Блокировать кнопку «Оформить» если вне зоны:
const canOrder = deliveryZone !== null
  && deliveryZone !== "outside"
  && totalPrice >= (deliveryZone as typeof DELIVERY_ZONES[0]).minOrder
```

---

## БЛОК 5 — Настройки зон в админке

В `/admin/settings` добавить раздел «Зоны доставки»:
- Таблица: Зона / Радиус (км) / Минимальный заказ
- Каждую строку можно редактировать
- Сохранять в `data/settings.json`:

```json
{
  "deliveryZones": [
    { "id": 1, "radius": 2,  "minOrder": 1500 },
    { "id": 2, "radius": 5,  "minOrder": 1800 },
    { "id": 3, "radius": 10, "minOrder": 2100 },
    { "id": 4, "radius": 18, "minOrder": 2400 }
  ]
}
```

API `PUT /api/settings` уже должен существовать — добавить поле `deliveryZones`.

Обновить `src/lib/delivery.ts` чтобы брать зоны из settings если они есть, иначе дефолтные.

---

## ✅ Чеклист

- [ ] `NEXT_PUBLIC_YANDEX_MAPS_API_KEY` добавлен в `.env.local` и Vercel
- [ ] На странице `/delivery` отображается карта с 4 цветными кругами
- [ ] Легенда зон: 4 карточки с цветом и минимальной суммой
- [ ] Ввод адреса → кнопка «Проверить» → результат с суммой или «вне зоны»
- [ ] На карте появляется метка введённого адреса
- [ ] В корзине/чекауте под полем адреса автоматически показывается зона
- [ ] Кнопка «Оформить» блокируется если адрес вне зоны или сумма меньше минимума
- [ ] В админке можно менять радиусы и суммы зон
- [ ] `npm run build` — без ошибок
