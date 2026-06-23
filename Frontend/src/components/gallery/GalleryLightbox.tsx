"use client";

import { useEffect } from "react";
import { SmartImage } from "@/components/ui/SmartImage";
import type { GalleryMediaItem } from "@/lib/types/gallery";

type GalleryLightboxProps = {
  item: GalleryMediaItem | null;
  category: string;
  onClose: () => void;
};

export function GalleryLightbox({ item, category, onClose }: GalleryLightboxProps) {
  useEffect(() => {
    if (!item) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [item, onClose]);

  if (!item || item.type !== "image") return null;

  const imageSrc = item.previewUrl ?? item.image ?? "";

  return (
    <div className="gallery-page__lightbox" role="dialog" aria-modal="true" aria-label={item.title}>
      <div className="gallery-page__lightbox-panel">
        <button type="button" className="gallery-page__lightbox-close" onClick={onClose}>
          Close
        </button>
        <div
          className="gallery-page__lightbox-media gallery-protected-media"
          onContextMenu={(event) => event.preventDefault()}
        >
          <SmartImage
            src={imageSrc}
            alt={item.title}
            fill
            className="gallery-page__lightbox-img gallery-protected-media__img"
            sizes="(max-width: 900px) 100vw, 56rem"
          />
        </div>
        <div className="gallery-page__lightbox-copy">
          <p className="gallery-page__lightbox-category">{category}</p>
          <h3 className="gallery-page__lightbox-title">{item.title}</h3>
          <p className="gallery-page__lightbox-details gallery-page__lightbox-details--muted">
            Images are provided for viewing on this site. Right-click save is disabled.
          </p>
        </div>
      </div>
    </div>
  );
}
