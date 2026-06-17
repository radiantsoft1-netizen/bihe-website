import { INFO_CORNER_DEDICATED_NAV } from "@/lib/info-corner-nav";

export type InfoCornerSubmenuItem = {
  label: string;
  href: string;
  slug: string;
  description: string;
};

const INFO_CORNER_CATEGORY_SUBMENU: InfoCornerSubmenuItem[] = [
  {
    label: "Announcements",
    href: "/info-corner/announcements",
    slug: "announcements",
    description:
      "Official college announcements, notices, and updates for students, faculty, and stakeholders.",
  },
  {
    label: "Newsletters",
    href: "/info-corner/newsletters",
    slug: "newsletters",
    description:
      "Institutional newsletters highlighting campus news, academic updates, and community activities.",
  },
  {
    label: "News, Events & Achievements",
    href: "/info-corner/news-events-achievements",
    slug: "news-events-achievements",
    description:
      "Latest news, campus events, student achievements, and institutional milestones at BIHE.",
  },
  {
    label: "Circulars and Notices",
    href: "/info-corner/circulars-and-notices",
    slug: "circulars-and-notices",
    description:
      "Official circulars, administrative notices, and compliance-related communications from the institution.",
  },
  {
    label: "Job Openings",
    href: "/info-corner/job-openings",
    slug: "job-openings",
    description:
      "Current faculty and staff recruitment opportunities at Bapuji Institute of Hi-Tech Education.",
  },
];

function dedicatedToSubmenu(entry: (typeof INFO_CORNER_DEDICATED_NAV)[number]): InfoCornerSubmenuItem {
  return {
    label: entry.name,
    href: entry.href,
    slug: entry.slug,
    description: entry.description ?? "",
  };
}

export const INFO_CORNER_SUBMENU: InfoCornerSubmenuItem[] = [
  dedicatedToSubmenu(INFO_CORNER_DEDICATED_NAV[0]),
  ...INFO_CORNER_CATEGORY_SUBMENU,
  dedicatedToSubmenu(INFO_CORNER_DEDICATED_NAV[1]),
];
