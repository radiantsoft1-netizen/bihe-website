import "server-only";

import { fetchApiItem, fetchApiList } from "@/lib/api/client";
import { images } from "@/lib/images";
import {
  MEGA_PLACEMENT_DRIVE_INTRO,
  MEGA_PLACEMENT_DRIVE_PAGE_LEAD,
  MEGA_PLACEMENT_DRIVE_SHOWCASES,
} from "@/lib/mega-placement-drive-content";
import { PLACEMENT_CELL_PATH } from "@/lib/placement-routes";
import type { StudentLifePageRefCard } from "@/lib/student-life-pages/types";

export type PlacementDriveGalleryImage = {
  src: string;
  alt: string;
  fit?: "cover" | "contain";
  caption?: string;
};

export type PlacementDriveCard = {
  id: string;
  slug: string;
  title: string;
  eyebrow?: string;
  description?: string;
  dateLabel?: string;
  yearLabel?: string;
  href: string;
  image?: string;
  imageAlt?: string;
};

export type PlacementDriveDetail = PlacementDriveCard & {
  heroLead: string;
  introParagraphs: string[];
  section2Title?: string;
  section2Paragraphs: string[];
  galleryImages: PlacementDriveGalleryImage[];
};

type ApiPlacementDriveListItem = {
  id: string;
  slug: string;
  title: string;
  eyebrow?: string | null;
  description?: string | null;
  heroLead?: string | null;
  eventDate?: string | null;
  dateLabel?: string | null;
  yearLabel?: string | null;
  href?: string | null;
  cardImage?: string | null;
  cardImageAlt?: string | null;
};

type ApiPlacementDriveDetail = ApiPlacementDriveListItem & {
  introParagraphs?: string[] | null;
  section2Title?: string | null;
  section2Paragraphs?: string[] | null;
  galleryImages?: Array<{ src?: string | null; alt?: string | null }> | null;
};

const FALLBACK_GALLERY_IMAGES: PlacementDriveGalleryImage[] = [
  {
    src: images.megaPlacementDrive.hrInterview,
    alt: "HR interview session during the BIHE Mega Placement Drive 2025",
    caption: "HR Interview Process",
  },
  {
    src: images.megaPlacementDrive.inauguralCeremony,
    alt: "Lamp lighting ceremony at the BIHE Mega Placement Drive 2025 inaugural function",
    caption: "Inaugural Ceremony",
  },
  {
    src: images.megaPlacementDrive.companyHrInterviews,
    alt: "Company HR representatives briefing students during the BIHE Mega Placement Drive 2025",
    caption: "Company HR Interviews",
  },
  {
    src: images.megaPlacementDrive.offerLettersBanner,
    alt: "Students receiving offer letters during the Mega Placement Drive at BIHE",
    caption: "Offer Letters",
  },
];

const FALLBACK_DRIVES: Record<string, PlacementDriveDetail> = {
  "mega-placement-drive-2025": {
    id: "mega-placement-drive-2025",
    slug: "mega-placement-drive-2025",
    title: MEGA_PLACEMENT_DRIVE_INTRO.title,
    eyebrow: "Campus to Corporate · Batch 1",
    description: "26th September 2025 · BIHE Campus, Davangere",
    dateLabel: "26 SEP",
    yearLabel: "2025",
    href: `${PLACEMENT_CELL_PATH}/mega-placement-drive-2025`,
    heroLead: MEGA_PLACEMENT_DRIVE_PAGE_LEAD,
    introParagraphs: [...MEGA_PLACEMENT_DRIVE_INTRO.paragraphs],
    section2Title: MEGA_PLACEMENT_DRIVE_SHOWCASES[0]?.title.lead ?? "Event Highlights",
    section2Paragraphs: MEGA_PLACEMENT_DRIVE_SHOWCASES[0]?.paragraphs?.map((entry) => entry.text) ?? [],
    galleryImages: FALLBACK_GALLERY_IMAGES,
  },
};

function driveHref(slug: string, href?: string | null) {
  return href ?? `${PLACEMENT_CELL_PATH}/${slug}`;
}

