import { images } from "@/lib/images";
import type { InfoCornerItem } from "@/lib/info-corner-items-service";

export const NEWS_EVENTS_ACHIEVEMENTS_FEED_TITLE = "Latest highlights";

const category = {
  id: "news-events-achievements",
  slug: "news-events-achievements",
  name: "News, Events & Achievements",
  href: "/info-corner/news-events-achievements",
} as const;

export const FALLBACK_NEWS_EVENTS_ACHIEVEMENTS_ITEMS: InfoCornerItem[] = [
  {
    id: "mega-placement-drive-2025",
    slug: "mega-placement-drive-2025",
    title: "Mega Placement Drive 2025",
    badgeLabel: "Placement",
    excerpt:
      "Leading recruiters visited BIHE for on-campus interviews, career guidance sessions, and offer letter distribution for BCA and B.Com students.",
    publishedDate: "2025-04-18",
    publishedDateLabel: "18 Apr 2025",
    image: images.megaPlacementDrive.inauguralCeremony,
    imageAlt: "Inaugural ceremony at the BIHE mega placement drive",
    category,
    href: "/info-corner/news-events-achievements/mega-placement-drive-2025",
    content: [
      "Bapuji Institute of Hi-Tech Education hosted a mega placement drive bringing together company HR teams, training partners, and graduating students from BCA and B.Com programmes.",
      "The event included inaugural sessions, interview rounds, and offer letter distribution, reflecting the institution's focus on career readiness and industry engagement.",
    ],
  },
  {
    id: "graduation-day-2025",
    slug: "graduation-day-2025",
    title: "Graduation Day 2025",
    badgeLabel: "Events",
    excerpt:
      "Graduating students were honoured at the institutional graduation ceremony with faculty, parents, and dignitaries celebrating academic milestones.",
    publishedDate: "2025-03-22",
    publishedDateLabel: "22 Mar 2025",
    image: images.megaPlacementDrive.offerLettersBanner,
    imageAlt: "Graduation day celebrations at BIHE",
    category,
    href: "/info-corner/news-events-achievements/graduation-day-2025",
    content: [
      "Graduation Day at Bapuji Institute of Hi-Tech Education marked the completion of academic journeys for outgoing BCA and B.Com batches.",
      "The ceremony recognised student achievement, faculty mentorship, and the support of parents and institutional leadership.",
    ],
  },
  {
    id: "annual-day-cultural-celebrations",
    slug: "annual-day-cultural-celebrations",
    title: "Annual Day & Cultural Celebrations",
    badgeLabel: "Campus Life",
    excerpt:
      "Students showcased talent through cultural performances, prize distributions, and stage programmes during the institutional annual day event.",
    publishedDate: "2025-02-14",
    publishedDateLabel: "14 Feb 2025",
    image: images.news[1],
    imageAlt: "Annual day cultural celebrations at BIHE",
    category,
    href: "/info-corner/news-events-achievements/annual-day-cultural-celebrations",
    content: [
      "The annual day programme brought together academic recognition and cultural expression, highlighting student participation across departments.",
      "Performances, awards, and community gatherings reflected the vibrant campus life at Bapuji Institute of Hi-Tech Education.",
    ],
  },
  {
    id: "pragna-commerce-fest",
    slug: "pragna-commerce-fest",
    title: "Pragna Commerce Fest",
    badgeLabel: "Events",
    excerpt:
      "The B.Com department organised Pragna, a commerce fest featuring academic competitions, business presentations, and student-led activities.",
    publishedDate: "2025-01-20",
    publishedDateLabel: "20 Jan 2025",
    image: images.bcomProgrammeStudents,
    imageAlt: "Pragna commerce fest at BIHE",
    category,
    href: "/info-corner/news-events-achievements/pragna-commerce-fest",
    content: [
      "Pragna is a signature commerce fest at BIHE that encourages B.Com students to apply classroom learning through competitions and collaborative events.",
      "The fest strengthens professional skills, teamwork, and department-level engagement within the commerce programme.",
    ],
  },
  {
    id: "vanijyothsava",
    slug: "vanijyothsava",
    title: "Vanijyothsava",
    badgeLabel: "Events",
    excerpt:
      "Vanijyothsava featured commerce-oriented exhibitions, student enterprise displays, and interactive sessions for the BIHE community.",
    publishedDate: "2024-12-08",
    publishedDateLabel: "8 Dec 2024",
    image: images.bcom,
    imageAlt: "Vanijyothsava commerce event at BIHE",
    category,
    href: "/info-corner/news-events-achievements/vanijyothsava",
    content: [
      "Vanijyothsava celebrates commerce education through exhibitions, student presentations, and activities that connect theory with practical business concepts.",
      "The event provides a platform for B.Com students to demonstrate creativity, leadership, and entrepreneurial thinking.",
    ],
  },
  {
    id: "freshers-day-welcome",
    slug: "freshers-day-welcome",
    title: "Freshers Day Welcome Programme",
    badgeLabel: "Campus Life",
    excerpt:
      "Incoming students were welcomed through orientation activities, senior-junior interactions, and introductory sessions on campus life at BIHE.",
    publishedDate: "2024-11-05",
    publishedDateLabel: "5 Nov 2024",
    image: images.admissionProcessStudent,
    imageAlt: "Freshers day welcome programme at BIHE",
    category,
    href: "/info-corner/news-events-achievements/freshers-day-welcome",
    content: [
      "The Freshers Day programme helps new students transition into campus life with introductions to academic expectations, facilities, and student communities.",
      "Interactive sessions and welcome activities create an inclusive start to the academic journey at Bapuji Institute of Hi-Tech Education.",
    ],
  },
  {
    id: "campus-achievement-highlight",
    slug: "campus-achievement-highlight",
    title: "Campus Achievement Highlight",
    badgeLabel: "Achievements",
    excerpt:
      "Student and institutional achievements across academic, cultural, sports, and placement domains published for the BIHE community.",
    publishedDate: "2025-03-15",
    publishedDateLabel: "15 Mar 2025",
    image: images.placement.bcaBatch202526,
    imageAlt: "Campus achievement highlight at BIHE",
    category,
    href: "/info-corner/news-events-achievements/campus-achievement-highlight",
    content: [
      "Bapuji Institute of Hi-Tech Education continues to celebrate academic, cultural, and placement-related milestones achieved by students and faculty.",
      "Detailed coverage of recent events and achievements is published here for students, parents, alumni, and stakeholders.",
    ],
  },
  {
    id: "academic-excellence-development",
    slug: "academic-excellence-development",
    title: "Academic Excellence & Intellectual Development",
    badgeLabel: "Academics",
    excerpt:
      "Faculty-led academic initiatives, seminars, and learning programmes supporting intellectual development for BCA and B.Com students.",
    publishedDate: "2024-10-12",
    publishedDateLabel: "12 Oct 2024",
    image: images.news[0],
    imageAlt: "Academic excellence programme at BIHE",
    category,
    href: "/info-corner/news-events-achievements/academic-excellence-development",
    content: [
      "BIHE promotes academic excellence through structured learning, faculty guidance, and programme activities that strengthen conceptual and practical understanding.",
      "Initiatives under this highlight support continuous intellectual development across computer application and commerce disciplines.",
    ],
  },
];

export function resolveNewsEventsBadgeLabel(item: InfoCornerItem): string {
  return item.badgeLabel?.trim() || item.badgeText?.trim() || "Highlight";
}
