import type { GalleryPageItem } from "@/lib/gallery-page-content";
import type { GalleryFilterId } from "@/lib/gallery-page-content";

export type GalleryDisplayItem = GalleryPageItem & {
  details: string;
  source: "dynamic" | "static";
};

export function getFilterCount(
  items: GalleryDisplayItem[],
  filterId: GalleryFilterId,
): number {
  if (filterId === "all") return items.length;
  return items.filter((item) => item.filterId === filterId).length;
}
