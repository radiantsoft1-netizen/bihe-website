import { images } from "@/lib/images";
import type { StudentLifeShowcase } from "@/lib/student-life-showcase";

export type DifferentlyAbledShowcase = StudentLifeShowcase;

export const DIFFERENTLY_ABLED_PAGE_LEAD =
  "Accessible infrastructure and assistance for differently-abled students at BIHE.";

export const DIFFERENTLY_ABLED_CLOSING_HIGHLIGHT =
  "These facilities aim to enhance the learning experience and academic independence of differently abled students.";

export const DIFFERENTLY_ABLED_HERO = {
  kicker: "Student Life",
  overlayTitle: "Facilities for Differently-abled Students",
  overlayLead:
    "Bapuji Institute of Hi-Tech Education, Davangere is committed to providing an inclusive and supportive learning environment for differently abled students. The institution ensures equal opportunities in access to education, infrastructure, and assessment, enabling students with special needs to pursue quality education and become an integral part of the academic community.",
} as const;

export const DIFFERENTLY_ABLED_SHOWCASES: readonly DifferentlyAbledShowcase[] = [
  {
    id: "overview",
    badge: "Mobility Support",
    title: {
      lead: "Wheelchair",
      accent: "Facility",
    },
    paragraphs: [
      {
        text: "The institution upholds a strong sense of social responsibility by ensuring dignity, respect, and equal treatment for differently abled students. Wheelchair facilities are made available whenever required, including access to academic blocks and the library, to support students with mobility challenges.",
        emphasis: false,
      },
    ],
    image: images.studentLife.differentlyAbledBanner,
    imageAlt:
      "Differently abled students with wheelchair access and inclusive learning support at BIHE campus",
  },
  {
    id: "ramps-railings",
    reverse: true,
    badge: "Campus Access",
    title: {
      lead: "Ramps And",
      accent: "Railings",
    },
    paragraphs: [
      {
        text: "The institution upholds a strong sense of social responsibility by ensuring dignity, respect, and equal treatment for differently abled students. Wheelchair facilities are made available whenever required, including access to academic blocks and the library, to support students with mobility challenges.",
        emphasis: false,
      },
    ],
    image: images.studentLife.differentlyAbledRampsRailings,
    imageAlt:
      "Student using campus stairs with handrails for accessible movement at BIHE",
  },
  {
    id: "special-toilets-classrooms",
    badge: "Inclusive Learning",
    title: {
      lead: "Special Toilets, Rest Rooms and Classrooms",
      accent: "(Including Laboratories)",
    },
    paragraphs: [
      {
        text: "Modified toilets, rest rooms, classrooms, and laboratories are provided on the ground floor to facilitate easy movement and accessibility for differently abled students, ensuring comfort and convenience during their academic activities.",
        emphasis: false,
      },
    ],
    image: images.studentLife.differentlyAbledAccessibleClassrooms,
    imageAlt:
      "Wheelchair-accessible elevator and inclusive campus facilities at BIHE",
  },
  {
    id: "scribes-examination",
    reverse: true,
    badge: "Examination Support",
    title: {
      lead: "Scribes And",
      accent: "Examination Support",
    },
    paragraphs: [
      {
        text: "The institution provides necessary support to students who face difficulty in writing examinations. Such students are permitted to take the assistance of scribes and are granted extra time during examinations, as per Government of Karnataka regulations and university guidelines.",
        emphasis: false,
      },
    ],
    bullets: [
      "The student may choose a scribe as per eligibility rules.",
      "The scribe should not possess the same subject or language qualification related to the examination being written.",
      "An additional 20 minutes per hour is allowed for physically challenged, blind, and hearing-impaired students.",
      "Answer scripts of hearing-impaired students are evaluated with special care, considering language and grammatical limitations.",
    ],
    image: images.studentLife.differentlyAbledScribeExamination,
    imageAlt:
      "Scribe assisting a differently abled student during examination support at BIHE",
  },
  {
    id: "special-teaching",
    badge: "Inclusive Teaching",
    title: {
      lead: "Special",
      accent: "Teaching",
    },
    paragraphs: [
      {
        text: "The institution adopts inclusive teaching and learning practices to enhance the academic experience of differently abled students, such as.",
        emphasis: false,
      },
    ],
    bullets: [
      "Campus-wide Wi-Fi facility.",
      "Language and phonetic laboratory support.",
      "Online teaching and recorded lectures.",
      "Online examinations and digital learning platforms.",
    ],
    image: images.studentLife.differentlyAbledSpecialTeaching,
    imageAlt:
      "Inclusive teaching with digital learning support for differently abled students at BIHE",
  },
  {
    id: "library-facilities",
    reverse: true,
    badge: "Library Access",
    title: {
      lead: "Library",
      accent: "Facilities",
    },
    paragraphs: [
      {
        text: "The college library is made accessible to differently abled students with the support of assistive technologies. Special facilities include.",
        emphasis: false,
      },
    ],
    bullets: [
      "Digital library access (in-campus and remote access).",
      "Computer laboratory access at the ground floor.",
      "Screen-reading software support.",
      "Access to free e-resources through library portals.",
      "All reference, issue/return, photocopying, printing, and computer facilities are conveniently located on the ground floor.",
    ],
    image: images.studentLife.differentlyAbledLibraryFacilities,
    imageAlt:
      "Accessible library facilities with peer support for differently abled students at BIHE",
  },
  {
    id: "reservation",
    hideVisual: true,
    hideBadge: true,
    badge: "Admission Policy",
    title: {
      lead: "Reservation And",
      accent: "Admission",
    },
    paragraphs: [
      {
        text: "Bapuji Institute of Hi-Tech Education ensures admission opportunities for differently abled students through the reservation quota prescribed by the Government of Karnataka. Reservation and relaxation in eligibility criteria are provided as per state government and university norms applicable from time to time.",
        emphasis: false,
      },
    ],
    closingHighlight: DIFFERENTLY_ABLED_CLOSING_HIGHLIGHT,
    image: images.aboutMain,
    imageAlt: "BIHE campus supporting inclusive admission policies",
  },
];
