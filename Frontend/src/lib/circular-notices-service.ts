import "server-only";

import { fetchApiItem, fetchApiList } from "@/lib/api/client";
import {
  CIRCULARS_NOTICES,
  type CircularNotice,
} from "@/lib/info-corner-pages/circulars-and-notices-content";

type ApiCircularNotice = {
  id: string;
  slug: string;
  title: string;
  subtitle?: string | null;
  excerpt?: string | null;
  publishedDate?: string | null;
  publishedDateLabel?: string | null;
  image?: string | null;
  imageAlt?: string | null;
  pdf?: string | null;
  pdfName?: string | null;
  content?: string[] | null;
  body?: string | null;
};

function fallbackBySlug(slug: string): CircularNotice | undefined {
  return CIRCULARS_NOTICES.find((notice) => notice.id === slug);
}

function paragraphsFromBody(body?: string | null): string[] {
  if (!body) return [];

  return body
    .split(/\r\n\r\n|\n\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function mapCircularNotice(item: ApiCircularNotice, index = 0): CircularNotice {
  const fallback = fallbackBySlug(item.slug) ?? CIRCULARS_NOTICES[index];
  const content =
    item.content && item.content.length > 0
      ? item.content
      : paragraphsFromBody(item.body).length > 0
        ? paragraphsFromBody(item.body)
        : [...(fallback?.content ?? [])];

  return {
    id: item.slug,
    slug: item.slug,
    title: item.title,
    subtitle: item.subtitle ?? fallback?.subtitle,
    publishedDate:
      item.publishedDateLabel ??
      item.publishedDate ??
      fallback?.publishedDate ??
      "",
    publishedDateIso: item.publishedDate ?? fallback?.publishedDateIso,
    excerpt: item.excerpt ?? fallback?.excerpt ?? content[0] ?? "",
    image: item.image ?? fallback?.image ?? "/images/circulars/notice-preview.jpg",
    imageAlt: item.imageAlt ?? fallback?.imageAlt ?? item.title,
    downloadHref: item.pdf ?? fallback?.downloadHref,
    content,
  };
}

function fallbackNotices(): CircularNotice[] {
  return CIRCULARS_NOTICES.map((notice) => ({ ...notice, slug: notice.id }));
}

export async function getCircularNotices(): Promise<CircularNotice[]> {
  const data = await fetchApiList<ApiCircularNotice>("/api/v1/circular-notices");

  if (!data || data.length === 0) {
    return fallbackNotices();
  }

  return data.map((item, index) => mapCircularNotice(item, index));
}

export async function getCircularNoticeBySlug(slug: string): Promise<CircularNotice | null> {
  const data = await fetchApiItem<ApiCircularNotice>(`/api/v1/circular-notices/${slug}`);
  const fallback = fallbackBySlug(slug);

  if (!data) {
    return fallback ? { ...fallback, slug: fallback.id } : null;
  }

  const index = CIRCULARS_NOTICES.findIndex((notice) => notice.id === slug);

  return mapCircularNotice(data, index >= 0 ? index : 0);
}

export async function getAllCircularNoticeSlugs(): Promise<string[]> {
  const notices = await getCircularNotices();
  return notices.map((notice) => notice.slug);
}
