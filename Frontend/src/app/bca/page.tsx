import type { Metadata } from "next";
import { BcaLeadershipPage } from "@/components/administration/BcaLeadershipPage";
import { SitePageShell } from "@/components/layout/SitePageShell";
import { BCA_LEADERSHIP_PAGE_LEAD } from "@/lib/bca-leadership-content";

export const metadata: Metadata = {
  title: "Academic Leadership of BCA | Administration | BIHE",
  description: BCA_LEADERSHIP_PAGE_LEAD,
};

export default function BcaAdministrationPage() {
  return (
    <SitePageShell>
      <BcaLeadershipPage />
    </SitePageShell>
  );
}
