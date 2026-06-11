import type { StudentLifeRichPageConfig } from "./types";
import { ANTI_RAGGING_PAGE } from "./anti-ragging-cell";
import { AUDITORIUM_PAGE } from "./auditorium";
import { CANTEEN_PAGE } from "./canteen";
import { COMPUTER_LAB_PAGE } from "./computer-lab";
import { HOSTEL_FACILITIES_PAGE } from "./hostel-facilities";
import { HEALTH_FACILITIES_PAGE } from "./health-facilities";
import { PLACEMENT_CELL_PAGE } from "./placement-cell-and-activities";
import { GRIEVANCE_PAGE } from "./student-grievance-redressal-committee";
import { EQUAL_OPPORTUNITY_PAGE } from "./equal-opportunity-cell";
import { SEDG_PAGE } from "./socio-economically-disadvantaged-groups";
import { YOUTH_RED_CROSS_PAGE } from "./youth-red-cross";

export const STUDENT_LIFE_RICH_PAGES: Record<string, StudentLifeRichPageConfig> = {
  [HOSTEL_FACILITIES_PAGE.slug]: HOSTEL_FACILITIES_PAGE,
  [PLACEMENT_CELL_PAGE.slug]: PLACEMENT_CELL_PAGE,
  [GRIEVANCE_PAGE.slug]: GRIEVANCE_PAGE,
  [HEALTH_FACILITIES_PAGE.slug]: HEALTH_FACILITIES_PAGE,
  [ANTI_RAGGING_PAGE.slug]: ANTI_RAGGING_PAGE,
  [EQUAL_OPPORTUNITY_PAGE.slug]: EQUAL_OPPORTUNITY_PAGE,
  [SEDG_PAGE.slug]: SEDG_PAGE,
  [COMPUTER_LAB_PAGE.slug]: COMPUTER_LAB_PAGE,
  [AUDITORIUM_PAGE.slug]: AUDITORIUM_PAGE,
  [CANTEEN_PAGE.slug]: CANTEEN_PAGE,
  [YOUTH_RED_CROSS_PAGE.slug]: YOUTH_RED_CROSS_PAGE,
};

export const STUDENT_LIFE_RICH_PAGE_SLUGS = Object.keys(STUDENT_LIFE_RICH_PAGES);

export function getStudentLifeRichPage(
  slug: string,
): StudentLifeRichPageConfig | undefined {
  return STUDENT_LIFE_RICH_PAGES[slug];
}

export type { StudentLifeRichPageConfig } from "./types";
