import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/SitePageShell";
import { SportsEventsPage } from "@/components/student-life/SportsEventsPage";
import { SF_EVENTS_PAGE_LEAD, SF_EVENTS_TITLE } from "@/lib/sports-facilities-content";

export const metadata: Metadata = {
  title: `${SF_EVENTS_TITLE} | Sports Facilities | Student Life | BIHE`,
  description: SF_EVENTS_PAGE_LEAD,
};

export default function SportsFacilitiesEventsRoutePage() {
  return (
    <SitePageShell>
      <SportsEventsPage />
    </SitePageShell>
  );
}
