import type { Metadata } from "next";
import { AlumniPage } from "@/components/alumni/AlumniPage";
import { SitePageShell } from "@/components/layout/SitePageShell";
import { ALUMNI_PAGE_LEAD } from "@/lib/alumni-content";
import { getAlumniProfiles } from "@/lib/alumni-service";

export const metadata: Metadata = {
  title: "Alumni | BIHE",
  description: ALUMNI_PAGE_LEAD,
};

export default async function AlumniRoutePage() {
  const profiles = await getAlumniProfiles();

  return (
    <SitePageShell>
      <AlumniPage profiles={profiles} />
    </SitePageShell>
  );
}
