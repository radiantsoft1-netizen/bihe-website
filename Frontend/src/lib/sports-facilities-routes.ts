export const SPORTS_FACILITIES_PATH = "/student-life/sports-facilities";

export const SPORTS_FACILITIES_EVENTS_PATH = "/student-life/sports-facilities/events";

export function sportsFacilitiesSectionHref(sectionId: string): string {
  return `${SPORTS_FACILITIES_EVENTS_PATH}#${sectionId}`;
}

export function isSportsFacilitiesPath(pathname: string): boolean {
  return (
    pathname === SPORTS_FACILITIES_PATH ||
    pathname.startsWith(`${SPORTS_FACILITIES_PATH}/`)
  );
}
