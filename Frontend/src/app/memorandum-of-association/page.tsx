import type { Metadata } from "next";
import { MemorandumPage } from "@/components/about/MemorandumPage";
import { SitePageShell } from "@/components/layout/SitePageShell";

export const metadata: Metadata = {
  title: "Memorandum of Association | Bapuji Institute of Hi-Tech Education",
  description:
    "Memorandum of Association for Bapuji Institute of Hi-Tech Education (BIHE), Davangere — governance framework, objectives, and governing body under Bapuji Educational Association.",
};

export default function MemorandumRoutePage() {
  return (
    <SitePageShell>
      <MemorandumPage />
    </SitePageShell>
  );
}
