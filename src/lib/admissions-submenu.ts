export type AdmissionsSubmenuItem = {
  label: string;
  href: string;
  slug: string;
  description: string;
};

export const ADMISSIONS_SUBMENU: AdmissionsSubmenuItem[] = [
  {
    label: "Admission Process & Guidelines",
    href: "/admissions/admission-process",
    slug: "admission-process",
    description:
      "Step-by-step admission procedure, required documents, and enrollment information for BIHE programmes.",
  },
  {
    label: "Online Admission Format",
    href: "/admissions/online-admission-format",
    slug: "online-admission-format",
    description:
      "Online application format, submission guidelines, and required details for admission applicants.",
  },
  {
    label: "Fee Refund Policy",
    href: "/admissions/fee-refund-policy",
    slug: "fee-refund-policy",
    description:
      "Guidelines for fee refunds, withdrawal timelines, and applicable conditions for admitted students.",
  },
];
