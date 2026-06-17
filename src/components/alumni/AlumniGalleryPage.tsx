import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { AlumniGalleryGrid } from "@/components/alumni/AlumniGalleryGrid";
import { ALUMNI_GALLERY_LEAD } from "@/lib/alumni-content";
import type { AlumniGallerySection } from "@/lib/alumni-gallery-service";
import { SITE_LINKS } from "@/lib/site-links";

type AlumniGalleryPageProps = {
  sections: AlumniGallerySection[];
};

export function AlumniGalleryPage({ sections }: AlumniGalleryPageProps) {
  return (
    <article className="alumni-gallery-page alumni-page about-bihe-page">
      <AboutInnerHero
        currentPage="Alumni Gallery"
        title="Alumni Gallery"
        lead={ALUMNI_GALLERY_LEAD}
        eyebrow="Alumni"
        sectionLabel="Alumni"
        sectionHref={SITE_LINKS.alumniGallery}
        parentPage="Alumni"
        parentHref={SITE_LINKS.alumniHome}
      />

      <section className="alumni-gallery-page__photos" aria-label="Alumni photo albums">
        <div className="alumni-gallery-page__container">
          <AlumniGalleryGrid sections={sections} />
        </div>
      </section>
    </article>
  );
}
