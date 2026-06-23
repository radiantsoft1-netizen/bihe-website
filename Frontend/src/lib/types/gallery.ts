import type { GalleryLayout } from "@/lib/gallery-content";

export type GalleryCategory = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
};

export type GalleryMediaItem = {
  id: string;
  type: "image" | "youtube";
  title: string;
  image?: string | null;
  previewUrl?: string | null;
  youtubeUrl?: string | null;
  youtubeId?: string | null;
  sortOrder: number;
};

export type GalleryAlbum = {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: GalleryCategory | null;
  coverImage: string;
  coverMediaId?: string | null;
  imageCount: number;
  isFeatured?: boolean;
  media?: GalleryMediaItem[];
};

export type GalleryAlbumCard = GalleryAlbum & {
  layout?: GalleryLayout;
};

/** @deprecated Legacy flat photo record — kept for transitional helpers */
export type GalleryPhotoFilterId = "campus" | "academics" | "events" | "sports" | "facilities";

export type GalleryPhotoRecord = {
  id: string;
  title: string;
  category: string;
  filterId: GalleryPhotoFilterId;
  details: string;
  imageUrl: string;
  published: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type GalleryDisplayItem = {
  id: string;
  slug: string;
  title: string;
  category: string;
  details: string;
  image: string;
  imageCount: number;
  layout: GalleryLayout;
  source: "dynamic" | "static";
};

export type GalleryDetailView = GalleryDisplayItem & {
  lead: string;
  paragraphs: string[];
  highlights: string[];
  media: GalleryMediaItem[];
  meta?: {
    date?: string;
    location?: string;
  };
};
