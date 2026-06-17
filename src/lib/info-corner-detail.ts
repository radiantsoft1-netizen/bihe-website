import { images } from "@/lib/images";
import type { InfoCornerItem } from "@/lib/info-corner-items-service";

const NOTICE_PREVIEW_IMAGE = "/images/circulars/notice-preview.jpg";

/** List pages show text-only cards; media is reserved for detail pages. */
export function stripInfoCornerListMedia(item: InfoCornerItem): InfoCornerItem {
  return {
    ...item,
    image: null,
    imageAlt: null,
    images: undefined,
  };
}

export function resolveInfoCornerDetailImage(item: InfoCornerItem): { src: string; alt: string } {
  if (item.image?.trim()) {
    return { src: item.image.trim(), alt: item.imageAlt ?? item.title };
  }

  const galleryImage = item.images?.find((entry) => entry.url?.trim());
  if (galleryImage?.url) {
    return { src: galleryImage.url, alt: galleryImage.alt ?? item.title };
  }

  if (item.pdf) {
    return {
      src: NOTICE_PREVIEW_IMAGE,
      alt: `${item.title} notice preview`,
    };
  }

  const categorySlug = item.category?.slug;
  if (categorySlug === "news-events-achievements") {
    return { src: images.news[0], alt: item.title };
  }

  if (categorySlug === "newsletters") {
    return { src: images.bcom, alt: item.title };
  }

  return { src: images.aboutBiheCampus, alt: item.title };
}

export function resolveInfoCornerViewerBadge(item: InfoCornerItem): string {
  return item.badgeLabel?.trim() || item.category?.name || "Official";
}
