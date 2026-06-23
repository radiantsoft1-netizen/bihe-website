export type AdmissionsPageConfig = {
  slug: string;
  currentPage: string;
  title: string;
  lead: string;
  introBadge: string;
  introTitle: string;
  paragraphs: string[];
  listTitle?: string;
  listItems?: string[];
};

const ADMISSIONS_PAGE_CONTENT: Record<string, AdmissionsPageConfig> = {
  "fee-refund-policy": {
    slug: "fee-refund-policy",
    currentPage: "Fee Refund Policy",
    title: "Fee Refund Policy",
    lead:
      "Institutional fee refund policy prepared in accordance with UGC, AICTE, affiliating university, and statutory authority guidelines.",
    introBadge: "Admissions",
    introTitle: "Fee Refund Policy",
    paragraphs: [
      "The Fee Refund Policy of the institution is prepared in accordance with the norms, guidelines, and directives issued by the University Grants Commission (UGC), AICTE, the affiliating University, and other statutory authorities from time to time.",
      "At present, the Fee Refund Policy is under consideration and formulation by the College Management and the Governing Body. The institution is in the process of examining various regulatory provisions, institutional policies, and administrative procedures related to admissions and fee structure.",
      "Until the policy is finalized and formally approved by the competent authority, fee-related matters shall be governed by the terms and conditions mentioned in the admission notification, college prospectus, and the declaration submitted by the student/parent at the time of admission.",
      "The institution reserves the right to review, modify, amend, or update the Fee Refund Policy as and when required, in accordance with statutory regulations and institutional requirements.",
      "Once the Fee Refund Policy is approved by the Management and Governing Body, the same shall be published on the college website and shall come into effect from the date of notification.",
      "Students and parents are therefore advised to carefully read and understand all admission-related instructions, fee details, and conditions before seeking admission and making fee payments.",
      "Any decision regarding fee refund, if applicable, shall be subject to institutional rules and applicable regulatory guidelines.",
      "Payment of fees implies acceptance of the admission terms and institutional policies in force at the time of admission.",
      "Fee once paid is subject to the prevailing institutional norms.",
    ],
  },
  "admission-process": {
    slug: "admission-process",
    currentPage: "Admission Process",
    title: "Admission Process",
    lead:
      "How to apply for BCA and B.Com programmes at Bapuji Institute of Hi-Tech Education, Davangere.",
    introBadge: "Admissions",
    introTitle: "How to apply",
    paragraphs: [
      "BIHE offers undergraduate admissions to Bachelor of Computer Applications (BCA) and Bachelor of Commerce (B.Com) programmes affiliated to Davangere University. Prospective students may apply by visiting the campus or through the enquiry channels announced by the institute.",
      "Candidates must meet the eligibility criteria prescribed for the respective programme and submit all required documents at the time of admission. Seats are allotted based on merit, availability, and completion of the admission formalities.",
    ],
    listTitle: "Admission steps",
    listItems: [
      "Collect the admission enquiry form or register through the institute's announced admission channels.",
      "Choose the programme (BCA or B.Com) and verify eligibility based on qualifying examination marks.",
      "Submit the application form with required documents: mark sheets, transfer certificate, passport-size photographs, and identity proof.",
      "Attend counselling or interaction with the admission office, if scheduled by the institute.",
      "Upon selection, pay the prescribed admission and programme fees within the notified timeline.",
      "Complete enrollment formalities and collect the student identity card and programme-related instructions.",
    ],
  },
  "online-admission-format": {
    slug: "online-admission-format",
    currentPage: "Online Admission Format",
    title: "Online Admission Format",
    lead:
      "Download and complete the BIHE online admission application format for BCA and B.Com undergraduate programmes.",
    introBadge: "Admissions",
    introTitle: "Online admission application format",
    paragraphs: [
      "Prospective students applying to Bapuji Institute of Hi-Tech Education (BIHE) may use the prescribed admission application format to submit their details for BCA and B.Com programmes.",
      "Please download the application format, fill in all required fields accurately, and submit the completed form along with the necessary documents at the college admission office within the notified admission schedule.",
    ],
  },
};

export const ADMISSIONS_PAGE_SLUGS = [
  "admission-process",
  "online-admission-format",
  "fee-refund-policy",
] as const;

export function getAdmissionsPage(slug: string): AdmissionsPageConfig | undefined {
  return ADMISSIONS_PAGE_CONTENT[slug];
}

export const FEE_REFUND_POLICY_LEAD = ADMISSIONS_PAGE_CONTENT["fee-refund-policy"].lead;
export const ADMISSION_PROCESS_LEAD = ADMISSIONS_PAGE_CONTENT["admission-process"].lead;
