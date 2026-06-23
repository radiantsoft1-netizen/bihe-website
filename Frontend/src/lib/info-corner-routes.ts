import { INFO_CORNER_SUBMENU } from "@/lib/info-corner-submenu";

export const INFO_CORNER_PAGE_PATHS = INFO_CORNER_SUBMENU.map(
  (item) => item.href,
) as readonly string[];

export const INFO_CORNER_BASE_PATH = "/info-corner/rti-details";

export function isInfoCornerPath(pathname: string): boolean {
  return INFO_CORNER_PAGE_PATHS.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}
