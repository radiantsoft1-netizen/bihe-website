import "server-only";

import { fetchApiItem, fetchApiList } from "@/lib/api/client";
import { GALLERY_ITEMS, type GalleryLayout } from "@/lib/gallery-content";
import { DROPBOX_GALLERY_ALBUMS } from "@/lib/gallery-dropbox-albums";
import {
  localGalleryCoverPath,
  localGalleryImageCount,
  localGalleryMediaItems,
} from "@/lib/gallery-local-images";
import type {
  GalleryAlbum,
  GalleryAlbumCard,
  GalleryCategory,
  GalleryDetailView,
  GalleryDisplayItem,
  GalleryMediaItem,
} from "@/lib/types/gallery";

type ApiGalleryCategory = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
};

type ApiGalleryAlbum = {
  id: string;
  title: string;
  slug: string;
  description?: string | null;
  category?: ApiGalleryCategory | null;
  coverImage?: string | null;
  coverMediaId?: string | null;
  imageCount?: number;
  isFeatured?: boolean;
  media?: Array<{
    id: string;
    type: "image" | "youtube";
    title?: string | null;
    image?: string | null;
    previewUrl?: string | null;
    youtubeUrl?: string | null;
    youtubeId?: string | null;
    sortOrder?: number;
  }>;
};

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

function protectedPreviewUrl(mediaId?: string | null, previewUrl?: string | null): string | null {
  if (!mediaId) return previewUrl ?? null;
  return `/api/gallery/preview?mediaId=${encodeURIComponent(mediaId)}`;
}

function mapCategory(category?: ApiGalleryCategory | null): GalleryCategory | null {
  if (!category) return null;
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description,
  };
}

function mapMedia(media: NonNullable<ApiGalleryAlbum["media"]>[number]): GalleryMediaItem {
  return {
    id: media.id,
    type: media.type,
    title: media.title ?? (media.type === "youtube" ? "Video" : "Photo"),
    image: media.image,
    previewUrl: protectedPreviewUrl(media.id, media.previewUrl ?? media.image),
    youtubeUrl: media.youtubeUrl,
    youtubeId: media.youtubeId,
    sortOrder: media.sortOrder ?? 0,
  };
}

function mapAlbum(item: ApiGalleryAlbum, index = 0): GalleryAlbum {
  const dropboxFallback = DROPBOX_GALLERY_ALBUMS.find((album) => album.slug === item.slug);
  const legacyFallback = GALLERY_ITEMS[index];
  const localCover = localGalleryCoverPath(item.slug);

  return {
    id: item.id,
    title: item.title,
    slug: item.slug,
    description: item.description ?? dropboxFallback?.description ?? "",
    category: mapCategory(item.category) ?? (dropboxFallback
      ? {
          id: dropboxFallback.categorySlug,
          name: dropboxFallback.categoryName,
          slug: dropboxFallback.categorySlug,
        }
      : null),
    coverImage: item.coverImage ?? localCover ?? legacyFallback?.image ?? "",
    coverMediaId: item.coverMediaId,
    imageCount:
      item.imageCount ??
      item.media?.filter((entry) => entry.type === "image").length ??
      localGalleryImageCount(item.slug),
    isFeatured: item.isFeatured,
    media:
      item.media && item.media.length > 0
        ? item.media.map(mapMedia)
        : localGalleryMediaItems(item.slug, item.title),
  };
}

function fallbackAlbums(): GalleryAlbum[] {
  return DROPBOX_GALLERY_ALBUMS.map((album, index) => {
    const cover = localGalleryCoverPath(album.slug) ?? GALLERY_ITEMS[index]?.image ?? "";
    const media = localGalleryMediaItems(album.slug, album.title);

    return {
      id: `local-${album.slug}`,
      title: album.title,
      slug: album.slug,
      description: album.description,
      category: {
        id: album.categorySlug,
        name: album.categoryName,
        slug: album.categorySlug,
      },
      coverImage: cover,
      imageCount: media.length,
      isFeatured: album.featured,
      media,
    };
  }).filter((album) => album.coverImage);
}

