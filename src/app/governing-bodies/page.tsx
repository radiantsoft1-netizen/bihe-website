import type { Metadata } from "next";
import { GoverningBodiesPage } from "@/components/administration/GoverningBodiesPage";
import { SitePageShell } from "@/components/layout/SitePageShell";
import { GOVERNING_BODIES_PAGE_LEAD } from "@/lib/governing-bodies-content";
import { getGoverningBodiesShowcases } from "@/lib/governing-bodies-service";

export const metadata: Metadata = {
  title: "Governing Bodies | Administration | BIHE",
  description: GOVERNING_BODIES_PAGE_LEAD,
};

export default async function GoverningBodiesRoutePage() {
  const showcases = await getGoverningBodiesShowcases();

  return (
    <SitePageShell>
      <GoverningBodiesPage showcases={showcases} />
    </SitePageShell>
  );
}
