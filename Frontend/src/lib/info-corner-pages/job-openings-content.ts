import type { InfoCornerItem } from "@/lib/info-corner-items-service";

export const JOB_OPENINGS_FEED_TITLE = "Current vacancies";

const category = {
  id: "job-openings",
  slug: "job-openings",
  name: "Job Openings",
  href: "/info-corner/job-openings",
} as const;

export const FALLBACK_JOB_OPENING_ITEMS: InfoCornerItem[] = [
  {
    id: "assistant-professor-computer-applications",
    slug: "assistant-professor-computer-applications",
    title: "Assistant Professor — Computer Applications",
    subtitle: "BCA Department · 1 Post",
    badgeLabel: "Teaching",
    excerpt:
      "Applications are invited for the post of Assistant Professor in Computer Applications. Candidates should hold a relevant postgraduate qualification with NET/SET as applicable and demonstrate teaching aptitude in BCA programmes.",
    publishedDate: "2025-05-10",
    publishedDateLabel: "Posted 10 May 2025",
    category,
    href: "/info-corner/job-openings/assistant-professor-computer-applications",
    content: [
      "Bapuji Institute of Hi-Tech Education invites applications for the post of Assistant Professor in the Computer Applications (BCA) department.",
      "Eligible candidates should possess a Master's degree in Computer Applications, Computer Science, or a related discipline with NET/SET qualification where applicable. Prior teaching experience in undergraduate programmes is preferred.",
      "Interested applicants may submit their résumé along with supporting documents to the college office during working hours or email principal@bihedvg.org with the subject line “Application — Assistant Professor (BCA)”.",
    ],
  },
  {
    id: "lecturer-commerce",
    slug: "lecturer-commerce",
    title: "Lecturer — Commerce",
    subtitle: "B.Com Department · 1 Post",
    badgeLabel: "Teaching",
    excerpt:
      "Recruitment notice for Lecturer in Commerce. Suitable candidates with postgraduate qualification in Commerce or related disciplines and commitment to undergraduate teaching may apply.",
    publishedDate: "2025-04-22",
    publishedDateLabel: "Posted 22 Apr 2025",
    category,
    href: "/info-corner/job-openings/lecturer-commerce",
    content: [
      "Applications are invited for the post of Lecturer in the B.Com department at Bapuji Institute of Hi-Tech Education.",
      "Candidates should hold an M.Com or equivalent postgraduate qualification with a strong academic record. Experience in teaching commerce subjects at the undergraduate level will be an advantage.",
      "Applications with complete biodata and copies of certificates may be submitted to the college office or sent to principal@bihedvg.org mentioning “Application — Lecturer (B.Com)”.",
    ],
  },
  {
    id: "librarian",
    slug: "librarian",
    title: "Librarian",
    subtitle: "Library Section · 1 Post",
    badgeLabel: "Non-Teaching",
    excerpt:
      "Vacancy for Librarian to manage library operations, catalogue maintenance, reader services, and support for students and faculty at BIHE.",
    publishedDate: "2025-03-18",
    publishedDateLabel: "Posted 18 Mar 2025",
    category,
    href: "/info-corner/job-openings/librarian",
    content: [
      "Bapuji Institute of Hi-Tech Education invites applications for the post of Librarian.",
      "The role includes managing library resources, assisting students and faculty, maintaining records, and supporting academic reference services. A degree in Library Science (B.Lib / M.Lib) or equivalent qualification is required.",
      "Interested candidates may apply in person at the college office or contact principal@bihedvg.org for application guidelines.",
    ],
  },
  {
    id: "lab-instructor-computer-applications",
    slug: "lab-instructor-computer-applications",
    title: "Lab Instructor — Computer Applications",
    subtitle: "BCA Computer Lab · 1 Post",
    badgeLabel: "Non-Teaching",
    excerpt:
      "Recruitment for Lab Instructor to support practical sessions, lab maintenance, and software setup for BCA computer laboratory activities.",
    publishedDate: "2025-02-28",
    publishedDateLabel: "Posted 28 Feb 2025",
    category,
    href: "/info-corner/job-openings/lab-instructor-computer-applications",
    content: [
      "Applications are invited for the post of Lab Instructor in the Computer Applications laboratory at BIHE.",
      "The candidate should be proficient in computer systems, networking basics, and common programming environments used in BCA practical courses. Diploma or degree in Computer Applications / Computer Science is preferred.",
      "Submit applications to the college office with relevant experience details or email principal@bihedvg.org with the subject “Application — Lab Instructor (BCA)”.",
    ],
  },
  {
    id: "office-assistant-administration",
    slug: "office-assistant-administration",
    title: "Office Assistant — Administration",
    subtitle: "College Office · 1 Post",
    badgeLabel: "Non-Teaching",
    excerpt:
      "Vacancy for Office Assistant in the college administration section for record keeping, front-desk support, and coordination with departments.",
    publishedDate: "2025-01-15",
    publishedDateLabel: "Posted 15 Jan 2025",
    category,
    href: "/info-corner/job-openings/office-assistant-administration",
    content: [
      "Bapuji Institute of Hi-Tech Education invites applications for the post of Office Assistant in the administration section.",
      "The role involves office documentation, correspondence support, data entry, and assisting students and visitors at the college office. Graduates with computer literacy and good communication skills in English and Kannada are eligible to apply.",
      "Applications may be submitted in person during office hours (Monday to Saturday) or sent to principal@bihedvg.org with the subject “Application — Office Assistant”.",
    ],
  },
];

export function resolveJobOpeningBadgeLabel(item: InfoCornerItem): string {
  return item.badgeLabel?.trim() || item.badgeText?.trim() || "Vacancy";
}
