import type { AcademicLeadershipShowcase } from "@/lib/academic-leadership-types";
import { images } from "@/lib/images";

export const B_COM_PAGE_LEAD =
  "Academic leadership, experienced faculty, and programme excellence for the Bachelor of Commerce at Bapuji Institute of Hi-Tech Education.";

export const B_COM_PROGRAMME = {
  title: "Department of B.Com",
  description:
    "B.Com as a course is aimed at training students to professionally and skillfully handle all different matters of commerce and management. Therefore, if you aspire to build a career in the field of finance and banking or wish to learn more about the commerce sector in general, then pursuing B.Com course will be the perfect choice for you.",
  image: images.bcomDepartment,
  imageAlt: "B.Com students collaborating with laptops at BIHE Davangere",
} as const;

export const B_COM_STATS = [
  { value: "180", label: "Annual Intake", suffix: "+" },
  { value: "3", label: "Year Programme", suffix: " Yrs" },
  { value: "UG", label: "Level", suffix: "" },
  { value: "DAVV", label: "Affiliation", suffix: "" },
] as const;

export const B_COM_FOCUS_TAGS = [
  "Finance & Banking",
  "Commerce Management",
  "Business Analytics",
  "Tax & Auditing",
  "Digital Marketing",
] as const;

export const B_COM_DEPARTMENT = {
  id: "b-com",
  label: "Admissions process",
  title: "Department of B.Com",
  paragraphs: [
    "B.Com as a course is aimed at training students to professionally and skillfully handle all different matters of commerce and management. Therefore, if you aspire to build a career in the field of finance and banking or wish to learn more about the commerce sector in general, then pursuing B.Com course will be the perfect choice for you.",
  ],
} as const;

export const B_COM_PROGRAMME_SHOWCASE = {
  ariaLabel: "B.Com programme",
  badge: "Undergraduate Programme",
  headline: "B.Com",
  subline: "Bachelor of Commerce · Department of B.Com",
  glass: {
    title: "Commerce Campus",
    subtitle: "Professional commerce learning at BIHE",
    statValue: "180+",
    statLabel: "Annual Intake",
  },
  stats: B_COM_STATS,
  tagsLabel: "Career Focus Areas",
  tags: B_COM_FOCUS_TAGS,
  image: B_COM_PROGRAMME.image,
  imageAlt: B_COM_PROGRAMME.imageAlt,
} as const;

export const B_COM_PROGRAM_TABLE = {
  columns: [
    { key: "level", header: "Level" },
    { key: "programName", header: "Name of the Program" },
    { key: "duration", header: "Duration" },
    { key: "intake", header: "Intake" },
  ],
  rows: [
    {
      id: "b-com-ug",
      level: "UG",
      programName: "B.Com",
      duration: "3 Years",
      intake: "180",
    },
  ],
} as const;

export const B_COM_SHOWCASE_GALLERY = [
  {
    id: "campus",
    src: images.bcomProgrammeStudent1,
    alt: "B.Com student with study materials on the BIHE Davangere campus",
    title: "On Campus",
    subtitle: "BIHE Davangere",
    stat: "UG",
    statLabel: "Level",
    layout: "tall",
  },
  {
    id: "students",
    src: images.bcomProgrammeStudents,
    alt: "B.Com students collaborating with a laptop at BIHE Davangere",
    title: "Learn Together",
    subtitle: "BIHE Davangere",
    stat: "B.Com",
    statLabel: "Programme",
    layout: "wide",
  },
  {
    id: "career",
    src: images.bcomProgrammeStudent2,
    alt: "B.Com student learning with a laptop in a professional setting",
    title: "Career Ready",
    subtitle: "Commerce Education",
    stat: "3 Yrs",
    statLabel: "Duration",
    layout: "wide",
  },
] as const;

export const B_COM_ACADEMICS_SHOWCASES: readonly AcademicLeadershipShowcase[] = [
  {
    id: "hod",
    profile: {
      name: "Dr. Swamy Tribhuvananda H. V.",
      titleLine: "Head of Department, Bapuji Management and Research Center",
      qualifications: "MBA, MHRM, Ph.D. · 24 Years Experience",
    },
    badge: "B.Com Programme",
    title: {
      lead: "Why B.Com Course is",
      accent: "a Perfect Choice",
    },
    paragraphs: [
      {
        text: "B.Com as a course is aimed at training students to professionally and skillfully handle all different matters of commerce and banking. Therefore, if you aspire to build a career in the field of finance and banking or wish to learn more about the commerce sector in general, then pursuing a B.Com course will be the perfect choice for you.",
        emphasis: false,
      },
      {
        text: "There are a host of job profiles that are available to B.Com graduates in India, which include Financial Risk Manager, Business Analyst, Auditing work, Tax consulting, Digital Marketer, Government jobs such as Civil Services, Indian Economic Service, Indian Statistical Service, Government Banking Jobs, BPOs, etc.",
        emphasis: true,
      },
    ],
    subheading: "What are some career options after graduating B.Com?",
    image: images.bcomHod,
    imageAlt: "Dr. Swamy Tribhuvananda H. V., Head of Department for B.Com at BIHE",
  },
] as const;
