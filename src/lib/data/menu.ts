// ============================================================
// МЕНЮ CAFE MALINA
// Редактируйте этот файл для добавления/изменения блюд и категорий
//
// Как добавить блюдо:
//   Скопируйте блок { id, name, ... } и вставьте в нужную категорию.
//   id — уникальный, просто увеличивайте число.
//   category — должна совпадать с id из массива categories.
//   image — путь к фото в папке /public/images/
//
// Как добавить категорию:
//   Добавьте { id: "...", name: "..." } в массив categories.
//   Затем создайте блюда с этой category.
//
// Варианты (variants):
//   Если блюдо имеет размеры/варианты, добавьте массив variants.
//   Поле price при этом = цена наименьшего варианта (для сортировки/отображения "от").
//
// [ЦЕНА?] — цена не подтверждена, нужно уточнить
// ============================================================

export interface MenuItemVariant {
  label: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  weight?: string;
  image: string;
  category: string;
  variants?: MenuItemVariant[];
}

export interface Category {
  id: string;
  name: string;
}

export const categories: Category[] = [
  { id: "popular", name: "Популярное" },
  { id: "pizza", name: "Пицца" },
  { id: "rolls", name: "Роллы" },
  { id: "baked-rolls", name: "Запечённые роллы" },
  { id: "hot-rolls", name: "Горячие роллы" },
  { id: "premium-rolls", name: "Премиум роллы" },
  { id: "cream-rolls", name: "Сливочные роллы" },
  { id: "sets", name: "Наборы" },
  { id: "fastfood", name: "Фаст-фуд" },
  { id: "beer-sets", name: "Пивные сеты" },
  { id: "drinks", name: "Напитки" },
  { id: "sauces", name: "Соусы" },
];

