# Madrone Table

Informational site for a fictional Modern Californian restaurant in Lafayette, California. Part of the Nemomakes **showsites** monorepo.

Soft CTAs only: call, email, or open a map. No booking widget and no forms.

## Pages

- `/` — Home
- `/menu` — Seasonal / sample menu
- `/story` — How the kitchen started and how it cooks
- `/visit` — Address, hours, map, phone, email

## Local

From this folder:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm install
npm run build
npm start
```

Requires Node 20+.

## Deploy on Vercel

This app lives in a monorepo subdirectory. In the Vercel project:

1. Import the `showsites` GitHub repo.
2. Set **Root Directory** to `madrone-table` (Project Settings → General, or the import wizard).
3. Framework: **Next.js**.
4. Install: `npm install`
5. Build: `npm run build`
6. Leave output directory blank (Next.js default).

No environment variables are required.

## Stack

Next.js App Router, TypeScript, Tailwind CSS v4. Scroll reveals use Motion (`whileInView`, once) and honor `prefers-reduced-motion`.

Photography is royalty-free (Unsplash / Pexels), stored in `public/images/`. Sources are listed in `public/images/CREDITS.txt`.
