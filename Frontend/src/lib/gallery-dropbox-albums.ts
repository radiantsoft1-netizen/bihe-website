import type { GalleryLayout } from "@/lib/gallery-content";

export type DropboxGalleryAlbum = {
  slug: string;
  title: string;
  description: string;
  categoryName: string;
  categorySlug: "campus" | "academics" | "events" | "facilities" | "sports";
  featured: boolean;
  layout: GalleryLayout;
};

export const DROPBOX_GALLERY_ALBUMS: readonly DropboxGalleryAlbum[] = [
  {
    slug: "inter-college-sports-meet",
    title: "Inter-College Sports Meet",
    description: "Highlights from inter-college sports tournaments and campus athletics.",
    categoryName: "Sports & Recreation",
    categorySlug: "sports",
    featured: true,
    layout: "feature",
  },
  {
    slug: "basketball-championship",
    title: "Basketball Championship",
    description: "Action from BIHE basketball matches and championship events.",
    categoryName: "Sports & Recreation",
    categorySlug: "sports",
    featured: true,
    layout: "accent",
  },
  {
    slug: "annual-events-celebrations",
    title: "Events & Celebrations",
    description: "Annual day, cultural programmes, and festive celebrations on campus.",
    categoryName: "Events & Festivals",
    categorySlug: "events",
    featured: true,
    layout: "wide",
  },
  {
    slug: "campus-facilities",
    title: "Campus Facilities",
    description: "Canteen, library, hostel, and essential infrastructure across BIHE.",
    categoryName: "Facilities",
    categorySlug: "facilities",
    featured: true,
    layout: "wide",
  },
  {
    slug: "campus-life-moments",
    title: "Campus Life",
    description: "Everyday student life, gatherings, and memorable campus moments.",
    categoryName: "Campus Life",
    categorySlug: "campus",
    featured: true,
    layout: "standard",
  },
] as const;

export function dropboxGalleryCoverPath(slug: string): string {
  return `/images/gallery/${slug}/01.jpg`;
}
