import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { GalleryAlbumGrid } from "@/components/gallery/GalleryAlbumGrid";
import { GALLERY_PAGE_LEAD } from "@/lib/gallery-page-content";
import { getGalleryAlbums, getGalleryCategories } from "@/lib/gallery-service";
import { SITE_LINKS } from "@/lib/site-links";

export async function GalleryPage() {
  const [albums, categories] = await Promise.all([getGalleryAlbums(), getGalleryCategories()]);

  return (
    <article className="gallery-page about-bihe-page">
      <AboutInnerHero
        currentPage="Moments at BIHE"
        title="Moments at BIHE"
        titleId="gallery-title"
        lead={GALLERY_PAGE_LEAD}
        eyebrow="Campus Gallery"
        sectionLabel="Gallery"
        sectionHref={SITE_LINKS.gallery}
      />
      <GalleryAlbumGrid albums={albums} categories={categories} />
    </article>
  );
}
