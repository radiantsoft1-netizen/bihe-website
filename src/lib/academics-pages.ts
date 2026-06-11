import { COURSES } from "@/lib/courses-content";
import { ACADEMICS_SUBMENU } from "@/lib/academics-submenu";

export type AcademicsPageConfig = {
  slug: string;
  currentPage: string;
  title: string;
  lead: string;
  introBadge: string;
  introTitle: string;
  paragraphs: string[];
};

const bcaCourse = COURSES.find((course) => course.code === "BCA")!;
const bComCourse = COURSES.find((course) => course.code === "B.Com")!;

const ACADEMICS_PAGE_CONTENT: Record<string, AcademicsPageConfig> = {
  "b-com": {
    slug: "b-com",
    currentPage: "B.COM",
    title: "Bachelor of Commerce",
    lead: bComCourse.description,
    introBadge: "Academics",
    introTitle: bComCourse.name,
    paragraphs: [
      bComCourse.description,
      `The ${bComCourse.code} programme is a ${bComCourse.meta.join(", ")} undergraduate course affiliated to Davangere University, designed to build strong foundations in commerce, accounting, finance, and management.`,
      "Students gain analytical and decision-making skills through classroom learning, practical assignments, and career-oriented guidance from the department faculty.",
    ],
  },
  bca: {
    slug: "bca",
    currentPage: "BCA",
    title: "Bachelor of Computer Applications",
    lead: bcaCourse.description,
    introBadge: "Academics",
    introTitle: bcaCourse.name,
    paragraphs: [
      bcaCourse.description,
      `The ${bcaCourse.code} programme is a ${bcaCourse.meta.join(", ")} undergraduate course affiliated to Davangere University, with access to modern computer laboratories and industry-aligned learning.`,
      "The curriculum prepares students for careers in software development, information technology, and further studies in computer applications.",
    ],
  },
  "academic-calendar": {
    slug: "academic-calendar",
    currentPage: "Academic Calendar",
    title: "Academic Calendar",
    lead: "Semester schedules, holidays, and examination timelines for BIHE programmes.",
    introBadge: "Academics",
    introTitle: "Key academic dates",
    paragraphs: [
      "The academic calendar outlines semester commencement, internal assessment periods, university examinations, and institutional holidays for BCA and B.Com students.",
      "Students are advised to follow notices from the examination cell and respective departments for updates to schedules and examination timetables.",
    ],
  },
  "academics-and-examination": {
    slug: "academics-and-examination",
    currentPage: "Academics & Examination",
    title: "Academics & Examination",
    lead: "Examination conduct, evaluation norms, and academic regulations at BIHE.",
    introBadge: "Academics",
    introTitle: "Examination framework",
    paragraphs: [
      "BIHE follows Davangere University examination guidelines for end-semester examinations, internal assessments, and result processing.",
      "The Controller of Examination coordinates schedules, hall tickets, and academic records in consultation with programme departments and university authorities.",
    ],
  },
  "faculty-and-staff": {
    slug: "faculty-and-staff",
    currentPage: "Faculty And Staff Details",
    title: "Faculty And Staff Details",
    lead: "Academic faculty and departmental staff supporting BCA and B.Com programmes.",
    introBadge: "Academics",
    introTitle: "Our academic team",
    paragraphs: [
      "BIHE is supported by experienced faculty members across Computer Applications and Commerce disciplines, along with administrative and student-support staff.",
      "Department heads and programme coordinators guide academic planning, mentoring, and day-to-day coordination for undergraduate students.",
    ],
  },
  iqac: {
    slug: "iqac",
    currentPage: "Internal Quality Assurance Cell",
    title: "Internal Quality Assurance Cell",
    lead: "Quality assurance, academic benchmarking, and continuous improvement at BIHE.",
    introBadge: "Academics",
    introTitle: "IQAC at BIHE",
    paragraphs: [
      "The Internal Quality Assurance Cell promotes institutional quality through academic audits, feedback mechanisms, and best-practice initiatives.",
      "IQAC works with departments to strengthen teaching–learning processes, documentation, and accreditation-related quality benchmarks.",
    ],
  },
  library: {
    slug: "library",
    currentPage: "Library",
    title: "Library",
    lead: "Digital and print learning resources for BCA and B.Com students.",
    introBadge: "Academics",
    introTitle: "Library & learning resources",
    paragraphs: [
      "The BIHE library provides textbooks, reference materials, journals, and quiet study spaces to support coursework and research.",
      "Students can access curated print collections and digital resources aligned with university syllabus requirements and programme needs.",
    ],
  },
};

export const ACADEMICS_PAGE_SLUGS = ACADEMICS_SUBMENU.map((item) => item.slug);

export function getAcademicsPage(slug: string): AcademicsPageConfig | undefined {
  return ACADEMICS_PAGE_CONTENT[slug];
}
