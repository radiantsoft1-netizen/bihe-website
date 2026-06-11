import type { Metadata } from "next";
import { PrincipalPage } from "@/components/administration/PrincipalPage";
import { SitePageShell } from "@/components/layout/SitePageShell";
import { PRINCIPAL_PAGE_LEAD } from "@/lib/principal-content";

export const metadata: Metadata = {
  title: "Principal | Administration | BIHE",
  description: PRINCIPAL_PAGE_LEAD,
};

export default function PrincipalRoutePage() {
  return (
    <SitePageShell>
      <PrincipalPage />
    </SitePageShell>
  );
}
