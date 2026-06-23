import { dropboxGalleryCoverPath, DROPBOX_GALLERY_ALBUMS } from "@/lib/gallery-dropbox-albums";

export type GalleryLayout = "feature" | "accent" | "wide" | "standard";

export type GalleryItem = {
  id: string;
  title: string;
  category: string;
  image: string;
  layout: GalleryLayout;
};

/** Homepage gallery mosaic — Dropbox album covers with static fallback */
export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "inter-college-sports-meet",
    title: "Inter-College Sports Meet",
    category: "Sports",
    image: dropboxGalleryCoverPath("inter-college-sports-meet"),
    layout: "feature",
  },
  {
    id: "basketball-championship",
    title: "Basketball Championship",
    category: "Sports",
    image: dropboxGalleryCoverPath("basketball-championship"),
    layout: "accent",
  },
  {
    id: "annual-events-celebrations",
    title: "Events & Celebrations",
    category: "Events",
    image: dropboxGalleryCoverPath("annual-events-celebrations"),
    layout: "wide",
  },
  {
    id: "campus-facilities",
    title: "Campus Facilities",
    category: "Facilities",
    image: dropboxGalleryCoverPath("campus-facilities"),
    layout: "wide",
  },
  {
    id: "campus-life-moments",
    title: "Campus Life",
    category: "Campus",
    image: dropboxGalleryCoverPath("campus-life-moments"),
    layout: "wide",
  },
];

export const GALLERY_CATEGORIES = [
  "Campus Life",
  "Academics",
  "Events & Festivals",
  "Sports & Recreation",
] as const;

/** Filter-chip stats — inspired by tagged gallery / count-badge patterns */
export const GALLERY_TAG_STATS = [
  {
    label: "Campus Life",
    count: GALLERY_ITEMS.filter((item) => item.category === "Campus").length,
  },
  {
    label: "Academics",
    count: GALLERY_ITEMS.filter((item) => item.category === "Academics").length,
  },
  {
    label: "Events & Festivals",
    count: GALLERY_ITEMS.filter((item) => item.category === "Events").length,
  },
  {
    label: "Sports & Recreation",
    count: GALLERY_ITEMS.filter((item) => item.category === "Sports").length,
  },
] as const;
