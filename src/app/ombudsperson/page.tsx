import type { Metadata } from "next";
import { OmbudspersonPage } from "@/components/administration/OmbudspersonPage";
import { SitePageShell } from "@/components/layout/SitePageShell";
import { OMBUDSPERSON_PAGE_LEAD } from "@/lib/ombudsperson-content";

export const metadata: Metadata = {
  title: "Ombudsperson | Administration | BIHE",
  description: OMBUDSPERSON_PAGE_LEAD,
};

export default function OmbudspersonRoutePage() {
  return (
    <SitePageShell>
      <OmbudspersonPage />
    </SitePageShell>
  );
}
