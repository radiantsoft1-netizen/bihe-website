export const ACADEMIC_CALENDAR_PAGE_LEAD =
  "Semester schedules, examination timelines, and key academic dates for BCA and B.Com programmes at BIHE.";

export const ACADEMIC_CALENDAR_INTRO_TITLE = "Academic Calendars Details";

export const ACADEMIC_CALENDAR_INTRO =
  "At BIHE, the Academic Calendar ensures smooth academic functioning by outlining all key academic and administrative dates. It enhances transparency, supports structured learning, and helps students stay well-prepared throughout the semester.";

export type AcademicCalendarDocument = {
  title: string;
  description: string;
  href: string;
  fileName: string;
};

export const ACADEMIC_CALENDAR_DOCUMENTS: readonly AcademicCalendarDocument[] = [
  {
    title: "Academic Calendar 2025–26",
    description:
      "Official academic calendar for BCA and B.Com undergraduate programmes at BIHE.",
    href: "/documents/academic-calendar-2025-26.pdf",
    fileName: "academic-calendar-2025-26.pdf",
  },
  {
    title: "Academic Calendar 2024–25",
    description:
      "Academic calendar for the previous academic year — semester dates and examinations.",
    href: "/documents/academic-calendar-2024-25.pdf",
    fileName: "academic-calendar-2024-25.pdf",
  },
] as const;
