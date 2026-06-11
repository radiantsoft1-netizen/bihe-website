export const CONTROLLER_OF_EXAMINATION_PAGE_LEAD =
  "Examination planning, conduct, and academic records at Bapuji Institute of Hi-Tech Education.";

export const CONTROLLER_EXAM_SECTION_TITLE = "Controller of Examination: Exam Section";

export const CONTROLLER_EXAM_SECTION_INTRO =
  "The examination section plays a vital role in planning, conducting, and coordinating all examination-related activities of the college. The Principal of the college acts as the Chief Superintendent of examinations. The examination section staff comprising Mr. Shivaraj N S, Mr. Megharaj R S, and Mr. Santhosh Y assist in the smooth conduct of examinations as per university norms and guidelines.";

export const CONTROLLER_EXAM_STAFF = [
  { slNo: "01", name: "Mr. Shivaraj N S", role: "Chief Superintendent" },
  { slNo: "02", name: "Mr. Megharaj R S", role: "FDA (Exam)" },
  { slNo: "03", name: "Mr. Santhosh Y", role: "SDA (Exam)" },
] as const;

export const CONTROLLER_EXAM_SUCCESS_NOTE =
  "For the academic year 2023-24 the examination section of Bapuji Institute of Hi-Tech Education was conducted successfully under the supervision of the college examination committee.";

export const CONTROLLER_WORK_ALLOTMENT = {
  institute: "BAPUJI INSTITUTE OF HI-TECH EDUCATION, DAVANGERE-04",
  title: "OFFICE WORK ALLOTMENT FOR THEORY EXAMINATION 2024-25 (AT EXAM TIME)",
  roles: [
    {
      title: "Clerk - Ashok M S",
      duties: [
        "Receiving mail and personal communications from the university and distributing them to sub-staff.",
        "Entering student data in the register as received from the university.",
        "Assignment of student seat numbers to sub-staff for hall ticket preparation.",
        "Maintenance of all examination fee records.",
        "Collecting the prescribed fees from the university and remitting them without delay.",
        "Preparation and distribution of hall tickets.",
        "Any task in the college up to completion of examination work.",
      ],
    },
    {
      title: "Clerk - Megharaj R S",
      duties: [
        "Arrangement of answer booklets and other examination materials.",
        "Examination fee collection and maintenance of related records.",
        "Preparation of seating arrangement and room charts.",
        "Coordination with invigilators and supervisory staff during examinations.",
        "Any task in the college up to completion of examination work.",
      ],
    },
    {
      title: "Typist - Santhosh Y",
      duties: [
        "Preparation of invigilators' list.",
        "Preparation of remuneration bills for examination duty staff.",
        "Typing of examination-related documents and dispatch forms.",
        "Distribution of stationery required for examinations.",
        "Any task in the college up to completion of examination work.",
      ],
    },
    {
      title: "Principal / Chief Superintendent",
      duties: [],
      document: {
        title: "Chief Superintendent — Office Work Allotment",
        description:
          "Principal / Chief Superintendent responsibilities for theory examination (2024–25).",
        href: "/documents/chief-superintendent-examination-allotment.pdf",
        fileName: "chief-superintendent-examination-allotment.pdf",
        actionLabel: "Click Here",
      },
    },
  ],
} as const;
