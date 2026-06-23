# BIHE Admin — Application Architecture

Layered Laravel structure for the admin panel. Controllers stay thin; business logic lives in services; validation lives in Form Requests.

## Layer responsibilities

| Layer | Namespace / path | Responsibility |
|-------|------------------|----------------|
| **Routes** | `routes/web.php`, `routes/api.php` | HTTP entry, middleware groups, route names |
| **Controllers** | `App\Http\Controllers\Admin\*`, `Api\V1\*`, `Auth\*` | Authorize (via middleware/Form Request), delegate to services, return view/redirect/JSON |
| **Form Requests** | `App\Http\Requests\Admin\*`, `App\Http\Requests\Api\*` | Validation rules, input sanitization (via `BaseFormRequest`) |
| **Services** | `App\Services\*` | Business logic, orchestration, file handling, cross-model workflows |
| **Models** | `App\Models\*` | Eloquent entities, relationships, query scopes |
| **Support** | `App\Support\*` | Stateless helpers (slug resolution, upload rules, role access) |
| **Middleware** | `App\Http\Middleware\*` | Cross-cutting HTTP concerns (auth, roles, security headers, logging) |

### Controllers (thin)

A controller action should:

1. Accept a Form Request (for mutating actions) or route/model binding
2. Call one service method
3. Return a view, redirect, or API response

Avoid in controllers: `$request->validate()`, slug/file/SEO logic, multi-step persistence, raw `DB::` queries.

**Reference:** `DashboardController`, refactored `NewsEventController`, `GalleryAlbumController`, `FacultyController`.

### Form Requests

- Admin mutations extend `App\Http\Requests\Admin\BaseFormRequest` (tag-stripping via `SanitizesInput`).
- API mutations extend `Illuminate\Foundation\Http\FormRequest` or a shared API base when added.
- Naming: `Store{Resource}Request`, `Update{Resource}Request`.
- `authorize()` returns `true` when route middleware already guards access; use explicit checks only when action-level authorization differs.

### Services

- One service per admin domain module where logic exceeds simple CRUD (news, gallery, faculty, dashboard, uploads, contact captcha, activity logs).
- Constructor-inject dependencies (`SecureFileUploadService`, `NewsSeoService`, etc.).
- Public methods match use cases: `create`, `update`, `delete`, `paginateForIndex`, not generic `handle`.
- Eloquent queries belong here or on model scopes—not in controllers.

### Repositories

**Not used by default.** Eloquent models + services are sufficient for this codebase. Introduce `App\Repositories\*` only when a service grows large with repeated query composition or you need swappable persistence (e.g. external CMS). No repository layer was added in the initial architecture pass.

### Models

- `$fillable`, casts, relationships, and **scopes** (`scopePublished`, `active()`, etc.).
- No HTTP or request awareness.

## Naming conventions

| Artifact | Convention | Example |
|----------|------------|---------|
| Admin controller | `{Resource}Controller` | `NewsEventController` |
| Admin Form Request | `Store/Update{Resource}Request` | `StoreNewsEventRequest` |
| Service | `{Domain}Service` | `GalleryAlbumService` |
| Support helper | Descriptive noun | `UniqueSlug`, `UploadedFileRules` |
| Route names | `admin.{resource}.{action}` | `admin.news-events.store` |

## Middleware inventory

Registered in `bootstrap/app.php`:

| Alias | Class | Scope | Purpose |
|-------|-------|-------|---------|
| *(web prepend)* | `ForceHttpsMiddleware` | Web | Optional HTTPS redirect (`APP_FORCE_HTTPS`) |
| *(web/api append)* | `SecurityHeadersMiddleware` | Web + API | CSP, X-Frame-Options, etc. |
| `admin` | `AdminMiddleware` | Admin routes | Active admin user check |
| `role` | `RoleMiddleware` | Admin route groups | Spatie-style role allow-list (`role:super_admin,admin`) |
| `session.inactivity` | `SessionInactivityMiddleware` | Authenticated admin | Idle timeout logout |
| `sanitize.input` | `SanitizeInputMiddleware` | Authenticated admin | Global tag-stripping on input |
| `log.admin.crud` | `LogAdminCrudMiddleware` | Authenticated admin | Audit log for mutating admin actions |
| `api.key` | `ApiKeyMiddleware` | API (optional) | API key guard for future write endpoints |
| `force.https` | `ForceHttpsMiddleware` | Alias only | Same as prepend middleware |

**Admin authenticated stack** (`routes/web.php`):

```
auth → admin → session.inactivity → sanitize.input → log.admin.crud
```

Role middleware is applied per route group (`super_admin`, `admin`, `staff` combinations via `App\Support\RoleAccess`).

## Shared helpers

- **`App\Support\UniqueSlug`** — unique slug generation for sluggable models (news, gallery albums, categories).
- **`App\Services\SecureFileUploadService`** — validated storage and deletion for images/PDFs.
- **`App\Http\Requests\Concerns\SanitizesInput`** — used by `BaseFormRequest`; do not duplicate sanitization in controllers.

## Coding standards

- **PSR-12** formatting via [Laravel Pint](https://laravel.com/docs/pint) (`laravel/pint` in `require-dev`).
- Config: `pint.json` at project root (Laravel preset).
- Commands:
  - `composer run lint` — check formatting (CI-friendly, no writes)
  - `composer run lint:fix` — apply Pint fixes locally
- Tests: `composer test` (PHPUnit). No PHPStan in Phase 1 (keeps shared-hosting dev lightweight).

## Adding a new admin module

**Full checklist:** [docs/FUTURE-PHASES.md](../../docs/FUTURE-PHASES.md) (module boundaries, API versioning, auth guards, Phase 1 static policy).

**Quick steps:**

1. Register the module in `config/modules.php` (`enabled: true`, permission prefix, sidebar metadata)
2. Migration + model with scopes
3. `Store*` / `Update*` Form Requests extending `BaseFormRequest`
4. `{Module}Service` with create/update/delete/list methods
5. Thin controller delegating to the service
6. Blade views (preserve existing HTML/CSS classes — see root `README.md`)
7. Register routes in `routes/web.php` inside the correct `role:` group
8. Add API read routes in `routes/api.php` under `/api/v1`
9. Mirror the module in `src/lib/api/modules.ts` and add a `src/lib/*-service.ts` fetcher
10. Extend `RoleAccess` (or seed Spatie permissions) using the module's `permission_prefix`

Future modules (alumni, student portal, online admissions, placement, downloads) are pre-registered with `enabled: false` in `config/modules.php`.

## Module registry

`config/modules.php` is the canonical list of admin modules — permission prefixes, roles, API prefixes, upload directories, and sidebar route names. `App\Support\RoleAccess` remains the runtime gate for Phase 1; future modules should align new permission names with the registry before enabling.

## Related docs

- [FUTURE-PHASES.md](../../docs/FUTURE-PHASES.md) — future module map, checklist, API versioning, multi-guard auth
- [README.md](../README.md) — setup, deployment, API
- [SECURITY.md](SECURITY.md) — production hardening checklist
- [BIHE-Admin-Integration-Guide.md](../../docs/BIHE-Admin-Integration-Guide.md) — Next.js ↔ Laravel integration
