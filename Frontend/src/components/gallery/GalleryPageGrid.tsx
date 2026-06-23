"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MediaBadge } from "@/components/ui/MediaBadge";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import type { GalleryLayout } from "@/lib/gallery-content";
import { GALLERY_FILTERS, type GalleryFilterId } from "@/lib/gallery-page-content";
import { getFilterCount, type GalleryDisplayItem } from "@/lib/gallery-display";
import { SITE_LINKS } from "@/lib/site-links";

type GalleryPageGridProps = {
  initialItems: GalleryDisplayItem[];
};

export function GalleryPageGrid({ initialItems }: GalleryPageGridProps) {
  const [activeFilter, setActiveFilter] = useState<GalleryFilterId>("all");

  const visibleItems = useMemo(() => {
    if (activeFilter === "all") return initialItems;
    return initialItems.filter((item) => item.filterId === activeFilter);
  }, [activeFilter, initialItems]);

  return (
    <section className="gallery gallery-page__gallery" aria-labelledby="gallery-page-grid-title">
      <div className="gallery__decor" aria-hidden>
        <span className="gallery__decor-ring" />
        <span className="gallery__decor-dot gallery__decor-dot--1" />
        <span className="gallery__decor-dot gallery__decor-dot--2" />
      </div>

      <div className="container gallery__inner gallery-page__inner">
        <Reveal>
          <div className="gallery-page__toolbar">
            <h2 className="gallery-page__grid-title" id="gallery-page-grid-title">
              Photo collection
            </h2>
            <p className="gallery-page__grid-lead">
              Browse highlights from campus, academics, events, sports, and facilities at BIHE.
            </p>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <div
            className="gallery-page__filters"
            role="tablist"
            aria-label="Filter gallery photos"
          >
            {GALLERY_FILTERS.map((filter) => {
              const isActive = activeFilter === filter.id;
              const count = getFilterCount(initialItems, filter.id);

              return (
                <button
                  key={filter.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`gallery-page__filter${isActive ? " gallery-page__filter--active" : ""}`}
                  onClick={() => setActiveFilter(filter.id)}
                >
                  <span className="gallery-page__filter-label">{filter.label}</span>
                  <span className="gallery-page__filter-count" aria-hidden>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <ul className="gallery__mosaic gallery-page__mosaic" key={activeFilter}>
          {visibleItems.map((item: GalleryDisplayItem & { layout: GalleryLayout }, index) => (
            <Reveal
              key={item.id}
              as="li"
              className={`gallery__cell gallery__cell--${item.layout}`}
              delay={index * 50}
              direction="scale"
            >
              <article className="gallery__item">
                <Link
                  href={SITE_LINKS.galleryPhoto(item.id)}
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
                    <div className="gallery__item-overlay" aria-hidden>
                      <span className="gallery__item-category">{item.category}</span>
                      <h3 className="gallery__item-title">{item.title}</h3>
                      {item.details ? (
                        <p className="gallery__item-details-preview">{item.details}</p>
                      ) : null}
                    </div>
                    <MediaBadge label={item.category} />
                  </div>
                </Link>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={100}>
          <p className="gallery__footnote gallery-page__footnote">
            <span className="gallery__count">{visibleItems.length}</span>
            {activeFilter === "all" ? "photos in the campus gallery" : "photos in this category"}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
