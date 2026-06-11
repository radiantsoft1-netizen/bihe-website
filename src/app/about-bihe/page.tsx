import type { Metadata } from "next";
import { AboutBihePage } from "@/components/about/AboutBihePage";
import { SitePageShell } from "@/components/layout/SitePageShell";

export const metadata: Metadata = {
  title: "About BIHE | Bapuji Institute of Hi-Tech Education",
  description:
    "Learn about Bapuji Institute of Hi-Tech Education (BIHE), Davangere — vision, mission, BCA & B.Com programmes, campus, and institutional highlights since 2000.",
};

export default function AboutBiheRoutePage() {
  return (
    <SitePageShell>
      <AboutBihePage />
    </SitePageShell>
  );
}