export const menuItems: MenuItem[] = [
  // ========== Популярное ==========
  {
    id: "pop-1",
    name: "Пепперони",
    description: "",
    price: 680,
    image: "/images/pepperoni.jpg",
    category: "popular",
    variants: [
      { label: "32 см", price: 680 },
      { label: "40 см", price: 850 },
    ],
  },
  {
    id: "pop-2",
    name: "Филадельфия",
    description: "",
    price: 455,
    image: "/images/filadelfiya.jpg",
    category: "popular",
  },
  {
    id: "pop-3",
    name: "Сет Фиеста",
    description: "",
    price: 990,
    image: "/images/set-fiesta.jpg",
    category: "popular",
  },
  {
    id: "pop-4",
    name: "Пивной сет Medium",
    description: "",
    price: 750,
    image: "/images/beer-medium.jpg",
    category: "popular",
  },

  // ========== Пицца ==========
  {
    id: "pizza-1",
    name: "Маргарита с ветчиной",
    description: "",
    price: 630,
    image: "/images/margarita-s-vetchinoi.jpg",
    category: "pizza",
    variants: [
      { label: "32 см", price: 630 },
      { label: "40 см", price: 790 },
    ],
  },
  {
    id: "pizza-2",
    name: "Пепперони",
    description: "",
    price: 680,
    image: "/images/pepperoni.jpg",
    category: "pizza",
    variants: [
      { label: "32 см", price: 680 },
      { label: "40 см", price: 850 },
    ],
  },
  {
    id: "pizza-3",
    name: "Сырная",
    description: "",
    price: 680,
    image: "/images/syrnaya.jpg",
    category: "pizza",
    variants: [
      { label: "32 см", price: 680 },
      { label: "40 см", price: 850 },
    ],
  },
  {
    id: "pizza-4",
    name: "Гавайская",
    description: "",
    price: 750,
    image: "/images/gavai-skaya.jpg",
    category: "pizza",
    variants: [
      { label: "32 см", price: 750 },
      { label: "40 см", price: 950 },
    ],
  },
  {
    id: "pizza-5",
    name: "Карбонара",
    description: "",
    price: 750,
    image: "/images/karbonara.jpg",
    category: "pizza",
    variants: [
      { label: "32 см", price: 750 },
      { label: "40 см", price: 950 },
    ],
  },
  {
    id: "pizza-6",
    name: "Барбекю",
    description: "",
    price: 750,
    image: "/images/barbekyu.jpg",
    category: "pizza",
    variants: [
      { label: "32 см", price: 750 },
      { label: "40 см", price: 950 },
    ],
  },
  {
    id: "pizza-7",
    name: "Мясная",
    description: "",
    price: 750,
    image: "/images/myasnaya.jpg",
    category: "pizza",
    variants: [
      { label: "32 см", price: 750 },
      { label: "40 см", price: 950 },
    ],
  },
  {
    id: "pizza-8",
    name: "Цезарь",
    description: "",
    price: 750,
    image: "/images/tsezar.jpg",
    category: "pizza",
    variants: [
      { label: "32 см", price: 750 },
      { label: "40 см", price: 950 },
    ],
  },
  {
    id: "pizza-9",
    name: "Грибная",
    description: "",
    price: 710,
    image: "/images/gribnaya.jpg",
    category: "pizza",
    variants: [
      { label: "32 см", price: 710 },
      { label: "40 см", price: 900 },
    ],
  },
  {
    id: "pizza-10",
    name: "Пронтиссимо",
    description: "",
    price: 790,
    image: "/images/prontissimo.jpg",
    category: "pizza",
    variants: [
      { label: "32 см", price: 790 },
      { label: "40 см", price: 990 },
    ],
  },
  {
    id: "pizza-11",
    name: "Американо",
    description: "", // [ЦЕНА?]
    price: 750,
    image: "/images/amerikano.jpg",
    category: "pizza",
    variants: [
      { label: "32 см", price: 750 },
      { label: "40 см", price: 950 },
    ],
  },
  {
    id: "pizza-12",
    name: "Аппетитная",
    description: "", // [ЦЕНА?]
    price: 750,
    image: "/images/appetitnaya.jpg",
    category: "pizza",
    variants: [
      { label: "32 см", price: 750 },
      { label: "40 см", price: 950 },
    ],
  },
  {
    id: "pizza-13",
    name: "Аррива",
    description: "", // [ЦЕНА?]
    price: 750,
    image: "/images/arriva.jpg",
    category: "pizza",
    variants: [
      { label: "32 см", price: 750 },
      { label: "40 см", price: 950 },
    ],
  },
  {
    id: "pizza-14",
    name: "Баварская",
    description: "", // [ЦЕНА?]
    price: 750,
    image: "/images/bavarskaya.jpg",
    category: "pizza",
    variants: [
      { label: "32 см", price: 750 },
      { label: "40 см", price: 950 },
    ],
  },
  {
    id: "pizza-15",
    name: "Белиссимо",
    description: "", // [ЦЕНА?]
    price: 750,
    image: "/images/belissimo.jpg",
    category: "pizza",
    variants: [
      { label: "32 см", price: 750 },
      { label: "40 см", price: 950 },
    ],
  },
  {
    id: "pizza-16",
    name: "Гурман",
    description: "", // [ЦЕНА?]
    price: 790,
    image: "/images/gurman.jpg",
    category: "pizza",
    variants: [
      { label: "32 см", price: 790 },
      { label: "40 см", price: 990 },
    ],
  },
  {
    id: "pizza-17",
    name: "Диабло",
    description: "", // [ЦЕНА?]
    price: 750,
    image: "/images/diablo.jpg",
    category: "pizza",
    variants: [
      { label: "32 см", price: 750 },
      { label: "40 см", price: 950 },
    ],
  },
  {
    id: "pizza-18",
    name: "Европейская",
    description: "", // [ЦЕНА?]
    price: 750,
    image: "/images/evropei-skaya.jpg",
    category: "pizza",
    variants: [
      { label: "32 см", price: 750 },
      { label: "40 см", price: 950 },
    ],
  },
  {
    id: "pizza-19",
    name: "Зернистая",
    description: "", // [ЦЕНА?]
    price: 750,
    image: "/images/zernistaya.jpg",
    category: "pizza",
    variants: [
      { label: "32 см", price: 750 },
      { label: "40 см", price: 950 },
    ],
  },
  {
    id: "pizza-20",
    name: "Итальянская",
    description: "", // [ЦЕНА?]
    price: 750,
    image: "/images/italyanskaya.jpg",
    category: "pizza",
    variants: [
      { label: "32 см", price: 750 },
      { label: "40 см", price: 950 },
    ],
  },
  {
    id: "pizza-21",
    name: "Лесная",
    description: "", // [ЦЕНА?]
    price: 750,
    image: "/images/lesnaya.jpg",
    category: "pizza",
    variants: [
      { label: "32 см", price: 750 },
      { label: "40 см", price: 950 },
    ],
  },
  {
    id: "pizza-22",
    name: "Охотничья",
    description: "", // [ЦЕНА?]
    price: 750,
    image: "/images/okhotnichya.jpg",
    category: "pizza",
    variants: [
      { label: "32 см", price: 750 },
      { label: "40 см", price: 950 },
    ],
  },
  {
    id: "pizza-23",
    name: "Песто",
    description: "", // [ЦЕНА?]
    price: 790,
    image: "/images/pesto.jpg",
    category: "pizza",
    variants: [
      { label: "32 см", price: 790 },
      { label: "40 см", price: 990 },
    ],
  },
  {
    id: "pizza-24",
    name: "По-братски",
    description: "", // [ЦЕНА?]
    price: 750,
    image: "/images/po-bratski.jpg",
    category: "pizza",
    variants: [
      { label: "32 см", price: 750 },
      { label: "40 см", price: 950 },
    ],
  },
  {
    id: "pizza-25",
    name: "Столичная",
    description: "", // [ЦЕНА?]
    price: 750,
    image: "/images/stolichnaya.jpg",
    category: "pizza",
    variants: [
      { label: "32 см", price: 750 },
      { label: "40 см", price: 950 },
    ],
  },
  {
    id: "pizza-26",
    name: "Фирменная",
    description: "", // [ЦЕНА?]
    price: 790,
    image: "/images/firmennaya.jpg",
    category: "pizza",
    variants: [
      { label: "32 см", price: 790 },
      { label: "40 см", price: 990 },
    ],
  },
  {
    id: "pizza-27",
    name: "Цыпленок BBQ",
    description: "", // [ЦЕНА?]
    price: 750,
    image: "/images/tsyplenok-bbq.jpg",
    category: "pizza",
    variants: [
      { label: "32 см", price: 750 },
      { label: "40 см", price: 950 },
    ],
  },
  {
    id: "pizza-28",
    name: "Чеддер с говядиной",
    description: "говядина, моцарелла, чеддер, перец болгарский, лук, огурцы солёные, лук зелёный, соус фирменный",
    price: 880,
    image: "/images/pizza-cheder.jpg",
    category: "pizza",
    variants: [
      { label: "32 см", price: 880 },
      { label: "40 см", price: 1050 },
    ],
  },

  // ========== Роллы ==========
  {
    id: "roll-1",
    name: "Филадельфия",
    description: "",
    price: 455,
    image: "/images/filadelfiya.jpg",
    category: "rolls",
  },
  {
    id: "roll-2",
    name: "Филадельфия с угрём",
    description: "",
    price: 535,
    image: "/images/filadelfiya-s-ugrem.jpg",
    category: "rolls",
  },
  {
    id: "roll-3",
    name: "Филадельфия XL",
    description: "", // [ЦЕНА?]
    price: 555,
    image: "/images/filadelfiya-xl.jpg",
    category: "rolls",
  },
  {
    id: "roll-4",
    name: "Филадельфия с лососем в кунжуте",
    description: "", // [ЦЕНА?]
    price: 485,
    image: "/images/filadelfiya-s-lososem-v-kunzhute.jpg",
    category: "rolls",
  },
  {
    id: "roll-5",
    name: "Канада",
    description: "",
    price: 515,
    image: "/images/kanada.jpg",
    category: "rolls",
  },
  {
    id: "roll-6",
    name: "Калифорния с крабом",
    description: "",
    price: 395,
    image: "/images/kaliforniya-s-krabom.jpg",
    category: "rolls",
  },
  {
    id: "roll-7",
    name: "Калифорния с креветкой",
    description: "",
    price: 465,
    image: "/images/kaliforniya-s-krevetkoi.jpg",
    category: "rolls",
  },
  {
    id: "roll-8",
    name: "Калифорния с лососем",
    description: "",
    price: 455,
    image: "/images/kaliforniya-s-lososem.jpg",
    category: "rolls",
  },
  {
    id: "roll-9",
    name: "Калифорния с унаги",
    description: "", // [ЦЕНА?]
    price: 465,
    image: "/images/kaliforniya-s-unagi.jpg",
    category: "rolls",
  },
  {
    id: "roll-10",
    name: "Дракон",
    description: "",
    price: 485,
    image: "/images/drakon.jpg",
    category: "rolls",
  },
  {
    id: "roll-11",
    name: "Чикен терияки",
    description: "",
    price: 365,
    image: "/images/chiken-teriyaki.jpg",
    category: "rolls",
  },
  {
    id: "roll-12",
    name: "Аляска",
    description: "", // [ЦЕНА?]
    price: 455,
    image: "/images/alyaska.jpg",
    category: "rolls",
  },
  {
    id: "roll-13",
    name: "Барселона",
    description: "", // [ЦЕНА?]
    price: 455,
    image: "/images/barselona.jpg",
    category: "rolls",
  },
  {
    id: "roll-14",
    name: "Бомба",
    description: "", // [ЦЕНА?]
    price: 485,
    image: "/images/bomba.jpg",
    category: "rolls",
  },
  {
    id: "roll-15",
    name: "Вулкан",
    description: "", // [ЦЕНА?]
    price: 455,
    image: "/images/vulkan.jpg",
    category: "rolls",
  },
  {
    id: "roll-16",
    name: "Дабл лосось чеддер",
    description: "", // [ЦЕНА?]
    price: 535,
    image: "/images/dabl-losos-chedder.jpg",
    category: "rolls",
  },
  {
    id: "roll-17",
    name: "Дабл-чиз",
    description: "", // [ЦЕНА?]
    price: 455,
    image: "/images/dabl-chiz.jpg",
    category: "rolls",
  },
  {
    id: "roll-18",
    name: "Джус",
    description: "", // [ЦЕНА?]
    price: 425,
    image: "/images/dzhus.jpg",
    category: "rolls",
  },
  {
    id: "roll-19",
    name: "Диего",
    description: "", // [ЦЕНА?]
    price: 455,
    image: "/images/diego.jpg",
    category: "rolls",
  },
  {
    id: "roll-20",
    name: "Дуэт",
    description: "", // [ЦЕНА?]
    price: 455,
    image: "/images/duet.jpg",
    category: "rolls",
  },
  {
    id: "roll-21",
    name: "Зебра",
    description: "", // [ЦЕНА?]
    price: 455,
    image: "/images/zebra.jpg",
    category: "rolls",
  },
  {
    id: "roll-22",
    name: "Касуми",
    description: "", // [ЦЕНА?]
    price: 455,
    image: "/images/kasumi.jpg",
    category: "rolls",
  },
  {
    id: "roll-23",
    name: "Лонг",
    description: "", // [ЦЕНА?]
    price: 455,
    image: "/images/long.jpg",
    category: "rolls",
  },
  {
    id: "roll-24",
    name: "Микасса",
    description: "", // [ЦЕНА?]
    price: 455,
    image: "/images/mikassa.jpg",
    category: "rolls",
  },
  {
    id: "roll-25",
    name: "Нью-Йорк",
    description: "", // [ЦЕНА?]
    price: 485,
    image: "/images/nyu-i-ork.jpg",
    category: "rolls",
  },
  {
    id: "roll-26",
    name: "Оваро",
    description: "", // [ЦЕНА?]
    price: 455,
    image: "/images/ovaro.jpg",
    category: "rolls",
  },
  {
    id: "roll-27",
    name: "Окинава",
    description: "", // [ЦЕНА?]
    price: 455,
    image: "/images/okinava.jpg",
    category: "rolls",
  },
  {
    id: "roll-28",
    name: "Сегун",
    description: "", // [ЦЕНА?]
    price: 485,
    image: "/images/segun.jpg",
    category: "rolls",
  },
  {
    id: "roll-29",
    name: "Фиджи спайси",
    description: "", // [ЦЕНА?]
    price: 455,
    image: "/images/fidzhi-spai-si.jpg",
    category: "rolls",
  },
  {
    id: "roll-30",
    name: "Ханадори",
    description: "", // [ЦЕНА?]
    price: 455,
    image: "/images/khanadori.jpg",
    category: "rolls",
  },
  {
    id: "roll-31",
    name: "Хатамото",
    description: "", // [ЦЕНА?]
    price: 455,
    image: "/images/khatamoto.jpg",
    category: "rolls",
  },
  {
    id: "roll-32",
    name: "Хоку",
    description: "", // [ЦЕНА?]
    price: 455,
    image: "/images/khoku.jpg",
    category: "rolls",
  },
  {
    id: "roll-33",
    name: "Чикен бекон",
    description: "", // [ЦЕНА?]
    price: 415,
    image: "/images/chiken-bekon.jpg",
    category: "rolls",
  },
  {
    id: "roll-34",
    name: "Чикен чиз",
    description: "", // [ЦЕНА?]
    price: 395,
    image: "/images/chiken-chiz.jpg",
    category: "rolls",
  },
  {
    id: "roll-35",
    name: "Шидо",
    description: "", // [ЦЕНА?]
    price: 455,
    image: "/images/shido.jpg",
    category: "rolls",
  },
  {
    id: "roll-36",
    name: "Экстаз",
    description: "", // [ЦЕНА?]
    price: 485,
    image: "/images/ekstaz.jpg",
    category: "rolls",
  },
  {
    id: "roll-37",
    name: "Ясунаги",
    description: "", // [ЦЕНА?]
    price: 455,
    image: "/images/yasunagi.jpg",
    category: "rolls",
  },
  {
    id: "roll-38",
    name: "Кани чиз",
    description: "", // [ЦЕНА?]
    price: 365,
    image: "/images/kani-chiz.jpg",
    category: "rolls",
  },
  {
    id: "roll-39",
    name: "Сяке чиз",
    description: "", // [ЦЕНА?]
    price: 395,
    image: "/images/syake-chiz.jpg",
    category: "rolls",
  },
  {
    id: "roll-40",
    name: "Сяки терияки",
    description: "", // [ЦЕНА?]
    price: 395,
    image: "/images/syaki-teriyaki.jpg",
    category: "rolls",
  },
  {
    id: "roll-41",
    name: "Терияки чиз",
    description: "", // [ЦЕНА?]
    price: 395,
    image: "/images/teriyaki-chiz.jpg",
    category: "rolls",
  },
  {
    id: "roll-42",
    name: "Томаго чиз",
    description: "", // [ЦЕНА?]
    price: 365,
    image: "/images/tomago-chiz.jpg",
    category: "rolls",
  },
  {
    id: "roll-43",
    name: "Унаги чиз",
    description: "", // [ЦЕНА?]
    price: 415,
    image: "/images/unagi-chiz.jpg",
    category: "rolls",
  },
  {
    id: "roll-44",
    name: "Тэмари",
    description: "", // [ЦЕНА?]
    price: 455,
    image: "/images/temari.jpg",
    category: "rolls",
  },
  {
    id: "roll-45",
    name: "Хосомаки",
    description: "", // [ЦЕНА?]
    price: 195,
    image: "/images/khosomaki.jpg",
    category: "rolls",
  },

  // --- Маки ---
  {
    id: "roll-50",
    name: "Унаги маки",
    description: "",
    price: 215,
    image: "/images/unagi-maki.jpg",
    category: "rolls",
  },
  {
    id: "roll-51",
    name: "Сяке маки",
    description: "",
    price: 205,
    image: "/images/syake-maki.jpg",
    category: "rolls",
  },
  {
    id: "roll-52",
    name: "Эби маки",
    description: "",
    price: 215,
    image: "/images/ebi-maki.jpg",
    category: "rolls",
  },
  {
    id: "roll-53",
    name: "Чука маки",
    description: "",
    price: 155,
    image: "/images/chuka-maki.jpg",
    category: "rolls",
  },
  {
    id: "roll-54",
    name: "Капа маки",
    description: "",
    price: 150,
    image: "/images/kapa-maki.jpg",
    category: "rolls",
  },
  {
    id: "roll-55",
    name: "Кани маки",
    description: "",
    price: 165,
    image: "/images/kani-maki.jpg",
    category: "rolls",
  },
  {
    id: "roll-56",
    name: "Наоми маки",
    description: "", // [ЦЕНА?]
    price: 205,
    image: "/images/naomi-maki.jpg",
    category: "rolls",
  },
  {
    id: "roll-57",
    name: "Терияки маки",
    description: "", // [ЦЕНА?]
    price: 205,
    image: "/images/teriyaki-maki.jpg",
    category: "rolls",
  },

  // ========== Запечённые роллы ==========
  {
    id: "baked-1",
    name: "Амигос",
    description: "",
    price: 275,
    image: "/images/amigos.jpg",
    category: "baked-rolls",
  },
  {
    id: "baked-2",
    name: "Ватикан",
    description: "",
    price: 480,
    image: "/images/vatikan.jpg",
    category: "baked-rolls",
  },
  {
    id: "baked-3",
    name: "Динамит",
    description: "",
    price: 425,
    image: "/images/dinamit.jpg",
    category: "baked-rolls",
  },
  {
    id: "baked-4",
    name: "Дубай",
    description: "",
    price: 505,
    image: "/images/dubai.jpg",
    category: "baked-rolls",
  },
  {
    id: "baked-5",
    name: "Легенда",
    description: "",
    price: 335,
    image: "/images/legenda.jpg",
    category: "baked-rolls",
  },
  {
    id: "baked-6",
    name: "Мастер",
    description: "",
    price: 395,
    image: "/images/master.jpg",
    category: "baked-rolls",
  },
  {
    id: "baked-7",
    name: "Маями",
    description: "",
    price: 415,
    image: "/images/mayami.jpg",
    category: "baked-rolls",
  },
  {
    id: "baked-8",
    name: "Миками",
    description: "",
    price: 435,
    image: "/images/mikaami.jpg",
    category: "baked-rolls",
  },
  {
    id: "baked-9",
    name: "Сёко",
    description: "",
    price: 375,
    image: "/images/se-ko.jpg",
    category: "baked-rolls",
  },
  {
    id: "baked-10",
    name: "Статус",
    description: "",
    price: 485,
    image: "/images/status.jpg",
    category: "baked-rolls",
  },
  {
    id: "baked-11",
    name: "Флагман",
    description: "",
    price: 405,
    image: "/images/flagman.jpg",
    category: "baked-rolls",
  },
  {
    id: "baked-12",
    name: "Цезарь ролл",
    description: "",
    price: 395,
    image: "/images/tsezar-roll.jpg",
    category: "baked-rolls",
  },
  {
    id: "baked-13",
    name: "Запечённая Филадельфия",
    description: "", // [ЦЕНА?]
    price: 455,
    image: "/images/zapechennaya-filadelfiya.jpg",
    category: "baked-rolls",
  },
  {
    id: "baked-14",
    name: "Запечённый с креветкой",
    description: "", // [ЦЕНА?]
    price: 415,
    image: "/images/zapechennyi-s-krevetkoi.jpg",
    category: "baked-rolls",
  },
  {
    id: "baked-15",
    name: "Запечённый с лососем",
    description: "", // [ЦЕНА?]
    price: 415,
    image: "/images/zapechennyi-s-lososem.jpg",
    category: "baked-rolls",
  },
  {
    id: "baked-16",
    name: "Запечённый с унаги",
    description: "", // [ЦЕНА?]
    price: 425,
    image: "/images/zapechennyi-s-unagi.jpg",
    category: "baked-rolls",
  },
  {
    id: "baked-17",
    name: "Запечённый спайси с креветкой",
    description: "", // [ЦЕНА?]
    price: 435,
    image: "/images/zapechennyi-spai-si-s-krevetkoi.jpg",
    category: "baked-rolls",
  },
  {
    id: "baked-18",
    name: "Запечённый спайси с лососем",
    description: "", // [ЦЕНА?]
    price: 435,
    image: "/images/zapechennyi-spai-si-s-lososem.jpg",
    category: "baked-rolls",
  },
  {
    id: "baked-19",
    name: "Калифорния запечённая",
    description: "", // [ЦЕНА?]
    price: 415,
    image: "/images/kaliforniya-zapechennaya.jpg",
    category: "baked-rolls",
  },
  {
    id: "baked-20",
    name: "Гранд чикен запечённый",
    description: "", // [ЦЕНА?]
    price: 445,
    image: "/images/grand-chiken-zapechennyi.jpg",
    category: "baked-rolls",
  },

  // ========== Горячие роллы ==========
  {
    id: "hot-1",
    name: "Акари Hot",
    description: "",
    price: 535,
    image: "/images/akari-hot.jpg",
    category: "hot-rolls",
  },
  {
    id: "hot-2",
    name: "Банзай Hot",
    description: "",
    price: 365,
    image: "/images/banzai-hot.jpg",
    category: "hot-rolls",
  },
  {
    id: "hot-3",
    name: "Кани-крим Hot",
    description: "",
    price: 365,
    image: "/images/kani-krim-hot.jpg",
    category: "hot-rolls",
  },
  {
    id: "hot-4",
    name: "Комета Hot",
    description: "",
    price: 415,
    image: "/images/kometa-hot.jpg",
    category: "hot-rolls",
  },
  {
    id: "hot-5",
    name: "Сакура Hot",
    description: "",
    price: 415,
    image: "/images/sakura-hot.jpg",
    category: "hot-rolls",
  },
  {
    id: "hot-6",
    name: "Самурай",
    description: "",
    price: 485,
    image: "/images/samurai.jpg",
    category: "hot-rolls",
  },
  {
    id: "hot-7",
    name: "Темпура чикен",
    description: "",
    price: 345,
    image: "/images/tempura-chiken.jpg",
    category: "hot-rolls",
  },
  {
    id: "hot-8",
    name: "Терияки Hot",
    description: "",
    price: 385,
    image: "/images/teriyaki-hot.jpg",
    category: "hot-rolls",
  },
  {
    id: "hot-9",
    name: "Хонако Hot",
    description: "",
    price: 385,
    image: "/images/khonako-hot.jpg",
    category: "hot-rolls",
  },
  {
    id: "hot-10",
    name: "Цезарь Hot",
    description: "",
    price: 385,
    image: "/images/tsezar-hot.jpg",
    category: "hot-rolls",
  },
  {
    id: "hot-11",
    name: "Ями Hot",
    description: "",
    price: 385,
    image: "/images/yami-hot.jpg",
    category: "hot-rolls",
  },
  {
    id: "hot-12",
    name: "Hot с лососем",
    description: "",
    price: 415,
    image: "/images/hot-s-lososem.jpg",
    category: "hot-rolls",
  },
  {
    id: "hot-13",
    name: "Морской Hot",
    description: "", // [ЦЕНА?]
    price: 415,
    image: "/images/morskoi-hot.jpg",
    category: "hot-rolls",
  },
  {
    id: "hot-14",
    name: "Фирменный Hot",
    description: "", // [ЦЕНА?]
    price: 435,
    image: "/images/firmennyi-hot.jpg",
    category: "hot-rolls",
  },
  {
    id: "hot-15",
    name: "Фрай Эби Hot",
    description: "", // [ЦЕНА?]
    price: 415,
    image: "/images/frai-ebi-hot.jpg",
    category: "hot-rolls",
  },
  {
    id: "hot-16",
    name: "Хокай Hot",
    description: "", // [ЦЕНА?]
    price: 385,
    image: "/images/khokai-hot.jpg",
    category: "hot-rolls",
  },

  // ========== Премиум роллы ==========
  {
    id: "prem-1",
    name: "Дабл-лосось",
    description: "",
    price: 635,
    image: "/images/dabl-losos-premium.jpg",
    category: "premium-rolls",
  },
  {
    id: "prem-2",
    name: "Дабл-угорь",
    description: "",
    price: 645,
    image: "/images/dabl-ugor-premium.jpg",
    category: "premium-rolls",
  },
  {
    id: "prem-3",
    name: "Канада",
    description: "",
    price: 645,
    image: "/images/kanada-premium.jpg",
    category: "premium-rolls",
  },
  {
    id: "prem-4",
    name: "Сайтама",
    description: "",
    price: 605,
    image: "/images/sai-tama-premium.jpg",
    category: "premium-rolls",
  },
  {
    id: "prem-5",
    name: "Сатори",
    description: "",
    price: 645,
    image: "/images/satori-premium.jpg",
    category: "premium-rolls",
  },
  {
    id: "prem-6",
    name: "Таити",
    description: "",
    price: 625,
    image: "/images/taiti-premium.jpg",
    category: "premium-rolls",
  },
  {
    id: "prem-7",
    name: "Тайский",
    description: "",
    price: 625,
    image: "/images/tai-skii-premium.jpg",
    category: "premium-rolls",
  },
  {
    id: "prem-8",
    name: "Тигр",
    description: "",
    price: 615,
    image: "/images/tigr-premium.jpg",
    category: "premium-rolls",
  },
  {
    id: "prem-9",
    name: "Филадельфия",
    description: "",
    price: 645,
    image: "/images/filadelfiya-premium.jpg",
    category: "premium-rolls",
  },
  {
    id: "prem-10",
    name: "Филадельфия терияки",
    description: "",
    price: 655,
    image: "/images/filadelfiya-teriyaki-premium.jpg",
    category: "premium-rolls",
  },
  {
    id: "prem-11",
    name: "Ямайка",
    description: "",
    price: 635,
    image: "/images/yamai-ka-premium.jpg",
    category: "premium-rolls",
  },
  {
    id: "prem-12",
    name: "Ямато",
    description: "",
    price: 625,
    image: "/images/yamato-premium.jpg",
    category: "premium-rolls",
  },

  // ========== Сливочные роллы ==========
  {
    id: "cream-1",
    name: "Сливочный с креветкой",
    description: "",
    price: 595,
    image: "/images/slivochnyi-s-krevetkoi.jpg",
    category: "cream-rolls",
  },
  {
    id: "cream-2",
    name: "Сливочный с лососем",
    description: "",
    price: 595,
    image: "/images/slivochnyi-s-lososem.jpg",
    category: "cream-rolls",
  },
  {
    id: "cream-3",
    name: "Сливочный с угрём",
    description: "",
    price: 595,
    image: "/images/slivochnyi-s-ugrem.jpg",
    category: "cream-rolls",
  },
  {
    id: "cream-4",
    name: "Фила сливочная",
    description: "",
    price: 585,
    image: "/images/fila-slivochnaya.jpg",
    category: "cream-rolls",
  },

  // ========== Наборы ==========
  {
    id: "set-1",
    name: "Сет Жаренный хит",
    description: "",
    price: 1450,
    image: "/images/set-zharennyi-khit.jpg",
    category: "sets",
  },
  {
    id: "set-2",
    name: "Сет Задаром",
    description: "", // [ЦЕНА?]
    price: 990,
    image: "/images/set-zadarom.jpg",
    category: "sets",
  },
  {
    id: "set-3",
    name: "Сет Морской",
    description: "",
    price: 2080,
    image: "/images/set-morskoi.jpg",
    category: "sets",
  },
  {
    id: "set-4",
    name: "Сет Рио",
    description: "", // [ЦЕНА?]
    price: 1350,
    image: "/images/set-rio.jpg",
    category: "sets",
  },
  {
    id: "set-5",
    name: "Сет Сливочный",
    description: "", // [ЦЕНА?]
    price: 1450,
    image: "/images/set-slivochnyi.jpg",
    category: "sets",
  },
  {
    id: "set-6",
    name: "Сет Фиеста",
    description: "",
    price: 990,
    image: "/images/set-fiesta.jpg",
    category: "sets",
  },
  {
    id: "set-7",
    name: "Сет Филадельфия Classic",
    description: "",
    price: 1240,
    image: "/images/set-filadelfiya-classic.jpg",
    category: "sets",
  },
  {
    id: "set-8",
    name: "Сет Филадельфия Премиум",
    description: "", // [ЦЕНА?]
    price: 1500,
    image: "/images/set-filadelfiya-preium.jpg",
    category: "sets",
  },
  {
    id: "set-9",
    name: "Сет Фишка",
    description: "", // [ЦЕНА?]
    price: 1200,
    image: "/images/set-fishka.jpg",
    category: "sets",
  },
  {
    id: "set-10",
    name: "Сет Эгоист",
    description: "",
    price: 950,
    image: "/images/set-egoist.jpg",
    category: "sets",
  },
  {
    id: "set-11",
    name: "Сет Якудза",
    description: "", // [ЦЕНА?]
    price: 1800,
    image: "/images/set-yakudza.jpg",
    category: "sets",
  },
  {
    id: "set-12",
    name: "Эби сет",
    description: "Калифорния с креветкой, Запечённый с креветкой, Эби маки, Фирменный НОТ",
    price: 1320,
    weight: "32шт/755г",
    image: "/images/ebi-set.jpg",
    category: "sets",
  },
  {
    id: "set-13",
    name: "Сет Маки гриль",
    description: "Чикен чиз, Томаго чиз, Сяке чиз, Кани чиз",
    price: 860,
    weight: "32шт/620г",
    image: "/images/maки-gril.jpg",
    category: "sets",
  },
  {
    id: "set-14",
    name: "Фреш сет",
    description: "Дабл лосось, Чикен бекон, Запечёный спайси с креветкой, Микассо",
    price: 1570,
    weight: "32шт/940г",
    image: "/images/set-fresh.jpg",
    category: "sets",
  },
  {
    id: "set-15",
    name: "Сет Микс",
    description: "Калифорния с креветкой, Филадельфия, Каппа маки, Вулкан",
    price: 1325,
    weight: "32шт/710г",
    image: "/images/set-miks.jpg",
    category: "sets",
  },
  {
    id: "set-16",
    name: "Сет Запеченный хит",
    description: "Калифорния запеченная, Запеченный с лососем, Запечённый с креветкой, Запеченный с унаги",
    price: 1530,
    weight: "32шт/1000г",
    image: "/images/set-zapechennyi-khit.jpg",
    category: "sets",
  },
  {
    id: "set-17",
    name: "Сет Дзен",
    description: "Зебра, Томаго-чиз, Чикен-чиз, Джус, Сёгун",
    price: 1380,
    weight: "40шт/780г",
    image: "/images/set-dzen.jpg",
    category: "sets",
  },
  {
    id: "set-18",
    name: "Сет Империя",
    description: "Кани-чиз, Сяке-чиз, Унаги-чиз, Ватикан, Банзай hot",
    price: 1420,
    weight: "40шт",
    image: "/images/set-imperiya.jpg",
    category: "sets",
  },
  {
    id: "set-19",
    name: "Сет Сливочный Mix",
    description: "Сливочный с лососем, сливочный с креветкой, сливочный с угрем",
    price: 1610,
    weight: "24шт/660г",
    image: "/images/set-slivochnyi-miks.jpg",
    category: "sets",
  },
  {
    id: "set-20",
    name: "Сет Запечённая пятёрочка",
    description: "Динамит, Флагман, Запеченный с унаги, Легенда, Хатамото",
    price: 1940,
    weight: "40шт/1200г",
    image: "/images/set-pyateriochka.jpg",
    category: "sets",
  },
  {
    id: "set-21",
    name: "Сет Ями-ями",
    description: "Дубай, Калифорния с унаги, Сёко, Ями hot, Фирменный hot",
    price: 1870,
    weight: "40шт/1140г",
    image: "/images/set-yami-yami.jpg",
    category: "sets",
  },
  {
    id: "set-22",
    name: "Сет Филадельфия 2XL",
    description: "Филадельфия, hot с лососем, Запеченный с лососем, Сяке-маки, Экстаз",
    price: 1770,
    weight: "40шт/970г",
    image: "/images/set-fila-2xl.jpg",
    category: "sets",
  },
  {
    id: "set-23",
    name: "Сет Акияма",
    description: "Акари hot, Хокай hot, Маями, Дуэт, Фиджи-спайси, Запеченный с унаги",
    price: 2100,
    weight: "48шт/1150г",
    image: "/images/set-akiyama.jpg",
    category: "sets",
  },
  {
    id: "set-24",
    name: "Сет Тахиро",
    description: "Киото, Бомба, Зебра, Мастер, Чикен-бекон, Шидо",
    price: 1990,
    weight: "48шт/1320г",
    image: "/images/tahira.jpg",
    category: "sets",
  },
  {
    id: "set-25",
    name: "Сет Аязава",
    description: "Филадельфия, Ясунаги, Цезарь, Калифорния с унаги, Ями hot, Цезарь hot",
    price: 2180,
    weight: "48шт/1320г",
    image: "/images/ayazava.jpg",
    category: "sets",
  },
  {
    id: "set-26",
    name: "Сет Солнце Востока",
    description: "Дубай, Аляска, Оваро, Тэмари, Сёко, Филадельфия с угрём, Фрай Эби hot, Хокай hot",
    price: 3120,
    weight: "54шт/1740г",
    image: "/images/set-solnce.jpg",
    category: "sets",
  },
  {
    id: "set-27",
    name: "Сет Classic",
    description: "Сяке-маки, Капа-маки, Маки чука, Унаги-маки, Эби-маки, Кани-маки",
    price: 965,
    weight: "48шт/600г",
    image: "/images/klassik.jpg",
    category: "sets",
  },

  // ========== Пивные сеты ==========
  {
    id: "beer-1",
    name: "Medium",
    description: "",
    price: 750,
    image: "/images/beer-medium.jpg",
    category: "beer-sets",
  },
  {
    id: "beer-2",
    name: "Max",
    description: "",
    price: 1240,
    image: "/images/beer-max.jpg",
    category: "beer-sets",
  },

  // ========== Напитки ==========
  {
    id: "drink-1",
    name: "Чай",
    description: "",
    price: 50,
    image: "/images/drink-tea.jpg",
    category: "drinks",
  },
  {
    id: "drink-2",
    name: "Чайник",
    description: "",
    price: 175,
    image: "/images/drink-teapot.jpg",
    category: "drinks",
  },
  {
    id: "drink-3",
    name: "Кофе эспрессо",
    description: "",
    price: 90,
    image: "/images/drink-espresso.jpg",
    category: "drinks",
  },
  {
    id: "drink-4",
    name: "Кофе американо",
    description: "",
    price: 100,
    image: "/images/drink-americano.jpg",
    category: "drinks",
  },
  {
    id: "drink-5",
    name: "Кофе капучино",
    description: "",
    price: 120,
    image: "/images/drink-cappuccino.jpg",
    category: "drinks",
  },
  {
    id: "drink-6",
    name: "Кофе латте",
    description: "",
    price: 130,
    image: "/images/drink-latte.jpg",
    category: "drinks",
  },

  // ========== Соусы ==========
  {
    id: "sauce-1",
    name: "Соус чесночный",
    description: "",
    price: 35,
    image: "/images/sauce.jpg",
    category: "sauces",
  },
  {
    id: "sauce-2",
    name: "Соус кисло-сладкий",
    description: "",
    price: 35,
    image: "/images/sauce.jpg",
    category: "sauces",
  },
  {
    id: "sauce-3",
    name: "Соус томатный",
    description: "",
    price: 35,
    image: "/images/sauce.jpg",
    category: "sauces",
  },
  {
    id: "sauce-4",
    name: "Соус сырный",
    description: "",
    price: 35,
    image: "/images/sauce.jpg",
    category: "sauces",
  },
  {
    id: "sauce-5",
    name: "Соевый соус",
    description: "",
    price: 50,
    image: "/images/soevyi-sous.jpg",
    category: "sauces",
  },
  {
    id: "sauce-6",
    name: "Васаби",
    description: "",
    price: 30,
    image: "/images/sauce.jpg",
    category: "sauces",
  },
  {
    id: "sauce-7",
    name: "Имбирь",
    description: "",
    price: 30,
    image: "/images/sauce.jpg",
    category: "sauces",
  },
  {
    id: "sauce-8",
    name: "Ореховый соус",
    description: "",
    price: 75,
    image: "/images/sauce.jpg",
    category: "sauces",
  },
  {
    id: "sauce-9",
    name: "Соус спайси",
    description: "",
    price: 75,
    image: "/images/sauce.jpg",
    category: "sauces",
  },
  {
    id: "sauce-10",
    name: "Сливочный соус",
    description: "",
    price: 95,
    image: "/images/sauce.jpg",
    category: "sauces",
  },
];
