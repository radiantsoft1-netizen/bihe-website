import type { StudentLifeRichPageConfig } from "./types";

export const GRIEVANCE_PAGE_LEAD =
  "Fair, transparent, and responsive grievance redressal for students, faculty, and staff at BIHE.";

export const GRIEVANCE_PAGE_TITLE = "Student Grievance Redressal Committee";

export const GRIEVANCE_INTRO_TITLE = "Grievance Redressal and Welfare Committee";

export const GRIEVANCE_INTRO_PARAGRAPHS = [
  "The Grievance Redressal and Welfare Committee of Bapuji Institute of High Tech Education (BIHE) has been established to provide a fair, transparent, and effective mechanism for addressing the grievances and concerns of students, faculty members, and non-teaching staff. The committee functions with the objective of ensuring justice, promoting institutional accountability, and maintaining a healthy academic and work environment within the institution.",
  "The committee serves as an important platform for stakeholders to express their concerns and seek timely resolution of issues related to academics, administration, infrastructure, facilities, examinations, student services, workplace environment, and general welfare. It is committed to safeguarding the rights and interests of all members of the institution while fostering mutual respect, inclusiveness, and harmony.",
] as const;

export const GRIEVANCE_OBJECTIVES_TITLE = "Primary Objectives";

export const GRIEVANCE_OBJECTIVES = [
  "To provide a structured and accessible mechanism for grievance redressal.",
  "To ensure fair, impartial, and confidential handling of complaints.",
  "To promote a supportive and student-friendly academic environment.",
  "To address issues affecting the welfare and well-being of students and employees.",
  "To uphold the principles of natural justice, transparency, and accountability.",
  "To encourage constructive dialogue and amicable resolution of disputes.",
] as const;

export const GRIEVANCE_PROCESS_TITLE = "Grievance Handling Process";

export const GRIEVANCE_PROCESS_TEXT =
  "The committee receives grievances through formal applications, written complaints, online submissions, or direct representations from stakeholders. Upon receipt of a grievance, the committee examines the matter carefully, gathers relevant information, and undertakes necessary investigations while maintaining confidentiality and impartiality. Appropriate recommendations and corrective measures are then implemented to ensure effective resolution.";

export const GRIEVANCE_ISSUES_TITLE = "Issues Addressed";

export const GRIEVANCE_ISSUES = [
  "Academic-related concerns such as attendance, internal assessment, examinations, and academic support.",
  "Administrative matters and student service-related issues.",
  "Infrastructure and facility-related complaints.",
  "Hostel, transport, library, and campus amenities-related concerns.",
  "Employee welfare and workplace-related grievances.",
  "Issues affecting the overall well-being, safety, and comfort of students and staff.",
] as const;

export const GRIEVANCE_COMMITMENT_PARAGRAPHS = [
  "The Grievance Redressal and Welfare Committee also plays a proactive role in creating awareness about institutional policies, rights, responsibilities, and available support systems. Regular interactions, counselling sessions, and feedback mechanisms are encouraged to identify concerns at an early stage and prevent the escalation of issues.",
  "The committee functions in coordination with various statutory and non-statutory bodies of the institution, ensuring that grievances are addressed efficiently and in accordance with institutional regulations and applicable guidelines. Periodic reviews are conducted to evaluate the effectiveness of grievance redressal mechanisms and to recommend improvements wherever necessary.",
  "Through its commitment to fairness, transparency, and responsiveness, the Grievance Redressal and Welfare Committee contributes significantly to maintaining a positive institutional culture, strengthening stakeholder confidence, and promoting the overall welfare and development of the BIHE community.",
] as const;

export const GRIEVANCE_COMMITTEE_TITLE = "Committee Members";

export const GRIEVANCE_COMMITTEE_TABLE = {
  title: "Committee Members",
  caption: "Student grievance redressal committee members",
  columns: [
    { key: "slNo", header: "SL. NO." },
    { key: "name", header: "Name" },
    { key: "designation", header: "Designation" },
    { key: "status", header: "Status" },
    { key: "mobile", header: "Mobile" },
    { key: "email", header: "Email" },
  ],
  rows: [
    { id: "1", slNo: "01", name: "Dr. B. veerappa", designation: "Principal", status: "Chair Person", mobile: "9844260695", email: "bveerappa@gmail.com" },
    { id: "2", slNo: "02", name: "Bakkesh K S", designation: "Convener", status: "HOD", mobile: "9008765418", email: "bakkeshks@gmail.com" },
    { id: "3", slNo: "03", name: "Manjunatha K V", designation: "Assistant Professor", status: "CO-coordinator student counselor", mobile: "9972474118", email: "srigurukarunya@gmail.com" },
    { id: "4", slNo: "04", name: "Anup K G", designation: "Assistant Professor", status: "First Year BCA student counselor", mobile: "8296436397", email: "anupakira@gmail.com" },
    { id: "5", slNo: "05", name: "Kiran N V", designation: "Assistant Professor", status: "Second Year BCA student counselor", mobile: "9380982557", email: "kirannvv@gmail.com" },
    { id: "6", slNo: "06", name: "Nagaraj B S", designation: "Assistant Professor", status: "Third Year BCA student counselor", mobile: "9886696272", email: "reach2bs@gmail.com" },
    { id: "7", slNo: "07", name: "Tarun B S", designation: "Student", status: "Student Member", mobile: "8660594420", email: "traunbs@gmail.com" },
    { id: "8", slNo: "08", name: "Harshitha", designation: "Student", status: "Student Member", mobile: "7676287930", email: "harshitha12@gmail.com" },
  ],
} as const;

/** Kept for metadata and student-life service compatibility. */
export const GRIEVANCE_PAGE: StudentLifeRichPageConfig = {
  slug: "student-grievance-redressal-committee",
  currentPage: "Student Grievance Redressal Committee",
  title: GRIEVANCE_PAGE_TITLE,
  lead: GRIEVANCE_PAGE_LEAD,
  intro: {
    title: GRIEVANCE_INTRO_TITLE,
    paragraphs: GRIEVANCE_INTRO_PARAGRAPHS,
    bulletsTitle: "The primary objectives of the committee are:",
    bullets: GRIEVANCE_OBJECTIVES,
  },
  tables: [
    {
      id: "committee",
      title: GRIEVANCE_COMMITTEE_TABLE.title,
      caption: GRIEVANCE_COMMITTEE_TABLE.caption,
      columns: GRIEVANCE_COMMITTEE_TABLE.columns,
      rows: GRIEVANCE_COMMITTEE_TABLE.rows,
    },
  ],
};
