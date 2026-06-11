export type AdmissionsSubmenuItem = {
  label: string;
  href: string;
  slug: string;
  description: string;
};

export const ADMISSIONS_SUBMENU: AdmissionsSubmenuItem[] = [
  {
    label: "Fee Refund Policy",
    href: "/admissions/fee-refund-policy",
    slug: "fee-refund-policy",
    description:
      "Guidelines for fee refunds, withdrawal timelines, and applicable conditions for admitted students.",
  },
  {
    label: "Admission Process",
    href: "/admissions/admission-process",
    slug: "admission-process",
    description:
      "Step-by-step admission procedure, required documents, and enrollment information for BIHE programmes.",
  },
];
