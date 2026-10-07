export const site = {
  name: "Madrone",
  legalName: "Madrone Table",
  tagline: "Seasonal plates and a patio in Lafayette",
  description:
    "Madrone Table is a small Modern Californian restaurant. We cook what's in season, pour a short wine list, and keep a few tables outside when the weather holds.",
  url: "https://madronetable.example",
  email: "hello@madronetable.com",
  phone: "(925) 555-0194",
  phoneHref: "tel:+19255550194",
  emailHref: "mailto:hello@madronetable.com",
  address: {
    street: "2104 School Street",
    city: "Lafayette",
    region: "CA",
    postal: "94549",
    line: "2104 School Street, Lafayette, CA 94549",
  },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=2104+School+Street+Lafayette+CA+94549",
  mapsEmbedUrl:
    "https://maps.google.com/maps?q=2104+School+Street,+Lafayette,+CA+94549&z=16&output=embed",
  hoursLine:
    "Mon closed · Tue–Thu 5:00–9:00 pm · Fri–Sat 5:00–10:00 pm · Sun 5:00–8:30 pm",
  hoursNote:
    "Last seating 30 min before close. Patio weather permitting; heaters on cool evenings.",
  hours: [
    { days: "Monday", time: "Closed" },
    { days: "Tue–Thu", time: "5:00–9:00 pm" },
    { days: "Fri–Sat", time: "5:00–10:00 pm" },
    { days: "Sun", time: "5:00–8:30 pm" },
  ],
} as const;

export const nav = [
  { href: "/menu", label: "Menu" },
  { href: "/story", label: "Story" },
  { href: "/visit", label: "Visit" },
] as const;

export const home = {
  heroTitle: "Seasonal plates. A quiet patio. Lafayette.",
  introTitle: "Dinner close to home.",
  introBody:
    "The kitchen works from local produce and a short, changing menu. Expect clean flavors, simple plating, and a room that stays calm even when it's full. Built for weeknight dinners and unhurried weekends.",
  expectTitle: "What to expect.",
  expect: [
    "A seasonal menu that shifts every few weeks",
    "Small plates to share and mains you can finish alone",
    "A patio with heaters when the evening cools",
    "Reservations by phone or email — no app, no waitlist widget",
    "A short wine and cocktail list that fits the food",
  ],
  menuTitle: "On the menu right now.",
  menuBody:
    "A few plates from the current season. The full board is on the menu page and changes with the market.",
  menuItems: [
    "Roasted beets, whipped ricotta, toasted hazelnuts",
    "Half chicken, pan jus, mustard greens",
    "Day-boat rockfish, brown butter, lemon",
    "Olive oil cake, citrus, crème fraîche",
  ],
  patioTitle: "The patio.",
  patioBody:
    "A small outdoor room off School Street — string lights, a few tables, heaters when the fog drops. Good for a long dinner when you want air without leaving town.",
  visitTitle: "Come in for dinner.",
  visitBody:
    "Tuesday–Thursday 5:00–9:00 pm. Friday–Saturday 5:00–10:00 pm. Sunday 5:00–8:30 pm. Closed Monday. Kitchen last seating thirty minutes before close.",
  visitAddress:
    "2104 School Street, Lafayette, CA 94549 — downtown, near the BART plaza.",
  visitNote:
    "We take reservations by phone or email. Walk-ins welcome at the bar and patio when we have room.",
} as const;

export type MenuItem = {
  name: string;
  note: string;
  price: string;
};

export type MenuSection = {
  id: string;
  title: string;
  items: readonly MenuItem[];
};

export const menuIntro =
  "A sample of what we're cooking this season. Prices and dishes change with the market — call if you want to confirm what's on tonight.";

export const menuNote =
  "Ask about wine pairings and by-the-bottle when you call.";

