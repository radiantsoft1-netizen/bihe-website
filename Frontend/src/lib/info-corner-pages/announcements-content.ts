import type { InfoCornerItem } from "@/lib/info-corner-items-service";
import { images } from "@/lib/images";

export const ANNOUNCEMENTS_FEED_TITLE = "Latest announcements";

const NOTICE_PREVIEW_IMAGE = "/images/circulars/notice-preview.jpg";

const category = {
  id: "announcements",
  slug: "announcements",
  name: "Announcements",
  href: "/info-corner/announcements",
} as const;

export const FALLBACK_ANNOUNCEMENT_ITEMS: InfoCornerItem[] = [
  {
    id: "admission-update-2025",
    slug: "admission-update-2025",
    title: "Admission Update 2025–26",
    badgeLabel: "Admission",
    excerpt:
      "Important admission-related announcement for prospective students and parents applying to BCA and B.Com programmes at BIHE.",
    publishedDate: "2025-06-01",
    publishedDateLabel: "1 Jun 2025",
    showInHomeScroller: true,
    image: images.aboutBiheCampus,
    imageAlt: "Bapuji Institute of Hi-Tech Education campus",
    category,
    href: "/info-corner/announcements/admission-update-2025",
    content: [
      "Admission enquiries and application support for the academic year 2025–26 are handled through the college office during working hours.",
      "Please verify programme-specific eligibility and document requirements before submission. For clarifications, contact the admissions section at the college office or email principal@bihedvg.org.",
    ],
  },
  {
    id: "fee-payment-notice",
    slug: "fee-payment-notice",
    title: "Fee Payment Notice",
    badgeLabel: "Notice",
    excerpt:
      "Official notice regarding fee payment schedules, modes of payment, and compliance requirements for students of Bapuji Institute of Hi-Tech Education.",
    publishedDate: "2025-05-15",
    publishedDateLabel: "15 May 2025",
    image: NOTICE_PREVIEW_IMAGE,
    imageAlt: "Fee payment notice published by Bapuji Institute of Hi-Tech Education.",
    pdf: "/documents/fee-payment-notice.pdf",
    pdfName: "Fee Payment Notice.pdf",
    category,
    href: "/info-corner/announcements/fee-payment-notice",
    content: [
      "This notice communicates the institutional fee payment guidelines for students enrolled in BCA and B.Com programmes at Bapuji Institute of Hi-Tech Education.",
      "Students are advised to complete payments within the notified timelines and retain receipts for reference. Download the attached PDF for full instructions.",
    ],
  },
  {
    id: "academic-calendar-update",
    slug: "academic-calendar-update",
    title: "Academic Calendar Update",
    badgeLabel: "Academics",
    excerpt:
      "Revised academic calendar update for the current academic year, including examination schedules and institutional working days.",
    publishedDate: "2025-04-10",
    publishedDateLabel: "10 Apr 2025",
    image: NOTICE_PREVIEW_IMAGE,
    imageAlt: "Academic calendar update notice at Bapuji Institute of Hi-Tech Education.",
    pdf: "/documents/academic-calendar-update.pdf",
    pdfName: "Academic Calendar Update.pdf",
    category,
    href: "/info-corner/announcements/academic-calendar-update",
    content: [
      "An updated academic calendar has been issued for students and faculty at Bapuji Institute of Hi-Tech Education.",
      "Please review the attached notice for revised dates, assessment timelines, and holiday declarations applicable to your programme.",
    ],
  },
  {
    id: "nss-special-camp-circular",
    slug: "nss-special-camp-circular",
    title: "NSS Special Camp Circular",
    badgeLabel: "NSS",
    excerpt:
      "Circular regarding the National Service Scheme (NSS) special camp — participation guidelines, schedule, and reporting instructions for student volunteers.",
    publishedDate: "2025-03-05",
    publishedDateLabel: "5 Mar 2025",
    image: NOTICE_PREVIEW_IMAGE,
    imageAlt: "NSS special camp circular at Bapuji Institute of Hi-Tech Education.",
    pdf: "/documents/nss-special-camp-circular.pdf",
    pdfName: "NSS Special Camp Circular.pdf",
    category,
    href: "/info-corner/announcements/nss-special-camp-circular",
    content: [
      "The NSS unit at Bapuji Institute of Hi-Tech Education has published a circular for the special camp programme.",
      "Eligible student volunteers should read the full circular for venue details, reporting time, and participation requirements.",
    ],
  },
];
