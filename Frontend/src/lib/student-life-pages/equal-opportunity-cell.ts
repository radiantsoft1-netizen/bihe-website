import type { StudentLifeRichPageConfig } from "./types";

export const EQUAL_OPPORTUNITY_PAGE: StudentLifeRichPageConfig = {
  slug: "equal-opportunity-cell",
  currentPage: "Equal Opportunity Cell",
  title: "Equal Opportunity Cell",
  lead:
    "Promoting equity, inclusion, and equal access to academic and campus opportunities.",
  intro: {
    title: "Equal Opportunity Cell",
    paragraphs: [
      "In accordance with the guidelines issued by the University Grants Commission (UGC) and the Ministry of Education, Government of India, Bapuji Institute of Hi-Tech Education (BIHE), Davangere has established an Equal Opportunity Cell to promote inclusiveness and equity on campus. The Cell focuses on supporting students from disadvantaged and deprived groups such as SC, ST, OBC, Minority communities including Jain, and Persons with Disabilities by facilitating their academic, social and personal development. It oversees the effective implementation of policies and programmes meant for these groups and provides guidance and counselling related to academic progress, financial assistance, career development and social well-being. Through its initiatives, the Equal Opportunity Cell strives to enhance diversity, ensure equal access to institutional resources, and create a supportive environment that enables all students to mainstream themselves successfully.",
    ],
  },
  tables: [
    {
      id: "committee",
      title: "Equal Opportunity Cell Committee Members",
      caption: "Equal opportunity cell committee",
      columns: [
        { key: "slNo", header: "SL. NO." },
        { key: "name", header: "Name" },
        { key: "designation", header: "Designation" },
        { key: "profession", header: "Profession" },
        { key: "mobile", header: "Mobile" },
      ],
      rows: [
        { id: "1", slNo: "01", name: "Dr. B. veerappa", designation: "Chairperson", profession: "Principal", mobile: "9844260695" },
        { id: "2", slNo: "02", name: "Nagaraj B S", designation: "Co-ordinator", profession: "Asst.Professor", mobile: "9886696272" },
        { id: "3", slNo: "03", name: "Bakkesh K S", designation: "Program Advisor", profession: "Asst.Professor", mobile: "9008765418" },
        { id: "4", slNo: "04", name: "Sidasivappa G R", designation: "Convener", profession: "Physical Director", mobile: "9986917064" },
        { id: "6", slNo: "06", name: "Prashanthini B M", designation: "Member", profession: "Asst.Professor", mobile: "9206617784" },
      ],
    },
  ],
  sections: [
    {
      id: "objectives",
      title: "Objectives",
      paragraphs: [
        "The Equal Opportunity Cell of Bapuji Institute of Hi-Tech Education (BIHE), Davangere functions with the objective of ensuring equity and equal opportunity to the community at large within the Institute and promoting social inclusion. The Cell works towards enhancing diversity among students as well as teaching and non-teaching staff while eliminating any perception of discrimination. It strives to create a socially congenial atmosphere that supports academic interaction and fosters healthy interpersonal relationships among students from varied social and cultural backgrounds.",
        "The Cell makes continuous efforts to sensitize the academic community about issues related to social exclusion and the aspirations of marginalized sections of society. It provides support to individuals or groups of students belonging to disadvantaged sections in addressing concerns related to discrimination and looks into grievances of the weaker sections, suggesting amicable and appropriate solutions. The Cell also disseminates information related to government and institutional schemes, programmes, notifications, memoranda and office orders issued from time to time for the welfare of socially weaker sections.",
        "The Equal Opportunity Cell facilitates the preparation of barrier-free procedures for admission and registration of students from disadvantaged groups and establishes coordination with government bodies and other agencies to mobilize academic and financial resources to assist such students. It organizes periodic meetings to monitor the progress of various welfare schemes and adopts suitable measures to ensure due representation and utilization of opportunities by SC/ST communities in admissions and in teaching and non-teaching recruitments, while also striving to improve their academic and professional performance.",
        "The Cell works in accordance with the guidelines issued by the University Grants Commission with regard to Equal Opportunity Cells and continuously sensitizes the institution on issues concerning SC/ST and other disadvantaged groups. It conducts a minimum of one meeting and one awareness or outreach activity in each semester and submits a written report of its activities to the Director, IIST.",
      ],
    },
    {
      id: "highlights",
      title: "Key Highlights",
      subsections: [
        {
          title: "Establishment and Purpose",
          bullets: [
            "Formed in accordance with UGC and Ministry of Education guidelines.",
            "Aims to promote equity, inclusiveness, and diversity on campus.",
            "Focuses on ensuring equal access to academic and institutional resources.",
          ],
        },
        {
          title: "Target Groups",
          bullets: [
            "Students from SC, ST, OBC, Minority communities (including Jain) and Persons with Disabilities (PwD).",
            "Supports their academic, social, and personal development.",
          ],
        },
        {
          title: "Establishment and Purpose",
          span: "full",
          bulletColumns: 2,
          bullets: [
            "Implements policies and welfare programmes for disadvantaged groups.",
            "Provides guidance, counselling, and career development support.",
            "Sensitizes the campus community about social inclusion and anti-discrimination.",
            "Addresses grievances and suggests appropriate resolutions.",
            "Disseminates information on government/institutional schemes and financial assistance.",
            "Ensures barrier-free admission and registration procedures.",
            "Coordinates with government bodies and agencies for resource mobilization.",
            "Monitors representation and utilization of opportunities for marginalized groups.",
            "Conducts meetings and awareness/outreach programmes each semester.",
            "Submits annual/semester activity reports to the Director, IIST.",
          ],
        },
        {
          title: "Overall Objective",
          span: "full",
          variant: "objective",
          paragraphs: [
            "To create a socially congenial and inclusive campus environment that nurtures academic interaction, mutual respect, and professional growth among students from varied backgrounds.",
          ],
        },
      ],
    },
  ],
};
