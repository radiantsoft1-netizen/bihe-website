# HTML Frontend Reference

BIHE Admin uses **HTML → Blade conversion only**. The design is not redesigned.

## Asset paths

All frontend assets live under `public/assets/`:

| Asset | Path | Blade reference |
|-------|------|-----------------|
| Styles | `public/assets/css/admin.css` | `{{ asset('assets/css/admin.css') }}` |
| Scripts | `public/assets/js/admin.js` | `{{ asset('assets/js/admin.js') }}` |

Uploaded content (gallery, PDFs) continues to use `{{ asset('storage/...') }}`.

## Layout structure

```
resources/views/layouts/
├── app.blade.php      ← DOCTYPE, head, shell, @yield('content')
├── header.blade.php   ← top bar (admin-topbar)
├── sidebar.blade.php  ← left navigation (admin-sidebar)
├── footer.blade.php   ← structural partial (no visible chrome today)
└── guest.blade.php    ← login page wrapper
```

## Frontend rule (binding)

**Do not redesign or modify UI/UX.** The frontend appearance must remain identical to the current website.

### Preserve

- HTML structure
- CSS classes
- Responsiveness
- Animations
- Layout hierarchy
- JavaScript functionality

### Allowed only

- Static HTML → Blade templates
- Dynamic database content injection
- Backend + admin panel management

## Conversion rules

1. Do **not** change CSS classes, colours, spacing, animations, or responsive breakpoints.
2. Do **not** introduce Vite, Webpack, or Node build steps on Hostinger.
3. Only add Blade directives: `@extends`, `@section`, `@include`, `@csrf`, `@forelse`, `{{ }}`, `@error`.
4. Keep form fields as plain HTML in `admin/{module}/_form.blade.php`.
5. New pages must `@extends('layouts.app')` and set `@section('title')` + `@section('page-title')`.
6. Copy source HTML verbatim first; add directives only where content is dynamic.
