import { images } from "@/lib/images";

export type GalleryLayout = "feature" | "accent" | "wide" | "standard";

export type GalleryItem = {
  id: string;
  title: string;
  category: string;
  image: string;
  layout: GalleryLayout;
};

/** Homepage gallery mosaic — uses existing campus imagery */
export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "campus-overview",
    title: "BIHE Campus Overview",
    category: "Campus",
    image: images.hero,
    layout: "feature",
  },
  {
    id: "campus-life",
    title: "Student Life at BIHE",
    category: "Campus",
    image: images.aboutMain,
    layout: "accent",
  },
  {
    id: "library",
    title: "Central Library",
    category: "Facilities",
    image: images.facility.library,
    layout: "wide",
  },
  {
    id: "annual-day",
    title: "Annual Day Celebrations",
    category: "Events",
    image: images.facility.auditorium,
    layout: "wide",
  },
  {
    id: "sports",
    title: "Sports & Recreation",
    category: "Sports",
    image: images.facility.sports,
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
