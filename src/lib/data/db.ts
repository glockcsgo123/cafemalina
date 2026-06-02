import fs from "fs";
import path from "path";
import { menuItems as staticMenuItems } from "./menu";

const DATA_DIR = path.join(process.cwd(), "data");
const MENU_FILE = path.join(DATA_DIR, "menu.json");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");
const SETTINGS_FILE = path.join(DATA_DIR, "settings.json");

const DEFAULT_SETTINGS = {
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

function ensureFile(filePath: string, defaultContent: unknown) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultContent, null, 2));
  }
}

export function readMenu() {
  ensureFile(MENU_FILE, staticMenuItems);
  return JSON.parse(fs.readFileSync(MENU_FILE, "utf-8"));
}

export function writeMenu(data: unknown) {
  fs.writeFileSync(MENU_FILE, JSON.stringify(data, null, 2));
}

export function readOrders() {
  ensureFile(ORDERS_FILE, []);
  return JSON.parse(fs.readFileSync(ORDERS_FILE, "utf-8"));
}

export function writeOrders(data: unknown) {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(data, null, 2));
}

export function readSettings() {
  ensureFile(SETTINGS_FILE, DEFAULT_SETTINGS);
  return JSON.parse(fs.readFileSync(SETTINGS_FILE, "utf-8"));
}

export function writeSettings(data: unknown) {
  fs.writeFileSync(SETTINGS_FILE, JSON.stringify(data, null, 2));
}
