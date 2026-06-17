import "server-only";

import { extractPageRefCards } from "@/lib/site-page-content";
import { PLACEMENT_CELL_PAGE_REF_CARDS } from "@/lib/student-life-pages/placement-cell-and-activities";
import type { StudentLifePageRefCard } from "@/lib/student-life-pages/types";

/**
 * Resolves Placement Cell highlight cards for the events carousel.
 * Priority: CMS pageRefCards → static placement highlight cards.
 */
export async function resolvePlacementPageRefCards(
  content?: Record<string, unknown> | null,
): Promise<readonly StudentLifePageRefCard[]> {
  const cmsCards = content ? extractPageRefCards(content) : undefined;

  if (cmsCards && cmsCards.length > 0) {
    return cmsCards;
  }

  return PLACEMENT_CELL_PAGE_REF_CARDS;
}
