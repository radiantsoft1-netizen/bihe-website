import { GALLERY_ITEMS, GALLERY_TAG_STATS } from "@/lib/gallery-content";
import { images } from "@/lib/images";
import type {
  AnnouncementItem,
  HeroSlide,
  HomepageGalleryItem,
  NewsEventItem,
  RecruitingPartnerItem,
} from "@/lib/types/content";

export const FALLBACK_HERO_SLIDES: HeroSlide[] = [
  {
    eyebrow: "Your journey to success starts here",
    title: "Bapuji Institute of Hi-Tech Education",
    subtitle:
      "BCA & B.Com programs with industry-ready learning, expert faculty, and a vibrant campus in Davangere.",
  },
  {
    eyebrow: "Excellence in education & innovation",
    title: "Building brighter futures together",
    subtitle:
      "Hands-on labs, placement support, and a community focused on real-world skills and growth.",
  },
  {
    eyebrow: "AICTE approved · Davangere University affiliated",
    title: "Quality education since 2000",
    subtitle:
      "Trusted programs backed by accreditation, modern infrastructure, and decades of academic excellence.",
  },
];

export const FALLBACK_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    message:
      "Bapuji Institute of Hi-Tech Education (BIHE) Established in 2000. offers UG Programs. Known for its academic Excellence and Extensive campus, focusing on student placement, leadership and ethical values with AICTE approval and Davangere University affiliation.",
  },
];

export const FALLBACK_NEWS_EVENTS: NewsEventItem[] = [
  {
    title: "Academic Excellence & Intellectual Development",
    tag: "Academics",
    date: "Mar 2026",
    image: images.news[0],
  },
  {
    title: "Annual Day & Cultural Celebrations",
    tag: "Campus Life",
    date: "Feb 2026",
    image: images.news[1],
  },
  {
    title: "National Festival & Community Outreach",
    tag: "Events",
    date: "Jan 2026",
    image: images.news[2],
  },
  {
    title: "Student Leadership & Orientation Program",
    tag: "Student Life",
    date: "Dec 2025",
    image: images.news[3],
  },
];

export const FALLBACK_GALLERY_ITEMS: HomepageGalleryItem[] = GALLERY_ITEMS;

export const FALLBACK_GALLERY_TAG_STATS = GALLERY_TAG_STATS;

const RECRUITER_NAMES = [
  "IonIdea",
  "Tech Mahindra",
  "Mahindra",
  "Flipkart",
  "Amazon",
  "Larsen & Toubro",
  "Honeywell",
  "Wipro",
  "TCS",
  "Deloitte",
  "Capgemini",
  "Cognizant",
];

export const FALLBACK_RECRUITING_PARTNERS: RecruitingPartnerItem[] = images.recruiters.map(
  (logo, index) => ({
    name: RECRUITER_NAMES[index] ?? `Partner ${index + 1}`,
    logo,
  }),
);

export const FALLBACK_HERO_IMAGE = images.hero;
