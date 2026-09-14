export const site = {
  name: "Lumen",
  legalName: "Lumen Salon",
  tagline: "Walnut Creek · lived-in color",
  dek: "An elevated neighborhood salon on Locust Street. Lived-in color, precision cuts, and a quiet chair.",
  description:
    "Lumen is a neighborhood salon in Walnut Creek, California. Lived-in color, precision cuts, and calm hospitality — call to book a consult.",
  url: "https://lumensalon.example",
  email: "hello@lumensalon.com",
  phone: "(925) 555-0163",
  phoneHref: "tel:+19255550163",
  emailHref: "mailto:hello@lumensalon.com",
  instagram: "@lumensalon",
  address: {
    street: "1632 Locust Street",
    city: "Walnut Creek",
    region: "CA",
    postal: "94596",
    neighborhood: "Downtown",
    line: "1632 Locust Street, Walnut Creek, CA 94596",
  },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=1632+Locust+Street+Walnut+Creek+CA+94596",
  hoursNote:
    "Pacific time. Last color chair sits at 4:00 on weekdays and 2:30 on Saturday. Evening consults by request.",
  hours: [
    { days: "Sunday – Monday", time: "Closed" },
    { days: "Tuesday – Friday", time: "9:00 am – 6:00 pm" },
    { days: "Saturday", time: "9:00 am – 4:00 pm" },
  ],
} as const;

export const nav = [
  { href: "/story", label: "Story" },
  { href: "/services", label: "Services" },
  { href: "/visit", label: "Visit" },
] as const;

export type ServiceItem = {
  name: string;
  price: string;
  note: string;
};

export type ServiceSection = {
  id: string;
  title: string;
  intro: string;
  items: ServiceItem[];
};

export const services: ServiceSection[] = [
  {
    id: "color",
    title: "Color",
    intro:
      "We build color you can wear to the grocery store and a dinner — not a trend you grow out of in six weeks. New color guests start with a consult.",
    items: [
      {
        name: "Lived-in color",
        price: "from 195",
        note: "Balayage, soft dimension, or a brunette that still reads as yours. The work we are known for.",
      },
      {
        name: "Full highlight",
        price: "from 220",
        note: "Foil work when you want more lift. We still keep a root that belongs to you.",
      },
      {
        name: "Blonding",
        price: "consult",
        note: "A conversation first. We will tell you what the hair can hold this visit, and what should wait.",
      },
      {
        name: "Gloss / toner",
        price: "75",
        note: "Shine, tone, a reset between bigger appointments. Forty-five quiet minutes.",
      },
      {
        name: "Root refresh",
        price: "95",
        note: "A clean grow-out, matched to the color you already live in.",
      },
      {
        name: "Gray blending",
        price: "from 120",
        note: "We do not hide every silver unless you ask. Soft coverage, or a brightening around the face.",
      },
    ],
  },
  {
    id: "cut",
    title: "Cut",
    intro:
      "Weight, not just length. We cut dry when the hair needs it, wet when it doesn’t, and we will say which before we pick up the shears.",
    items: [
      {
        name: "Precision cut",
        price: "95",
        note: "The everyday haircut. Shape that lasts past the first wash.",
      },
      {
        name: "Restyle",
        price: "125",
        note: "A new silhouette. Bring a photo if you want — we will still look at your actual hair.",
      },
      {
        name: "Fringe / bangs",
        price: "45",
        note: "A trim between cuts, or a first fringe if you are ready. Ten extra minutes of honesty.",
      },
      {
        name: "Texture cut",
        price: "110",
        note: "Curly, wavy, and coily hair cut in the pattern it grows. No forcing a blowout first.",
      },
    ],
  },
  {
    id: "style",
    title: "Style & care",
    intro:
      "The Tuesday blowout. The Saturday you have somewhere to be. Treatments that make the next color take better.",
    items: [
      {
        name: "Blowout",
        price: "65",
        note: "Wash, round brush, a finish that lasts a few days if you sleep on a silk pillow. We will not pretend otherwise.",
      },
      {
        name: "Event style",
        price: "95",
        note: "Up, down, or something in between. Book with a trial if the day matters.",
      },
      {
        name: "Bond treatment",
        price: "45",
        note: "Added to color when the hair asks for it. We would rather slow a lightening than repair it later.",
      },
      {
        name: "Treatment only",
        price: "55",
        note: "Moisture or protein, chosen after we feel the hair. No menu of twelve serums.",
      },
      {
        name: "Extension consult",
        price: "50*",
        note: "Wefts and tape-ins when the hair can take them. *Applied to the install if you move forward.",
      },
    ],
  },
];

export const team = [
  {
    name: "Noor Alami",
    role: "Owner · lived-in color",
    bio: "Oakland-raised. A decade in San Francisco color rooms before she wanted a quieter chair. Opened Lumen on Locust in 2021. Still takes the first consult of the day.",
  },
  {
    name: "Sadie Chen",
    role: "Precision cuts",
    bio: "Obsessed with weight and movement. If your last cut died in a week, sit with Sadie. She will tell you why, without making it a speech.",
  },
  {
    name: "Mateo Ruiz",
    role: "Blonding · gloss",
    bio: "Concord kid, trained in Portland. The one who says no to a two-level jump when the hair is not ready — and means it kindly.",
  },
  {
    name: "Priya Shah",
    role: "Texture",
    bio: "Curly, wavy, and coily hair, cut in the pattern it grows. Priya treats the hair you have, not a straightened version of it.",
  },
  {
    name: "Wren Solis",
    role: "Blowouts · events",
    bio: "The Tuesday that looks like you slept. Also the person you call when a wedding is in three weeks and you need a calm plan.",
  },
] as const;

export const featured = [
  {
    name: "Lived-in color",
    note: "Dimension that belongs to the hair you already have. Soft grow-out, no stripes.",
    image: "/images/blonde.jpg",
    alt: "Portrait of a woman with lived-in blonde hair against a dark backdrop",
  },
  {
    name: "Precision cut",
    note: "Shape first. Length second. A haircut that still makes sense in six weeks.",
    image: "/images/cut.jpg",
    alt: "Close view of a stylist making a precise cut with comb and shears",
  },
  {
    name: "The chair",
    note: "A consult is a conversation. Bring a photo if you want. We will look at your hair either way.",
    image: "/images/consult.jpg",
    alt: "Stylist and guest talking in the salon before a service",
  },
] as const;
