"use client";

import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { DELIVERY_ZONES } from "@/lib/delivery";

interface ZoneRecord {
  id: number;
  radius: number;
  minOrder: number;
}

interface Settings {
  phone: string;
  phoneDisplay: string;
  address: string;
  workingHours: { open: number; close: number };
  minOrderAmount: number;
  freeDeliveryAmount: number;
  deliveryTime: string;
  heroTitle: string;
  heroSubtitle: string;
  deliveryZones?: ZoneRecord[];
}

const DEFAULT_ZONES: ZoneRecord[] = DELIVERY_ZONES.map((z) => ({
  id: z.id,
  radius: z.radius,
  minOrder: z.minOrder,
}));

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings | null | undefined>(undefined);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Local string state for numeric scalar fields
  const [minOrder, setMinOrder] = useState("");
  const [freeDelivery, setFreeDelivery] = useState("");
  const [hoursOpen, setHoursOpen] = useState("");
  const [hoursClose, setHoursClose] = useState("");

  // Local string state for zone rows — [{radius, minOrder}]
  const [zoneStrings, setZoneStrings] = useState<{ radius: string; minOrder: string }[]>([]);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => {
        if (!r.ok) throw new Error(`${r.status}`);
        return r.json();
      })
      .then((data: Settings) => {
        setSettings(data);
        setMinOrder(String(data.minOrderAmount ?? ""));
        setFreeDelivery(String(data.freeDeliveryAmount ?? ""));
        setHoursOpen(String(data.workingHours?.open ?? ""));
        setHoursClose(String(data.workingHours?.close ?? ""));
        const zones = data.deliveryZones ?? DEFAULT_ZONES;
        setZoneStrings(zones.map((z) => ({ radius: String(z.radius), minOrder: String(z.minOrder) })));
      })
      .catch(() => setSettings(null));
  }, []);

  const updateZoneString = (
    idx: number,
    field: "radius" | "minOrder",
    value: string,
  ) => {
    setZoneStrings((prev) =>
      prev.map((z, i) => (i === idx ? { ...z, [field]: value } : z)),
    );
  };

  const buildPayload = (): Settings => {
    const zones = (settings?.deliveryZones ?? DEFAULT_ZONES).map((z, i) => ({
      id: z.id,
      radius: parseInt(zoneStrings[i]?.radius ?? "") || z.radius,
      minOrder: parseInt(zoneStrings[i]?.minOrder ?? "") || z.minOrder,
    }));

    return {
      ...settings!,
      minOrderAmount: parseInt(minOrder) || 0,
      freeDeliveryAmount: parseInt(freeDelivery) || 0,
      workingHours: {
        open: parseInt(hoursOpen) || 0,
        close: parseInt(hoursClose) || 0,
      },
      deliveryZones: zones,
    };
  };

  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);
    const payload = buildPayload();
    await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (settings === undefined) {
    return <div className="p-8 text-muted-foreground text-sm">Загрузка...</div>;
  }

  if (settings === null) {
    return (
      <div className="p-8 text-red-500 text-sm">
        Ошибка загрузки настроек. Обновите страницу.
      </div>
    );
  }

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-malina-500/30 focus:border-malina-500";

  return (
    <div className="p-6 md:p-8 max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-bold">Настройки сайта</h1>
          <p className="text-sm text-muted-foreground">Контакты, доставка, Hero-секция</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-malina-500 text-white font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-malina-600 transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saved ? "Сохранено!" : saving ? "Сохраняем..." : "Сохранить"}
        </button>
      </div>

      <div className="space-y-6">
        {/* Contacts */}
        <section className="bg-card border border-border rounded-2xl p-5">
          <h2 className="font-bold mb-4 text-base">Контакты</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Телефон (для звонка)</label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => setSettings((prev) => ({ ...prev!, phone: e.target.value }))}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Телефон (для отображения)</label>
              <input
                type="text"
                value={settings.phoneDisplay}
                onChange={(e) => setSettings((prev) => ({ ...prev!, phoneDisplay: e.target.value }))}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Адрес</label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => setSettings((prev) => ({ ...prev!, address: e.target.value }))}
                className={inputClass}
              />
            </div>
          </div>
        </section>

        {/* Working hours */}
        <section className="bg-card border border-border rounded-2xl p-5">
          <h2 className="font-bold mb-4 text-base">Режим работы</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Открываемся (час)</label>
              <input
                type="number"
                min={0}
                max={23}
                placeholder="0"
                value={hoursOpen}
                onChange={(e) => setHoursOpen(e.target.value)}
                onBlur={() => {
                  const val = parseInt(hoursOpen) || 0;
                  setHoursOpen(String(val));
                  setSettings((prev) => ({
                    ...prev!,
                    workingHours: { ...prev!.workingHours, open: val },
                  }));
                }}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Закрываемся (час)</label>
              <input
                type="number"
                min={0}
                max={23}
                placeholder="0"
                value={hoursClose}
                onChange={(e) => setHoursClose(e.target.value)}
                onBlur={() => {
                  const val = parseInt(hoursClose) || 0;
                  setHoursClose(String(val));
                  setSettings((prev) => ({
                    ...prev!,
                    workingHours: { ...prev!.workingHours, close: val },
                  }));
                }}
                className={inputClass}
              />
            </div>
          </div>
        </section>

        {/* Delivery */}
        <section className="bg-card border border-border rounded-2xl p-5">
          <h2 className="font-bold mb-4 text-base">Доставка</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Минимальная сумма заказа (₽)</label>
              <input
                type="number"
                min="0"
                placeholder="0"
                value={minOrder}
                onChange={(e) => setMinOrder(e.target.value)}
                onBlur={() => {
                  const val = parseInt(minOrder) || 0;
                  setMinOrder(String(val));
                  setSettings((prev) => ({ ...prev!, minOrderAmount: val }));
                }}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Бесплатная доставка от (₽)</label>
              <input
                type="number"
                min="0"
                placeholder="0"
                value={freeDelivery}
                onChange={(e) => setFreeDelivery(e.target.value)}
                onBlur={() => {
                  const val = parseInt(freeDelivery) || 0;
                  setFreeDelivery(String(val));
                  setSettings((prev) => ({ ...prev!, freeDeliveryAmount: val }));
                }}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Время доставки</label>
              <input
                type="text"
                value={settings.deliveryTime}
                onChange={(e) => setSettings((prev) => ({ ...prev!, deliveryTime: e.target.value }))}
                className={inputClass}
              />
            </div>
          </div>
        </section>

        {/* Delivery Zones */}
        <section className="bg-card border border-border rounded-2xl p-5">
          <h2 className="font-bold mb-1 text-base">Зоны доставки</h2>
          <p className="text-xs text-muted-foreground mb-4">
            Радиус от кафе и минимальная сумма заказа для каждой зоны
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left pb-3 font-medium text-muted-foreground pr-4">Зона</th>
                  <th className="text-left pb-3 font-medium text-muted-foreground pr-4">Радиус (км)</th>
                  <th className="text-left pb-3 font-medium text-muted-foreground">Минимум (₽)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {DELIVERY_ZONES.map((zone, i) => (
                  <tr key={zone.id}>
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full shrink-0"
                          style={{ backgroundColor: zone.color }}
                        />
                        <span className="font-medium">{zone.label}</span>
                      </div>
                    </td>
                    <td className="py-3 pr-4">
                      <input
                        type="number"
                        min="0"
                        placeholder={String(zone.radius)}
                        value={zoneStrings[i]?.radius ?? ""}
                        onChange={(e) => updateZoneString(i, "radius", e.target.value)}
                        className="w-24 px-3 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-malina-500/30 focus:border-malina-500"
                      />
                    </td>
                    <td className="py-3">
                      <input
                        type="number"
                        min="0"
                        placeholder={String(zone.minOrder)}
                        value={zoneStrings[i]?.minOrder ?? ""}
                        onChange={(e) => updateZoneString(i, "minOrder", e.target.value)}
                        className="w-28 px-3 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-malina-500/30 focus:border-malina-500"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Нажмите «Сохранить» чтобы применить изменения
          </p>
        </section>

        {/* Hero */}
        <section className="bg-card border border-border rounded-2xl p-5">
          <h2 className="font-bold mb-4 text-base">Hero-секция</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Заголовок</label>
              <input
                type="text"
                value={settings.heroTitle}
                onChange={(e) => setSettings((prev) => ({ ...prev!, heroTitle: e.target.value }))}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Подзаголовок</label>
              <textarea
                value={settings.heroSubtitle}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev!, heroSubtitle: e.target.value }))
                }
                rows={2}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none resize-none"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
