export const site = {
  name: "Oak & Crumb",
  legalName: "Oak & Crumb Bakery",
  tagline: "Walnut Creek · baked before you wake",
  dek: "A neighborhood bakery on North Main. Pastries, sourdough, and coffee — made for the people who walk these streets.",
  description:
    "Oak & Crumb is a neighborhood bakery in Walnut Creek, California. We bake pastries, sourdough, and coffee for the East Bay — no checkout, just come by.",
  url: "https://oakandcrumb.example",
  email: "hello@oakandcrumb.com",
  phone: "(925) 555-0148",
  phoneHref: "tel:+19255550148",
  emailHref: "mailto:hello@oakandcrumb.com",
  instagram: "@oakandcrumb",
  address: {
    street: "1418 N Main Street",
    city: "Walnut Creek",
    region: "CA",
    postal: "94596",
    neighborhood: "Downtown",
    line: "1418 N Main Street, Walnut Creek, CA 94596",
  },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=1418+N+Main+Street+Walnut+Creek+CA+94596",
  hoursNote: "Pacific time. We close when the case is empty — Saturday often goes first.",
  hours: [
    { days: "Monday", time: "Closed" },
    { days: "Tuesday – Friday", time: "7:00 am – 5:00 pm" },
    { days: "Saturday", time: "8:00 am – 4:00 pm" },
    { days: "Sunday", time: "8:00 am – 2:00 pm" },
  ],
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/menu", label: "Menu" },
] as const;

export const ticker = [
  "Country loaf",
  "Morning croissants",
  "Butter croissant",
  "Kouign-amann",
  "Olive focaccia",
  "Walnut levain",
  "Drip coffee",
  "Saturday cinnamon roll",
] as const;

export type MenuItem = {
  name: string;
  price: string;
  note: string;
};

export type MenuSection = {
  id: string;
  title: string;
  intro: string;
  items: MenuItem[];
};

export const menu: MenuSection[] = [
  {
    id: "bread",
    title: "Bread",
    intro:
      "Mixed the day before, shaped before dawn. We bake through the morning and usually sell the last country loaf by lunch.",
    items: [
      {
        name: "Country loaf",
        price: "8",
        note: "Our everyday sourdough. Dark crust, open crumb, good for everything.",
      },
      {
        name: "Walnut levain",
        price: "10",
        note: "Toasted walnuts, a little honey in the dough. Best with butter and nothing else.",
      },
      {
        name: "Seeded rye",
        price: "9",
        note: "Sunflower, sesame, flax. Holds up to a serious sandwich.",
      },
      {
        name: "Olive focaccia",
        price: "7",
        note: "Tuesday and Friday. Castelvetrano olives, rosemary, a lot of olive oil.",
      },
      {
        name: "Baguette",
        price: "4",
        note: "Crackly, a little wild. We bake two trays. When they’re gone, they’re gone.",
      },
      {
        name: "Friday challah",
        price: "9",
        note: "Soft, eggy, sesame on top. Pre-order by Wednesday if you want a sure thing.",
      },
    ],
  },
  {
    id: "pastry",
    title: "Pastry",
    intro:
      "Laminated doughs start midweek. The morning croissants are the ones people line up for, and we will not apologize for that.",
    items: [
      {
        name: "Butter croissant",
        price: "4",
        note: "Seventy-two layers, give or take. Shatter, then give.",
      },
      {
        name: "Almond croissant",
        price: "5",
        note: "Yesterday’s croissant, a second life, frangipane, toasted almonds.",
      },
      {
        name: "Morning croissants",
        price: "4.50",
        note: "The first tray of the day. Shatter-warm, all butter, meant to be eaten over the bag.",
      },
      {
        name: "Kouign-amann",
        price: "5.50",
        note: "Breton, caramelized, a little dangerous. We make a small tray.",
      },
      {
        name: "Seasonal danish",
        price: "5",
        note: "Whatever the market is loud about. Right now: early apple and brown butter.",
      },
      {
        name: "Chocolate chip cookie",
        price: "3.50",
        note: "Brown butter, two chocolates, sea salt. Soft in the middle on purpose.",
      },
      {
        name: "Olive oil cake",
        price: "5",
        note: "By the slice. Citrus, a tender crumb, no frosting speech.",
      },
      {
        name: "Saturday cinnamon roll",
        price: "5",
        note: "One day a week. Soft dough, sticky edges. We stop when the pan is empty.",
      },
    ],
  },
  {
    id: "coffee",
    title: "Coffee & drinks",
    intro:
      "We don’t roast. We pour beans from Harbor & Pine in Berkeley, plus a weekend guest when something good shows up.",
    items: [
      { name: "Drip", price: "3 / 3.50", note: "House blend. The honest cup." },
      { name: "Espresso", price: "3.50", note: "Short, sweet, a little cocoa." },
      { name: "Cappuccino", price: "4.50", note: "Equal parts. Foam you can draw in." },
      { name: "Latte", price: "5", note: "Oat and whole milk on the bar. Almond if we have it." },
      { name: "Pour-over", price: "5", note: "Single origin, rotating. Ask what’s blooming." },
      { name: "House mocha", price: "5.50", note: "Our own ganache, not syrup. Winter favorite." },
      { name: "Orange juice", price: "4", note: "Squeezed in the morning. Pulp on purpose." },
      { name: "Kids cocoa", price: "3", note: "Warm milk, real chocolate, a marshmallow if you want one." },
    ],
  },
];

export const featured = [
  {
    name: "Country loaf",
    note: "The loaf we feed first. Come early if you want it warm.",
    image: "/images/bread-loaves.jpg",
    alt: "Three rustic bakery loaves on a dark board with a stalk of wheat",
  },
  {
    name: "Morning croissants",
    note: "Shatter-warm from the first tray. Butter, a little sugar in the air, best on the walk to work.",
    image: "/images/hero-croissants.jpg",
    alt: "Two golden croissants on a dark slate with powdered sugar in the air",
  },
  {
    name: "House drip",
    note: "Take a minute and enjoy the morning brew. We always have space for you.",
    image: "/images/coffee.jpg",
    alt: "Three people toasting with lattes and a glass of iced coffee",
  },
] as const;
