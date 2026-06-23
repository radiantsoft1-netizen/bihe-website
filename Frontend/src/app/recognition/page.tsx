import type { Metadata } from "next";
import { AboutSinglePdfPage } from "@/components/about/AboutSinglePdfPage";
import { SitePageShell } from "@/components/layout/SitePageShell";
import { RECOGNITION_PAGE } from "@/lib/about-document-pages";

export const metadata: Metadata = {
  title: "Recognition | Bapuji Institute of Hi-Tech Education",
  description:
    "Recognition and approval documents for Bapuji Institute of Hi-Tech Education (BIHE), Davangere.",
};

export default function RecognitionRoutePage() {
  return (
    <SitePageShell>
      <AboutSinglePdfPage {...RECOGNITION_PAGE} />
    </SitePageShell>
  );
}
