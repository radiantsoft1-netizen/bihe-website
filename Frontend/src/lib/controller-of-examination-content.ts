export const CONTROLLER_OF_EXAMINATION_PAGE_LEAD =
  "Examination planning, conduct, and academic records at Bapuji Institute of Hi-Tech Education.";

export const CONTROLLER_EXAM_SECTION_TITLE = "Controller of Examination: Exam Section";

export const CONTROLLER_EXAM_SECTION_PARAGRAPHS = [
  "For the academic year 2024–25, the examinations at Bapuji Institute of Hi-Tech Education were conducted efficiently and systematically under the supervision of a dedicated Examination Committee. The committee ensured that all examinations were carried out in accordance with the rules, regulations, and guidelines prescribed by the university, maintaining fairness, transparency, and academic integrity throughout the examination process.",
  "Ms. Vindhya S. served as the Chief Superintendent and played a key role in overseeing the smooth conduct of examinations, ensuring strict adherence to examination procedures and university norms. Mr. Channegowda K. V., as the Office Superintendent, effectively coordinated all administrative and examination-related activities, including the preparation of examination schedules, distribution of confidential materials, and communication with the university authorities.",
  "The clerical responsibilities were diligently managed by Ms. Bhyramma N. (Clerk-1) and Ms. Meghana R. S. (Clerk-2), who maintained accurate records of student registrations, examination applications, attendance sheets, and result-related documentation. Their meticulous record-keeping contributed significantly to the smooth functioning of the examination process.",
  "Mr. Santhosh served as the Typist and provided timely and accurate typing support for examination notices, correspondence, reports, and other official documents. His contribution ensured the prompt preparation and dissemination of examination-related information.",
  "The Examination Committee also coordinated the seating arrangements, hall ticket distribution, invigilation schedules, collection and dispatch of answer scripts, and maintenance of confidential records. Special care was taken to create a disciplined and conducive environment for students appearing for examinations.",
  "The collective efforts, dedication, and teamwork of the entire examination staff contributed to the successful, transparent, and efficient conduct of both internal and university examinations during the academic year 2024–25, upholding the institution's commitment to academic excellence and quality assurance.",
] as const;

export const CONTROLLER_EXAM_STAFF = [
  { slNo: "01", name: "Ms. Vindhya S.", role: "Chief Superintendent" },
  { slNo: "02", name: "Mr. Channegowda K. V.", role: "Office Superintendent" },
  { slNo: "03", name: "Ms. Bhyramma N.", role: "Clerk-1" },
  { slNo: "04", name: "Ms. Meghana R. S.", role: "Clerk-2" },
  { slNo: "05", name: "Mr. Santhosh", role: "Typist" },
] as const;

export const CONTROLLER_EXAM_TABLE_NOTES = [
  "For the academic year 2024–25, the examinations at Bapuji Institute of Hi-Tech Education were conducted smoothly under the supervision of a well-organized examination committee.",
  "The collective efforts of the examination team contributed to the successful and transparent conduct of the examinations.",
] as const;

export const CONTROLLER_WORK_ALLOTMENT = {
  institute: "BAPUJI INSTITUTE OF HI-TECH EDUCATION, DAVANGERE-04",
  title: "OFFICE WORK ALLOTMENT FOR THEORY EXAMINATION 2024-25 (AT EXAM TIME)",
  roles: [
    {
      title: "Clerk - Ashok M S",
      duties: [
        "Receive theory and practical answer booklets from the University and intimate the respective laboratory instructors. Enter the serial numbers of the answer booklets in the stock register.",
        "Arrange the answer booklets room-wise for examination halls with fewer than 301 students.",
        "Maintain all examination-related documents and records.",
        "Collect the list of absent students room-wise (for examination halls with fewer than 301 students) and enter the details into the online software. Scan, print, and upload the required documents for each examination session.",
        "Dispatch answer sheet bundles: Generate and print the dispatch bundle entry report at the end of each examination. Obtain signatures from the Chief Superintendent (CS) and the Squad. Record the vehicle number and dispatch time after handing over the answer sheet bundles.",
        "Obtain students' examination eligibility details from the University.",
        "Remain in the college until the completion of all examination-related activities.",
      ],
    },
    {
      title: "Clerk-2 - Meghana R S",
      duties: [
        "Arrange the answer booklets room-wise, in coordination with Clerk-1, for examination halls having more than 301 students.",
        "Collect the list of absent students room-wise and hand it over to Clerk-1 for examination halls having more than 301 students.",
        "Take printouts of the examination timetable and submit them to the Chief Superintendent (CS) and Office Superintendent (OS) for any necessary corrections.",
        "Remain in the college until the completion of all examination-related activities.",
      ],
    },
    {
      title: "Typist - Santhosh Y",
      duties: [
        "Hall ticket printout & Distribution to the students",
        "Prepare the examination remuneration bill as per exam conducted date",
        "Ensure subject wise students count",
        "Examination file maintenance related to university",
        "Take room allotment dairy printout and seal it as per room wise.",
        "Indent of examination stationery.",
        "Prepare bundle dispatch documents after the examination.",
        "Stay back in the college up to completion of examination.",
      ],
    },
    {
      title: "Principal / Chief Superintendent",
      duties: [],
      document: {
        title: "For the Examination of 2024",
        description:
          "Official letter regarding the Principal's appointment as In-charge Chief Superintendent for theory examinations.",
        href: "/documents/for-the-examination-of-2024.pdf",
        fileName: "For the examination of 2024.docx.pdf",
        actionLabel: "Click Here",
      },
    },
  ],
} as const;
