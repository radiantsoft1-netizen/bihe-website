import { images } from "@/lib/images";
import { dropboxGalleryCoverPath, DROPBOX_GALLERY_ALBUMS } from "@/lib/gallery-dropbox-albums";
import type { GalleryItem, GalleryLayout } from "@/lib/gallery-content";

export const GALLERY_PAGE_LEAD =
  "Explore campus life, academic spaces, celebrations, sports, and student experiences at Bapuji Institute of Hi-Tech Education, Davangere.";

export type GalleryFilterId =
  | "all"
  | "campus"
  | "academics"
  | "events"
  | "sports"
  | "facilities";

export type GalleryPageItem = GalleryItem & {
  filterId: Exclude<GalleryFilterId, "all">;
};

export const GALLERY_FILTERS: readonly { id: GalleryFilterId; label: string }[] = [
  { id: "all", label: "All Photos" },
  { id: "campus", label: "Campus Life" },
  { id: "academics", label: "Academics" },
  { id: "events", label: "Events & Festivals" },
  { id: "sports", label: "Sports & Recreation" },
  { id: "facilities", label: "Facilities" },
] as const;

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

function withLayouts(items: Omit<GalleryPageItem, "layout">[]): GalleryPageItem[] {
  return items.map((item, index) => ({
    ...item,
    layout: MOSAIC_LAYOUTS[index % MOSAIC_LAYOUTS.length],
  }));
}

const GALLERY_PAGE_ITEMS_BASE: Omit<GalleryPageItem, "layout">[] = [
  ...DROPBOX_GALLERY_ALBUMS.map((album) => ({
    id: album.slug,
    title: album.title,
    category: album.categoryName,
    filterId: album.categorySlug,
    image: dropboxGalleryCoverPath(album.slug),
  })),
  {
    id: "lake-view-campus",
    title: "Lake View Campus",
    category: "Campus",
    filterId: "campus",
    image: images.internationalStudentsHostelFacilities,
  },
  {
    id: "library-reading",
    title: "Library Reading Hall",
    category: "Facilities",
    filterId: "facilities",
    image: images.libraryGallery.readingHall,
  },
  {
    id: "library-group-study",
    title: "Group Study Area",
    category: "Facilities",
    filterId: "facilities",
    image: images.libraryGallery.groupStudy,
  },
  {
    id: "library-bookshelves",
    title: "Central Library Collection",
    category: "Facilities",
    filterId: "facilities",
    image: images.libraryGallery.bookshelves,
  },
  {
    id: "computer-lab",
    title: "Computer Laboratories",
    category: "Academics",
    filterId: "academics",
    image: images.bcaLab,
  },
  {
    id: "lab-facilities",
    title: "Practical Training Labs",
    category: "Academics",
    filterId: "academics",
    image: images.internationalStudentsLabFacilities,
  },
  {
    id: "crf-computer-lab",
    title: "Research Computer Lab",
    category: "Academics",
    filterId: "academics",
    image: images.crfComputerLaboratories,
  },
  {
    id: "annual-day",
    title: "Annual Day Celebrations",
    category: "Events",
    filterId: "events",
    image: images.facility.auditorium,
  },
  {
    id: "cultural-fest",
    title: "Cultural Festivals",
    category: "Events",
    filterId: "events",
    image: images.news[1],
  },
  {
    id: "graduation-day",
    title: "Graduation Day",
    category: "Events",
    filterId: "events",
    image: images.news[0],
  },
  {
    id: "ethnic-day",
    title: "Ethnic Day Celebrations",
    category: "Events",
    filterId: "events",
    image: images.news[2],
  },
  {
    id: "placement-drive",
    title: "Mega Placement Drive 2025",
    category: "Events",
    filterId: "events",
    image: images.megaPlacementDrive.inauguralCeremony,
  },
  {
    id: "nss-tree-planting",
    title: "NSS Tree Plantation Drive",
    category: "Events",
    filterId: "events",
    image: images.nssDetails.gallery1,
  },
  {
    id: "nss-eye-camp",
    title: "NSS Eye Check-up Camp",
    category: "Events",
    filterId: "events",
    image: images.nssDetails.gallery2,
  },
  {
    id: "nss-swachh",
    title: "NSS Swachh Abhiyan",
    category: "Events",
    filterId: "events",
    image: images.nssDetails.gallery3,
  },
  {
    id: "sports",
    title: "Sports & Recreation",
    category: "Sports",
    filterId: "sports",
    image: images.facility.sports,
  },
  {
    id: "extracurricular",
    title: "Extracurricular Activities",
    category: "Sports",
    filterId: "sports",
    image: images.facility.extracurricular,
  },
  {
    id: "hostel",
    title: "Hostel Accommodation",
    category: "Facilities",
    filterId: "facilities",
    image: images.studentLife.hostel1,
  },
  {
    id: "canteen",
    title: "Campus Canteen",
    category: "Facilities",
    filterId: "facilities",
    image: images.facility.canteen,
  },
  {
    id: "auditorium",
    title: "Auditorium",
    category: "Facilities",
    filterId: "facilities",
    image: images.facility.auditorium,
  },
  {
    id: "placement-training",
    title: "Training & Placement",
    category: "Academics",
    filterId: "academics",
    image: images.facility.placement,
  },
  {
    id: "health-awareness",
    title: "Health Awareness Programme",
    category: "Campus",
    filterId: "campus",
    image: images.healthFacilities.healthAwarenessCamp,
  },
];

export const GALLERY_PAGE_ITEMS: GalleryPageItem[] = withLayouts(GALLERY_PAGE_ITEMS_BASE);

export function getGalleryFilterCount(filterId: GalleryFilterId): number {
  if (filterId === "all") return GALLERY_PAGE_ITEMS.length;
  return GALLERY_PAGE_ITEMS.filter((item) => item.filterId === filterId).length;
}
