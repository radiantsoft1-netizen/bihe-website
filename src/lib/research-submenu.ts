export type ResearchSubmenuItem = {
  label: string;
  href: string;
  slug: string;
  description: string;
};

export const RESEARCH_SUBMENU: ResearchSubmenuItem[] = [
  {
    label: "Research & Development Cell",
    href: "/research/research-and-development-cell",
    slug: "research-and-development-cell",
    description:
      "Institutional R&D initiatives, funding guidance, and research coordination across departments.",
  },
  {
    label: "Academic Projects",
    href: "/research/academic-projects",
    slug: "academic-projects",
    description:
      "Undergraduate and faculty-led academic projects, publications, and project-based learning.",
  },
  {
    label: "Incubation Centre",
    href: "/research/incubation-centre",
    slug: "incubation-centre",
    description:
      "Startup incubation, mentorship, and innovation support for student and faculty entrepreneurs.",
  },
  {
    label: "Central Research Facilities",
    href: "/research/central-research-facilities",
    slug: "central-research-facilities",
    description:
      "Shared laboratories, equipment, and infrastructure for interdisciplinary research at BIHE.",
  },
];
