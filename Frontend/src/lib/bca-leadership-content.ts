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
        text: "Mr. Siddalingappa K. holds the qualifications of PGDCA and M.Sc. (Information Technology) and has 22 years of rich teaching experience in the field of Information Technology and Computer Applications. He is currently serving at Bapuji Institute of High Tech Education, where he is actively involved in academic teaching, student mentoring, and institutional development activities.",
        emphasis: false,
      },
      {
        text: "In addition to his teaching responsibilities, he serves as a Board of Examiners (BoE) Member at Davangere University, contributing to the academic governance and evaluation process. In this role, he is involved in curriculum review, question paper setting, and ensuring the quality and standards of examinations.",
        emphasis: false,
      },
      {
        text: "He has also participated in various academic initiatives, workshops, and faculty development programs aimed at enhancing teaching methodologies and keeping pace with advancements in the field of Information Technology.",
        emphasis: false,
      },
      {
        text: "His contributions to academia reflect his commitment to academic excellence, quality education, and continuous professional development, making him a valuable asset to the institution and the university system.",
        emphasis: false,
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
        text: "Mr. Bakkesh K. S. is serving as an Assistant Professor and Head of the Department at Bapuji Institute of Hi-Tech Education. He holds a Master of Computer Applications (MCA) degree and has 14 years of teaching experience in the field of Computer Applications and Information Technology.",
        emphasis: false,
      },
      {
        text: "He is actively involved in academic planning, curriculum delivery, and departmental administration. As Head of the Department, he plays a key role in coordinating academic activities, mentoring faculty members, and guiding students toward academic excellence.",
        emphasis: false,
      },
      {
        text: "He also contributes to institutional development through participation in academic committees, examination duties, and other administrative responsibilities, ensuring the smooth functioning of the department.",
        emphasis: false,
      },
      {
        text: "His dedication to teaching and leadership reflects his commitment to maintaining high academic standards and fostering a productive learning environment within the institution.",
        emphasis: false,
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
        text: "Ms. Vindhya S. is serving as an Assistant Professor and Dean of Students' Welfare at the institution. She holds a Bachelor of Engineering (B.E.) degree in Computer Science and brings with her 24 years of rich teaching and academic experience.",
        emphasis: false,
      },
      {
        text: "She plays a significant role in promoting student development, welfare activities, and mentoring initiatives within the institution. In her capacity as Dean of Students' Welfare, she actively addresses student concerns, supports academic and personal growth, and helps create a supportive and inclusive campus environment.",
        emphasis: false,
      },
      {
        text: "Her extensive experience and dedication to education contribute significantly to academic excellence, institutional discipline, and the overall development of students. She is also involved in various academic and administrative responsibilities, ensuring the smooth functioning of institutional activities.",
        emphasis: false,
      },
    ],
    image: images.bcaDean,
    imageAlt: "Ms. Vindhya S., Dean of Students' Welfare at BIHE",
  },
] as const;
