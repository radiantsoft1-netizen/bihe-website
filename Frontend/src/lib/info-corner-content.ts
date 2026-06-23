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
  "rti-details": {
    slug: "rti-details",
    currentPage: "RTI Details (CPIO & Appellate Authority)",
    title: "RTI Details (CPIO & Appellate Authority)",
    lead:
      "Right to Information Act details, public information officers, and disclosure procedures at BIHE.",
    introBadge: "Info - Corner",
    introTitle: "RTI Details (CPIO & Appellate Authority)",
    paragraphs: [
      "Bapuji Institute of Hi-Tech Education complies with the Right to Information Act and provides access to information in accordance with statutory requirements.",
      "Details regarding the Public Information Officer, Assistant Public Information Officer, and the procedure for submitting RTI applications will be published here.",
    ],
  },
  announcements: pageFromSubmenu("announcements", [
    "Official announcements from Bapuji Institute of Hi-Tech Education are published here for students, parents, faculty, and other stakeholders.",
    "Please check this section regularly for admission updates, examination notices, holiday declarations, and other institutional communications.",
  ]),
  newsletters: pageFromSubmenu("newsletters", [
    "Institutional newsletters highlighting academic developments, campus activities, and community initiatives at BIHE are made available in this section.",
    "Browse current and archived B.com programme newsletters published by the college.",
    "Each edition can be opened for a summary; PDF downloads will be linked when available from the college office.",
  ]),
  "news-events-achievements": pageFromSubmenu("news-events-achievements", [
    "This section showcases news coverage, campus events, and notable student and institutional achievements at Bapuji Institute of Hi-Tech Education.",
    "Browse highlights from placement drives, graduation ceremonies, commerce fests, cultural programmes, and academic initiatives across BCA and B.Com.",
    "Each story opens with a summary and supporting details; new coverage is added as events and achievements are documented by the college.",
  ]),
  "international-students-admission": {
    slug: "international-students-admission",
    currentPage: "Admission Process for International Students",
    title: "Admission Process for International Students",
    lead:
      "Admission guidelines, eligibility, and campus facilities available for international students at BIHE.",
    introBadge: "Info - Corner",
    introTitle: "Admission Process for International Students",
    paragraphs: [
      "Bapuji Institute of Hi-Tech Education welcomes international students and provides guidance on admission procedures, eligibility criteria, and required documentation.",
      "Information on facilities, support services, and campus resources available to international students will be published in this section.",
    ],
  },
  "circulars-and-notices": pageFromSubmenu("circulars-and-notices", [
    "Official circulars and administrative notices issued by the institution are published here for reference by students, staff, and affiliated bodies.",
    "Compliance-related communications and time-bound notices will be listed chronologically in this section.",
  ]),
  "job-openings": pageFromSubmenu("job-openings", [
    "Current recruitment opportunities for teaching and non-teaching positions at Bapuji Institute of Hi-Tech Education are announced in this section.",
    "Vacancy notices include eligibility criteria, number of posts, and application instructions for faculty and administrative roles at BIHE.",
    "Interested candidates may submit applications to the college office or email principal@bihedvg.org with the post title clearly mentioned in the subject line.",
  ]),
};

export const INFO_CORNER_PAGE_SLUGS = Object.keys(INFO_CORNER_PAGE_CONTENT);

export function getInfoCornerPage(slug: string): InfoCornerPageConfig | undefined {
  return INFO_CORNER_PAGE_CONTENT[slug];
}
