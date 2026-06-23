import { type NextRequest, NextResponse } from "next/server";

import { adminOrigin } from "@/lib/admin-origin";

const HOP_BY_HOP_HEADERS = new Set([
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
  "host",
]);

function publicOrigin(request: NextRequest): string {
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  const protocol = request.headers.get("x-forwarded-proto") ?? request.nextUrl.protocol.replace(":", "");
  return `${protocol}://${host}`;
}

function rewriteLocationHeader(location: string, upstreamOrigin: string, siteOrigin: string): string {
  if (location.startsWith(upstreamOrigin)) {
    return `${siteOrigin}${location.slice(upstreamOrigin.length)}`;
  }

  try {
    const parsed = new URL(location, upstreamOrigin);
    if (parsed.origin === upstreamOrigin) {
      return `${siteOrigin}${parsed.pathname}${parsed.search}${parsed.hash}`;
    }
  } catch {
    return location;
  }

  return location;
}

function sanitizeSetCookie(value: string): string {
  return value.replace(/;\s*Domain=[^;]+/gi, "");
}

function adminProxyErrorHtml(title: string, detail: string): string {
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

function adminProxyErrorResponse(status: number, title: string, detail: string): NextResponse {
  return new NextResponse(adminProxyErrorHtml(title, detail), {
    status,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

export async function proxyToAdminOrigin(
  request: NextRequest,
  upstreamPath: string,
): Promise<NextResponse> {
  const origin = adminOrigin();
  if (!origin) {
    return adminProxyErrorResponse(
      503,
      "Admin not configured",
      "Set <code>ADMIN_ORIGIN</code> to your Laravel admin URL (e.g. <code>https://admin.bihedvg.org</code>) in the Node.js app environment variables, then redeploy.",
    );
  }

  const siteOrigin = publicOrigin(request);
  const targetUrl = `${origin}${upstreamPath}${request.nextUrl.search}`;

  const requestHeaders = new Headers();
  request.headers.forEach((value, key) => {
    if (!HOP_BY_HOP_HEADERS.has(key.toLowerCase())) {
      requestHeaders.set(key, value);
    }
  });

  const host = request.headers.get("host");
  if (host) {
    requestHeaders.set("X-Forwarded-Host", host);
    requestHeaders.set(
      "X-Forwarded-Proto",
      request.headers.get("x-forwarded-proto") ??
        request.nextUrl.protocol.replace(":", ""),
    );
  }

  let body: ArrayBuffer | undefined;
  if (request.method !== "GET" && request.method !== "HEAD") {
    body = await request.arrayBuffer();
  }

  let upstream: Response;
  try {
    upstream = await fetch(targetUrl, {
      method: request.method,
      headers: requestHeaders,
      body,
      redirect: "manual",
      cache: "no-store",
    });
  } catch {
    return adminProxyErrorResponse(
      502,
      "Admin panel unavailable",
      `The Laravel admin is not reachable at <code>${origin}</code>. Deploy <code>Backend/</code> on Hostinger (subdomain + database), then open this page again.`,
    );
  }

  const responseHeaders = new Headers();
  upstream.headers.forEach((value, key) => {
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

  return new NextResponse(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: responseHeaders,
  });
}

export function createAdminProxyHandlers(basePath: string) {
  async function handler(
    request: NextRequest,
    context: { params: Promise<{ slug?: string[] }> },
  ) {
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
    OPTIONS: handler,
  };
}
