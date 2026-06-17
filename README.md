# BIHE College Website (Monorepo)

Landing page and content site for **Bapuji Institute of Hi-Tech Education**, plus a Laravel admin panel and JSON API.

| Package | Path | Stack | Deploy target |
|---------|------|-------|---------------|
| Public site | `/` | Next.js 15, React 19 | **Vercel** (recommended) |
| Admin + API | `bihe-admin/` | Laravel 11, Blade, MySQL | **Hostinger** (FTP/SFTP via GitHub Actions) |

Built from the [Figma design](https://www.figma.com/design/iJhaFUCwUHxeLeOQVHxTJe/BIHE-College?node-id=139-23100) with layout patterns inspired by the Univet reference theme.

## Documentation

| Guide | Description |
|-------|-------------|
| **[docs/FINAL-DELIVERABLES.md](docs/FINAL-DELIVERABLES.md)** | **Master handoff** — full checklist, paths, CRUD modules, env vars |
| [docs/GITHUB-CICD.md](docs/GITHUB-CICD.md) | GitHub Actions, secrets, FTP/SFTP deploy |
| [docs/FUTURE-PHASES.md](docs/FUTURE-PHASES.md) | Phase 2 module architecture & extension points |
| [docs/BIHE-Admin-Integration-Guide.md](docs/BIHE-Admin-Integration-Guide.md) | Next.js ↔ Laravel API wiring |
| [bihe-admin/README.md](bihe-admin/README.md) | Admin setup, API endpoints, schema map |
| [bihe-admin/docs/HOSTINGER-DEPLOY.md](bihe-admin/docs/HOSTINGER-DEPLOY.md) | Production deploy on Hostinger |
| [bihe-admin/docs/SECURITY.md](bihe-admin/docs/SECURITY.md) | Auth, uploads, session security |

**Module registries:** `bihe-admin/config/modules.php` (Laravel) · `src/lib/api/modules.ts` (Next.js)

## Brand

- Primary navy: `#1E3A75`
- Secondary maroon: `#740000`
- Font: **Cabin** (body/UI), **Assistant** (hero headline)

Global design tokens live in `src/styles/tokens.css`.

## Quick start — public site

```bash
npm install
npm run download-assets   # Pull images from Figma (expires after ~7 days)
cp .env.example .env.local   # Optional: point at Laravel API
npm run dev
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000).

**Admin from the same site:** [http://127.0.0.1:3000/admin](http://127.0.0.1:3000/admin) proxies to the Laravel panel (run `composer serve` in `bihe-admin/` first).

### Vercel links (website + admin on one domain)

| | URL |
|---|-----|
| **Website** | https://bihe-website.vercel.app |
| **Admin panel** | https://bihe-website.vercel.app/admin |

Both URLs stay on Vercel. `/admin` is proxied to Laravel on Hostinger (you never need a separate admin domain in the browser).

| | Website | Admin |
|---|---------|-------|
| **Local** | http://127.0.0.1:3000 | http://127.0.0.1:3000/admin |
| **Vercel** | https://bihe-website.vercel.app | https://bihe-website.vercel.app/admin |

**Vercel env (required — set in Project → Settings → Environment Variables, then redeploy):**

| Variable | Value |
|----------|--------|
| `ADMIN_ORIGIN` | Your Hostinger Laravel URL (e.g. `https://admin.bihedvg.org`) |
| `NEXT_PUBLIC_API_URL` | Same as `ADMIN_ORIGIN` |

**Hostinger `.env` (Laravel backend — not visible to users):**

```env
APP_URL=https://admin.bihedvg.org
ADMIN_PROXY_HOSTS=bihe-website.vercel.app,bihedvg.org,www.bihedvg.org
```

### Dynamic homepage content (optional)

Hero, announcements, news, gallery highlights, and recruiter logos can load from the Laravel API in `bihe-admin/`. Set in `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8099
ADMIN_ORIGIN=http://127.0.0.1:8099
```

Without this variable (or if the API is unreachable), each section falls back to static content.

## Quick start — admin panel

```bash
cd bihe-admin
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan storage:link
composer serve
```

Admin login: http://127.0.0.1:8099/admin — or open **http://127.0.0.1:3000/admin** while `npm run dev` is running (redirects to the panel).

See **[bihe-admin/README.md](bihe-admin/README.md)** for API endpoints, Hostinger setup, and security notes.

## Verify & build

```bash
npm run verify    # Type-check + lint (use during dev; does not stop the dev server)
npm run build     # Production build (writes to .next-build)
npm start
```

## CI/CD & deployment

- **CI:** `.github/workflows/ci.yml` — `npm run verify` and PHP syntax on PRs to `main` / `develop`
- **Admin deploy:** `.github/workflows/deploy-bihe-admin.yml` — FTP to Hostinger on push to `main`
- **SFTP (optional):** `.github/workflows/deploy-bihe-admin-sftp.yml` — manual workflow_dispatch

Full setup (secrets, branches, dry-run, Vercel vs Hostinger): **[docs/GITHUB-CICD.md](docs/GITHUB-CICD.md)**

## Project structure

```
├── src/                    # Next.js App Router (public site)
├── public/                 # Static assets
├── bihe-admin/             # Laravel CMS + /api/v1 JSON API
├── docs/                   # Handoff, CI/CD, integration guides
└── .github/workflows/      # CI and Hostinger deploy
```

- `src/components/landing/` — Homepage sections
- `src/lib/api/` — API client, homepage fetchers, module registry
- `src/lib/phase1-static-pages.ts` — Routes that stay hardcoded in Phase 1
- `src/styles/` — Global CSS and tokens
- `public/images/` — Downloaded Figma assets
