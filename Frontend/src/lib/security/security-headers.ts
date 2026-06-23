import type { NextRequest, NextResponse } from "next/server";

const isProduction = process.env.NODE_ENV === "production";

function trustedConnectOrigins(): string[] {
  const origins = new Set<string>(["'self'"]);

  for (const key of ["NEXT_PUBLIC_API_URL", "ADMIN_ORIGIN", "NEXT_PUBLIC_ADMIN_ORIGIN"]) {
    const value = process.env[key]?.trim().replace(/\/+$/, "");
    if (value) {
      origins.add(value);
    }
  }

  if (process.env.VERCEL_URL) {
    origins.add(`https://${process.env.VERCEL_URL}`);
  }

  return [...origins];
}

function buildContentSecurityPolicy(options: { adminProxy: boolean }): string {
  const connectSrc = trustedConnectOrigins().join(" ");

  if (options.adminProxy) {
    // Proxied Laravel admin — upstream sets its own CSP; keep edge policy minimal.
    return [
      "default-src 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "object-src 'none'",
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
    ...(isProduction ? ["upgrade-insecure-requests"] : []),
  ].join("; ");
}

function baseSecurityHeaders(options: { adminProxy: boolean }): Record<string, string> {
  const headers: Record<string, string> = {
    "X-Frame-Options": "DENY",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
    "X-XSS-Protection": "1; mode=block",
    "Content-Security-Policy": buildContentSecurityPolicy(options),
  };

  if (isProduction) {
    headers["Strict-Transport-Security"] = "max-age=63072000; includeSubDomains; preload";
  }

  return headers;
}

export function applyPublicSecurityHeaders(response: NextResponse): void {
  for (const [key, value] of Object.entries(baseSecurityHeaders({ adminProxy: false }))) {
    response.headers.set(key, value);
  }
}

export function applyAdminSecurityHeaders(response: NextResponse): void {
  for (const [key, value] of Object.entries(baseSecurityHeaders({ adminProxy: true }))) {
    response.headers.set(key, value);
  }

  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
}

export function securityHeaderEntries(): { key: string; value: string }[] {
  return Object.entries(baseSecurityHeaders({ adminProxy: false })).map(([key, value]) => ({
    key,
    value,
  }));
}

export function adminSecurityHeaderEntries(): { key: string; value: string }[] {
  const headers = baseSecurityHeaders({ adminProxy: true });
  headers["X-Robots-Tag"] = "noindex, nofollow, noarchive";
  headers["Cache-Control"] = "no-store, no-cache, must-revalidate, private";

  return Object.entries(headers).map(([key, value]) => ({ key, value }));
}

export function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip")?.trim() || "unknown";
}
