import { RESEARCH_SUBMENU } from "@/lib/research-submenu";

export type ResearchPageConfig = {
  slug: string;
  currentPage: string;
  title: string;
  lead: string;
  introBadge: string;
  introTitle: string;
  paragraphs: string[];
};

const RESEARCH_PAGE_CONTENT: Record<string, ResearchPageConfig> = {
  "incubation-centre": {
    slug: "incubation-centre",
    currentPage: "Incubation Centre",
    title: "Incubation Centre",
    lead:
      "Fostering innovation, entrepreneurship, and startup development among BIHE students and faculty.",
    introBadge: "Research",
    introTitle: "Incubation Centre",
    paragraphs: [
      "The Incubation Centre at Bapuji Institute of Hi-Tech Education supports students and faculty in transforming ideas into viable ventures through mentorship, workspace, and industry connect.",
      "The centre encourages interdisciplinary collaboration, prototype development, and participation in innovation challenges and startup programmes.",
    ],
  },
  "central-research-facilities": {
    slug: "central-research-facilities",
    currentPage: "Central Research Facilities",
    title: "Central Research Facilities",
    lead:
      "Shared research infrastructure and laboratory facilities available to BIHE researchers and project teams.",
    introBadge: "Research",
    introTitle: "Central Research Facilities",
    paragraphs: [
      "Central Research Facilities provide access to specialised equipment, computing resources, and laboratory spaces that support academic and applied research across programmes.",
      "These facilities are maintained to enable quality experimentation, data collection, and project work aligned with institutional and university research standards.",
    ],
  },
  "research-and-development-cell": {
    slug: "research-and-development-cell",
    currentPage: "Research and Development Cell",
    title: "Research and Development Cell",
    lead:
      "Student and faculty research projects coordinated by the Research and Development Cell at Bapuji Institute of Hi-Tech Education.",
    introBadge: "Research",
    introTitle: "Research and Development Cell",
    paragraphs: [
      "The Research and Development Cell promotes a research-oriented culture by facilitating project proposals, faculty development, and collaboration with industry and academia.",
      "The cell guides researchers on funding opportunities, ethical practices, and documentation required for institutional and accreditation-related reporting.",
    ],
  },
  "academic-projects": {
    slug: "academic-projects",
    currentPage: "Academic Projects",
    title: "Academic Projects",
    lead:
      "Student and faculty academic projects that strengthen practical learning and research outcomes.",
    introBadge: "Research",
    introTitle: "Academic Projects",
    paragraphs: [
      "Academic Projects at BIHE enable students to apply classroom knowledge through mini-projects, major projects, and interdisciplinary assignments under faculty supervision.",
      "Project work encourages analytical thinking, technical documentation, and presentation skills that prepare graduates for higher studies and professional careers.",
    ],
  },
};

export const RESEARCH_PAGE_SLUGS = RESEARCH_SUBMENU.map(
  (item) => item.slug,
) as readonly string[];

export function getResearchPage(slug: string): ResearchPageConfig | undefined {
  return RESEARCH_PAGE_CONTENT[slug];
}
