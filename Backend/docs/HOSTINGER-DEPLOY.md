# Hostinger Shared Hosting — BIHE Admin Deployment

Target environment: **Hostinger Shared Hosting**, Apache, PHP 8.2+, MySQL/MariaDB, hPanel.

The Laravel admin (`Backend/`) is designed for this stack. The Next.js public site is deployed **separately** (typically Vercel) and only calls the admin JSON API over HTTPS.

**Production domain (BIHE):** `https://admin.bihedvg.org`  
**Quick start on server:** see [`HOSTINGER-QUICKSTART.md`](../HOSTINGER-QUICKSTART.md) (uploaded with FTP deploy).  
**Production `.env` template:** [`.env.production.example`](../.env.production.example)  
**Post-upload script:** `bash scripts/post-deploy-hostinger.sh`  
**Manual zip package:** `bash scripts/package-for-hostinger.sh` → `tmp/Backend-hostinger.zip`

---

## Architecture

| Component | Host | Runtime |
|-----------|------|---------|
| **BIHE Admin** (Blade UI + `/api/v1/*`) | Hostinger shared | PHP 8.2+, Apache, MySQL |
| **BIHE Public site** (Next.js) | Vercel (recommended) or static export elsewhere | Node at build time only |

Set on Vercel:

```env
ADMIN_ORIGIN=https://admin.bihedvg.org
NEXT_PUBLIC_API_URL=https://admin.bihedvg.org
```

Set on Laravel (Hostinger `.env`):

```env
APP_URL=https://admin.bihedvg.org
ADMIN_PROXY_HOSTS=bihedvg.org,www.bihedvg.org
```

**Do not** run Node.js, Redis, Supervisor, Horizon, or Soketi on Hostinger for this project.

---

## PHP & extensions (hPanel)

1. **Websites → Manage → PHP Configuration** (or **Advanced → PHP Configuration**).
2. Select **PHP 8.2** or **8.3**.
3. Enable extensions:

| Extension | Required for |
|-----------|----------------|
| `pdo_mysql` | Database |
| `mbstring` | Laravel core |
| `openssl` | HTTPS, encryption |
| `tokenizer` | Laravel core |
| `xml` | Laravel core |
| `ctype` | Laravel core |
| `json` | Laravel core |
| `fileinfo` | Upload MIME detection |
| `gd` | Image upload re-encoding (admin gallery, faculty photos, hero banners) |
| `zip` | Composer (local/CI only; vendor is deployed pre-built) |

Upload limits are tuned via `public/.user.ini` (20 MB upload / 22 MB post). Adjust in hPanel if overrides are needed.

---

## MySQL database (hPanel)

1. **Databases → MySQL Databases** — create database and user; grant **ALL** on that database.
2. Note: host is usually `localhost` (not `127.0.0.1` on some plans).
3. Charset: Laravel uses `utf8mb4` / `utf8mb4_unicode_ci` (see `config/database.php`). No PostgreSQL or SQLite in production.

---

## Document root

**Required (recommended):** point the admin subdomain document root to the Laravel `public/` folder:

```
/home/<user>/domains/admin.bihedvg.org/public_html/public
```

(or wherever FTP uploads `Backend/` — the web root must be `…/Backend/public`).

`FTP_SERVER_DIR` in GitHub Actions should be the folder that contains `artisan` (project root), **not** `public/`.

This keeps `.env`, `storage/`, and `vendor/` outside the web-accessible tree.

**Fallback:** if hPanel cannot target `public/`, upload the project and rely on the root `Backend/.htaccess` rewrite to `public/`. This is less secure; prefer changing document root.

---

## Environment (`.env`)

On the server (never committed; excluded from FTP deploy):

```bash
cp .env.production.example .env
# Edit with hPanel File Manager or SSH: DB_*, MAIL_*, ADMIN_PASSWORD, REVALIDATE_SECRET
php artisan key:generate
```

Or run the all-in-one helper after editing `.env`:

```bash
bash scripts/post-deploy-hostinger.sh
```

