import "server-only";

import fs from "node:fs";
import path from "node:path";
import type { GalleryMediaItem } from "@/lib/types/gallery";

const IMAGE_RE = /\.(jpe?g|png|webp)$/i;
const LIMIT = 15;

function galleryDir(slug: string): string {
  return path.join(process.cwd(), "public", "images", "gallery", slug);
}

export function listLocalGalleryImageFiles(slug: string): string[] {
  const dir = galleryDir(slug);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => IMAGE_RE.test(file))
    .sort()
    .slice(0, LIMIT);
}

export function localGalleryCoverPath(slug: string): string | null {
  const files = listLocalGalleryImageFiles(slug);
  if (files.length === 0) return null;
  return `/images/gallery/${slug}/${files[0]}`;
}

export function localGalleryMediaItems(slug: string, title: string): GalleryMediaItem[] {
  return listLocalGalleryImageFiles(slug).map((file, index) => {
    const url = `/images/gallery/${slug}/${file}`;
    return {
      id: `${slug}-${index + 1}`,
      type: "image",
      title: `${title} photo ${index + 1}`,
      image: url,
      previewUrl: url,
      sortOrder: index,
    };
  });
}

export function localGalleryImageCount(slug: string): number {
  return listLocalGalleryImageFiles(slug).length;
}
