# BIHE Website — Final Deliverables (Handoff)

**Project:** Bapuji Institute of Hi-Tech Education — public website + admin CMS  
**Repository layout:** Monorepo at repository root  
**Last updated:** June 2026

This document is the master handoff checklist for developers, operators, and future Phase 2 work. It links to detailed guides and lists every deliverable path.

---

## Table of contents

1. [Project overview](#1-project-overview)
2. [Laravel deliverables (`Backend/`)](#2-laravel-deliverables-Backend)
3. [Next.js deliverables (`Frontend/src/`)](#3-nextjs-deliverables-frontendsrc)
4. [DevOps & deployment](#4-devops--deployment)
5. [Getting started](#5-getting-started)
6. [Known limitations & Phase 2](#6-known-limitations--phase-2)
7. [Related documentation index](#7-related-documentation-index)

---

## 1. Project overview

### Monorepo surfaces

| Surface | Path | Stack | Deploy target |
|---------|------|-------|---------------|
| **Public website** | `Frontend/` | Next.js 15, React 19, App Router | **Vercel** or **Hostinger Node.js** |
| **Admin panel + API** | `Backend/` | Laravel 11, Blade, MySQL | **Hostinger** (FTP/SFTP via GitHub Actions) |

The public site consumes read-only JSON from Laravel at `/api/v1/*`. The admin panel is a separate Blade UI on the same Laravel app.

### Frontend preservation policy

**Do not redesign or modify public-site UI/UX.** Preserve:

- Existing HTML structure and CSS classes
- Responsiveness, animations, and layout hierarchy
- Vanilla JS behaviour on Hostinger admin assets

Allowed changes on the public site: wire dynamic API data into existing components without visual changes. See `.cursor/rules/frontend-preservation.mdc` and `Backend/README.md` (Frontend rule).

---

## 2. Laravel deliverables (`Backend/`)

### Project structure (summary)

```
Backend/
├── app/
│   ├── Enums/UserRole.php
│   ├── Http/
│   │   ├── Controllers/Admin/     # Blade CRUD
│   │   ├── Controllers/Api/V1/    # Public JSON API
│   │   ├── Controllers/Auth/      # Login, captcha, password reset
│   │   ├── Middleware/
│   │   └── Requests/Admin/        # FormRequests (BaseFormRequest)
│   ├── Models/
│   ├── Services/
│   └── Support/                   # AdminPermissions, RoleAccess, StoredFileUrl
├── config/
│   ├── modules.php                # Module registry (Phase 1 + future stubs)
│   └── uploads.php                # Secure upload types & directories
├── database/migrations/
├── database/seeders/
├── public/assets/                 # admin.css, admin.js (no Node build)
├── resources/views/
│   ├── layouts/                   # app, guest, sidebar, header, footer
│   ├── admin/{module}/            # index, create, edit, _form
│   ├── auth/
│   └── components/                # alert, table-actions
├── routes/web.php                 # Admin routes
├── routes/api.php                 # /api/v1 read API
└── docs/                          # ARCHITECTURE, SECURITY, HOSTINGER-DEPLOY
```

### Blade templates

| Area | Paths |
|------|-------|
| Layouts | `resources/views/layouts/app.blade.php`, `guest.blade.php`, `sidebar.blade.php`, `header.blade.php`, `footer.blade.php` |
| Auth | `resources/views/auth/login.blade.php`, `forgot-password.blade.php`, `reset-password.blade.php` |
| Dashboard | `resources/views/admin/dashboard.blade.php` + `dashboard/partials/*` |
| CRUD modules | `resources/views/admin/{module}/index|create|edit|_form.blade.php` |
| Components | `resources/views/components/alert.blade.php`, `table-actions.blade.php` |

**CRUD view folders:** `announcements`, `hero-banners`, `recruiting-partners`, `programs`, `faculty`, `news-events`, `news-categories`, `documents`, `gallery`, `gallery-categories`, `users`, `sessions`, `activity-logs`, `profile`, `change-password`.

### Models (all)

| Model | Table | Notes |
|-------|-------|-------|
| `User` | `users` | `role` enum + Spatie `HasRoles` |
| `Announcement` | `announcements` | |
| `HeroBanner` | `hero_banners` | Soft deletes |
| `RecruitingPartner` | `recruiting_partners` | |
| `Program` | `programs` | |
| `Faculty` | `faculty` | FK → `faculty_departments` |
| `FacultyDepartment` | `faculty_departments` | |
| `NewsCategory` | `news_categories` | |
| `NewsEvent` | `news_events` | Soft deletes |
| `Document` | `documents` | |
| `GalleryCategory` | `gallery_categories` | |
| `GalleryAlbum` | `gallery_albums` | Soft deletes |
| `GalleryMedia` | `gallery_media` | `type`: image \| youtube |
| `GalleryItem` | `gallery_items` | Legacy homepage highlights |
| `ActivityLog` | `activity_logs` | Login / security events |
| `AdminActivityLog` | `admin_activity_logs` | Legacy name; see ActivityLog |

### Controllers

**Admin (`App\Http\Controllers\Admin\*`):**

| Controller | Purpose |
|------------|---------|
| `DashboardController` | Role-aware dashboard |
| `AnnouncementController` | Announcements CRUD |
| `HeroBannerController` | Hero banners CRUD + image upload |
| `RecruitingPartnerController` | Recruiting partners CRUD + logo upload |
| `ProgramController` | Academic programs CRUD |
| `FacultyController` | Faculty roster CRUD |
| `NewsEventController` | News & events CRUD |
| `NewsCategoryController` | News categories CRUD |
| `DocumentController` | PDF documents CRUD |
| `GalleryAlbumController` | Gallery albums + media |
| `GalleryCategoryController` | Gallery categories CRUD |
| `GalleryItemController` | Legacy gallery items |
| `UserController` | User management (super admin) |
| `SessionController` | Active session management |
| `ActivityLogController` | Activity log viewer |
| `ProfileController` | Profile edit |
| `ChangePasswordController` | Password change |
| `StoredFileController` | Authenticated file streaming |

**API (`App\Http\Controllers\Api\V1\*`):**

`AnnouncementController`, `HeroBannerController`, `RecruitingPartnerController`, `ProgramController`, `FacultyController`, `NewsEventController`, `NewsCategoryController`, `DocumentController`, `GalleryAlbumController`, `GalleryCategoryController`, `GalleryItemController`, `GalleryMediaController`, `ContactController`.

**Auth (`App\Http\Controllers\Auth\*`):**

`LoginController`, `CaptchaController`, `ForgotPasswordController`, `ResetPasswordController`.

### Migrations (table mapping)

| Suggested / logical name | Actual table | Migration |
|--------------------------|--------------|-----------|
| `users` | `users` | `0001_01_01_000000_create_users_table.php` |
| `announcements` | `announcements` | `2024_06_01_000001_create_announcements_table.php` |
| `programs` | `programs` | `2024_06_01_000002_create_programs_table.php` |
| `faculty_members` | `faculty` | `2024_06_01_000003_create_faculty_table.php` |
| `news_events` | `news_events` | `2024_06_01_000004_create_news_events_table.php` |
| `documents` | `documents` | `2024_06_01_000005_create_documents_table.php` |
| `gallery_images` (legacy) | `gallery_items` | `2024_06_01_000006_create_gallery_items_table.php` |
| `banners` | `hero_banners` | `2024_06_04_000001_create_hero_banners_table.php` |
| `recruiting_partners` | `recruiting_partners` | `2024_06_04_000002_create_recruiting_partners_table.php` |
| `news_event_categories` | `news_categories` | `2024_06_05_000001_create_news_categories_table.php` |
| `gallery_albums` | `gallery_albums` | `2024_06_06_000001_create_gallery_albums_module_tables.php` |
| `faculty_departments` | `faculty_departments` | `2024_06_09_000001_create_faculty_departments_table.php` |
| `activity_logs` | `activity_logs` | `2024_06_03_000001` + `2024_06_08_000001_create_admin_activity_logs_table.php` |

Additional: soft deletes (`2024_06_09_000002`), indexes (`2024_06_09_000003`, `2024_06_09_000004`), Spatie permission tables (via `spatie/laravel-permission` publish).

### Middleware

| Alias / class | Purpose |
|---------------|---------|
| `AdminMiddleware` | Ensures authenticated admin users |
| `SessionInactivityMiddleware` | Logs out after `SESSION_INACTIVITY_MINUTES` idle |
| `SecurityHeadersMiddleware` | CSP, X-Frame-Options, etc. |
| `PermissionMiddleware` (Spatie) | Route-level permission checks (`permission:…`) |
| `RoleMiddleware` | Legacy role gate (prefer Spatie permissions) |
| `CheckModuleAccess` | Module slug guard |
| `ApiKeyMiddleware` | Optional API write protection |
| `SanitizeInputMiddleware` | Request sanitization (where applied) |

### Authentication

| Feature | Implementation |
|---------|----------------|
| Login | `Auth\LoginController` + math captcha (`CaptchaController`, `MathCaptchaService`) |
| Forgot password | `ForgotPasswordController` + email reset link |
| Reset password | `ResetPasswordController` |
| Session inactivity | `SessionInactivityMiddleware` + `SESSION_INACTIVITY_MINUTES` |
| Throttling | `AUTH_LOGIN_THROTTLE`, `throttle:password-reset` |

### Role permissions

**Installed:** `spatie/laravel-permission` (^6.21).

| Layer | Location | Role |
|-------|----------|------|
| Role enum | `App\Enums\UserRole` | `super_admin`, `admin`, `staff` — stored on `users.role` |
| Permission constants | `App\Support\AdminPermissions` | Canonical permission strings |
| Spatie sync | `RoleAndPermissionSeeder` | Seeds roles + permissions; `User` model syncs Spatie role on save |
| Navigation | `App\Support\RoleAccess` | Maps permissions → sidebar items & quick links |

**Why both `users.role` and Spatie?** The `role` column is the source of truth for BIHE business roles; Spatie provides granular `permission:` middleware and `$user->can()` checks without custom gate code on every route. `AdminPermissions::forRole()` defines the default permission set per role.

### Dashboard

- Controller: `Admin\DashboardController`
- Service: `DashboardService` — stats, notifications, recent activity, quick links per accessible modules
- Views: `resources/views/admin/dashboard.blade.php` + partials

### CRUD modules table

| Module | Admin route prefix | Permission | Roles (default) |
|--------|-------------------|------------|-----------------|
| Dashboard | `admin/dashboard` | `dashboard.view` | all |
| Announcements | `admin/announcements` | `announcements.manage` | super_admin, admin, staff |
| Hero Banners | `admin/hero-banners` | `hero-banners.manage` | super_admin, admin, staff |
| Recruiting Partners | `admin/recruiting-partners` | `recruiting-partners.manage` | super_admin, admin, staff |
| Programs | `admin/programs` | `programs.manage` | super_admin, admin |
| Faculty | `admin/faculty` | `faculty.manage` | super_admin, admin |
| News & Events | `admin/news-events` | `news.manage` | super_admin, admin, staff |
| News Categories | `admin/news-categories` | `news.manage` | super_admin, admin, staff |
| Documents | `admin/documents` | `documents.manage` | super_admin, admin, staff |
| Gallery | `admin/gallery` | `gallery.manage` | super_admin, admin, staff |
| Gallery Categories | `admin/gallery-categories` | `gallery.manage` | super_admin, admin, staff |
| Users | `admin/users` | `users.manage` | super_admin |
| Activity Logs | `admin/activity-logs` | `activity-logs.view` | super_admin, admin |
| Sessions | `admin/sessions` | `sessions.manage` | super_admin |

Registry source: `Backend/config/modules.php`.

### Activity logs

- Table: `activity_logs` (model `ActivityLog`)
- Service: `ActivityLogService`, `AdminActivityLogService`
- Admin UI: `admin/activity-logs`
- Tracks login failures, CRUD descriptions, and security events

### File uploads

- Service: `App\Services\SecureFileUploadService`
- Validation rule: `App\Rules\SecureUploadRule` via `UploadedFileRules::image()` / `pdf()`
- Config: `config/uploads.php` — magic-byte checks, MIME allowlists, metadata stripping for images
- Directories: `hero_banner`, `recruiting_partner`, `news_image`, `gallery`, `document`, `faculty_photo`, etc.

### Validation

- Base: `App\Http\Requests\Admin\BaseFormRequest` (input sanitization trait)
- Module FormRequests: `Store/Update{Module}Request` for news, faculty, gallery, hero banners, recruiting partners
- Legacy inline validation: announcements, programs, documents (still functional)

### Security summary

See **[Backend/docs/SECURITY.md](Backend/docs/SECURITY.md)** for captcha, HTTPS forcing, secure uploads, session settings, and API key notes.

---

## 3. Next.js deliverables (`src/`)

### Dynamic (API-backed in Phase 1)

| Feature | API path | Client module |
|---------|----------|---------------|
| Homepage hero | `/api/v1/hero-banners` | `src/lib/api/homepage.ts` |
| Announcements | `/api/v1/announcements` | `src/lib/api/homepage.ts` |
| News & events | `/api/v1/news` | `src/lib/news-service.ts` |
| Gallery | `/api/v1/gallery`, `/api/v1/gallery-albums` | `src/lib/gallery-service.ts` |
| Recruiting partners | `/api/v1/recruiting-partners` | `src/lib/api/homepage.ts` |
| Faculty roster | `/api/v1/faculty` | `src/lib/faculty-service.ts` |
| Contact form | `POST /api/v1/contact` | contact page component |

Module registry mirror: **`src/lib/api/modules.ts`** (enabled modules + future stubs).

Without `NEXT_PUBLIC_API_URL`, each section falls back to static content in `src/lib/homepage-fallbacks.ts` and related libs.

### Static Phase 1 pages

Canonical list: **`src/lib/phase1-static-pages.ts`**

Categories: About Us, Vision & Mission, IQAC, NAAC (homepage anchor), Principal Message, Academic Calendar, Committee pages, Admission information, Academic information pages.

**Policy:** Do not wire Phase 1 static routes to Laravel admin without explicit approval. See `.cursor/rules/frontend-preservation.mdc`.

### Dynamic routes (outside static list)

`/`, `/news/*`, `/gallery/*`, `/academics/faculty-and-staff`, `/contact` — see `PHASE1_DYNAMIC_ROUTES` in `phase1-static-pages.ts`.

---

## 4. DevOps & deployment

### GitHub workflows

| Workflow | Path | Trigger | Purpose |
|----------|------|---------|---------|
| CI | `.github/workflows/ci.yml` | PR/push to `main`, `develop` | `npm run verify` + PHP checks on changed paths |
| FTP deploy | `.github/workflows/deploy-bihe-admin.yml` | Push to `main` (`Backend/**`) | Hostinger FTP upload |
| SFTP deploy | `.github/workflows/deploy-bihe-admin-sftp.yml` | `workflow_dispatch` | SSH/SFTP alternative |

Full secrets and branch strategy: **[docs/GITHUB-CICD.md](GITHUB-CICD.md)**

### Hostinger deploy

Step-by-step: **[Backend/docs/HOSTINGER-DEPLOY.md](Backend/docs/HOSTINGER-DEPLOY.md)**

### Production commands (after deploy)

```bash
cd /path/to/Backend
php artisan migrate --force
php artisan storage:link   # first deploy only
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

Initial setup may use `php artisan migrate --force --seed` once to create admin users and demo content.

---

## 5. Getting started

### Local development

**Terminal 1 — public site:**

```bash
npm install
cp .env.example .env.local   # optional API URL
npm run dev
```

Open http://127.0.0.1:3000

**Terminal 2 — Laravel admin + API:**

```bash
cd Backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan storage:link
php artisan serve
```

Admin: http://127.0.0.1:8000/admin  
Default super admin: see `ADMIN_*` vars in `Backend/.env.example`

### Environment variables

**Next.js (`.env.local`):**

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_API_URL` | Laravel base URL (no trailing slash) |

**Laravel (`Backend/.env`):**

| Variable | Purpose |
|----------|---------|
| `APP_URL`, `APP_KEY`, `APP_FORCE_HTTPS` | App identity & HTTPS |
| `DB_*` | MySQL connection |
| `SESSION_*`, `SESSION_INACTIVITY_MINUTES` | Session & idle timeout |
| `ADMIN_*`, `STAFF_*` | Seeded users |
| `MAIL_*` | Password reset email |
| `CONTACT_*` | Contact form routing & throttles |
| `API_KEY` | Optional future write API auth |
| `UPLOAD_IMAGE_MAX_KB`, `UPLOAD_PDF_MAX_KB` | Upload limits |

### Verify during development

```bash
npm run verify    # Type-check + lint (preferred while dev server runs)
npm run dev:status # Check dev server health
```

---

## 6. Known limitations & Phase 2

| Item | Status | Notes |
|------|--------|-------|
| Phase 1 static pages CMS | Not wired | Content in `src/lib/*-content.ts` — by design |
| Future modules | Stubbed only | `config/modules.php`, `src/lib/api/modules.ts`, `docs/FUTURE-PHASES.md` |
| Alumni, student portal, online admissions, placement, downloads | `enabled: false` | See FUTURE-PHASES |
| Programs admin | **Exists** | `admin/programs` — API read at `/api/v1/programs` |
| Documents admin | **Exists** | `admin/documents` — not the same as future Downloads module |
| API write endpoints | Not exposed | Protected by `api.key` when added |
| Full PHP test suite locally | Optional | Requires PHP 8.2+; CI runs syntax checks. `composer test` for unit tests |
| Spatie permissions | **Installed** | Run `migrate --seed` to populate roles/permissions |
| Hero / partner images in seed | Text-only slides | Upload images via new admin CRUD after seed |

---

## 7. Related documentation index

| Document | Path |
|----------|------|
| **This handoff** | `docs/FINAL-DELIVERABLES.md` |
| CI/CD & GitHub secrets | `docs/GITHUB-CICD.md` |
| Future module architecture | `docs/FUTURE-PHASES.md` |
| Next.js ↔ Laravel integration | `docs/BIHE-Admin-Integration-Guide.md` |
| Monorepo README | `README.md` |
| Laravel admin README | `Backend/README.md` |
| Laravel architecture | `Backend/docs/ARCHITECTURE.md` |
| Security | `Backend/docs/SECURITY.md` |
| Hostinger deployment | `Backend/docs/HOSTINGER-DEPLOY.md` |
| Module registry (Laravel) | `Backend/config/modules.php` |
| Module registry (Next.js) | `src/lib/api/modules.ts` |
| Phase 1 static routes | `src/lib/phase1-static-pages.ts` |

---

*End of final deliverables handoff.*
