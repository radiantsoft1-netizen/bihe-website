# BIHE Future Phase Support Architecture

**Purpose:** Extension points for adding major modules without restructuring the Laravel admin, public API, or Next.js site.  
**Status:** Documentation + scaffolding only — no full feature implementation.  
**Last updated:** June 2026

---

## Table of contents

1. [Current architecture snapshot](#1-current-architecture-snapshot)
2. [Module boundary principles](#2-module-boundary-principles)
3. [Permission & access model](#3-permission--access-model)
4. [Proposed future module map](#4-proposed-future-module-map)
5. [How to add a new module (checklist)](#5-how-to-add-a-new-module-checklist)
6. [API versioning strategy](#6-api-versioning-strategy)
7. [Multi-guard auth strategy](#7-multi-guard-auth-strategy)
8. [Shared infrastructure to reuse](#8-shared-infrastructure-to-reuse)
9. [Phase 1 static vs dynamic policy](#9-phase-1-static-vs-dynamic-policy)
10. [Related files](#10-related-files)

---

## 1. Current architecture snapshot

### Laravel admin (`Backend/`)

| Concern | Location | Notes |
|---------|----------|-------|
| Admin routes | `routes/web.php` | Prefix `admin`, middleware stack `auth → admin → session.inactivity → sanitize.input → log.admin.crud` |
| Public API | `routes/api.php` | Prefix `api/v1`, read-only GET endpoints today |
| Controllers | `App\Http\Controllers\Admin\*`, `Api\V1\*` | Thin controllers; services own logic |
| Services | `App\Services\*` | Domain orchestration (`SecureFileUploadService`, `AdminActivityLogService`, …) |
| Models | `App\Models\*` | Eloquent + scopes; no HTTP awareness |
| Form requests | `App\Http\Requests\Admin\*` | Extend `BaseFormRequest` |
| Access control | `App\Support\RoleAccess` + `UserRole` enum | **Not Spatie** — role column on `users` (`super_admin`, `admin`, `staff`) |
| Module registry | `config/modules.php` | Canonical list of admin modules (Phase 1 + future stubs) |
| Activity logs | `admin_activity_logs` + `LogAdminCrudMiddleware` | Automatic CRUD audit for admin mutations |

### Next.js public site (`src/`)

| Concern | Location | Notes |
|---------|----------|-------|
| API client | `src/lib/api/client.ts` | `fetchApiList`, `fetchApiItem`; base URL from `NEXT_PUBLIC_API_URL` |
| Module registry | `src/lib/api/modules.ts` | Mirrors `config/modules.php` for fetch paths |
| Homepage fetchers | `src/lib/api/homepage.ts` | Dynamic homepage sections only |
| Domain services | `src/lib/*-service.ts` | `news-service`, `gallery-service`, `faculty-service` |
| Static page policy | `src/lib/phase1-static-pages.ts` | Canonical list of routes that stay hardcoded in Phase 1 |

### Deployment

- **Admin:** Hostinger + GitHub Actions (`.github/workflows/deploy-bihe-admin.yml`) — see `Backend/docs/HOSTINGER-DEPLOY.md`
- **Public site:** Vercel (or equivalent) — see `docs/BIHE-Admin-Integration-Guide.md`

---

## 2. Module boundary principles

Each domain module is a **vertical slice** with a single namespace and predictable boundaries:

```
one domain = one service namespace + permission prefix + API prefix + admin route group
```

| Boundary | Convention | Example (future Alumni) |
|----------|------------|-------------------------|
| **Module key** | kebab-case slug | `alumni` |
| **Permission prefix** | `{domain}.{resource}.{action}` | `alumni.profiles.view`, `alumni.events.manage` |
| **Service class** | `App\Services\Alumni\{Resource}Service` | `AlumniProfileService` |
| **Admin routes** | `admin/{resource}` resource routes | `admin/alumni-profiles` |
| **API routes** | `/api/v1/{resource}` (public read) or `/api/v1/student/*` (authenticated) | `GET /api/v1/alumni-events` |
| **Next.js service** | `src/lib/alumni-service.ts` or `src/lib/api/alumni.ts` | Uses paths from `modules.ts` |
| **Upload directory** | `config/uploads.php` → `directories.{key}` | `alumni_photo` → `alumni/photos` |
| **Activity log resource** | string passed to `AdminActivityLogService` | `alumni_profile` |

**Rules:**

1. **No cross-module table coupling** — relate via foreign keys only; business logic stays in the owning service.
2. **Controllers stay thin** — validate via FormRequest, delegate to service, return view/JSON.
3. **Public API is read-only** unless explicitly protected (`api.key`, Sanctum, or separate guard).
4. **Register every module** in `config/modules.php` and `src/lib/api/modules.ts` before adding routes.
5. **Do not modify Phase 1 static page UI** when wiring data — inject content only; preserve HTML/CSS classes (see root `.cursor/rules/frontend-preservation.mdc`).

---

## 3. Permission & access model

### Phase 1 (current)

BIHE uses **`users.role`** (`UserRole` enum) and **`RoleAccess`** — not [Spatie Laravel Permission](https://github.com/spatie/laravel-permission). Module access is coarse-grained by role:

| Role | Content modules | Admin modules |
|------|-----------------|---------------|
| `staff` | announcements, news-events, documents, gallery | — |
| `admin` | + programs, faculty | activity-logs |
| `super_admin` | same as admin | + users, sessions |

### Future (recommended evolution)

When modules need finer control (e.g. placement coordinator vs alumni coordinator), choose one path:

| Option | When | Migration cost |
|--------|------|----------------|
| **A. Extend `RoleAccess`** | 1–3 new modules, few new roles | Low — add module keys + role maps in `RoleAccess` |
| **B. Adopt Spatie** | Many modules, per-action permissions | Medium — install package, seed permissions from `config/modules.php` prefixes |

**Permission prefix convention** (works with either option):

```
{module}.{resource}.{action}

Examples:
  alumni.profiles.view
  alumni.profiles.manage
  alumni.events.manage
  admissions.online.applications.review
  placement.drives.manage
  downloads.files.manage
  downloads.categories.manage
```

Map prefixes to `RoleAccess::contentModules()` / `adminModules()` until Spatie is adopted, or seed Spatie permissions with the same names.

---

## 4. Proposed future module map

### 4.1 Alumni Management (`alumni.*`)

| Artifact | Proposed value |
|----------|----------------|
| Module key | `alumni` |
| Permission prefix | `alumni.*` |
| Tables | `alumni_profiles`, `alumni_events`, `alumni_event_registrations` (optional) |
| Admin routes | `admin/alumni-profiles`, `admin/alumni-events` |
| API (public read) | `GET /api/v1/alumni-events`, `GET /api/v1/alumni-events/{slug}` |
| API (authenticated, future) | `POST /api/v1/alumni/register` (alumni self-service) |
| Next.js routes | `/alumni`, `/alumni/events/{slug}` (new pages; static shell OK in Phase 2) |
| Service namespace | `App\Services\Alumni\` |
| Upload types | `alumni_photo` (image), optional `alumni_document` (pdf) in `config/uploads.php` |
| Default roles | `admin`, `super_admin` manage; `staff` view-only optional |

**`alumni_profiles` (suggested columns):** `id`, `name`, `email`, `phone`, `batch_year`, `program`, `current_employer`, `bio`, `photo_path`, `linkedin_url`, `published`, `sort_order`, timestamps, soft deletes.

**`alumni_events` (suggested columns):** `id`, `title`, `slug`, `summary`, `body`, `event_date`, `venue`, `image_path`, `published`, timestamps, soft deletes.

---

### 4.2 Student Portal (`student-portal.*`)

| Artifact | Proposed value |
|----------|----------------|
| Module key | `student-portal` |
| Permission prefix | `student-portal.*` (admin config); students use separate guard (see §7) |
| Tables | `students`, `student_sessions` (or Laravel sessions), `student_documents` |
| Admin routes | `admin/students` (roster), `admin/student-documents` |
| API | `POST /api/v1/student/login`, `GET /api/v1/student/profile`, `GET /api/v1/student/documents` |
| Next.js routes | `/student` or subdomain `student.bihe.edu` — **separate layout**, no admin chrome |
| Service namespace | `App\Services\StudentPortal\` |
| Upload types | `student_document` (pdf) — validated via `SecureFileUploadService` |

**Document options (pick one at implementation):**

| Option | Pros | Cons |
|--------|------|------|
| **A. Laravel session guard `student`** | Simple on Hostinger; same app | Shares cookies with admin if same domain — use path/isolation |
| **B. Laravel Sanctum API tokens** | Clean separation for SPA/Next.js | Token storage + refresh flow |
| **C. Next.js middleware + API JWT** | Full frontend control | More moving parts |

Recommendation: **Option A for admin-managed documents** + **Option B for Next.js student dashboard** (see §7).

---

### 4.3 Online Admissions (`admissions.online.*`)

Extends existing **static** admission information (`/admissions/*` in `phase1-static-pages.ts`). Static copy stays; online application becomes dynamic.

| Artifact | Proposed value |
|----------|----------------|
| Module key | `admissions-online` |
| Permission prefix | `admissions.online.*` |
| Tables | `admission_applications`, `admission_application_documents`, `admission_cycles` (intake/year) |
| Admin routes | `admin/admission-applications`, `admin/admission-cycles` |
| API (public write) | `POST /api/v1/admissions/applications` (throttled + CAPTCHA) |
| API (admin read) | via admin panel only, or `GET /api/v1/admissions/applications` behind `api.key` |
| Next.js | Keep `/admissions/admission-process` static; add `/admissions/apply` form page |
| Service namespace | `App\Services\Admissions\` |
| Upload types | `admission_document` (pdf), `admission_photo` (image) |

**Relationship to static content:** Process descriptions, fee policy, and format PDFs remain in `src/lib/admissions-content.ts` until explicitly migrated. Only the **application pipeline** is dynamic.

---

### 4.4 Placement Portal (`placement.*`)

| Artifact | Proposed value |
|----------|----------------|
| Module key | `placement` |
| Permission prefix | `placement.*` |
| Tables | `placement_companies`, `placement_drives`, `placement_registrations`, `placement_offers` (optional) |
| Admin routes | `admin/placement-companies`, `admin/placement-drives`, `admin/placement-registrations` |
| API (public read) | `GET /api/v1/placement-drives`, `GET /api/v1/placement-companies` |
| API (student write) | `POST /api/v1/placement/registrations` (student guard) |
| Next.js | Extend `/student-life/placement-cell-and-activities/*` with dynamic drive listings |
| Service namespace | `App\Services\Placement\` |
| Upload types | `company_logo` (image), `placement_document` (pdf) |

---

### 4.5 Downloads Management (`downloads.*`)

Aligns with existing **`documents`** module and **`SecureFileUploadService`**. Phase 1 has a single `documents` table for published PDFs. Future downloads module adds **categories** and optional **access tiers** (public vs student-only).

| Artifact | Proposed value |
|----------|----------------|
| Module key | `downloads` |
| Permission prefix | `downloads.*` |
| Tables | `download_categories`, `download_files` (or evolve `documents` → `download_files`) |
| Admin routes | `admin/download-categories`, `admin/download-files` |
| API | `GET /api/v1/downloads?category=slug`, `GET /api/v1/downloads/{id}/file` |
| Next.js | Wire existing static download links gradually; no UI redesign |
| Service namespace | `App\Services\Downloads\` |
| Upload types | Reuse `pdf` type; directory `download_file` → `downloads` |

**Secure file upload alignment:**

```php
// Store (same pattern as DocumentController)
$upload = $this->uploads->store(
    $request->file('file'),
    'pdf',
    config('uploads.directories.download_file')
);
```

**Migration path from `documents`:**

1. Add `download_categories` table.
2. Add nullable `category_id` to `documents` OR create `download_files` and migrate rows.
3. Point `Api\V1\DocumentController` to new service or alias routes for backward compatibility.
4. Register `download_file` directory in `config/uploads.php` (stub present).

**Overlap note:** `documents` (Phase 1) and `downloads` (future) share PDF validation. Do not duplicate upload logic — always use `SecureFileUploadService` + `UploadedFileRules::pdf()`.

---

## 5. How to add a new module (checklist)

Use this checklist for any new module (including the five above). Check off in order.

### Laravel admin

- [ ] **1. Register module** in `Backend/config/modules.php` (`enabled: true`, permission prefix, sidebar metadata).
- [ ] **2. Migration(s)** — tables with indexes, soft deletes where appropriate.
- [ ] **3. Model(s)** — `$fillable`, casts, scopes (`published`, `active`), relationships.
- [ ] **4. Upload config** (if files) — add `directories.{key}` and optional new `types.*` in `config/uploads.php`.
- [ ] **5. Service** — `App\Services\{Domain}\{Resource}Service` with `create`, `update`, `delete`, `paginateForIndex`.
- [ ] **6. Form requests** — `Store{Resource}Request`, `Update{Resource}Request` extending `BaseFormRequest`.
- [ ] **7. Admin controller** — thin; inject service + `SecureFileUploadService` if needed.
- [ ] **8. Blade views** — copy existing admin HTML patterns; do not change CSS classes.
- [ ] **9. Routes** — `routes/web.php` inside correct `role:` middleware group.
- [ ] **10. Role access** — add module key to `RoleAccess::contentModules()` / `adminModules()` or seed Spatie permissions.
- [ ] **11. Sidebar** — `RoleAccess::navigationItems()` map entry (or read from `config/modules.php` in a later refactor).
- [ ] **12. Activity logs** — ensure `LogAdminCrudMiddleware` covers new resource names (automatic if routes follow REST).

### Public API

- [ ] **13. API controller** — `App\Http\Controllers\Api\V1\{Resource}Controller` (read-only GET first).
- [ ] **14. API routes** — `routes/api.php` under `v1` prefix; throttle writes; `api.key` for admin-only writes.
- [ ] **15. JSON shape** — `{ data: ... }` list/item envelope (matches existing controllers).

### Next.js

- [ ] **16. Register module** in `src/lib/api/modules.ts`.
- [ ] **17. Service file** — `src/lib/{module}-service.ts` using `fetchApiList` / `fetchApiItem`.
- [ ] **18. Page wiring** — server component fetches API; keep existing layout/components.
- [ ] **19. Static policy** — if route is in `phase1-static-pages.ts`, do not wire without explicit approval.
- [ ] **20. Fallbacks** — provide static fallbacks when `NEXT_PUBLIC_API_URL` is unset (same pattern as `homepage-fallbacks.ts`).

### Documentation & deploy

- [ ] **21. Update** `Backend/README.md` API table.
- [ ] **22. Run** `php artisan migrate` on Hostinger post-deploy.
- [ ] **23. Verify** with `npm run verify` (dev) — not full production build during active dev.

---

## 6. API versioning strategy

### Current: `/api/v1`

All public read endpoints live under `/api/v1/*`. Response envelope:

```json
{ "data": [ ... ] }
```

### When to introduce `/api/v2`

Create **v2** only for **breaking** changes:

| Breaking change | Example |
|-----------------|---------|
| Field rename/remove | `news.body` → `news.content` only in v2 |
| Pagination wrapper | v1 returns array; v2 returns `{ data, meta }` |
| Auth requirement on formerly public route | `/api/v1/documents` public → v2 student-only |
| URL structure change | `/api/v2/alumni/events` vs `/api/v1/alumni-events` |

### Non-breaking additions (stay on v1)

- New endpoints (`GET /api/v1/placement-drives`)
- New optional query params
- New JSON fields (clients ignore unknown fields)

### Implementation pattern

```php
// routes/api.php (future)
Route::prefix('v1')->group(function () { /* existing */ });
Route::prefix('v2')->group(function () {
    require __DIR__.'/api/v2.php';
});
```

Next.js: add `API_VERSION` env or per-module `apiVersion` in `modules.ts`. Default remains `v1`.

---

## 7. Multi-guard auth strategy

### Today

Single guard `web` → `users` table → admin panel only (`config/auth.php`).

### Recommended future guards

| Guard | Provider | Model | Use case |
|-------|----------|-------|----------|
| `web` | `users` | `App\Models\User` | Admin panel (unchanged) |
| `student` | `students` | `App\Models\Student` | Student portal session |
| `sanctum` | — | — | Student/alumni SPA token API |

### Config placeholder (`config/auth.php`)

Stub entries (not active until `Student` model exists):

```php
'guards' => [
    'web' => [ /* existing */ ],
    // Future Phase — student portal
    // 'student' => [
    //     'driver' => 'session',
    //     'provider' => 'students',
    // ],
],
'providers' => [
    'users' => [ /* existing */ ],
    // 'students' => [
    //     'driver' => 'eloquent',
    //     'model' => App\Models\Student::class,
    // ],
],
```

### Middleware recommendations

| Surface | Middleware |
|---------|------------|
| Admin CRUD | `auth:web`, `admin`, `role:...` (unchanged) |
| Student web routes | `auth:student`, dedicated `StudentMiddleware` (active enrollment check) |
| Student API (Next.js) | `auth:sanctum` + throttle; short-lived tokens |
| Public application submit | No auth; CAPTCHA + throttle (same as contact form) |
| Alumni self-service (optional) | Separate `alumni` guard or magic-link tokens |

### Domain / cookie isolation

If admin and student portals share a parent domain:

- Admin: `admin.bihe.edu` — session cookie path `/admin`
- Student: `student.bihe.edu` or `www.bihe.edu/student` — separate session cookie name via `SESSION_COOKIE` env per deploy

**Do not** reuse admin `User` records for students.

---

## 8. Shared infrastructure to reuse

| Infrastructure | Class / config | Use in future modules |
|----------------|----------------|----------------------|
| Secure uploads | `SecureFileUploadService`, `UploadedFileRules`, `config/uploads.php` | All file modules (downloads, admissions, placement logos, alumni photos) |
| Activity logs | `AdminActivityLogService`, `LogAdminCrudMiddleware` | All admin mutations |
| Input sanitization | `SanitizeInputMiddleware`, `BaseFormRequest` | All admin forms |
| Slugs | `UniqueSlug` | News-like resources (events, drives, categories) |
| Role/module access | `RoleAccess`, `config/modules.php` | Sidebar + authorization |
| API security | `ApiKeyMiddleware`, rate limiters in `AppServiceProvider` | Write endpoints, application submit |
| Stored file serving | `StoredFileController`, `Api\V1\*Controller::file()` | Download/preview URLs |
| Phase 1 API client | `src/lib/api/client.ts` | All Next.js fetchers |

---

## 9. Phase 1 static vs dynamic policy

Canonical static list: **`src/lib/phase1-static-pages.ts`**.

| Policy | Rule |
|--------|------|
| Static routes | Content in `src/lib/*-content.ts`; **no** new `/api/v1` wiring without approval |
| Dynamic routes | Homepage sections, news, gallery, faculty roster, contact |
| Future modules | May add **new routes** (e.g. `/admissions/apply`) without converting static pages |
| Online admissions | Static **information** pages stay; only application **workflow** is dynamic |
| UI | No redesign — inject data into existing components where possible |

When a future module overlaps static content (e.g. placement drives vs placement-cell static page), add dynamic **sections** or child routes; do not replace the static parent page structure in Phase 2.

---

## 10. Related files

| File | Purpose |
|------|---------|
| `Backend/config/modules.php` | Admin module registry (enabled flags, permissions, sidebar) |
| `src/lib/api/modules.ts` | Next.js API module registry |
| `Backend/app/Support/RoleAccess.php` | Role → module mapping |
| `Backend/docs/ARCHITECTURE.md` | Layered Laravel architecture + link here |
| `docs/BIHE-Admin-Integration-Guide.md` | Cross-team integration phases |
| `src/lib/phase1-static-pages.ts` | Static route manifest |
| `Backend/config/uploads.php` | Upload types and directories |
| `Backend/docs/SECURITY.md` | Hardening checklist |

---

**Document prepared for BIHE development team.**  
Implement modules incrementally; enable each entry in `config/modules.php` when ready.
