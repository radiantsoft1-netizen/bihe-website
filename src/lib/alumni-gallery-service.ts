import "server-only";

import { fetchApiItem } from "@/lib/api/client";
import alumniGalleryManifest from "@/lib/alumni-gallery.json";

/** Laravel gallery album slugs managed in Admin → Gallery */
export const ALUMNI_EVENTS_GALLERY_ALBUM_SLUG = "annual-events-celebrations";

export type AlumniGalleryImage = {
  id: string;
  src: string;
  alt: string;
  sectionId: string;
  sectionTitle: string;
};

export type AlumniGallerySection = {
  id: string;
  title: string;
  images: AlumniGalleryImage[];
};

export type AlumniGalleryImageDetail = {
  image: AlumniGalleryImage;
  paragraphs: readonly [string, string, string];
  remainingImages: AlumniGalleryImage[];
};

const ALUMNI_GALLERY_ALBUMS = [
  {
    slug: ALUMNI_EVENTS_GALLERY_ALBUM_SLUG,
    sectionId: "events",
    sectionTitle: "Alumni events & reunions",
  },
] as const;

const STATIC_ALUMNI_GALLERY = alumniGalleryManifest as AlumniGalleryImage[];

type ApiAlumniGalleryAlbum = {
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
  media: NonNullable<ApiAlumniGalleryAlbum["media"]>[number],
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
  media: NonNullable<ApiAlumniGalleryAlbum["media"]>[number],
  index: number,
  section: (typeof ALUMNI_GALLERY_ALBUMS)[number],
): AlumniGalleryImage | null {
  if (media.type !== "image") {
    return null;
  }

  const src = resolveGalleryImageSrc(media);
  if (!src) {
    return null;
  }

  return {
    id: media.id || `alumni-gallery-${section.sectionId}-${index + 1}`,
    src,
    alt: media.title?.trim() || `${section.sectionTitle} photo ${index + 1}`,
    sectionId: section.sectionId,
    sectionTitle: section.sectionTitle,
  };
}

function groupImagesIntoSections(images: readonly AlumniGalleryImage[]): AlumniGallerySection[] {
  const sectionOrder = ALUMNI_GALLERY_ALBUMS.map((album) => album.sectionId);
  const grouped = new Map<string, AlumniGallerySection>();

  for (const image of images) {
    const existing = grouped.get(image.sectionId);
    if (existing) {
      existing.images.push(image);
      continue;
    }

    grouped.set(image.sectionId, {
      id: image.sectionId,
      title: image.sectionTitle,
      images: [image],
    });
  }

  return sectionOrder
    .map((sectionId) => grouped.get(sectionId))
    .filter((section): section is AlumniGallerySection => Boolean(section?.images.length));
}

function getStaticAlumniGallerySections(): AlumniGallerySection[] {
  return groupImagesIntoSections(STATIC_ALUMNI_GALLERY);
}

export async function getAlumniGallerySections(): Promise<AlumniGallerySection[]> {
  const sections: AlumniGallerySection[] = [];

  for (const album of ALUMNI_GALLERY_ALBUMS) {
    const data = await fetchApiItem<ApiAlumniGalleryAlbum>(`/api/v1/gallery-albums/${album.slug}`);

    if (!data?.media?.length) {
      continue;
    }

    const images = data.media
      .slice()
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
      .map((media, index) => mapAlbumMedia(media, index, album))
      .filter((image): image is AlumniGalleryImage => image !== null);

    if (images.length > 0) {
      sections.push({
        id: album.sectionId,
        title: album.sectionTitle,
        images,
      });
    }
  }

  return sections.length > 0 ? sections : getStaticAlumniGallerySections();
}

function getAlumniGalleryImageParagraphs(image: AlumniGalleryImage): readonly [string, string, string] {
  return [
    `This photograph from ${image.sectionTitle} captures a memorable moment shared by BIHE alumni, faculty, and guests on campus.`,
    `${image.alt} reflects the fellowship, celebration, and lifelong connection within the BIHE alumni community.`,
    "Browse the gallery below to explore more reunions, gatherings, and campus memories from recent alumni events.",
  ];
}

export async function getAllAlumniGalleryImageIds(): Promise<string[]> {
  const sections = await getAlumniGallerySections();
  return sections.flatMap((section) => section.images.map((image) => image.id));
}

export async function getAlumniGalleryImageDetail(
  imageId: string,
): Promise<AlumniGalleryImageDetail | null> {
  const sections = await getAlumniGallerySections();

  for (const section of sections) {
    const index = section.images.findIndex((image) => image.id === imageId);
    if (index === -1) {
      continue;
    }

    const image = section.images[index];
    const remainingImages = section.images.filter((item) => item.id !== imageId);

    return {
      image,
      paragraphs: getAlumniGalleryImageParagraphs(image),
      remainingImages,
    };
  }

  return null;
}