export async function getGalleryCategories(): Promise<GalleryCategory[]> {
  const data = await fetchApiList<ApiGalleryCategory>("/api/v1/gallery-categories");
  if (!data || data.length === 0) {
    return [
      { id: "campus", name: "Campus Life", slug: "campus" },
      { id: "academics", name: "Academics", slug: "academics" },
      { id: "events", name: "Events & Festivals", slug: "events" },
      { id: "facilities", name: "Facilities", slug: "facilities" },
      { id: "sports", name: "Sports & Recreation", slug: "sports" },
    ];
  }

  return data.map((category) => mapCategory(category)!);
}

const MAIN_GALLERY_EXCLUDED_SLUGS = new Set(["sports-gallery"]);

export async function getGalleryAlbums(options?: {
  featured?: boolean;
  includeCarouselOnly?: boolean;
}): Promise<GalleryAlbum[]> {
  const data = await fetchApiList<ApiGalleryAlbum>("/api/v1/gallery-albums", {
    featured: options?.featured ? "1" : undefined,
  });

  if (!data || data.length === 0) {
    return fallbackAlbums();
  }

  const albums = data.map((item, index) => mapAlbum(item, index));

  if (options?.includeCarouselOnly) {
    return albums;
  }

  return albums.filter((album) => !MAIN_GALLERY_EXCLUDED_SLUGS.has(album.slug));
}

export async function getFeaturedGalleryAlbums(limit = 5): Promise<GalleryAlbumCard[]> {
  const featured = await getGalleryAlbums({ featured: true });
  const albums = (featured.length > 0 ? featured : await getGalleryAlbums()).slice(0, limit);

  return albums.map((album, index) => ({
    ...album,
    layout:
      DROPBOX_GALLERY_ALBUMS.find((entry) => entry.slug === album.slug)?.layout ??
      GALLERY_ITEMS[index]?.layout ??
      layoutForIndex(index),
  }));
}

export async function getGalleryAlbumBySlug(slug: string): Promise<GalleryAlbum | null> {
  const data = await fetchApiItem<ApiGalleryAlbum>(`/api/v1/gallery-albums/${slug}`);
  if (!data) {
    const fallback = fallbackAlbums().find((album) => album.slug === slug);
    return fallback ?? null;
  }

  return mapAlbum(data);
}

export async function getAllGallerySlugs(): Promise<string[]> {
  const albums = await getGalleryAlbums();
  return albums.map((album) => album.slug).filter((slug) => !slug.startsWith("local-"));
}

export type { GalleryDetailView } from "@/lib/types/gallery";

export async function getGalleryDisplayItems(): Promise<GalleryDisplayItem[]> {
  const albums = await getGalleryAlbums();

  return albums.map((album, index) => ({
    id: album.slug,
    slug: album.slug,
    title: album.title,
    category: album.category?.name ?? "Gallery",
    details: album.description,
    image: album.coverImage,
    imageCount: album.imageCount,
    layout: layoutForIndex(index),
    source: album.id.startsWith("local-") ? "static" : "dynamic",
  }));
}

export async function getGalleryDetailBySlug(slug: string): Promise<GalleryDetailView | null> {
  const album = await getGalleryAlbumBySlug(slug);
  if (!album) return null;

  const paragraphs = album.description
    ? album.description.split(/\n{2,}/).map((part) => part.trim()).filter(Boolean)
    : [];

  return {
    id: album.slug,
    slug: album.slug,
    title: album.title,
    category: album.category?.name ?? "Gallery",
    details: album.description,
    image: album.coverImage,
    imageCount: album.imageCount,
    layout: "feature",
    source: album.id.startsWith("local-") ? "static" : "dynamic",
    lead: album.description || `Explore photos and videos from ${album.title}.`,
    paragraphs: paragraphs.length > 0 ? paragraphs : [album.description || `Explore photos and videos from ${album.title}.`],
    highlights: [],
    media: album.media ?? [],
  };
}

/** @deprecated Use slug-based helpers */
export async function getGalleryDetailById(id: string): Promise<GalleryDetailView | null> {
  return getGalleryDetailBySlug(id);
}

/** @deprecated Use getAllGallerySlugs */
export async function getAllGalleryIds(): Promise<string[]> {
  return getAllGallerySlugs();
}
