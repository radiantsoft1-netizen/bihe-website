import "server-only";

import { fetchApiItem, fetchApiList } from "@/lib/api/client";
import { FALLBACK_JOB_OPENING_ITEMS } from "@/lib/info-corner-pages/job-openings-content";
import { FALLBACK_NEWSLETTER_ITEMS, normalizeNewsletterItem } from "@/lib/info-corner-pages/newsletters-content";
import { FALLBACK_NEWS_EVENTS_ACHIEVEMENTS_ITEMS } from "@/lib/info-corner-pages/news-events-achievements-content";

export type InfoCornerCategory = {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  href: string;
  sortOrder?: number;
};

export type InfoCornerItemImage = {
  id: string;
  url: string;
  alt?: string | null;
};

export type InfoCornerItem = {
  id: string;
  slug: string;
  title: string;
  badgeText?: string | null;
  badgeVisible?: boolean;
  badgeLabel?: string | null;
  subtitle?: string | null;
  excerpt?: string | null;
  publishedDate?: string | null;
  publishedDateLabel?: string | null;
  image?: string | null;
  imageAlt?: string | null;
  images?: InfoCornerItemImage[];
  pdf?: string | null;
  pdfName?: string | null;
  externalLink?: string | null;
  showInHomeScroller?: boolean;
  content?: string[];
  body?: string | null;
  category?: InfoCornerCategory | null;
  categories?: InfoCornerCategory[];
  href?: string | null;
};

const FALLBACK_CATEGORIES: InfoCornerCategory[] = [
  {
    id: "announcements",
    slug: "announcements",
    name: "Announcements",
    description:
      "Official college announcements, notices, and updates for students, faculty, and stakeholders.",
    href: "/info-corner/announcements",
    sortOrder: 1,
  },
  {
    id: "newsletters",
    slug: "newsletters",
    name: "Newsletters",
    description:
      "Institutional newsletters highlighting campus news, academic updates, and community activities.",
    href: "/info-corner/newsletters",
    sortOrder: 2,
  },
  {
    id: "news-events-achievements",
    slug: "news-events-achievements",
    name: "News, Events & Achievements",
    description:
      "Latest news, campus events, student achievements, and institutional milestones at BIHE.",
    href: "/info-corner/news-events-achievements",
    sortOrder: 3,
  },
  {
    id: "circulars-and-notices",
    slug: "circulars-and-notices",
    name: "Circulars and Notices",
    description:
      "Official circulars, administrative notices, and compliance-related communications from the institution.",
    href: "/info-corner/circulars-and-notices",
    sortOrder: 4,
  },
  {
    id: "job-openings",
    slug: "job-openings",
    name: "Job Openings",
    description:
      "Current faculty and staff recruitment opportunities at Bapuji Institute of Hi-Tech Education.",
    href: "/info-corner/job-openings",
    sortOrder: 5,
  },
];

function mapCategory(category: InfoCornerCategory): InfoCornerCategory {
  return {
    ...category,
    href: category.href || `/info-corner/${category.slug}`,
  };
}

function mapItem(item: InfoCornerItem): InfoCornerItem {
  const categories = (item.categories ?? (item.category ? [item.category] : [])).map(mapCategory);
  const category = item.category ? mapCategory(item.category) : categories[0] ?? null;
  const href =
    item.href ||
    (category ? `/info-corner/${category.slug}/${item.slug}` : `/info-corner/${item.slug}`);

  const mapped: InfoCornerItem = {
    ...item,
    publishedDateLabel: item.publishedDateLabel ?? item.publishedDate ?? "",
    category,
    categories,
    href,
    content: item.content ?? [],
  };

  return normalizeNewsletterItem(mapped);
}

export async function getInfoCornerCategories(): Promise<InfoCornerCategory[]> {
  const data = await fetchApiList<InfoCornerCategory>("/api/v1/info-corner/categories");

  if (!data || data.length === 0) {
    return FALLBACK_CATEGORIES;
  }

  return data.map(mapCategory);
}

