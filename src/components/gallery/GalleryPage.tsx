import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { GalleryPageGrid } from "@/components/gallery/GalleryPageGrid";
import { GALLERY_PAGE_LEAD } from "@/lib/gallery-page-content";
import { getGalleryDisplayItems } from "@/lib/gallery-service";

export async function GalleryPage() {
  const items = await getGalleryDisplayItems();

  return (
    <article className="gallery-page about-bihe-page">
      <AboutInnerHero
        currentPage="Gallery"
        title="Campus Gallery"
        lead={GALLERY_PAGE_LEAD}
        eyebrow="Gallery"
        sectionLabel="Gallery"
        sectionHref="/gallery"
      />

      <GalleryPageGrid initialItems={items} />
    </article>
  );
}
