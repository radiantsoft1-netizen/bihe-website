import { images } from "@/lib/images";
import type { StudentLifeRichPageConfig } from "./types";

export const HOSTEL_FACILITIES_INTRO_HIGHLIGHTS = [
  {
    id: "accommodation",
    title: "Accommodation & Comfort",
    description:
      "Well-furnished and ventilated rooms with adequate furniture, clean drinking water, hygienic dining services, and uninterrupted electricity supply for a peaceful campus stay.",
    icon: "accommodation",
  },
  {
    id: "safety",
    title: "Safety & Security",
    description:
      "Dedicated wardens supervise daily hostel operations while controlled entry, visitor registers, and surveillance systems protect every resident.",
    icon: "safety",
  },
  {
    id: "dining",
    title: "Dining & Nutrition",
    description:
      "Nutritious, hygienically prepared meals are served through a well-maintained dining facility with strong standards for cleanliness, food quality, and nutrition.",
    icon: "dining",
  },
  {
    id: "medical",
    title: "Medical Support",
    description:
      "First-aid facilities and basic medical support address minor health concerns, with emergency assistance and referrals to nearby healthcare centres when required.",
    icon: "medical",
  },
  {
    id: "housekeeping",
    title: "Housekeeping & Hygiene",
    description:
      "Regular housekeeping, waste management, and sanitation drives keep rooms, corridors, washrooms, dining areas, and common spaces clean and healthy.",
    icon: "housekeeping",
  },
  {
    id: "common-facilities",
    title: "Common Facilities",
    description:
      "Study areas, recreation rooms, indoor games, internet access, and discussion spaces encourage collaboration, community living, and holistic development.",
    icon: "common-facilities",
  },
] as const;

export const HOSTEL_FACILITIES_PAGE: StudentLifeRichPageConfig = {
  slug: "hostel-facilities",
  currentPage: "Hostel Facilities",
  title: "Hostel Facilities",
  lead:
    "The college hostel provides a safe, comfortable, and disciplined living environment for students with well-furnished rooms, hygienic dining, and round-the-clock security.",
  banner: {
    src: images.studentLife.hostelBanner,
    alt: "Bapuji B-School executive hostel building for boys at BIHE campus",
    kicker: "Student Life",
    overlayTitle: "Hostel Facilities",
    images: [
      {
        src: images.studentLife.hostel1,
        alt: "Ladies hostel building at BIHE campus",
        label: "Ladies Hostel",
      },
      {
        src: images.studentLife.hostelBanner,
        alt: "Bapuji B-School executive hostel building for boys at BIHE campus",
        label: "Executive Hostel for Boys",
      },
    ],
  },
  intro: {
    title: "Hostel Facilities",
    variant: "infographic",
    paragraphs: [
      "The college hostel provides a safe, comfortable, and disciplined living environment for students, creating a home-like atmosphere that supports their academic and personal development. The hostel is designed to meet the residential needs of students by offering a secure and conducive environment for study, recreation, and overall well-being.",
    ],
    highlights: HOSTEL_FACILITIES_INTRO_HIGHLIGHTS,
    footerParagraphs: [
      "Various awareness programmes, cultural activities, celebrations of national festivals, and recreational events are organized periodically to foster a sense of belonging, teamwork, and cultural harmony among residents.",
      "The hostel administration ensures strict adherence to rules and regulations regarding discipline, attendance, safety, and responsible conduct. Through effective management and student-friendly services, the hostel aims to provide a peaceful, secure, and supportive atmosphere that enables students to achieve academic excellence and personal growth.",
    ],
  },
  sections: [
    {
      id: "hostel-for-all",
      title: "Hostel for Girls and Boys",
      paragraphs: [
        "The college hostel provides a secure and comfortable residential facility for students. It offers well-maintained rooms, clean drinking water, nutritious food, and a hygienic living environment. The hostel is supervised by a warden to ensure discipline and safety among students. Basic medical and first-aid facilities are available, and regular cleanliness is maintained to support the health and well-being of the residents.",
      ],
    },
    {
      id: "facilities",
      title: "Facilities in Hostel",
      bulletColumns: 2,
      bullets: [
        "Resident wardens for Girl's hostel.",
        "State of the art GYM facility for boys.",
        "Located in close proximity to the institutes.",
        "Excellent sports facilities both indoor and outdoor.",
        "Cool and calm environment for study.",
        "Hot water facilities.",
        "Vehicle parking area.",
        "Soft water Processing Unit for soft water.",
        "TV Room Facility.",
        "RO water processing Unit for drinking water.",
        "Attached and non-attached rooms.",
        "Water cooler facility floor-wise.",
        "Completely Wi-Fi-enabled campus.",
        "Walk area covered by beautiful garden and landscaping.",
        "Escalator facility for floors.",
        "CC camera surveillance.",
        "Separate dining halls for boys and girls.",
        "24*7 security",
        "Newspaper facility.",
        "Well furnished rooms with wardrobes, bookshelf, study table, chair, cot, bed etc…",
      ],
    },
  ],
};
