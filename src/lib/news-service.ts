import "server-only";

import { fetchApiItem, fetchApiList } from "@/lib/api/client";
import { FALLBACK_NEWS_EVENTS } from "@/lib/homepage-fallbacks";
import { images } from "@/lib/images";
import type { NewsCategory, NewsItem, NewsTickerItem } from "@/lib/types/news";

type ApiNewsCategory = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
};

type ApiNewsItem = {
  id: string;
  title: string;
  slug: string;
  description?: string | null;
  summary?: string | null;
  content?: string | null;
  body?: string | null;
  date?: string | null;
  eventDate?: string | null;
  image?: string | null;
  pdf?: string | null;
  pdfName?: string | null;
  category?: ApiNewsCategory | null;
  isFeatured?: boolean;
  showInTicker?: boolean;
  seo?: {
    title?: string | null;
    description?: string | null;
    keywords?: string | null;
  };
};

function mapCategory(category?: ApiNewsCategory | null): NewsCategory | null {
  if (!category) return null;

  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description,
  };
}

function mapNewsItem(item: ApiNewsItem, index = 0): NewsItem {
  const fallback = FALLBACK_NEWS_EVENTS[index];

  return {
    id: item.id,
    title: item.title,
    slug: item.slug,
    description: item.description ?? item.summary ?? "",
    summary: item.summary ?? item.description ?? "",
    content: item.content ?? item.body ?? "",
    body: item.body ?? item.content ?? "",
    date: item.date ?? fallback?.date ?? "",
    eventDate: item.eventDate,
    image: item.image ?? fallback?.image ?? images.news[0],
    pdf: item.pdf,
    pdfName: item.pdfName,
    category: mapCategory(item.category),
    tag: item.category?.name ?? fallback?.tag ?? "News",
    isFeatured: item.isFeatured,
    showInTicker: item.showInTicker,
    seo: item.seo,
  };
}

function fallbackNewsItems(): NewsItem[] {
  return FALLBACK_NEWS_EVENTS.map((item, index) => ({
    id: `fallback-${index}`,
    title: item.title,
    slug: `fallback-${index}`,
    description: "Stay updated with campus programs, celebrations, and student achievements.",
    summary: "Stay updated with campus programs, celebrations, and student achievements.",
    content: "",
    body: "",
    date: item.date,
    image: item.image,
    pdf: null,
    pdfName: null,
    category: null,
    tag: item.tag,
  }));
}

export async function getNewsCategories(): Promise<NewsCategory[]> {
  const data = await fetchApiList<ApiNewsCategory>("/api/v1/news-categories");
  if (!data || data.length === 0) {
    return [
      { id: "academics", name: "Academics", slug: "academics" },
      { id: "campus-life", name: "Campus Life", slug: "campus-life" },
      { id: "events", name: "Events", slug: "events" },
      { id: "student-life", name: "Student Life", slug: "student-life" },
    ];
  }

  return data.map((category) => mapCategory(category)!);
}

export async function getNewsList(options?: {
  category?: string;
  featured?: boolean;
}): Promise<NewsItem[]> {
  const data = await fetchApiList<ApiNewsItem>("/api/v1/news", {
    category: options?.category,
    featured: options?.featured ? "1" : undefined,
  });

  if (!data || data.length === 0) {
    return fallbackNewsItems();
  }

  return data.map((item, index) => mapNewsItem(item, index));
}

export async function getFeaturedNews(limit = 4): Promise<NewsItem[]> {
  const featured = await getNewsList({ featured: true });
  if (featured.length >= limit) {
    return featured.slice(0, limit);
  }

  const all = await getNewsList();
  return all.slice(0, limit);
}

export async function getNewsTickerItems(): Promise<NewsTickerItem[]> {
  const data = await fetchApiList<ApiNewsItem>("/api/v1/news/ticker");

  if (!data || data.length === 0) {
    return fallbackNewsItems()
      .slice(0, 4)
      .map((item) => ({ id: item.id, title: item.title, slug: item.slug }));
  }

  return data.map((item) => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
  }));
}

export async function getNewsBySlug(slug: string): Promise<NewsItem | null> {
  const data = await fetchApiItem<ApiNewsItem>(`/api/v1/news/${slug}`);
  if (!data) {
    const fallback = fallbackNewsItems().find((item) => item.slug === slug);
    return fallback ?? null;
  }

  return mapNewsItem(data);
}

export async function getAllNewsSlugs(): Promise<string[]> {
  const items = await getNewsList();
  return items.map((item) => item.slug).filter((slug) => !slug.startsWith("fallback-"));
}

export const NEWS_PAGE_LEAD =
  "Browse campus news, events, and achievements from Bapuji Institute of Hi-Tech Education.";
