# BIHE College Website (Monorepo)

Landing page and content site for **Bapuji Institute of Hi-Tech Education**, plus a Laravel admin panel and JSON API.

## Monorepo layout

| Package | Path | Stack | Deploy target |
|---------|------|-------|---------------|
| Public site | [`Frontend/`](Frontend/) | Next.js 15, React 19 | **Hostinger Node.js** or **Vercel** (`bihedvg.org`) |
| Admin + API | [`Backend/`](Backend/) | Laravel 11, Blade, MySQL | **Hostinger** (FTP/SFTP via GitHub Actions) |
| Shared docs | [`docs/`](docs/) | — | — |

Built from the [Figma design](https://www.figma.com/design/iJhaFUCwUHxeLeOQVHxTJe/BIHE-College?node-id=139-23100) with layout patterns inspired by the Univet reference theme.

**Entry points:** [`Frontend/README.md`](Frontend/README.md) · [`Backend/README.md`](Backend/README.md)

## Documentation

| Guide | Description |
|-------|-------------|
| **[docs/FINAL-DELIVERABLES.md](docs/FINAL-DELIVERABLES.md)** | **Master handoff** — full checklist, paths, CRUD modules, env vars |
| [docs/GITHUB-CICD.md](docs/GITHUB-CICD.md) | GitHub Actions, secrets, FTP/SFTP deploy |
| [docs/FUTURE-PHASES.md](docs/FUTURE-PHASES.md) | Phase 2 module architecture & extension points |
| [docs/BIHE-Admin-Integration-Guide.md](docs/BIHE-Admin-Integration-Guide.md) | Next.js ↔ Laravel API wiring |
| [Backend/README.md](Backend/README.md) | Admin setup, API endpoints, schema map |
| [Backend/docs/HOSTINGER-DEPLOY.md](Backend/docs/HOSTINGER-DEPLOY.md) | Production deploy on Hostinger |
| [Backend/docs/SECURITY.md](Backend/docs/SECURITY.md) | Auth, uploads, session security |

**Module registries:** `Backend/config/modules.php` (Laravel) · `Frontend/src/lib/api/modules.ts` (Next.js)

## Brand

- Primary navy: `#1E3A75`
- Secondary maroon: `#740000`
- Font: **Cabin** (body/UI), **Assistant** (hero headline)

Global design tokens live in `Frontend/src/styles/tokens.css`.

## Quick start — public site

```bash
npm install --prefix Frontend
npm run download-assets --prefix Frontend   # Pull images from Figma (expires after ~7 days)
cp Frontend/.env.example Frontend/.env.local   # Optional: point at Laravel API
npm run dev
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000).

**Admin from the same site:** [http://127.0.0.1:3000/admin](http://127.0.0.1:3000/admin) proxies to the Laravel panel (run `composer serve` in `Backend/` first).

### Production URLs (Hostinger)

| | URL |
|---|---|
| **Public website** | https://bihedvg.org |
| **Admin panel** | https://admin.bihedvg.org/admin |
| **API** | https://admin.bihedvg.org/api/v1/* |

| | Website | Admin |
|---|---------|-------|
| **Local** | http://127.0.0.1:3000 | http://127.0.0.1:3000/admin (proxied) or http://127.0.0.1:8099/admin |
| **Production** | https://bihedvg.org | https://admin.bihedvg.org/admin |

**Public site env (Hostinger Node.js / Vercel → Environment variables):**

| Variable | Value |
|----------|--------|
| `ADMIN_ORIGIN` | `https://admin.bihedvg.org` |
| `NEXT_PUBLIC_API_URL` | `https://admin.bihedvg.org` |
| `REVALIDATE_SECRET` | Same as Laravel `.env` |

**Hostinger Laravel `.env` (`admin.bihedvg.org`):**

```env
APP_URL=https://admin.bihedvg.org
NEXTJS_URL=https://bihedvg.org
ADMIN_PROXY_HOSTS=bihedvg.org,www.bihedvg.org
REVALIDATE_SECRET=<same-as-public-site>
```

Deploy guide: `tmp/HOSTINGER-FRONTEND-DEPLOY.md` · `Backend/HOSTINGER-QUICKSTART.md`

### Dynamic homepage content (optional)

Hero, announcements, news, gallery highlights, and recruiter logos can load from the Laravel API in `Backend/`. Set in `Frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8099
ADMIN_ORIGIN=http://127.0.0.1:8099
```

Without this variable (or if the API is unreachable), each section falls back to static content.

## Quick start — admin panel

```bash
cd Backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan storage:link
composer serve
```

Admin login: http://127.0.0.1:8099/admin — or open **http://127.0.0.1:3000/admin** while `npm run dev` is running (redirects to the panel).

See **[Backend/README.md](Backend/README.md)** for API endpoints, Hostinger setup, and security notes.

## Verify & build

```bash
npm run verify    # Type-check + lint (use during dev; does not stop the dev server)
npm run build     # Production build (writes to Frontend/.next-build)
npm start
```

## CI/CD & deployment

- **CI:** `.github/workflows/ci.yml` — `npm run verify` and PHP syntax on PRs to `main` / `develop`
- **Admin deploy:** `.github/workflows/deploy-bihe-admin.yml` — FTP to Hostinger on push to `main`
- **SFTP (optional):** `.github/workflows/deploy-bihe-admin-sftp.yml` — manual workflow_dispatch

Full setup (secrets, branches, dry-run, Vercel vs Hostinger): **[docs/GITHUB-CICD.md](docs/GITHUB-CICD.md)**

## Project structure

```
├── Frontend/               # Next.js App Router (public site)
│   ├── src/
│   ├── public/
│   └── scripts/
├── Backend/                # Laravel CMS + /api/v1 JSON API
├── docs/                   # Handoff, CI/CD, integration guides
├── scripts/                # Repo-level helpers (push-to-github, admin-tunnel)
└── .github/workflows/      # CI and Hostinger deploy
```

- `Frontend/src/components/landing/` — Homepage sections
- `Frontend/src/lib/api/` — API client, homepage fetchers, module registry
- `Frontend/src/lib/phase1-static-pages.ts` — Routes that stay hardcoded in Phase 1
- `Frontend/src/styles/` — Global CSS and tokens
- `Frontend/public/images/` — Downloaded Figma assets
