import "server-only";

/**
 * Homepage API fetchers — dynamic sections only.
 * About, principal message, statistics, courses, and other informational
 * content remain static in their component / lib/*-content.ts files.
 */

import { fetchApiList } from "@/lib/api/client";
import {
  FALLBACK_ANNOUNCEMENTS,
  FALLBACK_GALLERY_ITEMS,
  FALLBACK_GALLERY_TAG_STATS,
  FALLBACK_HERO_IMAGE,
  FALLBACK_HERO_SLIDES,
  FALLBACK_NEWS_EVENTS,
  FALLBACK_RECRUITING_PARTNERS,
} from "@/lib/homepage-fallbacks";
import { images } from "@/lib/images";
import type {
  AnnouncementItem,
  GalleryTagStat,
  HeroSlide,
  HomepageGalleryItem,
  NewsEventItem,
  RecruitingPartnerItem,
} from "@/lib/types/content";

type ApiHeroBanner = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  image?: string | null;
};

type ApiAnnouncement = {
  id: string;
  message: string;
  link?: string | null;
};

type ApiNewsEvent = {
  id: string;
  title: string;
  slug?: string;
  date?: string | null;
  image?: string | null;
  summary?: string | null;
};

type ApiGalleryItem = {
  id: string;
  title: string;
  category: string;
  image?: string | null;
};

type ApiRecruitingPartner = {
  id: string;
  name: string;
  logo?: string | null;
};

function withFallback<T>(items: T[] | null | undefined, fallback: T[]): T[] {
  return items && items.length > 0 ? items : fallback;
}

export async function getHeroSlides(): Promise<HeroSlide[]> {
  const data = await fetchApiList<ApiHeroBanner>("/api/v1/hero-banners");

  return withFallback(
    data?.map((item) => ({
      id: item.id,
      eyebrow: item.eyebrow,
      title: item.title,
      subtitle: item.subtitle,
      image: item.image,
    })),
    FALLBACK_HERO_SLIDES,
  );
}

export async function getHeroBackgroundImage(slides: HeroSlide[]): Promise<string> {
  return slides.find((slide) => slide.image)?.image ?? FALLBACK_HERO_IMAGE;
}

export async function getAnnouncements(): Promise<AnnouncementItem[]> {
  const data = await fetchApiList<ApiAnnouncement>("/api/v1/announcements");

  return withFallback(
    data?.map((item) => ({
      id: item.id,
      message: item.message,
      link: item.link,
    })),
    FALLBACK_ANNOUNCEMENTS,
  );
}

/** @deprecated Use getFeaturedNews() from @/lib/news-service */
export async function getNewsEvents(limit = 4): Promise<NewsEventItem[]> {
  const { getFeaturedNews } = await import("@/lib/news-service");
  const items = await getFeaturedNews(limit);

  return items.map((item) => ({
    id: item.id,
    title: item.title,
    tag: item.tag,
    date: item.date,
    image: item.image,
    slug: item.slug,
  }));
}

function layoutForIndex(index: number): HomepageGalleryItem["layout"] {
  const layouts: HomepageGalleryItem["layout"][] = [
    "feature",
    "accent",
    "wide",
    "wide",
    "wide",
  ];
  return layouts[index % layouts.length];
}

function buildGalleryTagStats(items: HomepageGalleryItem[]): GalleryTagStat[] {
  const labels: Array<{ label: string; match: (category: string) => boolean }> = [
    { label: "Campus Life", match: (category) => category.toLowerCase().includes("campus") },
    { label: "Academics", match: (category) => category.toLowerCase().includes("academic") },
    { label: "Events & Festivals", match: (category) => category.toLowerCase().includes("event") },
    { label: "Sports & Recreation", match: (category) => category.toLowerCase().includes("sport") },
  ];

  return labels.map(({ label, match }) => ({
    label,
    count: items.filter((item) => match(item.category)).length,
  }));
}

export async function getHomepageGallery(): Promise<{
  items: HomepageGalleryItem[];
  tagStats: GalleryTagStat[];
}> {
  const data = await fetchApiList<ApiGalleryItem>("/api/v1/gallery", { featured: "1" });

  if (!data || data.length === 0) {
    return {
      items: FALLBACK_GALLERY_ITEMS,
      tagStats: [...FALLBACK_GALLERY_TAG_STATS],
    };
  }

  const items = data.slice(0, 5).map((item, index) => ({
    id: item.id,
    title: item.title,
    category: item.category,
    image: item.image ?? FALLBACK_GALLERY_ITEMS[index]?.image ?? images.hero,
    layout: FALLBACK_GALLERY_ITEMS[index]?.layout ?? layoutForIndex(index),
  }));

  const tagStats = buildGalleryTagStats(items);
  const hasTaggedItems = tagStats.some((tag) => tag.count > 0);

  return {
    items,
    tagStats: hasTaggedItems ? tagStats : [...FALLBACK_GALLERY_TAG_STATS],
  };
}

export async function getRecruitingPartners(): Promise<RecruitingPartnerItem[]> {
  const data = await fetchApiList<ApiRecruitingPartner>("/api/v1/recruiting-partners");

  return withFallback(
    data?.map((item, index) => ({
      id: item.id,
      name: item.name,
      logo: item.logo ?? FALLBACK_RECRUITING_PARTNERS[index]?.logo ?? images.recruiters[0],
    })),
    FALLBACK_RECRUITING_PARTNERS,
  );
}
