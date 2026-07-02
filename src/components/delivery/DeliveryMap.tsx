"use client";

import { useEffect, useRef, useState } from "react";
import {
  CAFE_COORDS,
  DELIVERY_ZONES,
  geocodeAddress,
  getDeliveryZone,
  type DeliveryZone,
} from "@/lib/delivery";
import { Search, MapPin, CheckCircle, XCircle, Loader2 } from "lucide-react";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ymaps: any;
  }
}

export function DeliveryMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstance = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userPinRef = useRef<any>(null);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    zone: DeliveryZone | null;
    found: boolean;
  } | null>(null);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY;
    // `active` flag prevents stale init after React StrictMode unmount
    let active = true;

    function initMap() {
      if (!active || !mapRef.current || mapInstance.current) return;

      const map = new window.ymaps.Map(mapRef.current, {
        center: [CAFE_COORDS.lat, CAFE_COORDS.lng],
        zoom: 11,
        controls: ["zoomControl"],
      });

      // Guard again — component may have unmounted during Map constructor
      if (!active) {
        try { map.destroy(); } catch { /* ignore */ }
        return;
      }

      mapInstance.current = map;

      // Метка кафе
      map.geoObjects.add(
        new window.ymaps.Placemark(
          [CAFE_COORDS.lat, CAFE_COORDS.lng],
          { balloonContent: "Кафе Malina" },
          { preset: "islands#redFoodIcon" },
        ),
      );

      // Круги зон (от большего к меньшему, чтобы маленькие были поверх)
      ;[...DELIVERY_ZONES].reverse().forEach((zone) => {
        map.geoObjects.add(
          new window.ymaps.Circle(
            [[CAFE_COORDS.lat, CAFE_COORDS.lng], zone.radius * 1000],
            { balloonContent: `${zone.label} — от ${zone.minOrder.toLocaleString("ru")} ₽` },
            {
              fillColor: zone.color + "33",
              strokeColor: zone.color,
              strokeWidth: 2,
              fillOpacity: 1,
            },
          ),
        );
      });
    }

    function bootstrap() {
      if (window.ymaps) {
        window.ymaps.ready(initMap);
        return;
      }

      const existing = document.querySelector(
        'script[src*="api-maps.yandex.ru"]',
      ) as HTMLScriptElement | null;

      if (existing) {
        // Script tag already in DOM (e.g. StrictMode second mount after fast load)
        existing.addEventListener("load", () => {
          if (active) window.ymaps?.ready(initMap);
        });
        return;
      }

      const script = document.createElement("script");
      script.src = `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU&load=package.full`;
      script.async = true;
      script.onload = () => {
        if (active) window.ymaps.ready(initMap);
      };
      document.head.appendChild(script);
    }

    bootstrap();

    // Cleanup: destroy map so StrictMode second mount starts fresh
    return () => {
      active = false;
      if (mapInstance.current) {
        try { mapInstance.current.destroy(); } catch { /* ignore */ }
        mapInstance.current = null;
      }
      userPinRef.current = null;
    };
  }, []);

  async function checkAddress() {
    if (!address.trim()) return;
    setLoading(true);
    setResult(null);

    const coords = await geocodeAddress(address);
    if (!coords) {
      setResult({ zone: null, found: false });
      setLoading(false);
      return;
    }

    const zone = getDeliveryZone(coords.lat, coords.lng);
    setResult({ zone, found: true });

    if (mapInstance.current && window.ymaps) {
      if (userPinRef.current) {
        mapInstance.current.geoObjects.remove(userPinRef.current);
      }
      const pin = new window.ymaps.Placemark(
        [coords.lat, coords.lng],
        {
          balloonContent: zone
            ? `${zone.label} — от ${zone.minOrder.toLocaleString("ru")} ₽`
            : "Вне зоны доставки",
        },
        {
          preset: zone
            ? "islands#blueCircleDotIcon"
            : "islands#grayCircleDotIcon",
        },
      );
      mapInstance.current.geoObjects.add(pin);
      userPinRef.current = pin;
      mapInstance.current.setCenter([coords.lat, coords.lng], 12, {
        duration: 400,
      });
    }

    setLoading(false);
  }

  return (
    <div className="space-y-4">
      {/* Легенда зон */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {DELIVERY_ZONES.map((zone) => (
          <div
            key={zone.id}
            className="flex items-center gap-2.5 p-3 rounded-xl border bg-card"
            style={{ borderColor: zone.color + "80" }}
          >
            <div
              className="w-3 h-3 rounded-full shrink-0"
              style={{ backgroundColor: zone.color }}
            />
            <div>
              <p className="text-xs font-semibold">{zone.label}</p>
              <p className="text-xs text-muted-foreground">до {zone.radius} км</p>
              <p className="text-xs font-medium" style={{ color: zone.color }}>
                от {zone.minOrder.toLocaleString("ru")} ₽
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Поле проверки адреса */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && checkAddress()}
            placeholder="Введите ваш адрес..."
            className="w-full pl-10 pr-4 h-11 rounded-xl border border-border text-sm focus:outline-none focus:border-malina-500 focus:ring-2 focus:ring-malina-500/20 bg-card"
          />
        </div>
        <button
          onClick={checkAddress}
          disabled={loading || !address.trim()}
          className="flex items-center gap-2 px-4 h-11 rounded-xl bg-malina-500 text-white text-sm font-semibold disabled:opacity-50 hover:bg-malina-600 transition-colors"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Search className="h-4 w-4" />
          )}
          Проверить
        </button>
      </div>

      {/* Результат проверки */}
      {result && (
        <div
          className={`flex items-start gap-3 p-4 rounded-xl border ${
            result.zone
              ? "bg-green-50 border-green-200"
              : "bg-red-50 border-red-200"
          }`}
        >
          {result.zone ? (
            <>
              <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-green-800 text-sm">Доставляем!</p>
                <p className="text-sm text-green-700">
                  {result.zone.label} · минимальный заказ{" "}
                  <strong>{result.zone.minOrder.toLocaleString("ru")} ₽</strong>
                </p>
              </div>
            </>
          ) : (
            <>
              <XCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-800 text-sm">
                  {result.found ? "Адрес вне зоны доставки" : "Адрес не найден"}
                </p>
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

      {/* Карта — без overflow-hidden, иначе balloon'ы обрезаются */}
      <div
        ref={mapRef}
        className="w-full h-[420px] rounded-2xl border border-border"
      />
    </div>
  );
}
