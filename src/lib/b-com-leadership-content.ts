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
        text: "Dr. Swamy Tribhuvananda H. V. is associated with the Bapuji Management and Research Center. He holds qualifications in MBA, MHRM, and Ph.D., and has 24 years of extensive teaching and research experience in the fields of management and human resource development.",
        emphasis: false,
      },
      {
        text: "He has published several research papers and articles in reputed national and international journals, contributing significantly to academic advancement and research development. His work reflects a strong commitment to scholarly excellence, knowledge dissemination, and continuous academic growth.",
        emphasis: false,
      },
      {
        text: "He is actively involved in research guidance, academic mentoring, and institutional development activities, thereby playing an important role in strengthening the research culture of the institution.",
        emphasis: false,
      },
    ],
    image: images.bcomHod,
    imageAlt: "Dr. Swamy Tribhuvananda H. V., Head of Department for B.Com at BIHE",
  },
] as const;