Production essentials (full list in `.env.production.example`):

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://admin.bihedvg.org
APP_FORCE_HTTPS=true
ADMIN_PROXY_HOSTS=bihedvg.org,www.bihedvg.org

DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=<hpanel_db_name>
DB_USERNAME=<hpanel_db_user>
DB_PASSWORD=<hpanel_db_password>

SESSION_DRIVER=database
SESSION_SECURE_COOKIE=true
SESSION_ENCRYPT=true

QUEUE_CONNECTION=sync
CACHE_STORE=file
FILESYSTEM_DISK=public

MAIL_DELIVERY=live
MAIL_MAILER=smtp
MAIL_HOST=smtp.hostinger.com
MAIL_PORT=465
MAIL_ENCRYPTION=ssl
MAIL_USERNAME=<mailbox>
MAIL_PASSWORD=<mailbox_password>
MAIL_FROM_ADDRESS=noreply@bihedvg.org
MAIL_FROM_NAME="BIHE Admin"

ADMIN_USERNAME=superadmin
ADMIN_EMAIL=admin@bihedvg.org
ADMIN_PASSWORD=<strong-password>

CONTACT_NOTIFY_EMAIL=principal@bihedvg.org
NEXTJS_URL=https://bihedvg.org
REVALIDATE_SECRET=<same-as-vercel>
```

### Driver notes (shared hosting)

| Setting | Recommended | Avoid on shared |
|---------|-------------|-----------------|
| `QUEUE_CONNECTION` | `sync` | `redis`, long-running `queue:work` |
| `CACHE_STORE` | `file` or `database` | `redis`, `memcached` |
| `SESSION_DRIVER` | `database` or `file` | `redis` |
| `BROADCAST_CONNECTION` | `log` | WebSocket servers |

Mail and contact form use `Mail::send()` (synchronous). No queue worker is required with `QUEUE_CONNECTION=sync`.

Optional: if you later queue jobs, use `QUEUE_CONNECTION=database` and add a cron (every minute):

```cron
* * * * * cd /home/<user>/domains/admin.bihedvg.org/public_html && php artisan queue:work --stop-when-empty --max-time=55 >> /dev/null 2>&1
```

---

## First deploy (manual)

Via **SSH** or hPanel **Terminal**:

```bash
cd /path/to/Backend
composer install --no-dev --optimize-autoloader   # skip if GitHub Actions already uploaded vendor/
bash scripts/post-deploy-hostinger.sh
```

Or manually:

```bash
php artisan migrate --force --seed
php artisan storage:link
php artisan config:cache
php artisan route:cache
php artisan view:cache
chmod -R 775 storage bootstrap/cache
```

**Superadmin** is created by `AdminUserSeeder` (runs with `--seed`). Credentials come from `ADMIN_USERNAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` in `.env`. Re-run only users: `php artisan db:seed --class=AdminUserSeeder --force`.

**Database without migrations:** import a MySQL dump via phpMyAdmin. Generate locally:

```bash
php Backend/scripts/export-mysql-dump.php
# → tmp/final-deliverables/bihe-database-mysql.sql
```

### `storage:link` without symlink support

If `php artisan storage:link` fails (symlinks disabled):

1. In File Manager, create folder `public/storage`.
2. Copy (or periodically sync) contents of `storage/app/public/` into `public/storage/`.
3. Uploaded files appear at `/storage/...` as usual.

---

## GitHub Actions FTP deploy

Workflow: `.github/workflows/deploy-bihe-admin.yml`

Runs `composer install --no-dev` in CI, then uploads `Backend/` via FTP. `.env` is **never** uploaded.

### GitHub secrets

| Secret | Description |
|--------|-------------|
| `FTP_SERVER` | FTP hostname from hPanel |
| `FTP_USERNAME` | FTP user |
| `FTP_PASSWORD` | FTP password |
| `FTP_SERVER_DIR` | Remote path containing `artisan` (project root, **not** `public/`) |

Example `FTP_SERVER_DIR`: `/domains/admin.bihedvg.org/public_html/` (must contain `artisan`)

### After each deploy (schema or config changes)

```bash
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

Commit `composer.lock` so CI and production install identical dependency versions.

