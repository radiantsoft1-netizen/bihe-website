export const CONSTITUENT_UNITS_INTRO =
  "Bapuji Institute of Hi-Tech Education operates as a constituent unit under Bapuji Educational Association, Davangere. Official affiliation and university recognition documents for current and recent academic years are published below for students, parents, and stakeholders.";

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
    fileName: "affiliation-2024-25-26-new.pdf",
  },
  {
    title: "Affiliating University 2025-2026",
    description:
      "University affiliation document for programmes offered in 2025–26.",
    href: "/documents/affiliating-university-2025-2026.pdf",
    fileName: "affiliating-university-2025-2026.pdf",
  },
  {
    title: "Affiliating University 2024-2025",
    description:
      "University affiliation document for programmes offered in 2024–25.",
    href: "/documents/affiliating-university-2024-2025.pdf",
    fileName: "affiliating-university-2024-2025.pdf",
  },
] as const;
