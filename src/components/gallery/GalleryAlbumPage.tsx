"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { MediaBadge } from "@/components/ui/MediaBadge";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import type { GalleryDetailView, GalleryMediaItem } from "@/lib/types/gallery";
import { SITE_LINKS } from "@/lib/site-links";

const GalleryLightbox = dynamic(
  () => import("@/components/gallery/GalleryLightbox").then((mod) => mod.GalleryLightbox),
  { ssr: false },
);

type GalleryAlbumPageProps = {
  album: GalleryDetailView;
};

export function GalleryAlbumPage({ album }: GalleryAlbumPageProps) {
  const [lightboxItem, setLightboxItem] = useState<GalleryMediaItem | null>(null);

  return (
    <article className="gallery-detail-page gallery-album-page about-bihe-page">
      <AboutInnerHero
        currentPage={album.title}
        title={album.title}
        lead={album.lead}
        eyebrow={album.category}
        sectionLabel="Gallery"
        sectionHref={SITE_LINKS.gallery}
      />

      <section className="gallery-detail-page__hero" aria-label="Album cover">
        <div className="gallery-detail-page__container">
          <Reveal direction="scale">
            <div
              className="gallery-detail-page__hero-frame gallery-protected-media"
              onContextMenu={(event) => event.preventDefault()}
            >
              <SmartImage
                src={album.image}
                alt={album.title}
                fill
                className="gallery-detail-page__hero-img gallery-protected-media__img"
                sizes="(max-width: 900px) 100vw, 72rem"
                priority
              />
              <MediaBadge label={album.category} />
            </div>
          </Reveal>
        </div>
      </section>

      {album.media.length > 0 ? (
        <section className="gallery-album-page__media" aria-label="Album photos and videos">
          <div className="gallery-detail-page__container">
            <ul className="gallery-album-page__media-grid">
              {album.media.map((item: GalleryMediaItem, index: number) => (
                <Reveal key={item.id} as="li" delay={index * 50} direction="scale">
                  {item.type === "youtube" && item.youtubeId ? (
                    <div className="gallery-album-page__video">
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${item.youtubeId}`}
                        title={item.title}
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                      <p className="gallery-album-page__video-title">{item.title}</p>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="gallery-album-page__photo-button gallery-protected-media"
                      onClick={() => setLightboxItem(item)}
                      onContextMenu={(event) => event.preventDefault()}
                      aria-label={`Preview ${item.title}`}
                    >
                      <SmartImage
                        src={item.previewUrl ?? item.image ?? album.image}
                        alt={item.title}
                        fill
                        className="gallery-album-page__photo-img gallery-protected-media__img"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                    </button>
                  )}
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <GalleryLightbox
        item={lightboxItem}
        category={album.category}
        onClose={() => setLightboxItem(null)}
      />
    </article>
  );
}
