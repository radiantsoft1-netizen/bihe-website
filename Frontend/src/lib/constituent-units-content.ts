export const CONSTITUENT_UNITS_INTRO_POINTS = [
  "Affiliated with a professional organization/institution.",
  "Contributing to its activities, projects, and objectives.",
  "Committed to collaboration, learning, and professional growth.",
] as const;

export type ConstituentUnitsDocument = {
  title: string;
  description: string;
  href: string;
  fileName: string;
};

export const CONSTITUENT_UNITS_DOCUMENTS: readonly ConstituentUnitsDocument[] = [
  {
    title: "Affiliation 2024(25-26 NEW)",
    description:
      "Affiliation notification and approval for the academic year 2024–25 and 2025–26.",
    href: "/documents/affiliation-2024-25-26-new.pdf",
    fileName: "Affiliation 2024(25-26 NEW).docx.pdf",
  },
  {
    title: "Affiliating University 2025-2026",
    description:
      "University affiliation document for programmes offered in 2025–26.",
    href: "/documents/affiliating-university-2025-2026.pdf",
    fileName: "Latest Affiliation 2025.(KAN).docx.pdf",
  },
  {
    title: "Affiliating University 2024-2025",
    description:
      "University affiliation document for programmes offered in 2024–25.",
    href: "/documents/affiliating-university-2024-2025.pdf",
    fileName: "Affiliation 2024 kan.docx.pdf",
  },
] as const;
