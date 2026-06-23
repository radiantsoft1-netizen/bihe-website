"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MediaBadge } from "@/components/ui/MediaBadge";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import type { GalleryLayout } from "@/lib/gallery-content";
import type { GalleryAlbum, GalleryCategory } from "@/lib/types/gallery";
import { galleryAlbumHref } from "@/lib/site-links";

const MOSAIC_LAYOUTS: readonly GalleryLayout[] = [
  "feature",
  "accent",
  "wide",
  "wide",
  "wide",
  "standard",
  "standard",
  "standard",
];

const CATEGORY_LABELS: Record<string, string> = {
  campus: "Campus Life",
  academics: "Academics",
  events: "Events & Festivals",
  sports: "Sports & Recreation",
  facilities: "Facilities",
};

type GalleryTagStat = {
  id: string;
  label: string;
  count: number;
};

function categoryLabel(category: GalleryCategory): string {
  return CATEGORY_LABELS[category.slug] ?? category.name;
}

function layoutForIndex(index: number): GalleryLayout {
  return MOSAIC_LAYOUTS[index % MOSAIC_LAYOUTS.length];
}

function buildTagStats(albums: GalleryAlbum[], categories: GalleryCategory[]): GalleryTagStat[] {
  const stats = categories
    .map((category) => ({
      id: category.slug,
      label: categoryLabel(category),
      count: albums.filter((album) => album.category?.slug === category.slug).length,
    }))
    .filter((tag) => tag.count > 0);

  if (stats.length > 0) return stats;

  const counts = new Map<string, GalleryTagStat>();

  for (const album of albums) {
    const slug = album.category?.slug ?? "gallery";
    const existing = counts.get(slug);

    if (existing) {
      existing.count += 1;
      continue;
    }

    counts.set(slug, {
      id: slug,
      label: album.category?.name ?? "Gallery",
      count: 1,
    });
  }

  return [...counts.values()];
}

type GalleryAlbumGridProps = {
  albums: GalleryAlbum[];
  categories: GalleryCategory[];
};

export function GalleryAlbumGrid({ albums, categories }: GalleryAlbumGridProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const tagStats = useMemo(() => buildTagStats(albums, categories), [albums, categories]);

  const visibleAlbums = useMemo(() => {
    if (!activeCategory) return albums;
    return albums.filter((album) => (album.category?.slug ?? "gallery") === activeCategory);
  }, [albums, activeCategory]);

  const activeLabel = tagStats.find((tag) => tag.id === activeCategory)?.label;

  return (
    <section className="gallery" id="gallery" aria-labelledby="gallery-title">
      <div className="gallery__decor" aria-hidden>
        <span className="gallery__decor-ring" />
        <span className="gallery__decor-dot gallery__decor-dot--1" />
        <span className="gallery__decor-dot gallery__decor-dot--2" />
      </div>

      <div className="container gallery__inner">
        {albums.length > 0 ? (
          <Reveal delay={80}>
            <ul className="gallery__tags" aria-label="Gallery categories">
              <li>
                <button
                  type="button"
                  className={`gallery__tag gallery__tag-btn${
                    activeCategory === null ? " gallery__tag--active" : ""
                  }`}
                  aria-pressed={activeCategory === null}
                  onClick={() => setActiveCategory(null)}
                >
                  <span className="gallery__tag-label">All</span>
                  <span className="gallery__tag-count" aria-label={`${albums.length} albums`}>
                    {albums.length}
                  </span>
                </button>
              </li>
              {tagStats.map((tag) => {
                const isActive = activeCategory === tag.id;

                return (
                  <li key={tag.id}>
                    <button
                      type="button"
                      className={`gallery__tag gallery__tag-btn${isActive ? " gallery__tag--active" : ""}`}
                      aria-pressed={isActive}
                      onClick={() => setActiveCategory(isActive ? null : tag.id)}
                    >
                      <span className="gallery__tag-label">{tag.label}</span>
                      <span className="gallery__tag-count" aria-label={`${tag.count} albums`}>
                        {tag.count}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        ) : null}

        <ul className="gallery__mosaic" key={activeCategory ?? "all"}>
          {visibleAlbums.map((album, index) => {
            const layout = layoutForIndex(index);
            const categoryName = album.category?.name ?? "Gallery";

            return (
              <Reveal
                key={album.id}
                as="li"
                className={`gallery__cell gallery__cell--${layout}`}
                delay={index * 70}
                direction="scale"
              >
                <article className="gallery__item">
                  <Link
                    href={galleryAlbumHref(album.slug)}
                    className="gallery__item-button"
                    aria-label={`View album ${album.title}`}
                  >
                    <div
                      className="gallery__item-media media-card__media gallery-protected-media"
                      onContextMenu={(event) => event.preventDefault()}
                    >
                      <SmartImage
                        src={album.coverImage}
                        alt={album.title}
                        fill
                        className="gallery__item-img gallery-protected-media__img"
                        sizes={
                          layout === "feature" || layout === "accent"
                            ? "(max-width: 900px) 100vw, 50vw"
                            : "(max-width: 900px) 50vw, 25vw"
                        }
                      />
                      <MediaBadge label={categoryName} />
                    </div>
                  </Link>
                </article>
              </Reveal>
            );
          })}
        </ul>

        <Reveal delay={120}>
          <p className="gallery__footnote">
            <span className="gallery__count">{visibleAlbums.length}</span>
            {activeCategory
              ? `photo album${visibleAlbums.length === 1 ? "" : "s"} in ${activeLabel ?? "this category"}`
              : "curated campus highlights"}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
