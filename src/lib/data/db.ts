import fs from "fs";
import path from "path";
import { menuItems as staticMenuItems } from "./menu";

const DATA_DIR = path.join(process.cwd(), "data");
const MENU_FILE = path.join(DATA_DIR, "menu.json");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");
const SETTINGS_FILE = path.join(DATA_DIR, "settings.json");

export const DEFAULT_SETTINGS = {
  phone: "+79107403111",
  phoneDisplay: "+7 (910) 740-31-11",
  address: "Курская обл., р.п. Прямицыно, ул. Коммунистическая, 28",
  workingHours: { open: 10, close: 23 },
  minOrderAmount: 500,
  freeDeliveryAmount: 1000,
  deliveryTime: "от 40 минут",
  heroTitle: "Пицца и роллы с доставкой",
  heroSubtitle: "Готовим каждый день: пицца, роллы, сеты — быстро и вкусно.",
};

function tryWrite(filePath: string, data: unknown) {
  try {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch {
    // read-only filesystem (e.g. Vercel) — ignore
  }
}

function tryRead<T>(filePath: string, fallback: T): T {
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
    }
  } catch {
    // corrupted file — ignore
  }
  return fallback;
}

export function readMenu() {
  const data = tryRead<typeof staticMenuItems>(MENU_FILE, staticMenuItems);
  // bootstrap file if missing (no-op on read-only fs)
  if (!fs.existsSync(MENU_FILE)) tryWrite(MENU_FILE, staticMenuItems);
  return data;
}

export function writeMenu(data: unknown) {
  tryWrite(MENU_FILE, data);
}

export function readOrders(): Record<string, unknown>[] {
  const data = tryRead<Record<string, unknown>[]>(ORDERS_FILE, []);
  if (!fs.existsSync(ORDERS_FILE)) tryWrite(ORDERS_FILE, []);
  return data;
}

export function writeOrders(data: unknown) {
  tryWrite(ORDERS_FILE, data);
}

export function readSettings() {
  return tryRead(SETTINGS_FILE, DEFAULT_SETTINGS);
}

export function writeSettings(data: unknown) {
  tryWrite(SETTINGS_FILE, data);
}
