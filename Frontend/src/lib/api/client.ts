import "server-only";

import { adminOrigin } from "@/lib/admin-origin";

const DEFAULT_REVALIDATE_SECONDS = 60;
const DEV_REVALIDATE_SECONDS = 30;

function apiFetchOptions(path: string): RequestInit {
  const revalidateSeconds =
    process.env.NODE_ENV === "development" ? DEV_REVALIDATE_SECONDS : DEFAULT_REVALIDATE_SECONDS;

  return {
    next: {
      revalidate: revalidateSeconds,
      tags: [`api:${path}`],
    },
  };
}

type ApiListResponse<T> = {
  data: T[];
};

type ApiItemResponse<T> = {
  data: T;
};

export function getApiBaseUrl(): string | null {
  const url =
    process.env.NEXT_PUBLIC_API_URL?.trim() ||
    process.env.NEXT_PUBLIC_ADMIN_ORIGIN?.trim() ||
    adminOrigin();
  if (!url) return null;
  return url.replace(/\/$/, "");
}

/** True when the public site is configured to read from the Laravel admin API. */
export function isFacultyApiConfigured(): boolean {
  return getApiBaseUrl() !== null;
}

function buildApiUrl(path: string, query?: Record<string, string | undefined>): string | null {
  const base = getApiBaseUrl();
  if (!base) return null;

  const url = new URL(`${base}${path}`);
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value) url.searchParams.set(key, value);
    }
  }

  return url.toString();
}

export async function fetchApiList<T>(
  path: string,
  query?: Record<string, string | undefined>,
): Promise<T[] | null> {
  const url = buildApiUrl(path, query);
  if (!url) return null;

  try {
    const response = await fetch(url, apiFetchOptions(path));

    if (!response.ok) return null;

    const json = (await response.json()) as ApiListResponse<T>;
    return Array.isArray(json.data) ? json.data : null;
  } catch {
    return null;
  }
}

export async function fetchApiItem<T>(
  path: string,
  query?: Record<string, string | undefined>,
): Promise<T | null> {
  const url = buildApiUrl(path, query);
  if (!url) return null;

  try {
    const response = await fetch(url, apiFetchOptions(path));

    if (!response.ok) return null;

    const json = (await response.json()) as ApiItemResponse<T>;
    return json.data ?? null;
  } catch {
    return null;
  }
}
