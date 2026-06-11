import { ADMINISTRATION_SUBMENU } from "@/lib/administration-submenu";

/** Routes under the Administration nav section. */
export const ADMINISTRATION_PAGE_PATHS = ADMINISTRATION_SUBMENU.map(
  (item) => item.href,
) as readonly string[];

export function isAdministrationPath(pathname: string): boolean {
  return ADMINISTRATION_PAGE_PATHS.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}
