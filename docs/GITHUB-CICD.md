# GitHub & CI/CD Guide — BIHE Monorepo

This repository contains two deployable surfaces:

| Surface | Path | Hosting | Deploy method |
|---------|------|---------|---------------|
| **Public website** | `/` (Next.js) | [Vercel](https://vercel.com) (recommended) | Git integration or `vercel deploy` |
| **Admin panel + API** | `bihe-admin/` (Laravel 11) | Hostinger shared hosting | GitHub Actions → FTP or SFTP |

Do **not** commit `.env`, `.env.local`, or production credentials. Workflows exclude `.env` from uploads.

---

## 1. Repository setup

### Clone and branches

```bash
git clone git@github.com:YOUR_ORG/bihe-website.git
cd bihe-website
npm install
cd bihe-admin && composer install && cd ..
```

| Branch | Purpose |
|--------|---------|
| `main` | Production — merges trigger Hostinger FTP deploy when `bihe-admin/**` changes |
| `develop` | Integration / staging — CI runs on PRs and pushes; no auto FTP deploy |

Create `develop` after the first push:

```bash
git checkout -b develop
git push -u origin develop
```

### First-time commit checklist

- [ ] `bihe-admin/composer.lock` committed (run `composer install` in `bihe-admin/` once)
- [ ] `.env.example` and `bihe-admin/.env.example` present; real `.env` files gitignored
- [ ] `npm run verify` passes locally
- [ ] GitHub Actions secrets configured (see below)

---

## 2. GitHub secrets

Add in **Settings → Secrets and variables → Actions → Repository secrets**.

### FTP deploy (required for default workflow)

| Secret | Required | Example | Notes |
|--------|----------|---------|-------|
| `FTP_SERVER` | Yes | `ftp.bihe.edu` | Hostinger FTP hostname (hPanel → Files → FTP Accounts) |
| `FTP_USERNAME` | Yes | `u123456789` | FTP username |
| `FTP_PASSWORD` | Yes | `••••••••` | FTP password |
| `FTP_SERVER_DIR` | Yes | `/domains/admin.bihe.edu/public_html/` | Remote **project root** (contains `artisan`, not `public/`) |
| `FTP_PORT` | No | `21` | Defaults to `21` if unset |
| `FTP_PROTOCOL` | No | `ftp` | `ftp`, `ftps`, or `ftps-legacy` (Hostinger docs) |

### SFTP deploy (optional — manual workflow)

Use when Hostinger provides SSH/SFTP only (port 22). Falls back to `FTP_*` secrets when `SFTP_*` are unset.

| Secret | Required | Example | Notes |
|--------|----------|---------|-------|
| `SFTP_SERVER` | No* | `ssh.hostinger.com` | *Or reuse `FTP_SERVER` |
| `SFTP_USERNAME` | No* | `u123456789` | *Or reuse `FTP_USERNAME` |
| `SFTP_PASSWORD` | No** | `••••••••` | **Password auth; or use SSH key below |
| `SFTP_SERVER_DIR` | No* | `/home/u123/.../bihe-admin/` | *Or reuse `FTP_SERVER_DIR` |
| `SFTP_PORT` | No | `22` | Defaults to `22` |
| `SSH_PRIVATE_KEY` | No** | `-----BEGIN OPENSSH PRIVATE KEY-----` | **Key auth (preferred on SSH plans) |
| `SSH_PASSPHRASE` | No | `••••••••` | Only if the private key is encrypted |

### Vercel (public site — not GitHub Actions)

Configure in the Vercel project dashboard:

| Variable | Example |
|----------|---------|
| `NEXT_PUBLIC_API_URL` | `https://admin.bihe.edu` |

No FTP secrets are needed for the Next.js site on Vercel.

---

## 3. Workflows

### `ci.yml` — pull requests & pushes

**Triggers:** `pull_request` and `push` to `main` or `develop`.

| Job | When | What it does |
|-----|------|--------------|
| `verify-nextjs` | `src/`, `package.json`, etc. changed | `npm ci` → `npm run verify` (TypeScript + ESLint) |
| `php-syntax` | `bihe-admin/**` changed | `php -l` on app/config/routes files (no Composer install) |

Path detection uses [dorny/paths-filter](https://github.com/dorny/paths-filter); unrelated changes skip the matching job.

### `deploy-bihe-admin.yml` — FTP (automatic)

**Triggers:**

- Push to `main` when paths match:
  - `bihe-admin/**`
  - `.github/workflows/deploy-bihe-admin.yml`
- **workflow_dispatch** with optional **dry_run** (logs planned sync, no upload)

**Steps:** `composer install --no-dev` → [SamKirkland/FTP-Deploy-Action](https://github.com/SamKirkland/FTP-Deploy-Action) (FTP/FTPS only; SFTP not supported in v4).

### `deploy-bihe-admin-sftp.yml` — SFTP (manual)

**Triggers:** **workflow_dispatch** only, with optional **dry_run** (rsync `--dry-run`).

**Steps:** Same Composer build → [wlixcc/SFTP-Deploy-Action](https://github.com/wlixcc/SFTP-Deploy-Action) over port 22.

Use this when FTP is disabled and only SFTP/SSH is available.

---

## 4. Vercel vs Hostinger

```
┌─────────────────────┐         ┌──────────────────────────┐
│  Next.js public site │  HTTPS  │  Laravel bihe-admin     │
│  (Vercel)            │ ──────► │  (Hostinger)              │
│  www.bihe.edu        │  API    │  admin.bihe.edu           │
└─────────────────────┘         └──────────────────────────┘
        │                                  │
   Vercel Git hook                   GitHub Actions FTP/SFTP
   or vercel deploy                  on push to main
```

- **Public site:** Connect the repo root to Vercel; set root directory to `.` (default). Vercel runs `npm run build` and serves the App Router app globally.
- **Admin panel:** Stays on Hostinger because shared hosting expects PHP + Apache document root at `bihe-admin/public`. No Node build on the server.
- **API URL:** Production Next.js uses `NEXT_PUBLIC_API_URL=https://admin.bihe.edu` (or your admin subdomain).

---

## 5. First deploy vs subsequent deploys

### Laravel admin — first time (Hostinger)

Before or after the first GitHub Actions FTP run, on the server (SSH or hPanel Terminal):

```bash
cd /path/to/bihe-admin
cp .env.example .env
# Edit .env: APP_URL, DB_*, ADMIN_*, APP_DEBUG=false
php artisan key:generate
php artisan migrate --force --seed
php artisan storage:link
php artisan config:cache
php artisan route:cache
php artisan view:cache
chmod -R 775 storage bootstrap/cache
```

Set the domain **document root** to `bihe-admin/public` in hPanel.

`.env` is **never** uploaded by workflows.

### Laravel admin — subsequent deploys

1. Merge to `main` (or run **Deploy BIHE Admin to Hostinger (FTP)** manually).
2. Action runs `composer install --no-dev` and syncs files.
3. If migrations changed, SSH in:

```bash
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### Test deploy safely (dry run)

1. GitHub → **Actions** → **Deploy BIHE Admin to Hostinger (FTP)** → **Run workflow** → enable **dry_run**.
2. Review the log for files that would be created/updated.
3. Run again with **dry_run** off, or push to `main`.

For SFTP: use **Deploy BIHE Admin to Hostinger (SFTP)** with **dry_run** enabled first.

### Public site — Vercel

1. Import repo in Vercel → link `main` branch.
2. Add `NEXT_PUBLIC_API_URL`.
3. Each push to `main` (or PR previews) deploys automatically.

---

## 6. Create the GitHub repository

```bash
cd "/path/to/BIHE Website"

# Ensure lockfiles exist
npm install
cd bihe-admin && composer install && cd ..

# Initialize remote (skip if already linked)
git remote add origin git@github.com:YOUR_ORG/bihe-website.git

git add .
git status   # confirm no .env files staged
git commit -m "chore: prepare monorepo for GitHub and CI/CD"
git push -u origin main
git checkout -b develop && git push -u origin develop
```

Then in GitHub:

1. **Settings → Secrets and variables → Actions** — add FTP secrets from the table above.
2. **Actions** tab — confirm `CI` passes on the push.
3. Optionally run FTP deploy with **dry_run** before the first real upload.

---

## 7. Related docs

- [bihe-admin/README.md](../bihe-admin/README.md) — Laravel setup, API, Hostinger manual steps
- [BIHE-Admin-Integration-Guide.md](./BIHE-Admin-Integration-Guide.md) — Next.js ↔ Laravel API wiring
