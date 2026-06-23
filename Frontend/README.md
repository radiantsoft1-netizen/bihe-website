# BIHE Public Website (Frontend)

Next.js 15 public site for **Bapuji Institute of Hi-Tech Education**. Fetches dynamic content from the Laravel API in [`../Backend/`](../Backend/).

## Quick start

```bash
cd Frontend
npm install
cp .env.example .env.local   # optional: point at local Laravel API
npm run dev
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000).

From the **repo root**, `npm run dev` delegates here automatically.

## Admin panel (local)

Run the Laravel admin in [`../Backend/`](../Backend/) (`composer serve` on port 8099), then open:

- [http://127.0.0.1:3000/admin](http://127.0.0.1:3000/admin) — proxied through Next.js
- [http://127.0.0.1:8099/admin](http://127.0.0.1:8099/admin) — direct

## Environment

Copy `.env.example` to `.env.local`:

```env
ADMIN_ORIGIN=http://127.0.0.1:8099
NEXT_PUBLIC_API_URL=http://127.0.0.1:8099
REVALIDATE_SECRET=bihe-local-revalidate
```

`REVALIDATE_SECRET` must match `Backend/.env`.

## Verify & build

```bash
npm run verify          # tsc + lint (safe while dev server runs)
npm run verify:backend  # integration check (API + revalidation)
npm run build           # production build
```

## Layout

| Path | Purpose |
|------|---------|
| `src/app/` | Next.js App Router pages |
| `src/components/` | React components |
| `src/lib/` | Content modules, API client, services |
| `src/styles/` | Global CSS |
| `public/` | Static assets |
| `scripts/` | Dev, verify, and deploy helper scripts |

## Deploy

- **Vercel:** set project **Root Directory** to `Frontend`
- **Hostinger Node.js:** deploy this folder; see `scripts/package-hostinger-frontend.sh`
