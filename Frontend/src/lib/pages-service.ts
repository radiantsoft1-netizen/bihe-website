import "server-only";

import { fetchApiItem } from "@/lib/api/client";

export type SitePageRecord = {
  path: string;
  slug: string;
  section: string | null;
  templateKey: string;
  title: string;
  metaDescription: string | null;
  content: Record<string, unknown>;
  sortOrder?: number;
};

type ApiSitePage = {
  path: string;
  slug: string;
  section?: string | null;
  templateKey: string;
  title: string;
  metaDescription?: string | null;
  content?: Record<string, unknown>;
  sortOrder?: number;
};

function mapPage(item: ApiSitePage): SitePageRecord {
  return {
    path: item.path,
    slug: item.slug,
    section: item.section ?? null,
    templateKey: item.templateKey,
    title: item.title,
    metaDescription: item.metaDescription ?? null,
    content: item.content ?? {},
    sortOrder: item.sortOrder,
  };
}

export async function getSitePageByPath(path: string): Promise<SitePageRecord | null> {
  const normalized = path.replace(/\/$/, "") || "/";
  const data = await fetchApiItem<ApiSitePage>("/api/v1/site-pages/show", {
    path: normalized,
  });

  return data ? mapPage(data) : null;
}
