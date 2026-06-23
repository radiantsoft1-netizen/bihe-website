# BIHE Backend (Admin + API — entry point)

Laravel content management system for the BIHE public website. Manages announcements, programs, faculty, news, documents, and gallery images via a Blade admin UI and read-only JSON API.

## Technology Stack

| Layer | Choice |
|-------|--------|
| **Backend** | Laravel 11 (latest stable LTS, PHP 8.2+) |
| **Frontend** | HTML/CSS/JS → reusable **Blade** layouts & components (no Node build on server) |
| **Styles** | `public/assets/css/admin.css` — BIHE maroon/navy theme |
| **Scripts** | `public/assets/js/admin.js` — vanilla JS (sidebar, confirmations) |
| **Database** | MySQL / MariaDB |
| **Hosting** | Hostinger Shared Hosting (Apache, `public/` document root) |
| **Version control** | GitHub |
| **CI/CD** | GitHub Actions → FTP deploy to Hostinger |

### Database schema

Run `php artisan migrate --seed` for a fresh local database. Full table map is documented in `database/seeders/DatabaseSeeder.php`.

| Requested name | Actual table | Notes |
|----------------|--------------|-------|
| `users` | `users` | `role` column: `super_admin`, `admin`, `staff` (enum, not Spatie) |
| `roles` / `permissions` | — | Role-based access via `users.role` + `RoleAccess` |
| `activity_logs` | `admin_activity_logs` | Legacy `activity_logs` migrated and dropped |
| `banners` | `hero_banners` | Homepage hero slides |
| `announcements` | `announcements` | Ticker / notice bar |
| `news_events` | `news_events` | FK → `news_categories` |
| `news_event_categories` | `news_categories` | |
| `gallery_albums` | `gallery_albums` | FK → `gallery_categories` |
| `gallery_categories` | `gallery_categories` | |
| `gallery_images` / `gallery_videos` | `gallery_media` | Unified table; `type` = `image` \| `youtube` |
| `faculty_departments` | `faculty_departments` | Relational departments (replaces faculty enum) |
| `faculty_members` | `faculty` | FK → `faculty_departments` |

Content tables use soft deletes (`deleted_at`). Seed order: `AdminUserSeeder` → `FacultyDepartmentSeeder` → `ContentSeeder` → `AdminActivityLogSeeder`.

### Frontend rule (binding)

**Do not redesign or modify UI/UX.** Preserve HTML structure, CSS classes, responsiveness, animations, layout hierarchy, and JS behaviour. Only convert HTML → Blade and inject dynamic data.

### Frontend architecture (HTML → Blade only)

Static HTML/CSS/JS are converted to Blade with dynamic data bindings only.

| Layer | Location | Rule |
|-------|----------|------|
| CSS | `public/assets/css/admin.css` | Unchanged — do not edit classes when adding features |
| JS | `public/assets/js/admin.js` | Unchanged vanilla JS — no build step |
| Layout HTML | `layouts/app`, `header`, `sidebar`, `footer` | Exact markup preserved; only `@include`, `@yield`, `{{ }}` added |
| Forms | `admin/{module}/_form.blade.php` | Plain HTML fields with `old()` + `@error` — no abstract components |
| Pages | `index`, `create`, `edit` | Extend layout; loop/conditionals for data only |

```
public/assets/
├── css/admin.css
└── js/admin.js

resources/views/
├── layouts/app.blade.php      ← main shell
├── layouts/header.blade.php   ← top bar
├── layouts/sidebar.blade.php  ← navigation
├── layouts/footer.blade.php   ← structural (no visible chrome)
├── layouts/guest.blade.php    ← login layout
├── components/alert, table-actions
└── admin/{module}/index, create, edit, _form.blade.php
```

All static assets use `{{ asset('assets/...') }}`.

No Vite/Webpack on Hostinger — assets served directly from `public/`.

## Requirements

- PHP 8.2+
- Composer
- MySQL 5.7+ / MariaDB 10.3+
- Extensions: `pdo_mysql`, `mbstring`, `openssl`, `tokenizer`, `xml`, `ctype`, `json`, `fileinfo`, `gd` (image uploads)

## Local Setup

```bash
cd Backend
composer install
cp .env.example .env
php artisan key:generate
```

Commit `composer.lock` after the first install so GitHub Actions deploys reproducible dependency versions.

Edit `.env` with your MySQL credentials and admin user:

```env
DB_DATABASE=bihe_admin
DB_USERNAME=root
DB_PASSWORD=your-password

ADMIN_EMAIL=admin@bihe.edu
ADMIN_PASSWORD=your-secure-password
```

Run migrations and seed sample content:

```bash
php artisan migrate --seed
php artisan storage:link
composer serve
```

