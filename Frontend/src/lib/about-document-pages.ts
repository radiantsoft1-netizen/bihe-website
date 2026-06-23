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
  intro?: string;
  introPoints?: readonly string[];
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
  introPoints: [
    "Recognized for dedication, hard work, and outstanding contributions.",
    "Demonstrated excellence in assigned responsibilities and teamwork.",
    "Appreciated for achieving goals and making a positive impact.",
  ],
  documentsBadge: "PDF",
  documentsTitle: "Recognition document",
  document: {
    title: "Approval(2(f),12B)",
    description:
      "Approval under Section 2(f) and Section 12(B) of the UGC Act.",
    href: "/documents/approval-2f-12b.pdf",
    fileName: "Approval(2(f),12B).docx.pdf",
  },
};

export const ANNUAL_REPORTS_PAGE: AboutSinglePdfPageConfig = {
  currentPage: "Annual Reports",
  title: "Annual Reports",
  lead: "Year-wise institutional reports for BIHE.",
  introBadge: "Reports",
  introTitle: "Institutional reporting",
  introPoints: [
    "An annual report is a yearly document that summarizes a Institutional financial performance, activities, and achievements.",
    "It provides information about profits, losses, assets, liabilities, and future plans.",
    "The report helps shareholders, investors, and other stakeholders evaluate the Institutional overall performance.",
  ],
  documentsBadge: "PDF",
  documentsTitle: "Annual report",
  document: {
    title: "Annual Reports",
    description: "Published annual report of the institute.",
    href: "/documents/annual-reports.pdf",
    fileName: "Annual Report.pdf",
  },
};

export const AUDIT_REPORT_PAGE: AboutSinglePdfPageConfig = {
  currentPage: "Audit Report",
  title: "Audit Report",
  lead: "Financial and compliance audit disclosures for BIHE.",
  introBadge: "Audit",
  introTitle: "Transparency & compliance",
  introPoints: [
    "An audit report is a formal document prepared by an auditor after examining an organization's financial records and statements.",
    "It expresses the auditor's opinion on whether the financial statements present a true and fair view of the organization's financial position.",
    "The report helps stakeholders assess the accuracy, reliability, and compliance of the financial information.",
  ],
  documentsBadge: "PDF",
  documentsTitle: "Audit report",
  document: {
    title: "Audit Report",
    description: "Published audit report of the institute.",
    href: "/documents/audit-report.pdf",
    fileName: "Audit Report.pdf",
  },
};
