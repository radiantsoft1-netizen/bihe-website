# GitHub & CI/CD Guide — BIHE Monorepo

This repository contains two deployable surfaces:

| Surface | Path | Hosting | Deploy method |
|---------|------|---------|---------------|
| **Public website** | `Frontend/` (Next.js) | Hostinger Node.js or Vercel (`bihedvg.org`) | Manual zip / hPanel rebuild or Vercel |
| **Admin panel + API** | `Backend/` (Laravel 11) | Hostinger shared hosting | GitHub Actions → FTP or SFTP |

Do **not** commit `.env`, `.env.local`, or production credentials. Workflows exclude `.env` from uploads.

---

## 1. Repository setup

### Clone and branches

```bash
git clone git@github.com:YOUR_ORG/bihe-website.git
cd bihe-website
npm install --prefix Frontend
cd Backend && composer install && cd ..
```

| Branch | Purpose |
|--------|---------|
| `main` | Production — merges trigger Hostinger FTP deploy when `Backend/**` changes |
| `develop` | Integration / staging — CI runs on PRs and pushes; no auto FTP deploy |

Create `develop` after the first push:

```bash
git checkout -b develop
git push -u origin develop
```

### First-time commit checklist

- [ ] `Backend/composer.lock` committed (run `composer install` in `Backend/` once)
- [ ] `.env.example` and `Backend/.env.example` present; real `.env` files gitignored
- [ ] `npm run verify` passes locally
- [ ] GitHub Actions secrets configured (see below)

---

## 2. GitHub secrets

Add in **Settings → Secrets and variables → Actions → Repository secrets**.

### FTP deploy (required for default workflow)

| Secret | Required | Example | Notes |
|--------|----------|---------|-------|
| `FTP_SERVER` | Yes | Hostinger FTP host (hPanel → FTP Accounts) | |
| `FTP_USERNAME` | Yes | `u537632881` | FTP username |
| `FTP_PASSWORD` | Yes | `••••••••` | FTP password |
| `FTP_SERVER_DIR` | Yes | `/home/u537632881/public_html/admin/` | Remote **project root** (contains `artisan`, not `public/`) |
| `FTP_PORT` | No | `21` | Defaults to `21` if unset |
| `FTP_PROTOCOL` | No | `ftp` | `ftp`, `ftps`, or `ftps-legacy` (Hostinger docs) |

### SFTP deploy (optional — same auto-deploy on push to `main`)

Use when Hostinger provides SSH/SFTP only (port 22). Falls back to `FTP_*` secrets when `SFTP_*` are unset.

| Secret | Required | Example | Notes |
|--------|----------|---------|-------|
| `SFTP_SERVER` | No* | SSH hostname from hPanel | *Or reuse `FTP_SERVER` |
| `SFTP_USERNAME` | No* | `u537632881` | *Or reuse `FTP_USERNAME` |
| `SFTP_PASSWORD` | No** | `••••••••` | **Password auth; or use SSH key below |
| `SFTP_SERVER_DIR` | No* | `/home/u537632881/public_html/admin/` | *Or reuse `FTP_SERVER_DIR` |
| `SFTP_PORT` | No | `22` | Defaults to `22` |
| `SSH_PRIVATE_KEY` | No** | `-----BEGIN OPENSSH PRIVATE KEY-----` | **Key auth (preferred on SSH plans) |
| `SSH_PASSPHRASE` | No | `••••••••` | Only if the private key is encrypted |

### Post-deploy SSH (recommended — migrate + cache after upload)

| Secret | Required | Example | Notes |
|--------|----------|---------|-------|
| `SSH_HOST` | Yes* | SSH hostname from hPanel | *Required for automatic `artisan migrate` after deploy |
| `SSH_USERNAME` | Yes | `u537632881` | Same as SSH login |
| `SSH_PASSWORD` | Yes** | `••••••••` | **Or use `SSH_PRIVATE_KEY` |
| `SSH_REMOTE_DIR` | Yes | `/home/u537632881/public_html/admin` | Laravel root (`artisan` here) |
| `SSH_PHP_BIN` | No | `/opt/alt/php85/usr/bin/php` | Hostinger CLI PHP 8.5 |
| `SSH_PORT` | No | `22` | Defaults to `22` |

See **[docs/ADMIN-CICD-HOSTINGER.md](./ADMIN-CICD-HOSTINGER.md)** for the full BIHE Hostinger checklist.

### Public site (`bihedvg.org` — Hostinger Node.js, not GitHub Actions yet)

Configure in hPanel → **Websites → Node.js** for `bihedvg.org`:

| Variable | Example |
|----------|---------|
| `ADMIN_ORIGIN` | `https://admin.bihedvg.org` |
| `NEXT_PUBLIC_API_URL` | `https://admin.bihedvg.org` |
| `REVALIDATE_SECRET` | Same value as admin `.env` |

