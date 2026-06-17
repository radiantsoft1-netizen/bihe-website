/** Routes that belong under the About the Institution section (nav highlight + submenu). */
export const ABOUT_US_PAGE_PATHS = [
  "/about-bihe",
  "/memorandum-of-association",
  "/institutional-development-plan",
  "/constituent-units",
  "/recognition",
  "/annual-reports",
  "/audit-report",
] as const;

export function isAboutUsPath(pathname: string): boolean {
  return ABOUT_US_PAGE_PATHS.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}