function mapCard(item: ApiPlacementDriveListItem): PlacementDriveCard {
  const fallback = FALLBACK_DRIVES[item.slug];

  return {
    id: item.slug,
    slug: item.slug,
    title: item.title,
    eyebrow: item.eyebrow ?? undefined,
    description: item.description ?? undefined,
    dateLabel: item.dateLabel ?? undefined,
    yearLabel: item.yearLabel ?? undefined,
    href: driveHref(item.slug, item.href),
    image: item.cardImage ?? fallback?.galleryImages[0]?.src,
    imageAlt: item.cardImageAlt ?? fallback?.galleryImages[0]?.alt ?? item.title,
  };
}

function mapDetail(item: ApiPlacementDriveDetail): PlacementDriveDetail {
  const fallback = FALLBACK_DRIVES[item.slug];
  const galleryImages =
    item.galleryImages && item.galleryImages.length > 0
      ? item.galleryImages
          .filter((image) => image.src)
          .map((image, index) => ({
            src: image.src as string,
            alt: image.alt ?? fallback?.galleryImages[index]?.alt ?? item.title,
            caption: fallback?.galleryImages[index]?.caption,
          }))
      : (fallback?.galleryImages ?? []);

  const introParagraphs =
    item.introParagraphs && item.introParagraphs.length > 0
      ? item.introParagraphs
      : (fallback?.introParagraphs ?? []);

  const section2Paragraphs =
    item.section2Paragraphs && item.section2Paragraphs.length > 0
      ? item.section2Paragraphs
      : (fallback?.section2Paragraphs ?? []);

  return {
    id: item.slug,
    slug: item.slug,
    title: item.title,
    eyebrow: item.eyebrow ?? fallback?.eyebrow,
    description: item.description ?? fallback?.description,
    dateLabel: item.dateLabel ?? fallback?.dateLabel,
    yearLabel: item.yearLabel ?? fallback?.yearLabel,
    href: driveHref(item.slug, item.href),
    heroLead: item.heroLead ?? fallback?.heroLead ?? item.description ?? item.title,
    introParagraphs,
    section2Title: item.section2Title ?? fallback?.section2Title,
    section2Paragraphs,
    galleryImages,
  };
}

export function mapPlacementDriveToRefCard(
  drive: PlacementDriveCard & { galleryImages?: readonly PlacementDriveGalleryImage[] },
): StudentLifePageRefCard {
  return {
    id: drive.slug,
    title: drive.title,
    eyebrow: drive.eyebrow,
    description: drive.description,
    dateLabel: drive.dateLabel,
    yearLabel: drive.yearLabel,
    href: drive.href,
  };
}

export async function getPlacementDriveCards(): Promise<StudentLifePageRefCard[]> {
  const data = await fetchApiList<ApiPlacementDriveListItem>("/api/v1/placement-drives");

  if (!data || data.length === 0) {
    return Object.values(FALLBACK_DRIVES).map(mapPlacementDriveToRefCard);
  }

  return data.map((item) => mapPlacementDriveToRefCard(mapCard(item)));
}

export async function getRelatedPlacementDriveCards(
  excludeSlug: string,
): Promise<StudentLifePageRefCard[]> {
  const cards = await getPlacementDriveCards();
  const related = cards.filter((card) => card.id !== excludeSlug);

  return related.length > 0 ? related : cards;
}

export async function getPlacementDriveBySlug(slug: string): Promise<PlacementDriveDetail | null> {
  const data = await fetchApiItem<ApiPlacementDriveDetail>(`/api/v1/placement-drives/${slug}`);

  if (!data) {
    return FALLBACK_DRIVES[slug] ?? null;
  }

  return mapDetail(data);
}

export async function getAllPlacementDriveSlugs(): Promise<string[]> {
  const data = await fetchApiList<ApiPlacementDriveListItem>("/api/v1/placement-drives");

  if (!data || data.length === 0) {
    return Object.keys(FALLBACK_DRIVES);
  }

  return data.map((item) => item.slug);
}
