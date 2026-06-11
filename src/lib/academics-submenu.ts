export type AcademicsSubmenuItem = {
  label: string;
  href: string;
  slug: string;
  description: string;
};

export const ACADEMICS_SUBMENU: AcademicsSubmenuItem[] = [
  {
    label: "B.COM",
    href: "/academics/b-com",
    slug: "b-com",
    description:
      "Bachelor of Commerce programme — curriculum, outcomes, and academic structure at BIHE.",
  },
  {
    label: "BCA",
    href: "/academics/bca",
    slug: "bca",
    description:
      "Bachelor of Computer Applications programme — curriculum, labs, and career pathways.",
  },
  {
    label: "Academic Calendar",
    href: "/academics/academic-calendar",
    slug: "academic-calendar",
    description:
      "Semester schedules, examination timelines, and key academic dates.",
  },
  {
    label: "Academics & Examination",
    href: "/academics/academics-and-examination",
    slug: "academics-and-examination",
    description:
      "Examination policies, evaluation procedures, and academic regulations.",
  },
  {
    label: "Faculty And Staff Details",
    href: "/academics/faculty-and-staff",
    slug: "faculty-and-staff",
    description:
      "Faculty profiles, departmental staff, and academic office contacts.",
  },
  {
    label: "Internal Quality Assurance Cell",
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
