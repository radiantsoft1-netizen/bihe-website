import type { Metadata } from "next";
import { AboutSinglePdfPage } from "@/components/about/AboutSinglePdfPage";
import { SitePageShell } from "@/components/layout/SitePageShell";
import { ANNUAL_REPORTS_PAGE } from "@/lib/about-document-pages";

export const metadata: Metadata = {
  title: "Annual Reports | Bapuji Institute of Hi-Tech Education",
  description:
    "Annual reports for Bapuji Institute of Hi-Tech Education (BIHE), Davangere.",
};

export default function AnnualReportsRoutePage() {
  return (
    <SitePageShell>
      <AboutSinglePdfPage {...ANNUAL_REPORTS_PAGE} />
    </SitePageShell>
  );
}
