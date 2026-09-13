# Oak & Crumb Bakery

Informational site for a fictional neighborhood bakery in Walnut Creek, California. Part of the Nemomakes **showsites** monorepo.

Soft CTAs only: visit, call, email. No ecommerce checkout.

## Pages

- `/` — Home
- `/about` — Story
- `/menu` — Bread, pastry, coffee
- `/contact` — Hours, address, map link, phone, email

## Local

From this folder:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

Requires Node 20+.

## Deploy on Vercel

This app lives in a monorepo subdirectory. In the Vercel project:

1. Import the `showsites` GitHub repo.
2. Set **Root Directory** to `oak-and-crumb` (Project Settings → General, or the import wizard).
3. Framework: **Next.js**.
4. Install: `npm install`
5. Build: `npm run build`
6. Leave output directory blank (Next.js default).

No environment variables are required.

## Stack

Next.js App Router, TypeScript, Tailwind CSS v4.

Photography is royalty-free (Unsplash / Pexels), stored in `public/images/`.
