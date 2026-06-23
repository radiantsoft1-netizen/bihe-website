import type { Metadata } from "next";
import { AlumniGalleryPage } from "@/components/alumni/AlumniGalleryPage";
import { SitePageShell } from "@/components/layout/SitePageShell";
import { ALUMNI_GALLERY_LEAD } from "@/lib/alumni-content";
import { getAlumniGallerySections } from "@/lib/alumni-gallery-service";

export const metadata: Metadata = {
  title: "Alumni Gallery | BIHE",
  description: ALUMNI_GALLERY_LEAD,
};

export default async function AlumniGalleryRoutePage() {
  const sections = await getAlumniGallerySections();

  return (
    <SitePageShell>
      <AlumniGalleryPage sections={sections} />
    </SitePageShell>
  );
}