function mergeInfoCornerFallbackItems(items: InfoCornerItem[]): InfoCornerItem[] {
  const merged = [...items];

  for (const [categorySlug, fallbackItems] of [
    ["newsletters", FALLBACK_NEWSLETTER_ITEMS],
    ["news-events-achievements", FALLBACK_NEWS_EVENTS_ACHIEVEMENTS_ITEMS],
    ["job-openings", FALLBACK_JOB_OPENING_ITEMS],
  ] as const) {
    const apiSlugs = new Set(
      items
        .filter((item) => item.category?.slug === categorySlug)
        .map((item) => item.slug),
    );

    merged.push(...fallbackItems.filter((item) => !apiSlugs.has(item.slug)).map(mapItem));
  }

  return merged;
}

export async function getInfoCornerItems(categorySlug?: string): Promise<InfoCornerItem[]> {
  const path = categorySlug
    ? `/api/v1/info-corner/items?category=${encodeURIComponent(categorySlug)}`
    : "/api/v1/info-corner/items";
  const data = await fetchApiList<InfoCornerItem>(path);

  if (!data || data.length === 0) {
    if (categorySlug === "newsletters") {
      return FALLBACK_NEWSLETTER_ITEMS.map(mapItem);
    }

    if (categorySlug === "news-events-achievements") {
      return FALLBACK_NEWS_EVENTS_ACHIEVEMENTS_ITEMS.map(mapItem);
    }

    if (categorySlug === "job-openings") {
      return FALLBACK_JOB_OPENING_ITEMS.map(mapItem);
    }

    return [];
  }

  return data.map(mapItem);
}

export async function getInfoCornerItem(
  categorySlug: string,
  itemSlug: string,
): Promise<InfoCornerItem | null> {
  const data = await fetchApiItem<InfoCornerItem>(
    `/api/v1/info-corner/items/${categorySlug}/${itemSlug}`,
  );

  if (!data) {
    const fallbackItems =
      categorySlug === "newsletters"
        ? FALLBACK_NEWSLETTER_ITEMS
        : categorySlug === "news-events-achievements"
          ? FALLBACK_NEWS_EVENTS_ACHIEVEMENTS_ITEMS
          : categorySlug === "job-openings"
            ? FALLBACK_JOB_OPENING_ITEMS
            : [];
    const fallback = fallbackItems.find((item) => item.slug === itemSlug);
    return fallback ? mapItem(fallback) : null;
  }

  return mapItem(data);
}

export async function getInfoCornerHomeScrollerItems(): Promise<InfoCornerItem[]> {
  const data = await fetchApiList<InfoCornerItem>("/api/v1/info-corner/items/home-scroller");

  if (!data || data.length === 0) {
    return [];
  }

  return data.map(mapItem);
}

export async function getAllInfoCornerItemParams(): Promise<
  { category: string; itemSlug: string }[]
> {
  const items = await getInfoCornerItems();
  const mergedItems = mergeInfoCornerFallbackItems(items);
  const params: { category: string; itemSlug: string }[] = [];

  for (const item of mergedItems) {
    const slugs = (item.categories ?? (item.category ? [item.category] : []))
      .map((entry) => entry.slug)
      .filter(Boolean);

    for (const category of slugs) {
      params.push({ category, itemSlug: item.slug });
    }
  }

  return params;
}

export function infoCornerItemHref(categorySlug: string, itemSlug: string): string {
  return `/info-corner/${categorySlug}/${itemSlug}`;
}

export function resolveInfoCornerBadgeLabel(item: InfoCornerItem): string {
  const custom = item.badgeText?.trim();

  if (custom) {
    return custom;
  }

  if (item.badgeLabel?.trim()) {
    return item.badgeLabel.trim();
  }

  if (item.publishedDate) {
    const published = new Date(`${item.publishedDate}T00:00:00`);
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 14);

    if (!Number.isNaN(published.getTime()) && published >= cutoff) {
      return "New";
    }
  }

  return "Notice";
}

export const INFO_CORNER_CATEGORY_SLUGS = FALLBACK_CATEGORIES.map((category) => category.slug);

export function isInfoCornerCategorySlug(slug: string): boolean {
  return INFO_CORNER_CATEGORY_SLUGS.includes(slug);
}
