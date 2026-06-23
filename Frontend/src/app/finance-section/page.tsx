import type { Metadata } from "next";
import { FinanceSectionPage } from "@/components/administration/FinanceSectionPage";
import { SitePageShell } from "@/components/layout/SitePageShell";
import { FINANCE_SECTION_PAGE_LEAD } from "@/lib/finance-section-content";

export const metadata: Metadata = {
  title: "Finance Section | Administration | BIHE",
  description: FINANCE_SECTION_PAGE_LEAD,
};

export default function FinanceSectionRoutePage() {
  return (
    <SitePageShell>
      <FinanceSectionPage />
    </SitePageShell>
  );
}