Use **`composer serve`** (or `./serve.sh`) — not plain `php artisan serve`. The wrapper loads `php.ini` and sets 20 MB upload limits on port **8099**.

- **Admin login:** http://127.0.0.1:8099/admin
- **Dashboard:** http://127.0.0.1:8099/admin/dashboard
- **API base:** http://127.0.0.1:8099/api/v1/

#### Access from phone or another computer (local dev)

`127.0.0.1` only works on the machine running `composer serve`. It **cannot** be opened from other devices.

To test on the same Wi‑Fi, in `Backend/.env` set:

```env
BIHE_SERVE_HOST=0.0.0.0
APP_URL=http://YOUR-LAN-IP:8099
```

Restart `composer serve` — the terminal prints a URL like `http://192.168.x.x:8099/admin` for other devices.

#### Production (live website)

The admin panel is **not** on the Vercel public site. It runs on **Hostinger** at a separate subdomain:

| Site | URL | Host |
|------|-----|------|
| Public website | `https://bihedvg.org` | Hostinger Node.js |
| **Admin panel** | **`https://admin.bihedvg.org/admin`** | Hostinger (Laravel) |

Public site at `https://bihedvg.org` fetches API from `https://admin.bihedvg.org` when `NEXT_PUBLIC_API_URL` is set (see root `README.md`).

Deploy steps: [docs/HOSTINGER-DEPLOY.md](docs/HOSTINGER-DEPLOY.md) · GitHub Action: `.github/workflows/deploy-bihe-admin.yml`

Production checklist:

1. Subdomain `admin.bihedvg.org` created in Hostinger hPanel with DNS active.
2. Document root → `Backend/public` (not the project root).
3. `.env` on server with `APP_URL=https://admin.bihedvg.org`, MySQL credentials, `APP_DEBUG=false`.
4. Run `php artisan migrate --seed` and `php artisan storage:link` on the server (SSH or hPanel terminal).
5. GitHub FTP secrets configured and deploy workflow run successfully.

### API Endpoints (public read)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/announcements` | Active announcements |
| GET | `/api/v1/programs?department=b-com` | Programs by department |
| GET | `/api/v1/faculty?department=bca\|b-com\|non-teaching-staff` | Faculty / staff by section |
| GET | `/api/v1/faculty/sections` | All three sections with members |
| GET | `/api/v1/faculty/{id}/resume` | Download profile PDF |
| GET | `/api/v1/news-categories` | Active news categories |
| GET | `/api/v1/news` | Published news & events (`?category=slug`, `?featured=1`) |
| GET | `/api/v1/news/ticker` | Homepage ticker items (`show_in_ticker`) |
| GET | `/api/v1/news/{slug}` | Single news/event with SEO fields |
| GET | `/api/v1/documents` | Published PDFs |
| GET | `/api/v1/gallery-categories` | Active gallery categories |
| GET | `/api/v1/gallery-albums` | Published albums (`?category=slug`, `?featured=1`) |
| GET | `/api/v1/gallery-albums/{slug}` | Album with photos and YouTube media |
| GET | `/api/v1/gallery-media/{id}/preview` | Inline image preview (download protection) |
| GET | `/api/v1/gallery` | Featured album covers for homepage mosaic |
| GET | `/api/v1/hero-banners` | Active homepage hero slides |
| GET | `/api/v1/recruiting-partners` | Active recruiter / partner logos |
| GET | `/api/v1/contact/captcha` | Math CAPTCHA for contact form |
| POST | `/api/v1/contact` | Submit contact form (email only; not stored in DB) |

Set `CONTACT_NOTIFY_EMAIL` and `MAIL_*` in `.env` for contact form delivery. Rate limits (per IP): `CONTACT_FORM_THROTTLE` for submissions (default 5/min), `CONTACT_CAPTCHA_THROTTLE` for captcha fetches (default 20/min).

Optional `API_KEY` in `.env` is reserved for future write endpoints (protected by `api.key` middleware).

## Hostinger Deployment

**Full guide:** [docs/HOSTINGER-DEPLOY.md](docs/HOSTINGER-DEPLOY.md) — PHP extensions, hPanel, `.env`, FTP/GitHub Actions, cron, permissions, troubleshooting, and deploy checklist.

**Quick summary:** upload `Backend/` (FTP or GitHub Actions); document root → `public/`; `.env` on server only; `QUEUE_CONNECTION=sync`, `CACHE_STORE=file` (`.env.example` defaults); Next.js public site deploys separately (Vercel) with `NEXT_PUBLIC_API_URL` pointing at the admin API.

`Dockerfile` / `docker-compose.yml` are **local dev only** — not used on Hostinger.

