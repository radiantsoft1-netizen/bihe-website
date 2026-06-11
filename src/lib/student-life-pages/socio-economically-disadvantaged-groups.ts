import type { StudentLifeRichPageConfig } from "./types";

export const SEDG_PAGE: StudentLifeRichPageConfig = {
  slug: "socio-economically-disadvantaged-groups",
  currentPage: "Socio-Economically Disadvantaged Groups",
  title: "Socio-Economically Disadvantaged Groups",
  lead:
    "Support schemes and welfare measures for students from socio-economically disadvantaged backgrounds.",
  intro: {
    title: "Socio-Economically Disadvantaged Groups (SEDG) Cell",
    paragraphs: [
      "In accordance with the guidelines issued by the University Grants Commission (UGC) and Davangere University, to provide equitable opportunities for Socio-Economically Disadvantaged Groups (SEDGs) in Higher Education Institutions (HEIs), a Socio-Economically Disadvantaged Groups Cell (SEDG Cell) has been constituted at Bapuji Institute of Hi-Tech Education (BIHE), Davangere, for the welfare and support of BCA students.",
    ],
  },
  tables: [
    {
      id: "committee",
      title: "Committee Members",
      caption: "SEDGs cell committee members",
      columns: [
        { key: "slNo", header: "SL. NO." },
        { key: "name", header: "Name" },
        { key: "designation", header: "Designation" },
        { key: "status", header: "Status" },
        { key: "mobile", header: "Mobile" },
      ],
      rows: [
        { id: "1", slNo: "01", name: "Dr.B. Veerappa", designation: "Chairperson", status: "Principal", mobile: "9844260695" },
        { id: "2", slNo: "02", name: "Nagaraj B S", designation: "Co-ordinator", status: "Asst.Professor", mobile: "9886696272" },
        { id: "3", slNo: "03", name: "Bakkesh K S", designation: "Program Advisor", status: "Asst.Professor", mobile: "9008765418" },
        { id: "4", slNo: "04", name: "Prashanthini B M", designation: "Member", status: "Asst.Professor", mobile: "9206617784" },
      ],
    },
  ],
  sections: [
    {
      id: "role",
      title: "Role of the SEDG Cell",
      paragraphs: [
        "The SEDG Cell at BIHE is responsible for coordinating with various existing cells and statutory bodies within the institution to ensure the effective implementation of schemes and provisions, including scholarships and fellowships offered by the Government of India, State Government, and BIHE Management.",
        "The SEDG Cell functions in alignment with the guidelines prescribed by the University Grants Commission (UGC) and Davangere University to support and empower socially and economically disadvantaged students. It actively facilitates access to educational opportunities, financial assistance, and academic support programmes to foster an inclusive and equitable learning environment for BCA students.",
      ],
    },
    {
      id: "objectives",
      title: "Objectives of the SEDG Cell",
      bullets: [
        "To protect the constitutional rights of students belonging to SEDGs.",
        "To ensure that the institution is inclusive, safe, and secure for SEDG students.",
        "To provide socio-emotional and academic support through counselling and mentoring programmes.",
        "To ensure proper implementation and monitoring of orientation and bridge courses.",
        "To enhance participation of SEDG students in academic and co-curricular activities.",
        "To ensure implementation of Government policies, including reservation and welfare schemes.",
        "To develop outreach programmes enabling SEDG students to access academic opportunities.",
        "To circulate, publicize, and monitor UGC and Davangere University guidelines related to SEDGs.",
        "To redress grievances of SEDG students within 15 days through the Grievance Redressal Committee (GRC) while maintaining confidentiality and dignity.",
      ],
    },
  ],
};
