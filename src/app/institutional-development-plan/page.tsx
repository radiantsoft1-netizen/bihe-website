import type { Metadata } from "next";
import { InstitutionalDevelopmentPlanPage } from "@/components/about/InstitutionalDevelopmentPlanPage";
import { SitePageShell } from "@/components/layout/SitePageShell";

export const metadata: Metadata = {
  title: "Institutional Development Plan | Bapuji Institute of Hi-Tech Education",
  description:
    "Institutional Development Plan (IDP) for Bapuji Institute of Hi-Tech Education (BIHE), Davangere — strategic objectives, focus areas, and implementation roadmap aligned with NEP 2020.",
};

export default function InstitutionalDevelopmentPlanRoutePage() {
  return (
    <SitePageShell>
      <InstitutionalDevelopmentPlanPage />
    </SitePageShell>
  );
}