### Uploaded files (secure upload system)

| Type | Disk | Path | Public access |
|------|------|------|---------------|
| Images (jpeg, png, gif, webp) | `public` | `storage/app/public/{module}/` | `/storage/...` via `php artisan storage:link` |
| PDFs | `uploads` (private) | `storage/app/uploads/{module}/` | Controlled API/admin routes only |

Configuration: `config/uploads.php` (override limits with `UPLOAD_IMAGE_MAX_KB`, `UPLOAD_PDF_MAX_KB` in `.env`).

**Setup after deploy:**

```bash
php artisan storage:link          # required for images
chmod -R 775 storage bootstrap/cache
mkdir -p storage/app/uploads      # private PDF storage (not web-accessible)
```

**PDF download routes (no direct `/storage/` URL):**

- API: `GET /api/v1/documents/{id}/file`, `GET /api/v1/news/{slug}/pdf`, `GET /api/v1/faculty/{id}/resume`
- Admin (auth required): `GET /admin/files/documents/{id}`, `/admin/files/news-events/{id}/pdf`, `/admin/files/faculty/{id}/resume`

Legacy PDFs already on the public disk continue to work via the same routes (dual-disk lookup).

**Manual test checklist:**

1. Upload a faculty photo (PNG/JPEG) — confirm thumbnail in admin list and `/storage/faculty/photos/{uuid}.ext` loads.
2. Upload a faculty resume PDF — confirm admin “View PDF” opens via `/admin/files/faculty/{id}/resume` (not `/storage/`).
3. Upload news image + PDF — API `GET /api/v1/news/{slug}` returns `image` as `/storage/...` and `pdf` as `/api/v1/news/{slug}/pdf`.
4. Upload a document — API `fileUrl` points to `/api/v1/documents/{id}/file`.
5. Reject invalid uploads: rename `.exe` to `.pdf`, upload — expect validation error.
6. Reject oversized file — temporarily lower `UPLOAD_PDF_MAX_KB=1` and retry.

**Automated tests:** `composer test` or `./vendor/bin/phpunit tests/Unit/SecureFileUploadServiceTest.php`

## GitHub Actions — FTP Deployment

See also [docs/HOSTINGER-DEPLOY.md](docs/HOSTINGER-DEPLOY.md) for secrets, post-deploy commands, and checklist.

Workflow: `.github/workflows/deploy-bihe-admin.yml`

Triggers on push to `main` when `Backend/**` changes (or manual **workflow_dispatch**).

### 1. Add GitHub repository secrets

In GitHub → **Settings → Secrets and variables → Actions**:

| Secret | Example | Description |
|--------|---------|-------------|
| `FTP_SERVER` | `ftp.bihe.edu` | Hostinger FTP hostname (hPanel → Files → FTP Accounts) |
| `FTP_USERNAME` | `u123456789` | FTP username |
| `FTP_PASSWORD` | `••••••••` | FTP password |
| `FTP_SERVER_DIR` | `/domains/admin.bihedvg.org/public_html/` | Remote folder containing `artisan` (project root, not `public/`) |
| `FTP_PORT` | `21` | Optional; defaults to 21 |

### 2. First-time server setup (before or after first deploy)

On Hostinger (SSH or File Manager + Terminal):

```bash
cd /path/to/Backend
cp .env.example .env
# Edit .env: APP_URL, DB_*, ADMIN_*, APP_DEBUG=false
php artisan key:generate
php artisan migrate --force --seed
php artisan storage:link
php artisan optimize
chmod -R 775 storage bootstrap/cache
```

Set the domain **document root** to `Backend/public` in hPanel.

### 3. Subsequent deploys

Push to `main` → GitHub Actions runs `composer install --no-dev` → uploads via FTP.

After schema changes, SSH in and run:

```bash
php artisan migrate --force
php artisan optimize
```

`.env` is **never** uploaded (excluded from FTP). Keep production secrets only on the server.

## Production performance (Hostinger)

Laravel caches are safe to use in production and recommended on shared hosting. All web/API routes use controller actions (no closure handlers), so `route:cache` is supported.

### After every deploy (or schema change)

```bash
cd /path/to/Backend
composer install --no-dev --optimize-autoloader
php artisan migrate --force          # when migrations changed
php artisan optimize                 # config + routes + views + events
```

Equivalent manual sequence:

```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache
```

### Clear caches (debugging only)

```bash
php artisan optimize:clear
```

Never run `config:cache` until `.env` is complete on the server — cached config ignores later `.env` edits until you re-run `config:cache` or `optimize:clear`.

### Application tuning already in place