---

## Cron jobs (hPanel)

Laravel scheduler (optional — no scheduled tasks defined yet):

```cron
* * * * * cd /path/to/Backend && php artisan schedule:run >> /dev/null 2>&1
```

Use the full path to `php` from hPanel if `php` is not in cron PATH.

---

## File permissions

Writable by the web server user:

```bash
chmod -R 775 storage bootstrap/cache
```

Ensure `storage/logs`, `storage/framework/{cache,sessions,views}`, and `bootstrap/cache` exist and are writable.

---

## Apache / `.htaccess`

- `public/.htaccess` — standard Laravel front controller (`mod_rewrite` required).
- `public/.user.ini` — PHP upload limits for admin file uploads.
- Root `Backend/.htaccess` — fallback rewrite to `public/` only if document root cannot be changed.

Confirm **mod_rewrite** is enabled (default on Hostinger).

---

## Local Docker (development only)

`Dockerfile` and `docker-compose.yml` are **optional local dev tools**. They are not used on Hostinger and are excluded from FTP deploy.

```bash
docker compose up   # local MySQL + artisan serve on :8000
```

---

## What NOT to use on shared hosting

- Redis, Memcached, or Elasticsearch as cache/session/queue drivers
- `php artisan queue:work` as a permanent background daemon
- Laravel Horizon, Supervisor, Soketi, or Reverb
- Node.js / Vite build on the server for admin (assets are static in `public/assets/`)
- PostgreSQL or SQLite for production
- Exposing project root (where `.env` lives) as document root

---

## Deploy checklist

- [ ] PHP 8.2+ selected in hPanel
- [ ] Extensions enabled (`pdo_mysql`, `mbstring`, `openssl`, `gd`, `fileinfo`, …)
- [ ] MySQL database and user created; credentials in `.env`
- [ ] Document root → `Backend/public`
- [ ] `.env` created on server; `APP_KEY` generated; `APP_DEBUG=false`
- [ ] `QUEUE_CONNECTION=sync`, `CACHE_STORE=file` (or `database`)
- [ ] SSL enabled; `APP_FORCE_HTTPS=true`, `SESSION_SECURE_COOKIE=true`
- [ ] `composer install --no-dev` (or FTP deploy from Actions)
- [ ] `php artisan migrate --force --seed`
- [ ] `php artisan storage:link` (or manual `public/storage` copy)
- [ ] `php artisan config:cache` + `route:cache` + `view:cache`
- [ ] `storage/` and `bootstrap/cache/` writable (775)
- [ ] `MAIL_*` configured; test contact form and password reset
- [ ] `NEXT_PUBLIC_API_URL` on public site points to `https://admin.bihedvg.org`
- [ ] GitHub FTP secrets configured for automated deploys

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| **403 / 404** on all URLs (Hostinger default page) | Laravel not deployed yet, or document root not `…/public` |
| 500 on all routes | Missing `.env` or `APP_KEY`; run `php artisan key:generate`; check `storage/logs/laravel.log` |
| 500 after FTP upload | `chmod -R 775 storage bootstrap/cache`; ensure `vendor/` uploaded (CI runs `composer install --no-dev`) |
| 404 on all routes except `/` | Enable `mod_rewrite`; verify `public/.htaccess` uploaded |
| Upload fails | Raise limits in hPanel PHP settings or `public/.user.ini` |
| Images 404 at `/storage/...` | Run `storage:link` or copy `storage/app/public` → `public/storage` |
| phpMyAdmin import error #1071 (key too long) | Regenerate `tmp/final-deliverables/bihe-database-mysql.sql` via `php Backend/scripts/export-mysql-dump.php` (DATE/TINYINT types + index prefixes) |
| API CORS errors from Vercel | Ensure admin URL is HTTPS; check Laravel API responds at `/api/v1/...` |
| Session lost / login loops | `SESSION_SECURE_COOKIE=true` only with HTTPS; check `APP_URL` matches domain |

See also `README.md`, `docs/SECURITY.md`, and `docs/BIHE-Admin-Integration-Guide.md` (repo root).
