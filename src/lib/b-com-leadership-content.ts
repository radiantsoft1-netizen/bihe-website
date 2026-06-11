import type { AcademicLeadershipShowcase } from "@/lib/academic-leadership-types";
import { images } from "@/lib/images";

export const B_COM_LEADERSHIP_PAGE_LEAD =
  "Academic leadership, department coordination, and programme guidance for the Bachelor of Commerce at Bapuji Institute of Hi-Tech Education.";

export const B_COM_LEADERSHIP_SHOWCASES: readonly AcademicLeadershipShowcase[] = [
  {
    id: "hod",
    profile: {
      name: "Dr. Swamy Tribhuvananda H. V.",
      titleLine: "Asst. Prof. Head of the Department",
      qualifications: "MBA, MHRM, Ph.D. · 24 Years Experience",
    },
    badge: "Head of Department (HOD)",
    title: {
      lead: "Committed to academic excellence and",
      accent: "research development",
    },
    paragraphs: [
      {
        text: "Dr. Swamy Tribhuvananda H. V. is associated with Bapuji Management and Research Center. He holds qualifications in MBA, MHRM, and Ph.D., and has 24 years of teaching and research experience.",
        emphasis: false,
      },
      {
        text: "He has published several research papers and articles in reputed journals, contributing significantly to academic and research development.",
        emphasis: true,
      },
    ],
    image: images.bcomHod,
    imageAlt: "Dr. Swamy Tribhuvananda H. V., Head of Department for B.Com at BIHE",
  },
] as const;