No FTP secrets are needed for the Next.js site on Hostinger Node.js. Use `scripts/package-hostinger-frontend.sh` for manual zip deploy until a frontend workflow is added.

---

## 3. Workflows

### `ci.yml` — pull requests & pushes

**Triggers:** `pull_request` and `push` to `main` or `develop`.

| Job | When | What it does |
|-----|------|--------------|
| `verify-nextjs` | `Frontend/src/`, `Frontend/package.json`, etc. changed | `npm ci --prefix Frontend` → `npm run verify --prefix Frontend` (TypeScript + ESLint) |
| `php-syntax` | `Backend/**` changed | `php -l` on app/config/routes files (no Composer install) |

Path detection uses [dorny/paths-filter](https://github.com/dorny/paths-filter); unrelated changes skip the matching job.

### `deploy-bihe-admin.yml` — FTP (automatic)

**Triggers:**

- Push to `main` when paths match:
  - `Backend/**`
  - `.github/workflows/deploy-bihe-admin.yml`
- **workflow_dispatch** with optional **dry_run** (logs planned sync, no upload)

**Steps:** `composer install --no-dev` → FTP upload → optional SSH post-deploy (`migrate`, `config:cache`, `route:cache`, `view:cache`).

### `deploy-bihe-admin-sftp.yml` — SFTP (manual; use if FTP fails)

**Triggers:** **workflow_dispatch** only (avoids double-deploy with FTP workflow).

**Steps:** Same Composer build → SFTP rsync → SSH post-deploy (if secrets set).

To switch to SFTP-only auto-deploy: disable the FTP workflow in GitHub Actions and add a `push` trigger to the SFTP workflow file.

---

## 4. Architecture

```
┌─────────────────────┐         ┌──────────────────────────┐
│  Next.js public site │  HTTPS  │  Laravel Backend     │
│  (Hostinger Node.js) │ ──────► │  (Hostinger PHP)          │
│  bihedvg.org         │  API    │  admin.bihedvg.org        │
└─────────────────────┘         └──────────────────────────┘
        │                                  │
   hPanel Node.js zip                GitHub Actions FTP/SFTP
   or manual rebuild                 on push to main
```

- **Public site:** Hostinger Node.js Web App — `npm run build` / `npm run start`. Package with `scripts/package-hostinger-frontend.sh`.
- **Admin panel:** PHP on shared hosting; document root at `Backend/public`.
- **API URL:** `NEXT_PUBLIC_API_URL=https://admin.bihedvg.org`.

---

## 5. First deploy vs subsequent deploys

### Laravel admin — first time (Hostinger)

Before or after the first GitHub Actions FTP run, on the server (SSH or hPanel Terminal):

```bash
cd /path/to/Backend
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

Set the domain **document root** to `Backend/public` in hPanel.

`.env` is **never** uploaded by workflows.

### Laravel admin — subsequent deploys

1. Merge to `main` (or run **Deploy BIHE Admin to Hostinger (FTP)** manually).
2. Action runs `composer install --no-dev`, syncs files, then SSH post-deploy (if secrets set).
3. If SSH secrets are not set, SSH in manually after deploy:

```bash
/opt/alt/php85/usr/bin/php artisan migrate --force
/opt/alt/php85/usr/bin/php artisan config:cache
/opt/alt/php85/usr/bin/php artisan route:cache
/opt/alt/php85/usr/bin/php artisan view:cache
```

### Test deploy safely (dry run)

1. GitHub → **Actions** → **Deploy BIHE Admin to Hostinger (FTP)** → **Run workflow** → enable **dry_run**.
2. Review the log for files that would be created/updated.
3. Run again with **dry_run** off, or push to `main`.

For SFTP: use **Deploy BIHE Admin to Hostinger (SFTP)** with **dry_run** enabled first.

### Public site — Hostinger Node.js

1. hPanel → **Websites → Node.js** → set build/start commands and env vars.
2. Upload zip from `scripts/package-hostinger-frontend.sh` or redeploy from Git (no workflow yet).
3. Ensure `REVALIDATE_SECRET` matches admin `.env`.

---

## 6. Create the GitHub repository

```bash
cd "/path/to/BIHE Website"

# Ensure lockfiles exist
npm install --prefix Frontend
cd Backend && composer install && cd ..

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

- [docs/ADMIN-CICD-HOSTINGER.md](./ADMIN-CICD-HOSTINGER.md) — Hostinger admin deploy checklist
- [BIHE-Admin-Integration-Guide.md](./BIHE-Admin-Integration-Guide.md) — Next.js ↔ Laravel API wiring
