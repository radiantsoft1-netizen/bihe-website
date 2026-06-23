import { RESEARCH_SUBMENU } from "@/lib/research-submenu";

export const RESEARCH_PAGE_PATHS = RESEARCH_SUBMENU.map(
  (item) => item.href,
) as readonly string[];

export const RESEARCH_BASE_PATH = "/research/research-and-development-cell";

export function rdcProjectPath(projectSlug: string): string {
  return `${RESEARCH_BASE_PATH}/${projectSlug}`;
}

export function isResearchPath(pathname: string): boolean {
  return RESEARCH_PAGE_PATHS.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}
