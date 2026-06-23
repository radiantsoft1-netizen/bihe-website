"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import type { AlumniGalleryImage } from "@/lib/alumni-gallery-service";
import { SITE_LINKS } from "@/lib/site-links";

type AlumniGalleryPhotoGridProps = {
  images: AlumniGalleryImage[];
};

export function AlumniGalleryPhotoGrid({ images }: AlumniGalleryPhotoGridProps) {
  if (images.length === 0) {
    return null;
  }

  return (
    <ul className="gallery-album-page__media-grid alumni-gallery-photo-grid">
      {images.map((image, index) => (
        <Reveal key={image.id} as="li" delay={index * 50} direction="scale">
          <Link
            href={SITE_LINKS.alumniGalleryPhoto(image.id)}
            className="gallery-album-page__photo-button gallery-protected-media"
            onContextMenu={(event) => event.preventDefault()}
            aria-label={`View ${image.alt}`}
          >
            <SmartImage
              src={image.src}
              alt={image.alt}
              fill
              className="gallery-album-page__photo-img gallery-protected-media__img"
              sizes="(max-width: 640px) 100vw, 33vw"
            />
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}
