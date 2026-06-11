import type { StudentLifeRichPageConfig } from "./types";

export const GRIEVANCE_PAGE: StudentLifeRichPageConfig = {
  slug: "student-grievance-redressal-committee",
  currentPage: "Student Grievance Redressal Committee",
  title: "Student Grievance Redressal Committee",
  lead:
    "Fair and transparent grievance redressal for students in accordance with institutional policies.",
  intro: {
    title: "Details of Student Grievance Redressal Committee",
    paragraphs: [
      "The Grievance Redressal & Welfare Committee is established at Bapuji Institute of High Tech Education to ensure a fair, transparent, and supportive system for addressing grievances of students, faculty, and staff. The committee aims to maintain a harmonious academic environment by resolving issues related to academics, administration, facilities, and welfare, thereby ensuring justice and institutional accountability.",
    ],
  },
  tables: [
    {
      id: "committee",
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
    },
  ],
  sections: [
    {
      id: "outcome",
      title: "Outcome",
      paragraphs: [
        "The Grievance Redressal & Welfare Committee plays a vital role in ensuring equity, transparency, and well-being within the institution and contributes to a positive, student-centric, and staff-friendly academic ecosystem.",
      ],
    },
  ],
};
