import Link from "next/link";
import { FluxButton } from "@/components/ui/FluxButton";
import { MediaBadge } from "@/components/ui/MediaBadge";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SmartImage } from "@/components/ui/SmartImage";
import {
  FALLBACK_GALLERY_ITEMS,
  FALLBACK_GALLERY_TAG_STATS,
} from "@/lib/homepage-fallbacks";
import { galleryAlbumHref, SITE_LINKS } from "@/lib/site-links";
import type { GalleryTagStat, HomepageGalleryItem } from "@/lib/types/content";

type GallerySectionProps = {
  items?: HomepageGalleryItem[];
  tagStats?: GalleryTagStat[];
};

export function GallerySection({
  items = FALLBACK_GALLERY_ITEMS,
  tagStats = [...FALLBACK_GALLERY_TAG_STATS],
}: GallerySectionProps) {
  return (
    <section className="gallery" id="gallery" aria-labelledby="gallery-title">
      <div className="gallery__decor" aria-hidden>
        <span className="gallery__decor-ring" />
        <span className="gallery__decor-dot gallery__decor-dot--1" />
        <span className="gallery__decor-dot gallery__decor-dot--2" />
      </div>

      <div className="container gallery__inner">
        <Reveal>
          <div className="gallery__head">
            <div className="gallery__head-text">
              <SectionHeader badge="Campus Gallery" title="Moments at BIHE" />
              <p className="gallery__lead" id="gallery-title">
                Explore campus life, academic spaces, celebrations, and student
                experiences at Bapuji Institute of Hi-Tech Education.
              </p>
            </div>
            <FluxButton
              href={SITE_LINKS.gallery}
              label="View Gallery"
              className="gallery__head-cta"
              variant="ghost"
            />
          </div>
        </Reveal>

        <Reveal delay={80}>
          <ul className="gallery__tags" aria-label="Gallery categories">
            {tagStats.map((tag) => (
              <li key={tag.label} className="gallery__tag">
                <span className="gallery__tag-label">{tag.label}</span>
                <span className="gallery__tag-count" aria-label={`${tag.count} photos`}>
                  {tag.count}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <ul className="gallery__mosaic">
          {items.map((item, index) => (
            <Reveal
              key={item.id}
              as="li"
              className={`gallery__cell gallery__cell--${item.layout}`}
              delay={index * 70}
              direction="scale"
            >
              <article className="gallery__item">
                <Link
                  href={galleryAlbumHref(item.id)}
                  className="gallery__item-button"
                  aria-label={`View details for ${item.title}`}
                >
                  <div className="gallery__item-media media-card__media">
                    <SmartImage
                      src={item.image}
                      alt={item.title}
                      fill
                      className="gallery__item-img"
                      sizes={
                        item.layout === "feature" || item.layout === "accent"
                          ? "(max-width: 900px) 100vw, 50vw"
                          : "(max-width: 900px) 50vw, 25vw"
                      }
                    />
                    <MediaBadge label={item.category} />
                  </div>
                </Link>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={120}>
          <p className="gallery__footnote">
            <span className="gallery__count">{items.length}+</span>
            curated campus highlights
          </p>
        </Reveal>
      </div>
    </section>
  );
}
