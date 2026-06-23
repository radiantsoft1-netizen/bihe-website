(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__98efd422._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/src/lib/security/admin-login-rate-limit.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Edge login throttling for proxied /admin/login POST requests.
 * Laravel also enforces AUTH_LOGIN_THROTTLE — this is defense-in-depth at the Next.js edge.
 *
 * Note: in-memory buckets are per serverless isolate. For multi-region production,
 * configure UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN (future step).
 */ __turbopack_context__.s([
    "checkAdminLoginRateLimit",
    ()=>checkAdminLoginRateLimit
]);
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000;
const buckets = new Map();
function pruneExpired(now) {
    if (buckets.size < 500) {
        return;
    }
    for (const [key, bucket] of buckets){
        if (bucket.lockedUntil > 0 && bucket.lockedUntil <= now && bucket.attempts === 0) {
            buckets.delete(key);
        }
    }
}
function checkAdminLoginRateLimit(clientIp) {
    const now = Date.now();
    pruneExpired(now);
    const bucket = buckets.get(clientIp) ?? {
        attempts: 0,
        lockedUntil: 0
    };
    if (bucket.lockedUntil > now) {
        return {
            allowed: false,
            retryAfterSeconds: Math.ceil((bucket.lockedUntil - now) / 1000)
        };
    }
    if (bucket.lockedUntil > 0 && bucket.lockedUntil <= now) {
        bucket.attempts = 0;
        bucket.lockedUntil = 0;
    }
    bucket.attempts += 1;
    if (bucket.attempts > MAX_ATTEMPTS) {
        bucket.lockedUntil = now + LOCKOUT_MS;
        buckets.set(clientIp, bucket);
        return {
            allowed: false,
            retryAfterSeconds: Math.ceil(LOCKOUT_MS / 1000)
        };
    }
    buckets.set(clientIp, bucket);
    return {
        allowed: true
    };
}
}),
"[project]/src/lib/security/security-headers.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "adminSecurityHeaderEntries",
    ()=>adminSecurityHeaderEntries,
    "applyAdminSecurityHeaders",
    ()=>applyAdminSecurityHeaders,
    "applyPublicSecurityHeaders",
    ()=>applyPublicSecurityHeaders,
    "getClientIp",
    ()=>getClientIp,
    "securityHeaderEntries",
    ()=>securityHeaderEntries
]);
const isProduction = ("TURBOPACK compile-time value", "development") === "production";
function trustedConnectOrigins() {
    const origins = new Set([
        "'self'"
    ]);
    for (const key of [
        "NEXT_PUBLIC_API_URL",
        "ADMIN_ORIGIN",
        "NEXT_PUBLIC_ADMIN_ORIGIN"
    ]){
        const value = process.env[key]?.trim().replace(/\/+$/, "");
        if (value) {
            origins.add(value);
        }
    }
    if (process.env.VERCEL_URL) {
        origins.add(`https://${process.env.VERCEL_URL}`);
    }
    return [
        ...origins
    ];
}
function buildContentSecurityPolicy(options) {
    const connectSrc = trustedConnectOrigins().join(" ");
    if (options.adminProxy) {
        // Proxied Laravel admin — upstream sets its own CSP; keep edge policy minimal.
        return [
            "default-src 'self'",
            "base-uri 'self'",
            "form-action 'self'",
            "frame-ancestors 'none'",
            "object-src 'none'"
        ].join("; ");
    }
    return [
        "default-src 'self'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'none'",
        "object-src 'none'",
        // Next.js App Router still emits inline bootstrap chunks in production.
        "script-src 'self' 'unsafe-inline'",
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data: blob: https:",
        "font-src 'self' data:",
        `connect-src ${connectSrc}`,
        "worker-src 'self' blob:",
        "manifest-src 'self'",
        ...("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : []
    ].join("; ");
}
function baseSecurityHeaders(options) {
    const headers = {
        "X-Frame-Options": "DENY",
        "X-Content-Type-Options": "nosniff",
        "Referrer-Policy": "strict-origin-when-cross-origin",
        "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
        "X-XSS-Protection": "1; mode=block",
        "Content-Security-Policy": buildContentSecurityPolicy(options)
    };
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return headers;
}
function applyPublicSecurityHeaders(response) {
    for (const [key, value] of Object.entries(baseSecurityHeaders({
        adminProxy: false
    }))){
        response.headers.set(key, value);
    }
}
function applyAdminSecurityHeaders(response) {
    for (const [key, value] of Object.entries(baseSecurityHeaders({
        adminProxy: true
    }))){
        response.headers.set(key, value);
    }
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
}
function securityHeaderEntries() {
    return Object.entries(baseSecurityHeaders({
        adminProxy: false
    })).map(([key, value])=>({
            key,
            value
        }));
}
function adminSecurityHeaderEntries() {
    const headers = baseSecurityHeaders({
        adminProxy: true
    });
    headers["X-Robots-Tag"] = "noindex, nofollow, noarchive";
    headers["Cache-Control"] = "no-store, no-cache, must-revalidate, private";
    return Object.entries(headers).map(([key, value])=>({
            key,
            value
        }));
}
function getClientIp(request) {
    const forwarded = request.headers.get("x-forwarded-for");
    if (forwarded) {
        return forwarded.split(",")[0]?.trim() || "unknown";
    }
    return request.headers.get("x-real-ip")?.trim() || "unknown";
}
}),
"[project]/src/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "middleware",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$security$2f$admin$2d$login$2d$rate$2d$limit$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/security/admin-login-rate-limit.ts [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$security$2f$security$2d$headers$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/security/security-headers.ts [middleware-edge] (ecmascript)");
;
;
;
/**
 * Admin authentication is enforced by Laravel (bihe-admin) behind the /admin proxy:
 * - AdminMiddleware redirects unauthenticated users to /admin/login
 * - LoginController rate-limits + logs attempts (ActivityLogService)
 * - Session inactivity timeout (SessionInactivityMiddleware)
 *
 * This middleware does NOT replace Laravel auth (sessions are Laravel-encrypted cookies).
 * It adds edge security headers, admin noindex, and login POST throttling.
 */ const PUBLIC_ADMIN_PATHS = new Set([
    "/admin/login",
    "/admin/forgot-password",
    "/admin/reset-password"
]);
function isPublicAdminPath(pathname) {
    if (PUBLIC_ADMIN_PATHS.has(pathname)) {
        return true;
    }
    return pathname.startsWith("/admin/reset-password/");
}
function middleware(request) {
    const { pathname } = request.nextUrl;
    const isAdminSurface = pathname === "/admin" || pathname.startsWith("/admin/") || pathname.startsWith("/assets/") || pathname.startsWith("/storage/");
    if (isAdminSurface && request.method === "POST" && pathname === "/admin/login") {
        const clientIp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$security$2f$security$2d$headers$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getClientIp"])(request);
        const limit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$security$2f$admin$2d$login$2d$rate$2d$limit$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["checkAdminLoginRateLimit"])(clientIp);
        if (!limit.allowed) {
            const response = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"]("Too many login attempts. Please wait before trying again.", {
                status: 429
            });
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$security$2f$security$2d$headers$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["applyAdminSecurityHeaders"])(response);
            if (limit.retryAfterSeconds) {
                response.headers.set("Retry-After", String(limit.retryAfterSeconds));
            }
            return response;
        }
    }
    const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    if (isAdminSurface) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$security$2f$security$2d$headers$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["applyAdminSecurityHeaders"])(response);
        // Non-public admin routes require Laravel session — proxy continues; upstream enforces auth.
        if (!isPublicAdminPath(pathname) && pathname !== "/admin") {
            response.headers.set("X-BIHE-Admin-Auth", "laravel-session");
        }
        return response;
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$security$2f$security$2d$headers$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["applyPublicSecurityHeaders"])(response);
    return response;
}
const config = {
    matcher: [
        /*
     * Run on all routes except static assets and Next internals.
     * Includes /admin, /api, and public pages.
     */ "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|pdf|woff2?|ttf)$).*)"
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__98efd422._.js.map