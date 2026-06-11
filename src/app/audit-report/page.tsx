import type { Metadata } from "next";
import { AboutSinglePdfPage } from "@/components/about/AboutSinglePdfPage";
import { SitePageShell } from "@/components/layout/SitePageShell";
import { AUDIT_REPORT_PAGE } from "@/lib/about-document-pages";

export const metadata: Metadata = {
  title: "Audit Report | Bapuji Institute of Hi-Tech Education",
  description:
    "Audit reports for Bapuji Institute of Hi-Tech Education (BIHE), Davangere.",
};

export default function AuditReportRoutePage() {
  return (
    <SitePageShell>
      <AboutSinglePdfPage {...AUDIT_REPORT_PAGE} />
    </SitePageShell>
  );
}
