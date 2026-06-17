/**
 * Laravel admin + API origin (no trailing slash).
 * Vercel proxies /admin, /assets, and /storage to this host.
 * Local: http://127.0.0.1:8099 (composer serve)
 */
export function adminOrigin(): string | null {
  const raw =
    process.env.ADMIN_ORIGIN?.trim() ||
    process.env.NEXT_PUBLIC_ADMIN_ORIGIN?.trim() ||
    (process.env.NODE_ENV === "development" ? "http://127.0.0.1:8099" : null);

  return raw ? raw.replace(/\/+$/, "") : null;
}

/** Public admin login path — always on the same site as the Next.js app. */
export function adminLoginPath(): string {
  return "/admin";
}
