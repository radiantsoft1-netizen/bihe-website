import { adminOrigin } from "@/lib/admin-origin";

export type SiteMaintenanceMode = "construction" | "staging";

export type SiteMaintenanceStatus = {
  enabled: boolean;
  mode: SiteMaintenanceMode;
  headline: string;
  message: string;
  contactEmail: string | null;
};

const API_PATH = "/api/v1/site-settings/maintenance";

const DEFAULT_STATUS: SiteMaintenanceStatus = {
  enabled: false,
  mode: "construction",
  headline: "Website Under Maintenance",
  message: "We are updating the BIHE website to serve you better. Please check back soon.",
  contactEmail: null,
};

function getApiBaseUrl(): string | null {
  const url =
    process.env.NEXT_PUBLIC_API_URL?.trim() ||
    process.env.ADMIN_ORIGIN?.trim() ||
    process.env.NEXT_PUBLIC_ADMIN_ORIGIN?.trim() ||
    (process.env.NODE_ENV === "development" ? adminOrigin() : null);

  if (!url) {
    return null;
  }

  return url.replace(/\/$/, "");
}

export async function fetchSiteMaintenanceStatus(): Promise<SiteMaintenanceStatus> {
  const base = getApiBaseUrl();
  if (!base) {
    return DEFAULT_STATUS;
  }

  try {
    const response = await fetch(`${base}${API_PATH}`, {
      next: {
        revalidate: process.env.NODE_ENV === "development" ? 15 : 60,
        tags: [`api:${API_PATH}`],
      },
    });

    if (!response.ok) {
      return DEFAULT_STATUS;
    }

    const json = (await response.json()) as { data?: Partial<SiteMaintenanceStatus> };
    const data = json.data;

    if (!data || typeof data !== "object") {
      return DEFAULT_STATUS;
    }

    return {
      enabled: Boolean(data.enabled),
      mode: data.mode === "staging" ? "staging" : "construction",
      headline:
        typeof data.headline === "string" && data.headline.trim()
          ? data.headline.trim()
          : DEFAULT_STATUS.headline,
      message:
        typeof data.message === "string" && data.message.trim()
          ? data.message.trim()
          : DEFAULT_STATUS.message,
      contactEmail:
        typeof data.contactEmail === "string" && data.contactEmail.trim()
          ? data.contactEmail.trim()
          : null,
    };
  } catch {
    return DEFAULT_STATUS;
  }
}

export function isMaintenanceBypassPath(pathname: string): boolean {
  if (
    pathname === "/maintenance" ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/storage/") ||
    pathname.startsWith("/assets/")
  ) {
    return true;
  }

  return false;
}
