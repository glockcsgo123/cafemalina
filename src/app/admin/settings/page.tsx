"use client";

import { useEffect, useState } from "react";
import { Save } from "lucide-react";

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
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then(setSettings);
  }, []);

  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);
    await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!settings) {
    return (
      <div className="p-8 text-muted-foreground text-sm">Загрузка...</div>
    );
  }

  const field = (
    label: string,
    key: keyof Settings,
    type: "text" | "number" = "text"
  ) => (
    <div>
      <label className="block text-sm font-medium mb-1.5">{label}</label>
      <input
        type={type}
        value={settings[key] as string | number}
        onChange={(e) =>
          setSettings((prev) => ({
            ...prev!,
            [key]: type === "number" ? Number(e.target.value) : e.target.value,
          }))
        }
        className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-malina-500/30 focus:border-malina-500"
      />
    </div>
  );

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
            {field("Телефон (для звонка)", "phone")}
            {field("Телефон (для отображения)", "phoneDisplay")}
            {field("Адрес", "address")}
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
                value={settings.workingHours.open}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev!,
                    workingHours: { ...prev!.workingHours, open: Number(e.target.value) },
                  }))
                }
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Закрываемся (час)</label>
              <input
                type="number"
                min={0}
                max={23}
                value={settings.workingHours.close}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev!,
                    workingHours: { ...prev!.workingHours, close: Number(e.target.value) },
                  }))
                }
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none"
              />
            </div>
          </div>
        </section>

        {/* Delivery */}
        <section className="bg-card border border-border rounded-2xl p-5">
          <h2 className="font-bold mb-4 text-base">Доставка</h2>
          <div className="space-y-4">
            {field("Минимальная сумма заказа (₽)", "minOrderAmount", "number")}
            {field("Бесплатная доставка от (₽)", "freeDeliveryAmount", "number")}
            {field("Время доставки", "deliveryTime")}
          </div>
        </section>

        {/* Hero */}
        <section className="bg-card border border-border rounded-2xl p-5">
          <h2 className="font-bold mb-4 text-base">Hero-секция</h2>
          <div className="space-y-4">
            {field("Заголовок", "heroTitle")}
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
