export const site = {
  name: "Lumen",
  legalName: "Lumen Salon",
  tagline: "Lived-in color and cuts in downtown Walnut Creek",
  dek: "Lived-in color and cuts in downtown Walnut Creek",
  description:
    "Lived-in color and cuts in downtown Walnut Creek",
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
  mapsEmbedUrl:
    "https://maps.google.com/maps?q=1632+Locust+Street,+Walnut+Creek,+CA+94596&z=16&output=embed",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=1632+Locust+Street+Walnut+Creek+CA+94596",
  hoursLine: "Sun–Mon closed · Tue–Fri 9:00 am–6:00 pm · Sat 9:00 am–4:00 pm",
  hoursNote: "Last color 4:00 weekdays / 2:30 Sat. Evening consults by request.",
  hours: [
    { days: "Sunday – Monday", time: "Closed" },
    { days: "Tuesday – Friday", time: "9:00 am – 6:00 pm" },
    { days: "Saturday", time: "9:00 am – 4:00 pm" },
  ],
  footer:
    "A neighborhood salon on Locust Street. Color, cuts, and a chair that doesn’t rush you.",
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
  note?: string;
  items: ServiceItem[];
};

export const services: ServiceSection[] = [
  {
    id: "color",
    title: "Color",
    intro: "Lived-in results — dimension that still looks good as it grows.",
    note: "Last color chair: 4:00 weekdays, 2:30 Sat.",
    items: [
      {
        name: "Lived-in highlight / balayage",
        price: "from $280",
        note: "Consult, placement, toner/gloss, blowout",
      },
      {
        name: "Full highlight",
        price: "from $320",
        note: "Full-head foils, toner, finish",
      },
      {
        name: "Partial / face-frame",
        price: "from $180",
        note: "Face + part focus",
      },
      {
        name: "Root touch-up / refresh",
        price: "from $120",
        note: "Regrowth blend or all-over deposit",
      },
      {
        name: "Gloss / toner",
        price: "from $75",
        note: "Shine + tone between bigger visits",
      },
      {
        name: "Color correction",
        price: "by consult",
        note: "Multi-visit; consult first",
      },
    ],
  },
  {
    id: "cuts",
    title: "Cuts & styling",
    intro: "",
    items: [
      {
        name: "Haircut + blowout",
        price: "from $95",
        note: "Consult, cut wet/dry by texture, blow-dry",
      },
      {
        name: "Haircut only (air-dry / curl)",
        price: "from $85",
        note: "Cut in natural pattern + home finish tips",
      },
      {
        name: "Trim",
        price: "from $65",
        note: "Ends + shape, no full restyle",
      },
      {
        name: "Blowout",
        price: "from $55",
        note: "Wash, condition, round-brush or air-dry",
      },
      {
        name: "Special-occasion style",
        price: "from $90",
        note: "Updo/polish; consult for events",
      },
    ],
  },
  {
    id: "addons",
    title: "Add-ons",
    intro: "",
    items: [
      { name: "Deep conditioning", price: "from $35", note: "" },
      { name: "Bond-building (w/ lightening)", price: "from $40", note: "" },
      { name: "Scalp treatment", price: "from $30", note: "" },
    ],
  },
];

export const featured = [
  {
    name: "Lived-in color",
    note: "balayage, highlights, glosses",
    image: "/images/blonde.jpg",
    alt: "Portrait of a woman with lived-in blonde hair against a dark backdrop",
  },
  {
    name: "Precision cuts",
    note: "layers and shapes by density and curl",
    image: "/images/cut.jpg",
    alt: "Close view of a stylist making a precise cut with comb and shears",
  },
  {
    name: "First-visit consult",
    note: "30 min on history, goals, what’s realistic",
    image: "/images/consult.jpg",
    alt: "Stylist and guest talking in the salon before a service",
  },
] as const;

export const visitSteps = [
  "We talk — goals, history, how you style at home",
  "We check the hair — density, prior color, damage, what’s safe this visit",
  "We do the work — foils, freehand, gloss, or cut, with time built in",
  "We finish + send you home with care notes — wash routine, when to gloss, what to book next",
] as const;

export const hairGoals = [
  "Soft dimension that still looks like your color",
  "Blonde that doesn’t go brassy between visits",
  "A cut that grows out without a weird shape",
  "Curl-friendly layers that don’t need a straightener",
  "A gloss or refresh between bigger color appointments",
] as const;

export const howWeWork = [
  "Honest consults — if your hair can’t take a big jump this visit, we say so first",
  "Texture as it grows — curly and coily hair cut in pattern; we don’t straighten to cut",
  "Professional color only — lines we’d use on ourselves, plus clear home-care guidance",
  "A human room — water, a low playlist, no shame language at the mirror",
] as const;
