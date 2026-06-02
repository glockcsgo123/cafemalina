import fs from "fs";
import path from "path";
import { menuItems as staticMenuItems } from "./menu";

const DATA_DIR = path.join(process.cwd(), "data");
const MENU_FILE = path.join(DATA_DIR, "menu.json");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");

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
