export const AP_PAGE_LEAD =
  "Undergraduate and faculty-led academic project reports published by Bapuji Institute of Hi-Tech Education.";

export const AP_SECTION_TITLE = "Academic Projects";

export type AcademicProjectDocument = {
  id: string;
  title: string;
  description: string;
  href: string;
  fileName: string;
};

export const AP_PROJECT_DOCUMENTS: readonly AcademicProjectDocument[] = [
  {
    id: "2024-25",
    title: "Academic Projects 2024–25",
    description:
      "Student and faculty academic project reports for the academic year 2024–25 at BIHE.",
    href: "/documents/academic-projects-2024-25.pdf",
    fileName: "academic-projects-2024-25.pdf",
  },
] as const;
