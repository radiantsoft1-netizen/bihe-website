import type { Metadata } from "next";
import { AlumniAboutPage } from "@/components/alumni/AlumniAboutPage";
import { SitePageShell } from "@/components/layout/SitePageShell";
import { ALUMNI_ABOUT_LEAD } from "@/lib/alumni-content";

export const metadata: Metadata = {
  title: "About Alumni Association | BIHE",
  description: ALUMNI_ABOUT_LEAD,
};

export default function AlumniAboutRoutePage() {
  return (
    <SitePageShell>
      <AlumniAboutPage />
    </SitePageShell>
  );
}
