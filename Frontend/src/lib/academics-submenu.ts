import { FACULTY_PAGES, type FacultyPageSlug } from "@/lib/faculty-pages";

export type AcademicsSubmenuItem = {
  label: string;
  href: string;
  slug: string;
  description: string;
};

const ACADEMICS_FACULTY_MENU_ORDER: FacultyPageSlug[] = [
  "bca-faculty",
  "b-com-faculty",
  "non-teaching-staff",
];

const ACADEMICS_FACULTY_MENU_DESCRIPTIONS: Record<FacultyPageSlug, string> = {
  "bca-faculty":
    "Faculty profiles supporting the Bachelor of Computer Applications programme.",
  "b-com-faculty":
    "Faculty profiles and academic leadership for the Bachelor of Commerce programme.",
  "non-teaching-staff":
    "Administrative and support staff serving students and academic departments.",
};

function facultySubmenuItems(): AcademicsSubmenuItem[] {
  return ACADEMICS_FACULTY_MENU_ORDER.map((slug) => ({
    label: FACULTY_PAGES[slug].title,
    href: FACULTY_PAGES[slug].href,
    slug,
    description: ACADEMICS_FACULTY_MENU_DESCRIPTIONS[slug],
  }));
}

export const ACADEMICS_SUBMENU: AcademicsSubmenuItem[] = [
  {
    label: "BCA",
    href: "/academics/bca",
    slug: "bca",
    description:
      "Bachelor of Computer Applications programme — curriculum, labs, and career pathways.",
  },
  {
    label: "B.com",
    href: "/academics/b-com",
    slug: "b-com",
    description:
      "Bachelor of Commerce programme — curriculum, outcomes, and academic structure at BIHE.",
  },
  {
    label: "Academic Calendar",
    href: "/academics/academic-calendar",
    slug: "academic-calendar",
    description:
      "Semester schedules, examination timelines, and key academic dates.",
  },
  {
    label: "Academic & Examination Statutes",
    href: "/academics/academics-and-examination",
    slug: "academics-and-examination",
    description:
      "Examination policies, evaluation procedures, and academic regulations.",
  },
  ...facultySubmenuItems(),
  {
    label: "Internal Quality Assurance Cell (IQAC)",
    href: "/academics/iqac",
    slug: "iqac",
    description:
      "IQAC initiatives, quality benchmarks, and institutional best practices.",
  },
  {
    label: "Library",
    href: "/academics/library",
    slug: "library",
    description:
      "Library resources, digital access, and study support for students.",
  },
];
