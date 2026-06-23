import type { Metadata } from "next";
import { BComLeadershipPage } from "@/components/administration/BComLeadershipPage";
import { SitePageShell } from "@/components/layout/SitePageShell";
import { B_COM_LEADERSHIP_PAGE_LEAD } from "@/lib/b-com-leadership-content";

export const metadata: Metadata = {
  title: "Academic Leadership of B.com | Administration | BIHE",
  description: B_COM_LEADERSHIP_PAGE_LEAD,
};

export default function BComAdministrationPage() {
  return (
    <SitePageShell>
      <BComLeadershipPage />
    </SitePageShell>
  );
}