| Area | Implementation |
|------|----------------|
| **Config** | All runtime reads use `config()` — `API_KEY` lives in `config/app.php`; no `env()` in `app/` or `routes/` |
| **Queries** | Admin/API index endpoints use `select()` + `with()` to avoid N+1 and skip heavy columns (e.g. news `body`) |
| **Dev N+1 guard** | `Model::preventLazyLoading()` enabled in `local` only |
| **Indexes** | Migrations add composite indexes on frequently filtered columns (`published`, `event_date`, `show_in_ticker`, etc.) |
| **Admin assets** | `AdminAsset::url()` appends `?v={filemtime}` to `admin.css` / `admin.js`; Apache sends long-cache headers for static files under `public/` |

Admin CSS/JS are served directly from `public/assets/` (no Vite/Webpack on Hostinger). Update the files on disk — cache busting is automatic via file modification time.

### 4. Optional: post-deploy SSH (advanced)

If your Hostinger plan includes SSH, you can add a follow-up job that runs migrations remotely using `SSH_HOST`, `SSH_USER`, and `SSH_PRIVATE_KEY` secrets.

## Application architecture

Layer responsibilities, middleware inventory, naming conventions, and how to add new modules: **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)**.

Coding standards: `composer run lint` (Pint check) or `composer run lint:fix` (auto-fix).

## Project Structure

```
Backend/
├── app/Http/Controllers/Admin/   # Thin CRUD controllers
├── app/Http/Requests/Admin/        # Form Request validation
├── app/Services/                   # Business logic
├── docs/ARCHITECTURE.md            # Layer conventions
├── app/Http/Controllers/Api/V1/  # Public JSON API
├── app/Http/Controllers/Auth/    # Login/logout
├── app/Http/Middleware/          # Admin + API key guards
├── database/migrations/          # Schema
├── database/seeders/             # Admin user + sample content
├── resources/views/              # Blade templates
├── public/assets/css/admin.css   # BIHE-branded admin styles
├── public/assets/js/admin.js     # Sidebar toggle, delete confirmations
└── routes/web.php, api.php       # Web + API routes
```

## Authentication

| Feature | Details |
|---------|---------|
| Login URL | `/admin` |
| Login methods | Email + password or Username + password |
| Roles | Super Admin, Admin, Staff |
| Remember me | Laravel remember token |
| Inactivity logout | `SESSION_INACTIVITY_MINUTES` (default 30) |
| Forgot password | `/admin/forgot-password` |
| Manual reset | Super Admin → Users → Reset Password |
| Role-based dashboard | Stats, notifications, recent activity, quick links vary by Super Admin / Admin / Staff |
| Math CAPTCHA | Session-based addition/subtraction (e.g. `4 + 3 = ?`); refresh via ↻ button; resets on failed login |

### Dashboard by role

| Role | Menu modules | Dashboard widgets |
|------|----------------|-------------------|
| **Super Admin** | All content + Users, Activity Logs, Sessions | Security overview, all stats, audit log activity, alerts |
| **Admin** | All 6 content modules | All content stats, content updates, publish alerts |
| **Staff** | Announcements, News, Documents, Gallery | Limited stats/links for assigned modules only |
| Login throttling | `AUTH_LOGIN_THROTTLE` attempts/minute (default 5) |
| Activity logs | Super Admin → Activity Logs (`login`, `logout`, `login_failed`, password resets, user changes) |
| Session management | Super Admin → Sessions (view/revoke DB sessions) |

### Security

See **[docs/SECURITY.md](docs/SECURITY.md)** for the full checklist and production `.env` values.

| Control | Implementation |
|---------|----------------|
| CSRF | `@csrf` on all POST/PUT/DELETE forms; Laravel token verification |
| XSS | Blade `{{ }}` auto-escaping; tag-stripping on admin input; security response headers |
| SQL injection | Eloquent ORM + parameterized queries only |
| Input sanitization | `sanitize.input` middleware + `BaseFormRequest` / `SanitizesInput` trait |
| Password hashing | `bcrypt` via Laravel `hashed` cast |
| Session storage | Database driver (`sessions` table); encrypt + secure cookies in production |
| Inactivity timeout | `SESSION_INACTIVITY_MINUTES` (default 30) |
| HTTP headers | `SecurityHeadersMiddleware` (web + API); optional `APP_FORCE_HTTPS` redirect |
| API rate limits | Contact form + captcha throttled per IP (`CONTACT_FORM_THROTTLE`, `CONTACT_CAPTCHA_THROTTLE`) |

**Default users** (after `migrate --seed`):

| Role | Username | Email |
|------|----------|-------|
| Super Admin | `superadmin` | `admin@bihedvg.org` |
| Staff | `staff` | `staff@bihedvg.org` |

Set `MAIL_*` in `.env` for password reset emails on production.
