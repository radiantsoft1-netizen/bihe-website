module.exports = [
"[project]/.next-internal/server/app/storage/[[...slug]]/route/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/lib/admin-origin.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Laravel admin + API origin (no trailing slash).
 * Vercel proxies /admin, /assets, and /storage to this host.
 * Local: http://127.0.0.1:8099 (composer serve)
 */ __turbopack_context__.s([
    "adminLoginPath",
    ()=>adminLoginPath,
    "adminOrigin",
    ()=>adminOrigin
]);
function adminOrigin() {
    const raw = process.env.ADMIN_ORIGIN?.trim() || process.env.NEXT_PUBLIC_ADMIN_ORIGIN?.trim() || (("TURBOPACK compile-time truthy", 1) ? "http://127.0.0.1:8099" : "TURBOPACK unreachable");
    return ("TURBOPACK compile-time truthy", 1) ? raw.replace(/\/+$/, "") : "TURBOPACK unreachable";
}
function adminLoginPath() {
    return "/admin";
}
}),
"[project]/src/lib/admin-proxy.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createAdminProxyHandlers",
    ()=>createAdminProxyHandlers,
    "proxyToAdminOrigin",
    ()=>proxyToAdminOrigin
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2d$origin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/admin-origin.ts [app-route] (ecmascript)");
;
;
const HOP_BY_HOP_HEADERS = new Set([
    "connection",
    "keep-alive",
    "proxy-authenticate",
    "proxy-authorization",
    "te",
    "trailer",
    "transfer-encoding",
    "upgrade",
    "host"
]);
function publicOrigin(request) {
    const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
    const protocol = request.headers.get("x-forwarded-proto") ?? request.nextUrl.protocol.replace(":", "");
    return `${protocol}://${host}`;
}
function rewriteLocationHeader(location, upstreamOrigin, siteOrigin) {
    if (location.startsWith(upstreamOrigin)) {
        return `${siteOrigin}${location.slice(upstreamOrigin.length)}`;
    }
    try {
        const parsed = new URL(location, upstreamOrigin);
        if (parsed.origin === upstreamOrigin) {
            return `${siteOrigin}${parsed.pathname}${parsed.search}${parsed.hash}`;
        }
    } catch  {
        return location;
    }
    return location;
}
function sanitizeSetCookie(value) {
    return value.replace(/;\s*Domain=[^;]+/gi, "");
}
function adminProxyErrorHtml(title, detail) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title} — BIHE Admin</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 0; min-height: 100vh; display: grid; place-items: center; background: #f4f6fb; color: #1e3a75; }
    main { max-width: 36rem; padding: 2rem; background: #fff; border-radius: 1rem; box-shadow: 0 12px 40px rgba(30,58,117,.12); }
    h1 { margin: 0 0 .75rem; font-size: 1.35rem; }
    p { margin: 0 0 1rem; line-height: 1.55; color: #334155; }
    a { color: #1e3a75; }
    code { background: #eef2f8; padding: .1rem .35rem; border-radius: .25rem; }
  </style>
</head>
<body>
  <main>
    <h1>${title}</h1>
    <p>${detail}</p>
    <p><a href="/">← Back to website</a></p>
  </main>
</body>
</html>`;
}
function adminProxyErrorResponse(status, title, detail) {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](adminProxyErrorHtml(title, detail), {
        status,
        headers: {
            "content-type": "text/html; charset=utf-8"
        }
    });
}
async function proxyToAdminOrigin(request, upstreamPath) {
    const origin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2d$origin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adminOrigin"])();
    if (!origin) {
        return adminProxyErrorResponse(503, "Admin not configured", "Set <code>ADMIN_ORIGIN</code> to your Laravel admin URL (e.g. <code>https://admin.bihedvg.org</code>) in the Node.js app environment variables, then redeploy.");
    }
    const siteOrigin = publicOrigin(request);
    const targetUrl = `${origin}${upstreamPath}${request.nextUrl.search}`;
    const requestHeaders = new Headers();
    request.headers.forEach((value, key)=>{
        if (!HOP_BY_HOP_HEADERS.has(key.toLowerCase())) {
            requestHeaders.set(key, value);
        }
    });
    const host = request.headers.get("host");
    if (host) {
        requestHeaders.set("X-Forwarded-Host", host);
        requestHeaders.set("X-Forwarded-Proto", request.headers.get("x-forwarded-proto") ?? request.nextUrl.protocol.replace(":", ""));
    }
    let body;
    if (request.method !== "GET" && request.method !== "HEAD") {
        body = await request.arrayBuffer();
    }
    let upstream;
    try {
        upstream = await fetch(targetUrl, {
            method: request.method,
            headers: requestHeaders,
            body,
            redirect: "manual",
            cache: "no-store"
        });
    } catch  {
        return adminProxyErrorResponse(502, "Admin panel unavailable", `The Laravel admin is not reachable at <code>${origin}</code>. Deploy <code>bihe-admin/</code> on Hostinger (subdomain + database), then open this page again.`);
    }
    const responseHeaders = new Headers();
    upstream.headers.forEach((value, key)=>{
        const lowerKey = key.toLowerCase();
        if (HOP_BY_HOP_HEADERS.has(lowerKey)) {
            return;
        }
        if (lowerKey === "set-cookie") {
            responseHeaders.append(key, sanitizeSetCookie(value));
            return;
        }
        if (lowerKey === "location") {
            responseHeaders.set(key, rewriteLocationHeader(value, origin, siteOrigin));
            return;
        }
        responseHeaders.set(key, value);
    });
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](upstream.body, {
        status: upstream.status,
        statusText: upstream.statusText,
        headers: responseHeaders
    });
}
function createAdminProxyHandlers(basePath) {
    async function handler(request, context) {
        const { slug = [] } = await context.params;
        const suffix = slug.length > 0 ? `/${slug.join("/")}` : "";
        return proxyToAdminOrigin(request, `${basePath}${suffix}`);
    }
    return {
        GET: handler,
        HEAD: handler,
        POST: handler,
        PUT: handler,
        PATCH: handler,
        DELETE: handler,
        OPTIONS: handler
    };
}
}),
"[project]/src/app/storage/[[...slug]]/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET,
    "HEAD",
    ()=>HEAD,
    "OPTIONS",
    ()=>OPTIONS,
    "PATCH",
    ()=>PATCH,
    "POST",
    ()=>POST,
    "PUT",
    ()=>PUT,
    "dynamic",
    ()=>dynamic,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2d$proxy$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/admin-proxy.ts [app-route] (ecmascript)");
;
const runtime = "nodejs";
const dynamic = "force-dynamic";
const { GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2d$proxy$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAdminProxyHandlers"])("/storage");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__27be1754._.js.map