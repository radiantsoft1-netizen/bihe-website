import type { Metadata } from "next";
import { AlumniEventsPage } from "@/components/alumni/AlumniEventsPage";
import { SitePageShell } from "@/components/layout/SitePageShell";
import { ALUMNI_EVENTS_PAGE_LEAD } from "@/lib/alumni-content";
import { getAlumniEventCards } from "@/lib/alumni-service";

export const metadata: Metadata = {
  title: "Alumni Events | BIHE",
  description: ALUMNI_EVENTS_PAGE_LEAD,
};

export default async function AlumniEventsRoutePage() {
  const events = await getAlumniEventCards();

  return (
    <SitePageShell>
      <AlumniEventsPage events={events} />
    </SitePageShell>
  );
}
