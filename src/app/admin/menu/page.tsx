"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Search, X, Upload, Star, Flame } from "lucide-react";
import { categories } from "@/lib/data/menu";
import { formatPrice } from "@/lib/utils";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  weight?: string;
  image: string;
  category: string;
  variants?: { label: string; price: number }[];
  recommended?: boolean;
  isHit?: boolean;
}

const EMPTY: Omit<MenuItem, "id"> = {
  name: "",
  description: "",
  price: 0,
  weight: "",
  image: "",
  category: "pizza",
  recommended: false,
  isHit: false,
};

export default function AdminMenuPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("all");
  const [modalItem, setModalItem] = useState<MenuItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [form, setForm] = useState<Omit<MenuItem, "id">>(EMPTY);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/menu")
      .then((r) => {
        if (!r.ok) throw new Error(`${r.status}`);
        return r.json();
      })
      .then((data) => setItems(Array.isArray(data) ? data : []))
      .catch(() => setItems([]));
  }, []);

  const filtered = items.filter((item) => {
    const matchCat = filterCat === "all" || item.category === filterCat;
    const matchSearch =
      !search ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const openNew = () => {
    setIsNew(true);
    setForm(EMPTY);
    setModalItem({} as MenuItem);
  };

  const openEdit = (item: MenuItem) => {
    setIsNew(false);
    setForm({ ...item });
    setModalItem(item);
  };

  const closeModal = () => setModalItem(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (data.url) setForm((prev) => ({ ...prev, image: data.url }));
    setUploading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    if (isNew) {
      const res = await fetch("/api/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const newItem = await res.json();
      setItems((prev) => [...prev, newItem]);
    } else {
      const res = await fetch(`/api/menu/${modalItem!.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const updated = await res.json();
      setItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
    }
    setSaving(false);
    closeModal();
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/menu/${id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((i) => i.id !== id));
    setDeleteId(null);
  };

  const toggleFlag = async (item: MenuItem, flag: "recommended" | "isHit") => {
    const updated = { ...item, [flag]: !item[flag] };
    const res = await fetch(`/api/menu/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    const saved = await res.json();
    setItems((prev) => prev.map((i) => (i.id === saved.id ? saved : i)));
  };

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold">Меню</h1>
          <p className="text-sm text-muted-foreground">Всего блюд: {items.length}</p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 bg-malina-500 text-white font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-malina-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Добавить
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-malina-500/30 focus:border-malina-500"
          />
        </div>
        <select
          value={filterCat}
          onChange={(e) => setFilterCat(e.target.value)}
          className="px-3 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none"
        >
          <option value="all">Все категории</option>
          {categories
            .filter((c) => c.id !== "popular")
            .map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="text-left px-4 py-3 font-semibold">Блюдо</th>
                <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Категория</th>
                <th className="text-left px-4 py-3 font-semibold">Цена</th>
                <th className="text-center px-4 py-3 font-semibold whitespace-nowrap">⭐ / 🔥</th>
                <th className="px-4 py-3 w-20"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-secondary/20 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-xl object-cover bg-warm-200 shrink-0"
                      />
                      <div>
                        <p className="font-medium leading-tight">{item.name}</p>
                        <div className="flex gap-2 mt-0.5">
                          {item.recommended && (
                            <span className="text-[10px] text-malina-500 font-semibold">★ Рек.</span>
                          )}
                          {item.isHit && (
                            <span className="text-[10px] text-orange-500 font-semibold">🔥 Хит</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">
                    {categories.find((c) => c.id === item.category)?.name || item.category}
                  </td>
                  <td className="px-4 py-3 font-semibold">{formatPrice(item.price)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => toggleFlag(item, "recommended")}
                        title="Рекомендуем"
                        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                          item.recommended
                            ? "bg-malina-500/10 text-malina-500"
                            : "text-muted-foreground hover:bg-secondary"
                        }`}
                      >
                        <Star className="w-3.5 h-3.5" fill={item.recommended ? "currentColor" : "none"} />
                      </button>
                      <button
                        onClick={() => toggleFlag(item, "isHit")}
                        title="Хит заказов"
                        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                          item.isHit
                            ? "bg-orange-100 text-orange-500"
                            : "text-muted-foreground hover:bg-secondary"
                        }`}
                      >
                        <Flame className="w-3.5 h-3.5" fill={item.isHit ? "currentColor" : "none"} />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 justify-end">
                      <button
                        onClick={() => openEdit(item)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteId(item.id)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground text-sm">
              Ничего не найдено
            </div>
          )}
        </div>
      </div>

      {/* Edit/Add Modal */}
      {modalItem !== null && (
        <>
          <div className="fixed inset-0 z-50 bg-black/40" onClick={closeModal} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-5 border-b border-border">
                <h2 className="font-bold">
                  {isNew ? "Добавить блюдо" : "Редактировать блюдо"}
                </h2>
                <button onClick={closeModal}>
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              <div className="p-5 space-y-4">
                {/* Photo */}
                <div>
                  <label className="block text-sm font-medium mb-2">Фото</label>
                  {form.image && (
                    <img
                      src={form.image}
                      alt=""
                      className="w-full aspect-[4/3] object-cover rounded-xl mb-2 bg-warm-200"
                    />
                  )}
                  <label className="flex items-center gap-2 cursor-pointer bg-secondary text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-warm-200 transition-colors w-fit">
                    <Upload className="w-4 h-4" />
                    {uploading ? "Загрузка..." : "Загрузить фото"}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleUpload}
                    />
                  </label>
                  <input
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    placeholder="/images/filename.jpg"
                    className="mt-2 w-full px-3 py-2 rounded-xl border border-border bg-background text-xs focus:outline-none"
                  />
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium mb-1.5">Название *</label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-malina-500/30"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium mb-1.5">Состав/описание</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none resize-none"
                  />
                </div>

                {/* Price + Weight */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Цена (₽) *</label>
                    <input
                      type="number"
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Вес</label>
                    <input
                      value={form.weight || ""}
                      onChange={(e) => setForm({ ...form, weight: e.target.value })}
                      placeholder="250г"
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none"
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium mb-1.5">Категория *</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none"
                  >
                    {categories
                      .filter((c) => c.id !== "popular")
                      .map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Flags */}
                <div className="flex gap-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!form.recommended}
                      onChange={(e) => setForm({ ...form, recommended: e.target.checked })}
                      className="w-4 h-4 accent-malina-500"
                    />
                    <span className="text-sm font-medium">★ Рекомендуем</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!form.isHit}
                      onChange={(e) => setForm({ ...form, isHit: e.target.checked })}
                      className="w-4 h-4 accent-orange-500"
                    />
                    <span className="text-sm font-medium">🔥 Хит заказов</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 p-5 border-t border-border">
                <button
                  onClick={closeModal}
                  className="flex-1 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-secondary transition-colors"
                >
                  Отмена
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving || !form.name || !form.price}
                  className="flex-1 py-2.5 rounded-xl bg-malina-500 text-white text-sm font-bold hover:bg-malina-600 transition-colors disabled:opacity-50"
                >
                  {saving ? "Сохраняем..." : "Сохранить"}
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <>
          <div className="fixed inset-0 z-50 bg-black/40" onClick={() => setDeleteId(null)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-card border border-border rounded-2xl p-6 max-w-sm w-full shadow-2xl">
              <h3 className="font-bold mb-2">Удалить блюдо?</h3>
              <p className="text-sm text-muted-foreground mb-6">Это действие нельзя отменить.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteId(null)}
                  className="flex-1 py-2.5 rounded-xl border border-border text-sm font-medium"
                >
                  Отмена
                </button>
                <button
                  onClick={() => handleDelete(deleteId)}
                  className="flex-1 py-2.5 rounded-xl bg-red-600 text-white text-sm font-bold hover:bg-red-700"
                >
                  Удалить
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
