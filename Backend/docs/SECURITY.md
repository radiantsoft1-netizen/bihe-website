# Security Checklist — BIHE Admin

Brief reference for Laravel admin (`Backend/`) and public API hardening.

## Laravel defaults (already active)

| Control | Notes |
|---------|--------|
| CSRF | Web middleware verifies tokens on POST/PUT/PATCH/DELETE |
| Blade XSS | `{{ }}` auto-escapes; no `{!! !!}` in admin views |
| SQL injection | Eloquent / Query Builder with bindings; route model binding for IDs |
| Password hashing | `bcrypt` via model `hashed` cast |
| Mass assignment | `$fillable` on all models; role/password guarded in controllers |

## Implemented controls

### Authentication & sessions

- Guest-only login / password-reset routes; authenticated admin routes behind `auth`, `admin`, `session.inactivity`
- Role middleware per module (`super_admin`, `admin`, `staff`)
- Session stored in DB; regenerate on login; invalidate on logout
- Inactivity timeout: `SESSION_INACTIVITY_MINUTES` (default 30)
- Login throttling: `AUTH_LOGIN_THROTTLE` per IP + identifier (`LoginController` + `RateLimiter`)
- Math CAPTCHA on admin login and public contact form

### Input validation & sanitization

- All admin mutations use `$request->validate()` or `FormRequest` classes
- `sanitize.input` middleware strips HTML tags from POST/PUT/PATCH on authenticated admin routes (passwords excluded)
- `BaseFormRequest` + `SanitizesInput` trait for FormRequests (`UpdateProfileRequest`, `UpdatePasswordRequest`, `ContactSubmitRequest`)
- Helper: `App\Support\SanitizeInput`

### HTTP headers & transport

- `SecurityHeadersMiddleware` on web + API responses:
  - `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `X-XSS-Protection`
  - `Permissions-Policy`, baseline `Content-Security-Policy` (no script/style lockdown — admin uses inline styles)
- `ForceHttpsMiddleware` when `APP_FORCE_HTTPS=true` in production

### Public API (`/api/v1/*`)

| Endpoint | Protection |
|----------|------------|
| GET read endpoints | Public; no write access |
| `GET /contact/captcha` | `throttle:contact-captcha` (default 20/min per IP) |
| `POST /contact` | `throttle:contact-form` (default 5/min per IP), CAPTCHA, validated + sanitized input |
| Future writes | Use `api.key` middleware + `API_KEY` header |

Rate limiters are registered in `AppServiceProvider` (same pattern as contact form).

## Production `.env` recommendations

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://admin.bihedvg.org
APP_FORCE_HTTPS=true

SESSION_DRIVER=database
SESSION_ENCRYPT=true
SESSION_SECURE_COOKIE=true
SESSION_HTTP_ONLY=true
SESSION_SAME_SITE=lax
SESSION_LIFETIME=120
SESSION_INACTIVITY_MINUTES=30

AUTH_LOGIN_THROTTLE=5
CONTACT_FORM_THROTTLE=5
CONTACT_CAPTCHA_THROTTLE=20

BCRYPT_ROUNDS=12
```

After changing `.env` on Hostinger:

```bash
php artisan config:cache
php artisan route:cache
```

## Manual Hostinger steps

1. **Document root** — point domain to `Backend/public`, not project root (keeps `.env` private).
2. **HTTPS** — enable SSL in hPanel; set `APP_FORCE_HTTPS=true` and `SESSION_SECURE_COOKIE=true`.
3. **Permissions** — `storage/` and `bootstrap/cache/` writable (`775`).
4. **Secrets** — strong `APP_KEY`, admin passwords, optional `API_KEY`; never commit `.env`.
5. **Mail** — configure `MAIL_*` for password reset and contact form delivery.
6. **Cron** — `* * * * * php artisan schedule:run` if scheduled tasks are added later.
7. **Backups** — regular MySQL + `storage/app/public` backups via hPanel.

## Extending security

- New admin FormRequests should extend `App\Http\Requests\Admin\BaseFormRequest`
- New public write endpoints: `Route::middleware('api.key')` + validate with FormRequest
- Activity logs and session revocation: Super Admin → Activity Logs / Sessions

See also `README.md` → Authentication & Security sections.
