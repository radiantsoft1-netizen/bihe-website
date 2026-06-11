import { INFO_CORNER_SUBMENU } from "@/lib/info-corner-submenu";

export type InfoCornerPageConfig = {
  slug: string;
  currentPage: string;
  title: string;
  lead: string;
  introBadge: string;
  introTitle: string;
  paragraphs: string[];
};

function pageFromSubmenu(slug: string, paragraphs: string[]): InfoCornerPageConfig {
  const item = INFO_CORNER_SUBMENU.find((entry) => entry.slug === slug);

  if (!item) {
    throw new Error(`Missing info corner submenu entry for slug: ${slug}`);
  }

  return {
    slug,
    currentPage: item.label,
    title: item.label,
    lead: item.description,
    introBadge: "Info - Corner",
    introTitle: item.label,
    paragraphs,
  };
}

const INFO_CORNER_PAGE_CONTENT: Record<string, InfoCornerPageConfig> = {
  "rti-details": pageFromSubmenu("rti-details", [
    "Bapuji Institute of Hi-Tech Education complies with the Right to Information Act and provides access to information in accordance with statutory requirements.",
    "Details regarding the Public Information Officer, Assistant Public Information Officer, and the procedure for submitting RTI applications will be published here.",
  ]),
  announcements: pageFromSubmenu("announcements", [
    "Official announcements from Bapuji Institute of Hi-Tech Education are published here for students, parents, faculty, and other stakeholders.",
    "Please check this section regularly for admission updates, examination notices, holiday declarations, and other institutional communications.",
  ]),
  newsletters: pageFromSubmenu("newsletters", [
    "Institutional newsletters highlighting academic developments, campus activities, and community initiatives at BIHE are made available in this section.",
    "Archived and current newsletter editions will be listed here as they are released by the college.",
  ]),
  "news-events-achievements": pageFromSubmenu("news-events-achievements", [
    "This section showcases news coverage, campus events, and notable student and institutional achievements at Bapuji Institute of Hi-Tech Education.",
    "Highlights from academic, cultural, sports, and placement-related activities will be updated here periodically.",
  ]),
  "international-students-admission": pageFromSubmenu("international-students-admission", [
    "Bapuji Institute of Hi-Tech Education welcomes international students and provides guidance on admission procedures, eligibility criteria, and required documentation.",
    "Information on facilities, support services, and campus resources available to international students will be published in this section.",
  ]),
  "circulars-and-notices": pageFromSubmenu("circulars-and-notices", [
    "Official circulars and administrative notices issued by the institution are published here for reference by students, staff, and affiliated bodies.",
    "Compliance-related communications and time-bound notices will be listed chronologically in this section.",
  ]),
  "job-openings": pageFromSubmenu("job-openings", [
    "Current recruitment opportunities for teaching and non-teaching positions at Bapuji Institute of Hi-Tech Education are announced in this section.",
    "Vacancy details, eligibility requirements, and application procedures will be updated as openings are notified by the institution.",
  ]),
};

export const INFO_CORNER_PAGE_SLUGS = Object.keys(INFO_CORNER_PAGE_CONTENT);

export function getInfoCornerPage(slug: string): InfoCornerPageConfig | undefined {
  return INFO_CORNER_PAGE_CONTENT[slug];
}
