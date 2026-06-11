import type { Metadata } from "next";
import { GalleryPage } from "@/components/gallery/GalleryPage";
import { SitePageShell } from "@/components/layout/SitePageShell";

export const metadata: Metadata = {
  title: "Gallery | Bapuji Institute of Hi-Tech Education",
  description:
    "Campus photo gallery — explore academic spaces, events, sports, and student life at BIHE, Davangere.",
};

export default function GalleryRoutePage() {
  return (
    <SitePageShell>
      <GalleryPage />
    </SitePageShell>
  );
}
