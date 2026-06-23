import { NextResponse, type NextRequest } from "next/server";

import {
  fetchSiteMaintenanceStatus,
  isMaintenanceBypassPath,
} from "@/lib/maintenance-status";
import { checkAdminLoginRateLimit } from "@/lib/security/admin-login-rate-limit";
import {
  applyAdminSecurityHeaders,
  applyPublicSecurityHeaders,
  getClientIp,
} from "@/lib/security/security-headers";

/**
 * Admin authentication is enforced by Laravel (Backend) behind the /admin proxy:
 * - AdminMiddleware redirects unauthenticated users to /admin/login
 * - LoginController rate-limits + logs attempts (ActivityLogService)
 * - Session inactivity timeout (SessionInactivityMiddleware)
 *
 * This middleware does NOT replace Laravel auth (sessions are Laravel-encrypted cookies).
 * It adds edge security headers, admin noindex, and login POST throttling.
 */

const PUBLIC_ADMIN_PATHS = new Set(["/admin/login", "/admin/forgot-password", "/admin/reset-password"]);

function isPublicAdminPath(pathname: string): boolean {
  if (PUBLIC_ADMIN_PATHS.has(pathname)) {
    return true;
  }

  return pathname.startsWith("/admin/reset-password/");
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminSurface =
    pathname === "/admin" ||
    pathname.startsWith("/admin/") ||
    pathname.startsWith("/assets/") ||
    pathname.startsWith("/storage/");

  if (!isAdminSurface && !isMaintenanceBypassPath(pathname)) {
    const maintenance = await fetchSiteMaintenanceStatus();

    if (maintenance.enabled) {
      const maintenanceUrl = request.nextUrl.clone();
      maintenanceUrl.pathname = "/maintenance";
      maintenanceUrl.search = "";
      return NextResponse.redirect(maintenanceUrl);
    }
  }

  if (isAdminSurface && request.method === "POST" && pathname === "/admin/login") {
    const clientIp = getClientIp(request);
    const limit = checkAdminLoginRateLimit(clientIp);

    if (!limit.allowed) {
      const response = new NextResponse(
        "Too many login attempts. Please wait before trying again.",
        { status: 429 },
      );
      applyAdminSecurityHeaders(response as NextResponse);
      if (limit.retryAfterSeconds) {
        response.headers.set("Retry-After", String(limit.retryAfterSeconds));
      }
      return response;
    }
  }

  const response = NextResponse.next();

  if (isAdminSurface) {
    applyAdminSecurityHeaders(response);

    // Non-public admin routes require Laravel session — proxy continues; upstream enforces auth.
    if (!isPublicAdminPath(pathname) && pathname !== "/admin") {
      response.headers.set("X-BIHE-Admin-Auth", "laravel-session");
    }

    return response;
  }

  applyPublicSecurityHeaders(response);
  return response;
}

export const config = {
  matcher: [
    /*
     * Run on all routes except static assets and Next internals.
     * Includes /admin, /api, and public pages.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|pdf|woff2?|ttf)$).*)",
  ],
};
