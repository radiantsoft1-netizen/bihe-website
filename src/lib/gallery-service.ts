import "server-only";

import { GALLERY_ITEMS } from "@/lib/gallery-content";
import type { GalleryLayout } from "@/lib/gallery-content";
import type { GalleryDisplayItem } from "@/lib/gallery-display";
import { getGalleryDetailContent } from "@/lib/gallery-detail-content";
import { getPublishedGalleryRecords } from "@/lib/gallery-store";
import type { GalleryPhotoFilterId } from "@/lib/types/gallery";

const MOSAIC_LAYOUTS: readonly GalleryLayout[] = [
  "feature",
  "accent",
  "wide",
  "wide",
  "wide",
  "standard",
  "standard",
  "standard",
];

function layoutForIndex(index: number): GalleryLayout {
  return MOSAIC_LAYOUTS[index % MOSAIC_LAYOUTS.length];
}

function categoryToFilterId(category: string): GalleryPhotoFilterId {
  const normalized = category.toLowerCase();

  if (normalized.includes("academic") || normalized.includes("career")) return "academics";
  if (normalized.includes("event")) return "events";
  if (normalized.includes("sport")) return "sports";
  if (normalized.includes("facilit")) return "facilities";
  return "campus";
}

export type GalleryDetailView = GalleryDisplayItem & {
  lead: string;
  paragraphs: string[];
  highlights: string[];
  meta?: {
    date?: string;
    location?: string;
  };
};

export type { GalleryDisplayItem } from "@/lib/gallery-display";

export async function getGalleryDisplayItems(): Promise<GalleryDisplayItem[]> {
  const records = await getPublishedGalleryRecords();

  return records.map((record, index) => ({
    id: record.id,
    title: record.title,
    category: record.category,
    filterId: record.filterId as GalleryPhotoFilterId,
    details: record.details,
    image: record.imageUrl,
    layout: layoutForIndex(index),
    source: "dynamic" as const,
  }));
}

export async function getAllGalleryIds(): Promise<string[]> {
  const items = await getGalleryDisplayItems();
  const homepageIds = GALLERY_ITEMS.map((item) => item.id);
  return [...new Set([...items.map((item) => item.id), ...homepageIds])];
}

async function findGalleryItem(id: string): Promise<GalleryDisplayItem | null> {
  const items = await getGalleryDisplayItems();
  const match = items.find((item) => item.id === id);
  if (match) return match;

  const homepageItem = GALLERY_ITEMS.find((item) => item.id === id);
  if (!homepageItem) return null;

  return {
    id: homepageItem.id,
    title: homepageItem.title,
    category: homepageItem.category,
    filterId: categoryToFilterId(homepageItem.category),
    details: "",
    image: homepageItem.image,
    layout: homepageItem.layout,
    source: "static",
  };
}

export async function getGalleryDetailById(id: string): Promise<GalleryDetailView | null> {
  const item = await findGalleryItem(id);
  if (!item) return null;

  const content = getGalleryDetailContent(item.id, item.title, item.category, item.filterId);

  return {
    ...item,
    ...content,
    details: item.details || content.paragraphs[0] || content.lead,
  };
}

export async function getRelatedGalleryItems(
  id: string,
  limit = 4,
): Promise<GalleryDisplayItem[]> {
  const current = await findGalleryItem(id);
  if (!current) return [];

  const items = await getGalleryDisplayItems();

  return items
    .filter((item) => item.id !== id && item.filterId === current.filterId)
    .slice(0, limit);
}
