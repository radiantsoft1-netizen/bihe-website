import "server-only";

import { fetchApiItem } from "@/lib/api/client";
import {
  SF_GALLERY_IMAGES,
  type SportsGalleryImage,
} from "@/lib/sports-facilities-content";

/** Laravel gallery album slug managed in Admin → Gallery */
export const SPORTS_GALLERY_ALBUM_SLUG = "sports-gallery";

type ApiSportsGalleryAlbum = {
  id: string;
  title: string;
  slug: string;
  media?: Array<{
    id: string;
    type: "image" | "youtube";
    title?: string | null;
    image?: string | null;
    previewUrl?: string | null;
    sortOrder?: number;
  }>;
};

function resolveGalleryImageSrc(
  media: NonNullable<ApiSportsGalleryAlbum["media"]>[number],
): string | null {
  const fallback = media.previewUrl ?? media.image;
  if (!fallback) {
    return null;
  }

  if (media.id) {
    return `/api/gallery/preview?mediaId=${encodeURIComponent(media.id)}`;
  }

  return fallback;
}

function mapAlbumMedia(
  media: NonNullable<ApiSportsGalleryAlbum["media"]>[number],
  index: number,
): SportsGalleryImage | null {
  if (media.type !== "image") {
    return null;
  }

  const src = resolveGalleryImageSrc(media);
  if (!src) {
    return null;
  }

  return {
    id: media.id || `sports-gallery-${index + 1}`,
    src,
    alt: media.title?.trim() || `Sports campus photo ${index + 1}`,
  };
}

export async function getSportsFacilitiesGalleryImages(): Promise<readonly SportsGalleryImage[]> {
  const data = await fetchApiItem<ApiSportsGalleryAlbum>(
    `/api/v1/gallery-albums/${SPORTS_GALLERY_ALBUM_SLUG}`,
  );

  if (!data?.media?.length) {
    return SF_GALLERY_IMAGES;
  }

  const images = data.media
    .slice()
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    .map(mapAlbumMedia)
    .filter((image): image is SportsGalleryImage => image !== null);

  return images.length > 0 ? images : SF_GALLERY_IMAGES;
}
