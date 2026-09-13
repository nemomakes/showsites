# showsites

Nemomakes $1k informational-site demos — proof templates for outbound.

Each demo is its own app in a subdirectory. Do not put sites at the repo root.

## Demos

| Folder | Business | Status |
| --- | --- | --- |
| [`oak-and-crumb/`](./oak-and-crumb) | Oak & Crumb Bakery — Walnut Creek, CA | Live |
| [`lumen-salon/`](./lumen-salon) | Lumen Salon — Walnut Creek, CA | New |
| `restaurant/` | Neighborhood restaurant | Later |

## Oak & Crumb

Neighborhood bakery site: Home, About, Menu, Contact. Soft visit / call / email CTAs only — no checkout.

```bash
cd oak-and-crumb
npm install
npm run dev
```

Production build:

```bash
cd oak-and-crumb
npm install
npm run build
```

### Vercel

Point a Vercel project at the `oak-and-crumb` subdirectory:

1. Import this GitHub repo in Vercel.
2. Set **Root Directory** to `oak-and-crumb`.
3. Framework preset: Next.js. Build command `npm run build`, output as detected.
4. Deploy.

Full notes live in [`oak-and-crumb/README.md`](./oak-and-crumb/README.md).

## Lumen Salon

Neighborhood salon site: Home, Story, Services, Visit. Soft book-consult / call / email / map CTAs only — no checkout.

```bash
cd lumen-salon
npm install
npm run dev
```

Production build:

```bash
cd lumen-salon
npm install
npm run build
```

### Vercel

Point a Vercel project at the `lumen-salon` subdirectory:

1. Import this GitHub repo in Vercel.
2. Set **Root Directory** to `lumen-salon`.
3. Framework preset: Next.js. Build command `npm run build`, output as detected.
4. Deploy.

Full notes live in [`lumen-salon/README.md`](./lumen-salon/README.md).
