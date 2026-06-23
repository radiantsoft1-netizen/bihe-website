# Hostinger quick start — admin.bihedvg.org

Laravel admin is **not yet live** until you upload files, create `.env`, and run migrations. A blank subdomain shows **403/404** (not Laravel).

## 1. Document root (hPanel)

**Websites → admin.bihedvg.org → Document root** must point to Laravel `public/`:

```text
/home/<user>/domains/bihedvg.org/public_html/admin/public
```

(`artisan`, `.env`, `storage/`, `vendor/` stay in `.../admin/`, one level above `public/`.)

If you cannot change document root, keep the root `.htaccess` rewrite to `public/` (less secure).

## 2. Upload code

**Option A — SSH deploy (fastest if you have terminal access):**

```bash
# hPanel → Advanced → SSH Access → copy hostname
export BIHE_SSH_HOST="YOUR-SSH-HOSTNAME"
export BIHE_SSH_USER="u537632881"
export BIHE_REMOTE_DIR="/home/u537632881/domains/bihedvg.org/public_html/admin"

bash Backend/scripts/deploy-ssh-hostinger.sh
```

Quick CSS/Blade-only update (faculty editor fix, etc.):

```bash
bash Backend/scripts/deploy-admin-assets.sh
```

**Option B — GitHub Actions:** push `Backend/**` to `main`; workflow runs `composer install --no-dev` and FTP syncs. Configure secrets:

| Secret | Value |
|--------|--------|
| `FTP_SERVER` | FTP hostname from hPanel |
| `FTP_USERNAME` | `u537632881` |
| `FTP_PASSWORD` | FTP password |
| `FTP_SERVER_DIR` | `/home/u537632881/domains/bihedvg.org/public_html/admin/` |

**Option C — Manual zip:** from your Mac:

```bash
bash Backend/scripts/package-for-hostinger.sh
```

Upload `tmp/Backend-hostinger.zip` via hPanel File Manager, extract into `public_html/admin`.

## 3. MySQL (hPanel)

1. **Databases → MySQL** — create database + user; grant ALL.
2. Note host (`localhost`), database name, username, password.

**Schema:** either run migrations (step 4) or import `tmp/final-deliverables/bihe-database-mysql.sql` via phpMyAdmin (generate locally: `php Backend/scripts/export-mysql-dump.php`).

## 4. `.env` on server (never commit)

```bash
cd /path/to/Backend
cp .env.production.example .env
# Edit: DB_*, MAIL_*, ADMIN_PASSWORD, REVALIDATE_SECRET
bash scripts/post-deploy-hostinger.sh
```

Or step by step:

```bash
php artisan key:generate
php artisan migrate --force --seed
php artisan storage:link    # or copy storage/app/public → public/storage
php artisan config:cache && php artisan route:cache && php artisan view:cache
chmod -R 775 storage bootstrap/cache
```

## 5. Production `.env` essentials

| Variable | Value |
|----------|--------|
| `APP_ENV` | `production` |
| `APP_DEBUG` | `false` |
| `APP_URL` | `https://admin.bihedvg.org` |
| `APP_FORCE_HTTPS` | `true` |
| `ADMIN_PROXY_HOSTS` | `bihedvg.org,www.bihedvg.org` |
| `NEXTJS_URL` | `https://bihedvg.org` |
| `REVALIDATE_SECRET` | same as Node.js app on bihedvg.org (e.g. `bihe-revalidate-2026`) |
| `WEBSITE_REVALIDATE_URL` | optional — if CDN blocks POST to public domain, use Node internal URL from hPanel |
| `DB_*` | hPanel MySQL credentials |
| `SESSION_SECURE_COOKIE` | `true` |
| `QUEUE_CONNECTION` | `sync` |
| `CACHE_STORE` | `file` |

Full template: `.env.production.example`

## 6. Superadmin login

Seeded from `.env` on `migrate --seed`:

| Field | Default (change in `.env`) |
|-------|----------------------------|
| Username | `superadmin` |
| Email | `admin@bihedvg.org` |
| Password | value of `ADMIN_PASSWORD` |

Re-seed only admin users: `php artisan db:seed --class=AdminUserSeeder --force`

## 7. Public site (bihedvg.org — Hostinger Node.js)

| Variable | Value |
|----------|--------|
| `ADMIN_ORIGIN` | `https://admin.bihedvg.org` |
| `NEXT_PUBLIC_API_URL` | `https://admin.bihedvg.org` |
| `REVALIDATE_SECRET` | same as Laravel `.env` |

Redeploy the Node.js app after setting env vars. Users open admin at `https://admin.bihedvg.org/admin`.

## 8. Verify

```bash
curl -sI https://admin.bihedvg.org/up
curl -s https://admin.bihedvg.org/api/v1/announcements | head -c 200
```

- `/up` → HTTP 200
- `/admin` → login page
- `/api/v1/announcements` → JSON

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| 403 / 404 on all URLs | Wrong document root; Laravel not uploaded |
| 500 on all routes | Missing `.env` or `APP_KEY`; check `storage/logs/laravel.log` |
| 500 after deploy | `chmod -R 775 storage bootstrap/cache` |
| Login loop | `APP_URL` must match domain; HTTPS + `SESSION_SECURE_COOKIE=true` |
| Images 404 | `php artisan storage:link` or copy `storage/app/public` → `public/storage` |
| Public site `/admin` broken | Set `ADMIN_ORIGIN` on bihedvg.org; set `ADMIN_PROXY_HOSTS` on Laravel |
| Admin saves but website unchanged | Match `REVALIDATE_SECRET` on admin + Node; set `NEXTJS_URL=https://bihedvg.org`; bypass CDN for `/api/revalidate` or set `WEBSITE_REVALIDATE_URL` |
| Rich-text boxes invisible (CKEditor 404) | Deploy latest admin assets: `bash Backend/scripts/deploy-admin-assets.sh` |

See `docs/HOSTINGER-DEPLOY.md` for full checklist.
