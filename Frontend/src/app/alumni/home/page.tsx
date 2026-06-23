import type { Metadata } from "next";
import { AlumniHomePage } from "@/components/alumni/AlumniHomePage";
import { SitePageShell } from "@/components/layout/SitePageShell";
import { ALUMNI_HOME_LEAD } from "@/lib/alumni-content";

export const metadata: Metadata = {
  title: "Alumni Home | BIHE",
  description: ALUMNI_HOME_LEAD,
};

export default function AlumniHomeRoutePage() {
  return (
    <SitePageShell>
      <AlumniHomePage />
    </SitePageShell>
  );
}
