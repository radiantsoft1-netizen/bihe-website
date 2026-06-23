import type { Metadata } from "next";

import { MaintenancePageContent } from "@/components/maintenance/MaintenancePageContent";
import { fetchSiteMaintenanceStatus } from "@/lib/maintenance-service";
import "@/styles/maintenance-page.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "BIHE Website — Maintenance",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function MaintenancePage() {
  const status = await fetchSiteMaintenanceStatus();

  return <MaintenancePageContent status={status} preview={!status.enabled} />;
}
