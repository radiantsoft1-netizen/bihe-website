import Link from "next/link";
import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { MediaBadge } from "@/components/ui/MediaBadge";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import type { GalleryDetailView } from "@/lib/gallery-service";
import type { GalleryDisplayItem } from "@/lib/gallery-display";
import { SITE_LINKS } from "@/lib/site-links";

type GalleryDetailPageProps = {
  item: GalleryDetailView;
  relatedItems: GalleryDisplayItem[];
};

export function GalleryDetailPage({ item, relatedItems }: GalleryDetailPageProps) {
  return (
    <article className="gallery-detail-page about-bihe-page">
      <AboutInnerHero
        currentPage={item.title}
        title={item.title}
        lead={item.lead}
        eyebrow={item.category}
        sectionLabel="Gallery"
        sectionHref={SITE_LINKS.gallery}
      />

      <section className="gallery-detail-page__hero" aria-label="Featured photo">
        <div className="gallery-detail-page__container">
          <Reveal direction="scale">
            <div className="gallery-detail-page__hero-frame">
              <SmartImage
                src={item.image}
                alt={item.title}
                fill
                className="gallery-detail-page__hero-img"
                sizes="(max-width: 900px) 100vw, 72rem"
                priority
              />
              <MediaBadge label={item.category} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="gallery-detail-page__content" aria-labelledby="gallery-detail-about-title">
        <div className="gallery-detail-page__container gallery-detail-page__content-grid">
          <Reveal className="gallery-detail-page__meta">
            <p className="gallery-detail-page__meta-label">Photo details</p>
            <ul className="gallery-detail-page__meta-list">
              <li>
                <span className="gallery-detail-page__meta-key">Category</span>
                <span className="gallery-detail-page__meta-value">{item.category}</span>
              </li>
              {item.meta?.location ? (
                <li>
                  <span className="gallery-detail-page__meta-key">Location</span>
                  <span className="gallery-detail-page__meta-value">{item.meta.location}</span>
                </li>
              ) : null}
              {item.meta?.date ? (
                <li>
                  <span className="gallery-detail-page__meta-key">Year</span>
                  <span className="gallery-detail-page__meta-value">{item.meta.date}</span>
                </li>
              ) : null}
            </ul>

            <Link href={SITE_LINKS.gallery} className="gallery-detail-page__back-link">
              Back to gallery
            </Link>
          </Reveal>

          <Reveal delay={80} className="gallery-detail-page__copy">
            <h2 className="gallery-detail-page__section-title" id="gallery-detail-about-title">
              About this photo
            </h2>

            {item.paragraphs.map((paragraph) => (
              <p key={paragraph} className="gallery-detail-page__text">
                {paragraph}
              </p>
            ))}

            {item.highlights.length > 0 ? (
              <div className="gallery-detail-page__highlights">
                <h3 className="gallery-detail-page__highlights-title">Highlights</h3>
                <ul className="gallery-detail-page__highlights-list">
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </Reveal>
        </div>
      </section>

      {relatedItems.length > 0 ? (
        <section
          className="gallery-detail-page__related"
          aria-labelledby="gallery-detail-related-title"
        >
          <div className="gallery-detail-page__container">
            <Reveal>
              <h2 className="gallery-detail-page__related-title" id="gallery-detail-related-title">
                More from {item.category}
              </h2>
              <p className="gallery-detail-page__related-lead">
                Explore more campus photos from the same gallery category.
              </p>
            </Reveal>

            <ul className="gallery-detail-page__related-grid">
              {relatedItems.map((related, index) => (
                <Reveal key={related.id} as="li" delay={index * 60} direction="scale">
                  <Link
                    href={SITE_LINKS.galleryPhoto(related.id)}
                    className="gallery-detail-page__related-card"
                  >
                    <div className="gallery-detail-page__related-media media-card__media">
                      <SmartImage
                        src={related.image}
                        alt={related.title}
                        fill
                        className="gallery-detail-page__related-img"
                        sizes="(max-width: 900px) 50vw, 20vw"
                      />
                      <div className="gallery-detail-page__related-overlay" aria-hidden>
                        <span className="gallery-detail-page__related-category">
                          {related.category}
                        </span>
                        <h3 className="gallery-detail-page__related-name">{related.title}</h3>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </article>
  );
}
