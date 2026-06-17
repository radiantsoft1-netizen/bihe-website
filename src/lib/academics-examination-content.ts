export const ACADEMICS_EXAMINATION_PAGE_LEAD =
  "Examination conduct, evaluation norms, and academic regulations at Bapuji Institute of Hi-Tech Education.";

export const ACADEMICS_EXAMINATION_INTRO_TITLE = "EXAMINATIONS";

export const ACADEMICS_EXAMINATION_INTRO =
  "BIHE follows the academic and examination guidelines of DAVANAGERE UNIVERSITY. Assignments, Internal examinations and University Examinations are conducted for the evaluation of student progress.";

export const ACADEMICS_EXAMINATION_AUDIENCE =
  "These are addressed for all the students and faculty";

export type ExamQuickLink = {
  id: string;
  title: string;
  description: string;
  href: string;
};

export const ACADEMICS_EXAMINATION_QUICK_LINKS: readonly ExamQuickLink[] = [
  {
    id: "calendar",
    title: "Academic Calendar",
    description: "Semester schedules, examination timelines, and key academic dates.",
    href: "/academics/academic-calendar",
  },
  {
    id: "controller",
    title: "Controller of Examination",
    description: "Examination section staff, duties, and institutional exam coordination.",
    href: "/controller-of-examination",
  },
] as const;

export type ExamImageSlug =
  | "examInternalMain"
  | "examInternalPanel1"
  | "examInternalPanel2"
  | "examUniversityMain"
  | "examUniversityPanel1"
  | "examUniversityPanel2";

export type ExamGalleryImage = {
  imageSlug: ExamImageSlug;
  alt: string;
  layout: "main" | "accent-a" | "accent-b";
};

export type ExamRuleGroup = {
  title: string;
  rules: readonly string[];
  fullWidth?: boolean;
};

export type ExamStatuteSection = {
  id: string;
  badge: string;
  title: string;
  ruleGroups: readonly ExamRuleGroup[];
  gallery: readonly ExamGalleryImage[];
};

export const EXAM_STATUTE_SECTIONS: readonly ExamStatuteSection[] = [
  {
    id: "internal",
    badge: "Internal Assessment",
    title: "Statutes for Internal Examinations at college level",
    gallery: [
      {
        imageSlug: "examInternalMain",
        alt: "Student writing during an internal examination",
        layout: "main",
      },
      {
        imageSlug: "examInternalPanel1",
        alt: "Student concentrating while writing an examination paper",
        layout: "accent-a",
      },
      {
        imageSlug: "examInternalPanel2",
        alt: "Students writing answers during an internal assessment",
        layout: "accent-b",
      },
    ],
    ruleGroups: [
      {
        title: "Schedule & Entry",
        rules: [
          "The internal examinations are generally scheduled in the Morning and afternoon session starting from 9:00 am to 12:30 pm and 02:00 pm to 05:00 pm.",
          "The students should bring their identity card on all days of examination. Those students who do not have their ID cards must get prior permission from the HOD and Principal.",
          "Students are permitted to enter the examination hall only 10 minutes prior to the exams.",
          "Students are not allowed to enter the hall later than 15 minutes from the commencement of the Examination.",
        ],
      },
      {
        title: "Belongings & Materials",
        rules: [
          "All bags, mobiles etc. are kept outside the room before taking their seats.",
          "Students are not allowed write anything on question paper. If found anyone to do so exam is cancelled.",
          "Students should bring their own stationeries calculators, etc. borrowing is not permitted without the permission of the invigilator.",
        ],
      },
      {
        title: "Conduct in the Hall",
        rules: [
          "Any question / doubt should be addressed only to the invigilator of the concerned exam hall.",
          "Students are not permitted to write anything pertaining to the exams on the desks or benches.",
          "For any malpractice reported by the invigilator, the student should follow the instructions of the examination.",
        ],
      },
      {
        title: "Invigilation & Oversight",
        fullWidth: true,
        rules: [
          "No extra time should be allowed for anyone.",
          "Invigilators must do full signature with date in all the copies.",
          "The sudden supervisory rounds must be done by the respective HOD and/or Principal.",
          "If any student is sick in any sorts, separate examination hall should be allocated for them with evidential support of medical documents.",
        ],
      },
    ],
  },
  {
    id: "university",
    badge: "University Examination",
    title: "Statutes for University Examination",
    gallery: [
      {
        imageSlug: "examUniversityMain",
        alt: "Male college student studying with a laptop in a classroom",
        layout: "main",
      },
      {
        imageSlug: "examUniversityPanel1",
        alt: "University student studying and writing during an examination",
        layout: "accent-a",
      },
      {
        imageSlug: "examUniversityPanel2",
        alt: "Student concentrating while working on examination answers",
        layout: "accent-b",
      },
    ],
    ruleGroups: [
      {
        title: "Arrival & Timings",
        rules: [
          "Candidate should arrive at the Examination Hall 15 minutes before start of examination.",
          "No candidate will be allowed to enter the Hall beyond 30 minutes after start of examination (no additional time will be allowed for the delay).",
        ],
      },
      {
        title: "Prohibited Items",
        rules: [
          "Candidate should not carry any electronic gadgets/devices like mobile phone (even in switched off mode), calculator (except the papers for which it is allowable), scanner pen, smart watches, blue tooth, wearable technical devices etc. in the Hall.",
          "Students are permitted to bring admit card, drinking water in a transparent bottle and pen/pencil/transparent ruler/eraser into the Hall provided they are placed in a transparent bag/pouch.",
        ],
      },
      {
        title: "Hall Conduct & Seating",
        rules: [
          "Students must comply with all directions given by examination supervisors/invigilators, instructions printed on the Admit Card, Examination/Question papers and Notice displayed in/or outside the Hall/Venue.",
          "Candidates should remain seated until all the papers are collected and permitted to leave. They are not allowed to leave Hall during the last 15 minutes. The responsibility to hand over the answer scripts to the invigilators lies with the candidate.",
          "Candidate should sit only on his/her allotted seat and should not change the seat any time.",
          "Candidates are not permitted to communicate with other candidates verbally, in writing or via any electronic or other means, cheat or attempt to cheat by copying in any form or use of any unfair means, remove/tear/detach examination answer books or other papers.",
        ],
      },
      {
        title: "Answer Scripts & Integrity",
        fullWidth: true,
        rules: [
          "Possession of any unauthorized materials in the Hall is an offence. Any material or item on a student's desk/seat or person will be deemed to be in that student's possession.",
          "Candidates are prohibited from writing their names, registration number, roll number, any sign/comment/prayers in any form/language/symbol on any part of the answer scripts except in the space provided in the Title page of the answer scripts/loose sheets.",
          "Infringement of any of the above-mentioned instructions shall entail disciplinary action against the candidate including debarment from future examinations/selections.",
          "Wherever separate answer book is given to answer a particular group, candidates should clearly indicate the group on its front page and answers of all questions of the said group are written in that book only. They should clearly mention question number/subsection on the left-hand margin for each attempted answer.",
        ],
      },
      {
        title: "Oversight & Practical Exams",
        rules: [
          "The University Observers/Representatives are empowered to check any candidate in the Hall and outside the Hall for detecting malpractices.",
          "During Oral/Viva-voce/Practical examination candidates have to carry their own dissertation and/or log book (if applicable).",
        ],
      },
    ],
  },
] as const;
