# Hostinger Shared Hosting — BIHE Admin Deployment

Target environment: **Hostinger Shared Hosting**, Apache, PHP 8.2+, MySQL/MariaDB, hPanel.

The Laravel admin (`bihe-admin/`) is designed for this stack. The Next.js public site is deployed **separately** (typically Vercel) and only calls the admin JSON API over HTTPS.

---

## Architecture

| Component | Host | Runtime |
|-----------|------|---------|
| **BIHE Admin** (Blade UI + `/api/v1/*`) | Hostinger shared | PHP 8.2+, Apache, MySQL |
| **BIHE Public site** (Next.js) | Vercel (recommended) or static export elsewhere | Node at build time only |

Set `NEXT_PUBLIC_API_URL=https://admin.bihe.edu` on the public site so server components can fetch Laravel API data.

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
/home/<user>/domains/admin.bihe.edu/public_html/public
```

(or wherever FTP uploads `bihe-admin/` — the web root must be `…/bihe-admin/public`).

This keeps `.env`, `storage/`, and `vendor/` outside the web-accessible tree.

**Fallback:** if hPanel cannot target `public/`, upload the project and rely on the root `bihe-admin/.htaccess` rewrite to `public/`. This is less secure; prefer changing document root.

---

## Environment (`.env`)

On the server (never committed; excluded from FTP deploy):

```bash
cp .env.example .env
# Edit with hPanel File Manager or SSH
php artisan key:generate
```

Production essentials:

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://admin.bihe.edu
APP_FORCE_HTTPS=true

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

MAIL_MAILER=smtp
MAIL_HOST=smtp.hostinger.com
MAIL_PORT=465
MAIL_ENCRYPTION=ssl
MAIL_USERNAME=<mailbox>
MAIL_PASSWORD=<mailbox_password>
MAIL_FROM_ADDRESS=noreply@bihe.edu
MAIL_FROM_NAME="BIHE Admin"

CONTACT_NOTIFY_EMAIL=principal@bihedvg.org
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
* * * * * cd /home/<user>/domains/admin.bihe.edu/public_html && php artisan queue:work --stop-when-empty --max-time=55 >> /dev/null 2>&1
```

---

## First deploy (manual)

Via **SSH** or hPanel **Terminal**:

```bash
cd /path/to/bihe-admin
composer install --no-dev --optimize-autoloader
php artisan migrate --force --seed
php artisan storage:link
php artisan config:cache
php artisan route:cache
php artisan view:cache
chmod -R 775 storage bootstrap/cache
```

### `storage:link` without symlink support

If `php artisan storage:link` fails (symlinks disabled):

1. In File Manager, create folder `public/storage`.
2. Copy (or periodically sync) contents of `storage/app/public/` into `public/storage/`.
3. Uploaded files appear at `/storage/...` as usual.

---

## GitHub Actions FTP deploy

Workflow: `.github/workflows/deploy-bihe-admin.yml`

Runs `composer install --no-dev` in CI, then uploads `bihe-admin/` via FTP. `.env` is **never** uploaded.

### GitHub secrets

| Secret | Description |
|--------|-------------|
| `FTP_SERVER` | FTP hostname from hPanel |
| `FTP_USERNAME` | FTP user |
| `FTP_PASSWORD` | FTP password |
| `FTP_SERVER_DIR` | Remote path containing `artisan` (project root, **not** `public/`) |

Example `FTP_SERVER_DIR`: `/domains/admin.bihe.edu/public_html/`

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
* * * * * cd /path/to/bihe-admin && php artisan schedule:run >> /dev/null 2>&1
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
- Root `bihe-admin/.htaccess` — fallback rewrite to `public/` only if document root cannot be changed.

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
- [ ] Document root → `bihe-admin/public`
- [ ] `.env` created on server; `APP_KEY` generated; `APP_DEBUG=false`
- [ ] `QUEUE_CONNECTION=sync`, `CACHE_STORE=file` (or `database`)
- [ ] SSL enabled; `APP_FORCE_HTTPS=true`, `SESSION_SECURE_COOKIE=true`
- [ ] `composer install --no-dev` (or FTP deploy from Actions)
- [ ] `php artisan migrate --force --seed`
- [ ] `php artisan storage:link` (or manual `public/storage` copy)
- [ ] `php artisan config:cache` + `route:cache` + `view:cache`
- [ ] `storage/` and `bootstrap/cache/` writable (775)
- [ ] `MAIL_*` configured; test contact form and password reset
- [ ] `NEXT_PUBLIC_API_URL` on Vercel points to production admin URL
- [ ] GitHub FTP secrets configured for automated deploys

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| 500 on all routes | Check `storage/logs/laravel.log`; permissions on `storage/`, `bootstrap/cache` |
| 404 on all routes except `/` | Enable `mod_rewrite`; verify `public/.htaccess` uploaded |
| Upload fails | Raise limits in hPanel PHP settings or `public/.user.ini` |
| Images 404 at `/storage/...` | Run `storage:link` or copy `storage/app/public` → `public/storage` |
| API CORS errors from Vercel | Ensure admin URL is HTTPS; check Laravel API responds at `/api/v1/...` |
| Session lost / login loops | `SESSION_SECURE_COOKIE=true` only with HTTPS; check `APP_URL` matches domain |

See also `README.md`, `docs/SECURITY.md`, and `docs/BIHE-Admin-Integration-Guide.md` (repo root).
