# Who Am I Now?

Lead-magnet landing page for a free 30-day workbook. Part of the Nemomakes **showsites** monorepo.

The page collects an email and posts it to `/api/subscribe`, which creates a Beehiiv subscription.

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

## Environment variables

Set these on the Vercel project (or in a local `.env.local`, which is gitignored). Do not commit secrets.

| Name | Purpose |
| --- | --- |
| `BEEHIIV_API_KEY` | Beehiiv API key sent as `Authorization: Bearer` |
| `BEEHIIV_PUBLICATION_ID` | Publication id in `POST /v2/publications/{id}/subscriptions` |

If either variable is missing, `POST /api/subscribe` returns **503** with `{ "ok": false, "error": "not_configured" }`.

## Deploy on Vercel

This app lives in a monorepo subdirectory. In the Vercel project:

1. Import the `showsites` GitHub repo.
2. Set **Root Directory** to `who-am-i-now` (Project Settings → General, or the import wizard).
3. Framework: **Next.js**.
4. Install: `npm install`
5. Build: `npm run build`
6. Leave output directory blank (Next.js default).
7. Add `BEEHIIV_API_KEY` and `BEEHIIV_PUBLICATION_ID`.

## Stack

Next.js App Router, TypeScript, `next/font/google` (Playfair Display and DM Sans). Styling is plain CSS in `app/globals.css`. Scroll reveals use `IntersectionObserver` and honor `prefers-reduced-motion`.
