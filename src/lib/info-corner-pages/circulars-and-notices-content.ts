export const CIRCULARS_PAGE_LEAD =
  "Official circulars, administrative notices, and compliance-related communications issued by Bapuji Institute of Hi-Tech Education.";

export type CircularDocument = {
  id: string;
  title: string;
  description: string;
  href: string;
  fileName: string;
};

export const CIRCULARS_DOCUMENTS: readonly CircularDocument[] = [
  {
    id: "admission-circular",
    title: "Circular",
    description:
      "Official institutional circular published by Bapuji Institute of Hi-Tech Education.",
    href: "/documents/admission-circular-2025-26.pdf",
    fileName: "admission-circular-2025-26.pdf",
  },
  {
    id: "exam-notice",
    title: "IA Instructions",
    description:
      "Internal assessment instructions and guidelines for students at Bapuji Institute of Hi-Tech Education.",
    href: "/documents/exam-notice-dec-2025.pdf",
    fileName: "exam-notice-dec-2025.pdf",
  },
  {
    id: "holiday-notice",
    title: "IA Time-Table",
    description: "1st & 2nd Internal Assessment — 2024–25",
    href: "/documents/holiday-notice-2025.pdf",
    fileName: "holiday-notice-2025.pdf",
  },
] as const;

export const CIRCULARS_SECTION_TITLE = "Circulars & notices";
