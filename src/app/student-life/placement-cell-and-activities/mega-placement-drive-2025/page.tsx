import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/SitePageShell";
import { MegaPlacementDrivePage } from "@/components/student-life/MegaPlacementDrivePage";
import { MEGA_PLACEMENT_DRIVE_PAGE_LEAD } from "@/lib/mega-placement-drive-content";

export const metadata: Metadata = {
  title: "Mega Placement Drive 2025 | Placement Cell | Student Life | BIHE",
  description: MEGA_PLACEMENT_DRIVE_PAGE_LEAD,
};

export default function MegaPlacementDrive2025RoutePage() {
  return (
    <SitePageShell>
      <MegaPlacementDrivePage />
    </SitePageShell>
  );
}
