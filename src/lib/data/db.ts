import fs from "fs";
import path from "path";
import { menuItems as staticMenuItems } from "./menu";

// На Vercel data/ read-only — используем /tmp для записи
const DATA_DIR = process.env.VERCEL
  ? "/tmp/cafemalina"
  : path.join(process.cwd(), "data");

const MENU_FILE = path.join(DATA_DIR, "menu.json");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");
const SETTINGS_FILE = path.join(DATA_DIR, "settings.json");

export const DEFAULT_SETTINGS = {
  phone: "+79107403111",
  phoneDisplay: "+7 (910) 740-31-11",
  address: "Курская обл., р.п. Прямицыно, ул. Коммунистическая, 28",
  workingHours: { open: 10, close: 23 },
  minOrderAmount: 0,
  freeDeliveryAmount: 1000,
  deliveryTime: "от 40 минут",
  heroTitle: "Пицца и роллы с доставкой",
  heroSubtitle: "Готовим каждый день: пицца, роллы, сеты — быстро и вкусно.",
  deliveryZones: [
    { id: 1, radius: 2,  minOrder: 1500 },
    { id: 2, radius: 5,  minOrder: 1800 },
    { id: 3, radius: 10, minOrder: 2100 },
    { id: 4, radius: 18, minOrder: 2400 },
  ],
};

function ensureDir() {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  } catch {
    // ignore
  }
}

function tryWrite(filePath: string, data: unknown) {
  try {
    ensureDir();
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch {
    // read-only или нет доступа — молча игнорируем
  }
}

function tryRead<T>(filePath: string, fallback: T): T {
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
    }
  } catch {
    // повреждённый файл — игнорируем
  }
  return fallback;
}

export function readMenu() {
  const data = tryRead<typeof staticMenuItems>(MENU_FILE, staticMenuItems);
  if (!fs.existsSync(MENU_FILE)) tryWrite(MENU_FILE, staticMenuItems);
  return data;
}

export function writeMenu(data: unknown) {
  tryWrite(MENU_FILE, data);
}

export function readOrders(): Record<string, unknown>[] {
  return tryRead<Record<string, unknown>[]>(ORDERS_FILE, []);
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
