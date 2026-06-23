import { FACULTY_PAGES, FACULTY_PAGE_SLUGS, type FacultyPageSlug } from "@/lib/faculty-pages";

export type AcademicsFacultyNavItem = {
  id: FacultyPageSlug;
  label: string;
  href: string;
  matchPaths: readonly string[];
};

export const ACADEMICS_FACULTY_NAV: readonly AcademicsFacultyNavItem[] = FACULTY_PAGE_SLUGS.map(
  (slug) => ({
    id: slug,
    label: FACULTY_PAGES[slug].title,
    href: FACULTY_PAGES[slug].href,
    matchPaths: [FACULTY_PAGES[slug].href] as const,
  }),
);

export function isAcademicsFacultyNavActive(
  pathname: string,
  item: AcademicsFacultyNavItem,
): boolean {
  return item.matchPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}
