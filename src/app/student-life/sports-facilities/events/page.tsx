import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/SitePageShell";
import { SportsEventsPage } from "@/components/student-life/SportsEventsPage";
import { SF_EVENTS_PAGE_LEAD } from "@/lib/sports-facilities-content";

export const metadata: Metadata = {
  title: "Events 2024-25 | Sports Facilities | Student Life | BIHE",
  description: SF_EVENTS_PAGE_LEAD,
};

export default function SportsFacilitiesEventsRoutePage() {
  return (
    <SitePageShell>
      <SportsEventsPage />
    </SitePageShell>
  );
}
