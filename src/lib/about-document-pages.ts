export type AboutPdfDocument = {
  title: string;
  description: string;
  href: string;
  fileName: string;
};

export type AboutSinglePdfPageConfig = {
  currentPage: string;
  title: string;
  lead: string;
  introBadge: string;
  introTitle: string;
  intro: string;
  documentsBadge: string;
  documentsTitle: string;
  document: AboutPdfDocument;
};

export const RECOGNITION_PAGE: AboutSinglePdfPageConfig = {
  currentPage: "Recognition",
  title: "Recognition",
  lead: "Statutory approvals and recognition documents for BIHE programmes.",
  introBadge: "Recognition",
  introTitle: "Approvals & accreditation",
  intro:
    "Official recognition and regulatory approval documents published for students, parents, and stakeholders.",
  documentsBadge: "PDF",
  documentsTitle: "Recognition document",
  document: {
    title: "Approval(2(f),12B)",
    description:
      "Approval under Section 2(f) and Section 12(B) of the UGC Act.",
    href: "/documents/approval-2f-12b.pdf",
    fileName: "approval-2f-12b.pdf",
  },
};

export const ANNUAL_REPORTS_PAGE: AboutSinglePdfPageConfig = {
  currentPage: "Annual Reports",
  title: "Annual Reports",
  lead: "Year-wise institutional reports for BIHE.",
  introBadge: "Reports",
  introTitle: "Institutional reporting",
  intro:
    "Annual reports covering academics, administration, and key institutional highlights.",
  documentsBadge: "PDF",
  documentsTitle: "Annual report",
  document: {
    title: "Annual Reports",
    description: "Published annual report of the institute.",
    href: "/documents/annual-reports.pdf",
    fileName: "annual-reports.pdf",
  },
};

export const AUDIT_REPORT_PAGE: AboutSinglePdfPageConfig = {
  currentPage: "Audit Report",
  title: "Audit Report",
  lead: "Financial and compliance audit disclosures for BIHE.",
  introBadge: "Audit",
  introTitle: "Transparency & compliance",
  intro:
    "Audit reports published for transparency and review by stakeholders.",
  documentsBadge: "PDF",
  documentsTitle: "Audit report",
  document: {
    title: "Audit Report",
    description: "Published audit report of the institute.",
    href: "/documents/audit-report.pdf",
    fileName: "audit-report.pdf",
  },
};
