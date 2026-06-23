import { ADMISSIONS_PAGE_NAV } from "@/lib/admissions-page-nav";
import { ADMISSIONS_SUBMENU } from "@/lib/admissions-submenu";

export const ADMISSIONS_PAGE_PATHS = [
  ...ADMISSIONS_SUBMENU.map((item) => item.href),
  ...ADMISSIONS_PAGE_NAV.map((item) => item.href),
] as readonly string[];

export const ADMISSIONS_BASE_PATH = "/admissions/admission-process";

export function isAdmissionsPath(pathname: string): boolean {
  return ADMISSIONS_PAGE_PATHS.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}
