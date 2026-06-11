import type { Metadata } from "next";
import { GoverningBodiesPage } from "@/components/administration/GoverningBodiesPage";
import { SitePageShell } from "@/components/layout/SitePageShell";
import { GOVERNING_BODIES_PAGE_LEAD } from "@/lib/governing-bodies-content";

export const metadata: Metadata = {
  title: "Governing Bodies | Administration | BIHE",
  description: GOVERNING_BODIES_PAGE_LEAD,
};

export default function GoverningBodiesRoutePage() {
  return (
    <SitePageShell>
      <GoverningBodiesPage />
    </SitePageShell>
  );
}
