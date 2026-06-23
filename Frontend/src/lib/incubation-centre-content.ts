import { images } from "@/lib/images";

export const IC_PAGE_LEAD =
  "Fostering innovation, entrepreneurship, and startup development among BIHE students and faculty.";

export type IncubationImageCard = {
  src: string;
  alt: string;
  tone?: "gold" | "lavender" | "navy" | "aqua";
};

export type IncubationShowcaseSection = {
  id: string;
  badge: string;
  floatBadge: string;
  title: string;
  paragraphs: readonly string[];
  imageCards: readonly IncubationImageCard[];
  reverse?: boolean;
};

export const IC_WHY_SECTION: IncubationShowcaseSection = {
  id: "why-bihe",
  badge: "Innovation",
  floatBadge: "Innovation Hub",
  title: "Why BIHE need Incubation Centre",
  paragraphs: [
    "In today's competitive academic environment, students need more than classroom learning to succeed as innovators and entrepreneurs. An Incubation Centre at Bapuji Institute of Hi-Tech Education bridges the gap between academic knowledge and real-world venture creation.",
    "The centre provides structured mentorship, collaborative workspace, and industry exposure so that students can test ideas, build prototypes, and develop the confidence to launch sustainable enterprises while pursuing their undergraduate programmes.",
  ],
  imageCards: [
    {
      src: images.incubationWhyPrimary,
      alt: "BIHE students collaborating on an innovation project",
      tone: "navy",
    },
    {
      src: images.incubationWhySecondary,
      alt: "Students collaborating during a classroom session at BIHE",
      tone: "lavender",
    },
  ],
};

export const IC_BENEFICIARY_SECTION: IncubationShowcaseSection = {
  id: "beneficiary",
  badge: "Student Benefits",
  floatBadge: "Student Impact",
  title: "Beneficiary of this Centre for the students under BIHE",
  reverse: true,
  paragraphs: [
    "The Incubation Centre helps students transform their ideas into real-world solutions through access to mentorship, technical support, and industry networks. Students gain opportunities for skill development, internships, funding support, and business guidance, which enhance their employability, leadership abilities, and confidence to become job creators rather than job seekers.",
  ],
  imageCards: [
    {
      src: images.incubationBeneficiaryPrimary,
      alt: "Students and faculty collaborating during an incubation mentoring session",
      tone: "navy",
    },
    {
      src: images.incubationBeneficiarySecondary,
      alt: "Faculty mentoring students during an incubation session",
      tone: "gold",
    },
  ],
};

export const IC_CELL_BANNER = {
  title: "Incubation cell",
  paragraphs: [
    "An Incubation Centre is an institutional platform designed to support the growth and development of start-ups, entrepreneurs, and early-stage enterprises. It provides a structured ecosystem that nurtures innovative ideas and helps transform them into sustainable and scalable businesses.",
    "Incubation centers are commonly established within universities, research institutions, corporate organizations, or as independent entities supported by government and private agencies.",
  ],
} as const;

export const IC_COMMITTEE_TITLE = "Committee Members";

export const IC_COMMITTEE_MEMBERS = [
  {
    slNo: "01",
    name: "Karthik M",
    designation: "Co-ordinator",
    profession: "Asst.Professor",
  },
  {
    slNo: "02",
    name: "Syed Azher Nadeem Pasha",
    designation: "Member",
    profession: "Asst.Professor",
  },
  {
    slNo: "03",
    name: "Veerendra K Y",
    designation: "Professional Student Counselor",
    profession: "Asst.Professor",
  },
  {
    slNo: "04",
    name: "Kiran N V",
    designation: "Co-opted member",
    profession: "Asst.Professor",
  },
  {
    slNo: "05",
    name: "Mouna B G",
    designation: "Member",
    profession: "Asst.Professor",
  },
] as const;

export const IC_OBJECTIVES_TITLE = "Objectives of an Incubation Centre";

export const IC_OBJECTIVES = [
  "Nurture innovation and entrepreneurship among students and faculty.",
  "Provide mentorship, infrastructure, and funding guidance for early-stage ventures.",
  "Facilitate industry–academia collaboration and technology commercialization.",
  "Support prototype development, market validation, and business planning.",
  "Create employment opportunities through new venture creation and skill development.",
] as const;

export const IC_CURRENT_STATUS_TITLE = "Current Status";

export const IC_CURRENT_STATUS =
  "The Incubation Centre is currently under process of establishment. The initial planning, coordination, and committee formation activities are underway. Upon completion, the centre will function as a dedicated hub for innovation, entrepreneurship development, and start-up support.";
