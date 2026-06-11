import type { AcademicLeadershipShowcase } from "@/lib/academic-leadership-types";
import { images } from "@/lib/images";

export const BCA_LEADERSHIP_PAGE_LEAD =
  "Academic leadership, department coordination, and student welfare for the Bachelor of Computer Applications programme at BIHE.";

export const BCA_LEADERSHIP_SHOWCASES: readonly AcademicLeadershipShowcase[] = [
  {
    id: "vice-principal",
    profile: {
      name: "Mr. Siddalingappa K.",
      titleLine: "Vice Principal, Bapuji Institute of Hi-Tech Education",
      qualifications: "PGDCA, M.Sc. (IT) · 22 Years Experience",
    },
    badge: "Vice Principal",
    title: {
      lead: "Academic leadership with",
      accent: "university board expertise",
    },
    paragraphs: [
      {
        text: "Mr. Siddalingappa K. holds qualifications in PGDCA and M.Sc. (Information Technology) and has 22 years of teaching experience.",
        emphasis: false,
      },
      {
        text: "He is serving at Bapuji Institute of High Tech Education and is also a Board of Examiners (BoE) Member at Davangere University.",
        emphasis: true,
      },
    ],
    image: images.bcaVicePrincipal,
    imageAlt: "Mr. Siddalingappa K., Vice Principal at BIHE",
  },
  {
    id: "hod",
    reverse: true,
    profile: {
      name: "Mr. Bakkesh K. S.",
      titleLine: "Asst. Prof. & Head of the Department, BIHE",
      qualifications: "MCA · 14 Years Experience",
    },
    badge: "Head of Department (HOD)",
    title: {
      lead: "Leading the BCA department with",
      accent: "academic and professional focus",
    },
    paragraphs: [
      {
        text: "Mr. Bakkesh K. S. is serving as an Assistant Professor and Head of the Department at Bapuji Institute of Hi-Tech Education.",
        emphasis: false,
      },
      {
        text: "He holds a Master of Computer Applications (MCA) and has 14 years of teaching experience.",
        emphasis: true,
      },
    ],
    image: images.bcaHod,
    imageAlt: "Mr. Bakkesh K. S., Head of Department for BCA at BIHE",
  },
  {
    id: "student-dean",
    profile: {
      name: "Ms. Vindhya S.",
      titleLine: "Asst. Prof. & Dean of Students' Welfare, BIHE",
      qualifications: "B.E. (Computer Science) · 24 Years Experience",
    },
    badge: "Student Dean",
    title: {
      lead: "Committed to student welfare and",
      accent: "holistic academic development",
    },
    paragraphs: [
      {
        text: "Ms. Vindhya S. is serving as an Assistant Professor and Dean of Students' Welfare at the institution. She holds a Bachelor of Engineering (B.E.) in Computer Science and brings with her 24 years of rich teaching and academic experience.",
        emphasis: false,
      },
      {
        text: "Her extensive experience and commitment to student development significantly contribute to academic excellence and student welfare initiatives.",
        emphasis: true,
      },
    ],
    image: images.bcaDean,
    imageAlt: "Ms. Vindhya S., Dean of Students' Welfare at BIHE",
  },
] as const;
