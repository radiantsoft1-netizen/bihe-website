import Link from "next/link";
import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { MediaBadge } from "@/components/ui/MediaBadge";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import type { AlumniGalleryImageDetail } from "@/lib/alumni-gallery-service";
import { SITE_LINKS } from "@/lib/site-links";
import { AlumniGalleryPhotoGrid } from "@/components/alumni/AlumniGalleryPhotoGrid";

type AlumniGalleryDetailPageProps = {
  detail: AlumniGalleryImageDetail;
};

export function AlumniGalleryDetailPage({ detail }: AlumniGalleryDetailPageProps) {
  const { image, paragraphs, remainingImages } = detail;

  return (
    <article className="alumni-gallery-detail-page gallery-detail-page gallery-album-page alumni-page about-bihe-page">
      <AboutInnerHero
        currentPage={image.alt}
        title={image.alt}
        lead={paragraphs[0]}
        eyebrow={image.sectionTitle}
        sectionLabel="Alumni Gallery"
        sectionHref={SITE_LINKS.alumniGallery}
        parentPage="Alumni"
        parentHref={SITE_LINKS.alumniHome}
      />

      <section className="gallery-detail-page__hero" aria-label="Featured photo">
        <div className="gallery-detail-page__container">
          <Reveal direction="scale">
            <div className="gallery-detail-page__hero-frame gallery-protected-media">
              <SmartImage
                src={image.src}
                alt={image.alt}
                fill
                className="gallery-detail-page__hero-img gallery-protected-media__img"
                sizes="(max-width: 900px) 100vw, 72rem"
                priority
              />
              <MediaBadge label={image.sectionTitle} />
            </div>
          </Reveal>
        </div>
      </section>

      <section
        className="gallery-detail-page__content alumni-gallery-detail-page__content"
        aria-labelledby="alumni-gallery-detail-about-title"
      >
        <div className="gallery-detail-page__container">
          <Reveal className="alumni-gallery-detail-page__copy">
            <h2 className="gallery-detail-page__section-title" id="alumni-gallery-detail-about-title">
              About this photo
            </h2>

            {paragraphs.map((paragraph) => (
              <p key={paragraph} className="gallery-detail-page__text">
                {paragraph}
              </p>
            ))}

            <Link href={SITE_LINKS.alumniGallery} className="gallery-detail-page__back-link">
              Back to alumni gallery
            </Link>
          </Reveal>
        </div>
      </section>

      {remainingImages.length > 0 ? (
        <section
          className="alumni-gallery-detail-page__more"
          aria-labelledby="alumni-gallery-detail-more-title"
        >
          <div className="gallery-detail-page__container">
            <Reveal>
              <h2 className="faculty-staff__title" id="alumni-gallery-detail-more-title">
                More from {image.sectionTitle}
              </h2>
            </Reveal>
            <AlumniGalleryPhotoGrid images={remainingImages} />
          </div>
        </section>
      ) : null}
    </article>
  );
}
