import { ACADEMICS_SUBMENU } from "@/lib/academics-submenu";

export const ACADEMICS_PAGE_PATHS = [
  ...ACADEMICS_SUBMENU.map((item) => item.href),
  "/academics/faculty-and-staff",
] as const;

export const ACADEMICS_BASE_PATH = "/academics/bca";

export function isAcademicsPath(pathname: string): boolean {
  return ACADEMICS_PAGE_PATHS.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}
