export const CIRCULARS_PAGE_LEAD =
  "Official circulars, administrative notices, and compliance-related communications issued by Bapuji Institute of Hi-Tech Education.";

export type CircularNotice = {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  publishedDate: string;
  publishedDateIso?: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  downloadHref?: string;
  content: readonly string[];
};

export const CIRCULARS_NOTICES: readonly CircularNotice[] = [
  {
    id: "admission-circular",
    slug: "admission-circular",
    title: "Circular",
    publishedDate: "May 19, 2025",
    publishedDateIso: "2025-05-19",
    excerpt:
      "Official institutional circular for students, faculty, and affiliated bodies regarding administrative directions for the notified academic period.",
    image: "/images/circulars/notice-preview.jpg",
    imageAlt:
      "Official institutional circular published by Bapuji Institute of Hi-Tech Education.",
    downloadHref: "/documents/admission-circular-2025-26.pdf",
    content: [
      "This circular is issued by Bapuji Institute of Hi-Tech Education for students, faculty, and affiliated bodies. It contains official administrative directions and institutional communications that must be followed for the notified academic period.",
      "Students are advised to read the full notice carefully and comply with the instructions mentioned. For clarifications, contact the college office during working hours.",
    ],
  },
  {
    id: "exam-notice",
    slug: "exam-notice",
    title: "IA Instructions",
    publishedDate: "December 4, 2025",
    publishedDateIso: "2025-12-04",
    excerpt:
      "Internal assessment instructions and guidelines for BCA and B.Com students, including reporting requirements and conduct during examinations.",
    image: "/images/circulars/notice-preview.jpg",
    imageAlt:
      "Internal assessment instructions and guidelines for students at Bapuji Institute of Hi-Tech Education.",
    downloadHref: "/documents/exam-notice-dec-2025.pdf",
    content: [
      "Internal assessment instructions and guidelines for BCA and B.Com students at Bapuji Institute of Hi-Tech Education. This notice outlines the rules, reporting requirements, and conduct expected during internal assessment examinations.",
      "Students must report to the examination hall on time with the required stationery and identity documents. Mobile phones and unauthorized materials are not permitted inside the assessment venue.",
    ],
  },
  {
    id: "holiday-notice",
    slug: "holiday-notice",
    title: "IA Time-Table",
    subtitle: "1st & 2nd Internal Assessment — 2024–25",
    publishedDate: "November 18, 2024",
    publishedDateIso: "2024-11-18",
    excerpt:
      "Time-table for the 1st and 2nd Internal Assessment examinations for the academic year 2024–25.",
    image: "/images/circulars/notice-preview.jpg",
    imageAlt: "IA time-table for 1st and 2nd internal assessment 2024–25.",
    downloadHref: "/documents/holiday-notice-2025.pdf",
    content: [
      "Time-table for the 1st and 2nd Internal Assessment examinations for the academic year 2024–25 at Bapuji Institute of Hi-Tech Education.",
      "Students should verify programme-specific dates, session timings, and subject schedules shown in the notice. Any change communicated by the examination section will supersede earlier timings.",
    ],
  },
] as const;

export const CIRCULARS_SECTION_TITLE = "Circulars & notices";

export const CIRCULARS_FEED_TITLE = "All notifications";

export const CIRCULARS_BASE_PATH = "/info-corner/circulars-and-notices";

export function circularNoticeHref(slug: string): string {
  return `${CIRCULARS_BASE_PATH}/${slug}`;
}

export function getCircularNoticeById(id: string): CircularNotice | undefined {
  return CIRCULARS_NOTICES.find((notice) => notice.id === id || notice.slug === id);
}

export function getAllCircularNoticeIds(): string[] {
  return CIRCULARS_NOTICES.map((notice) => notice.id);
}
