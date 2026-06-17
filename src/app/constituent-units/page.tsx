import type { Metadata } from "next";
import { ConstituentUnitsPage } from "@/components/about/ConstituentUnitsPage";
import { SitePageShell } from "@/components/layout/SitePageShell";

export const metadata: Metadata = {
  title: "Affliation | Bapuji Institute of Hi-Tech Education",
  description:
    "Constituent units and university affiliation documents for Bapuji Institute of Hi-Tech Education (BIHE), Davangere — affiliation and affiliating university PDFs.",
};

export default function ConstituentUnitsRoutePage() {
  return (
    <SitePageShell>
      <ConstituentUnitsPage />
    </SitePageShell>
  );
}
