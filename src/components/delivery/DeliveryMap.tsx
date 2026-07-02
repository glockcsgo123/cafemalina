"use client";

import { useEffect, useRef } from "react";
import {
  CAFE_COORDS,
  DELIVERY_ZONES,
} from "@/lib/delivery";

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
    };
  }, []);

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

      {/* Карта */}
      <div
        ref={mapRef}
        className="w-full h-[420px] rounded-2xl border border-border"
      />
    </div>
  );
}