export const menu: readonly MenuSection[] = [
  {
    id: "small-plates",
    title: "Small plates",
    items: [
      {
        name: "Marinated olives & almonds",
        note: "citrus peel, rosemary",
        price: "$9",
      },
      {
        name: "Whipped ricotta",
        note: "local honey, cracked pepper, grilled bread",
        price: "$14",
      },
      {
        name: "Roasted beets",
        note: "hazelnuts, soft herbs, aged vinegar",
        price: "$16",
      },
      {
        name: "Grilled Little Gem",
        note: "anchovy vinaigrette, breadcrumbs, parm",
        price: "$15",
      },
    ],
  },
  {
    id: "mains",
    title: "Mains",
    items: [
      {
        name: "Half chicken",
        note: "pan jus, mustard greens, roasted potatoes",
        price: "$32",
      },
      {
        name: "Day-boat rockfish",
        note: "brown butter, lemon, seasonal vegetables",
        price: "$36",
      },
      {
        name: "Grass-fed hanger steak",
        note: "charred onion, salsa verde, fries",
        price: "$38",
      },
      {
        name: "Squash risotto",
        note: "brown butter, sage, pecorino (vegetarian)",
        price: "$28",
      },
    ],
  },
  {
    id: "desserts",
    title: "Desserts",
    items: [
      { name: "Olive oil cake", note: "citrus, crème fraîche", price: "$12" },
      {
        name: "Dark chocolate pot",
        note: "sea salt, olive oil",
        price: "$13",
      },
    ],
  },
  {
    id: "drinks",
    title: "Drinks",
    items: [
      { name: "House sparkling", note: "by the glass", price: "$12" },
      {
        name: "Local Chardonnay",
        note: "East Bay / Sonoma pour",
        price: "$14",
      },
      { name: "Pinot Noir", note: "cool-climate, light tannin", price: "$15" },
      { name: "Negroni", note: "classic build", price: "$16" },
      {
        name: "Seasonal spritz",
        note: "changing citrus / bitter",
        price: "$14",
      },
      { name: "Still / sparkling water", note: "bottle", price: "$6" },
    ],
  },
];

export const story = {
  title: "A kitchen that stayed local.",
  sub: "Madrone Table is chef Luke Park's East Bay restaurant — seasonal cooking, a short list, and a patio that fills when the weather is good.",
  originTitle: "How we got here.",
  origin: [
    "Luke cooked in San Francisco dining rooms for twelve years before he wanted a place closer to home. He opened Madrone Table in Lafayette in 2022, in a narrow storefront with a door that opens onto School Street and a small patio out back.",
    "The name comes from the madrone trees in the hills above town — bark that peels, leaves that stay green. The cooking follows the same idea: clear, seasonal, not overworked. Produce comes from East Bay farms and a few trusted North Coast boats. The menu stays short so the kitchen can change it when something's good.",
  ],
  cookTitle: "How we cook.",
  cook: [
    "Seasonal first — if it isn't good this week, it isn't on the plate",
    "A short menu so every dish gets attention",
    "Local where it matters: greens, fruit, dairy, fish when the boats have it",
    "A room meant for conversation",
    "Bread and stocks made in-house every morning",
    "Whole fish and whole birds, so nothing goes to waste",
    "Wine from small California producers that suits the food",
  ],
  reserveTitle: "Reserve a table.",
  reserveBody:
    "Call or email. We'll hold a spot inside or on the patio when we can.",
} as const;

export const visit = {
  title: "Visit us in Lafayette.",
  sub: "2104 School Street — downtown, a short walk from the BART plaza.",
  findTitle: "Find us.",
  findBody:
    "We're on School Street in downtown Lafayette. Street parking nearby; public lots a block off Mount Diablo Boulevard. BART is a short walk if you'd rather not drive.",
  reserveTitle: "Reservations & the patio.",
  reserveBody:
    "Reservations by phone or email — no online widget. Walk-ins welcome at the bar and patio when free. Parties of six+: call a few days ahead.",
  talkBody:
    "Best for holds, dietary notes, patio requests. We answer email in the afternoon before service.",
} as const;
