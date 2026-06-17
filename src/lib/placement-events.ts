import { MEGA_PLACEMENT_DRIVE_INTRO } from "@/lib/mega-placement-drive-content";
import { PLACEMENT_CELL_PATH } from "@/lib/placement-routes";
import type { StudentLifePageRefCard } from "@/lib/student-life-pages/types";

export type PlacementEventRecord = {
  slug: string;
  eyebrow?: string;
  title: string;
  description?: string;
  dateLabel?: string;
  yearLabel?: string;
  image?: string;
  imageAlt?: string;
  /** Lower numbers appear first. */
  sortOrder?: number;
};

/** Registered placement event pages under the Placement Cell section. */
export const PLACEMENT_EVENT_REGISTRY: readonly PlacementEventRecord[] = [
  {
    slug: "mega-placement-drive-2025",
    eyebrow: "Campus to Corporate · Batch 1",
    title: MEGA_PLACEMENT_DRIVE_INTRO.title,
    description: "26th September 2025 · BIHE Campus, Davangere",
    dateLabel: "26 SEP",
    yearLabel: "2025",
    sortOrder: 0,
  },
] as const;

export function mapPlacementEventToRefCard(
  event: PlacementEventRecord,
): StudentLifePageRefCard {
  return {
    id: event.slug,
    eyebrow: event.eyebrow,
    title: event.title,
    description: event.description,
    dateLabel: event.dateLabel,
    yearLabel: event.yearLabel,
    image: event.image,
    imageAlt: event.imageAlt,
    href: `${PLACEMENT_CELL_PATH}/${event.slug}`,
  };
}

export function placementEventsToRefCards(
  events: readonly PlacementEventRecord[],
): StudentLifePageRefCard[] {
  return [...events]
    .sort((left, right) => (left.sortOrder ?? 0) - (right.sortOrder ?? 0))
    .map(mapPlacementEventToRefCard);
}
