"use client";

import { AlumniGalleryPhotoGrid } from "@/components/alumni/AlumniGalleryPhotoGrid";
import type { AlumniGallerySection } from "@/lib/alumni-gallery-service";

type AlumniGalleryGridProps = {
  sections: AlumniGallerySection[];
};

export function AlumniGalleryGrid({ sections }: AlumniGalleryGridProps) {
  if (sections.length === 0) {
    return null;
  }

  return (
    <>
      {sections.map((section) => (
        <section
          key={section.id}
          className="alumni-page__gallery-section"
          aria-labelledby={`alumni-gallery-${section.id}-title`}
        >
          <h2 className="faculty-staff__title" id={`alumni-gallery-${section.id}-title`}>
            {section.title}
          </h2>
          <div className="alumni-page__gallery-photos">
            <AlumniGalleryPhotoGrid images={section.images} />
          </div>
        </section>
      ))}
    </>
  );
}
