import type { FacultyDepartmentId } from "@/lib/types/faculty";

export type FacultyPageSlug = "b-com-faculty" | "bca-faculty" | "non-teaching-staff";

export type FacultyPageConfig = {
  slug: FacultyPageSlug;
  department: FacultyDepartmentId;
  currentPage: string;
  title: string;
  lead: string;
  href: string;
};

export const FACULTY_DEPARTMENT_TITLES: Record<FacultyDepartmentId, string> = {
  "b-com": "B.Com Faculty",
  bca: "BCA Faculty",
  "non-teaching-staff": "Non Teaching Staff",
};

export const FACULTY_PAGES: Record<FacultyPageSlug, FacultyPageConfig> = {
  "b-com-faculty": {
    slug: "b-com-faculty",
    department: "b-com",
    currentPage: "B.Com Faculty",
    title: "B.Com Faculty",
    lead:
      "Experienced faculty members guiding the Bachelor of Commerce programme with strong foundations in commerce, accounting, and management.",
    href: "/academics/b-com-faculty",
  },
  "bca-faculty": {
    slug: "bca-faculty",
    department: "bca",
    currentPage: "BCA Faculty",
    title: "BCA Faculty",
    lead:
      "Dedicated faculty supporting the Bachelor of Computer Applications programme through practical learning and industry-aligned instruction.",
    href: "/academics/bca-faculty",
  },
  "non-teaching-staff": {
    slug: "non-teaching-staff",
    department: "non-teaching-staff",
    currentPage: "Non Teaching Staff",
    title: "Non Teaching Staff",
    lead:
      "Administrative and support staff who coordinate day-to-day operations and student services across BIHE departments.",
    href: "/academics/non-teaching-staff",
  },
};

export const FACULTY_PAGE_SLUGS: FacultyPageSlug[] = [
  "bca-faculty",
  "b-com-faculty",
  "non-teaching-staff",
];

export function isFacultyPageSlug(slug: string): slug is FacultyPageSlug {
  return slug in FACULTY_PAGES;
}

export function getFacultyPageConfig(slug: FacultyPageSlug): FacultyPageConfig {
  return FACULTY_PAGES[slug];
}
