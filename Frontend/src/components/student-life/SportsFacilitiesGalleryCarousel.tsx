"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/icons";
import { SmartImage } from "@/components/ui/SmartImage";
import type { SportsGalleryImage } from "@/lib/sports-facilities-content";

type SportsFacilitiesGalleryCarouselProps = {
  images: readonly SportsGalleryImage[];
};

const AUTOPLAY_MS = 4500;

export function SportsFacilitiesGalleryCarousel({
  images,
}: SportsFacilitiesGalleryCarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = images.length;
  const current = images[index];

  const go = useCallback(
    (next: number) => {
      if (total === 0) return;
      setIndex(((next % total) + total) % total);
    },
    [total],
  );

  useEffect(() => {
    if (paused || total <= 1) return;

    const timer = window.setInterval(() => {
      setIndex((currentIndex) => (currentIndex + 1) % total);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [paused, total]);

  if (!current) {
    return null;
  }

  return (
    <div
      className="sf-page__gallery-carousel"
      aria-roledescription="carousel"
      aria-label="Sports campus photo gallery"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <figure className="sf-page__gallery-stage">
        <div className="sf-page__gallery-frame">
          {images.map((image, imageIndex) => (
            <div
              key={image.id}
              className={[
                "sf-page__gallery-slide",
                imageIndex === index ? "sf-page__gallery-slide--active" : "",
              ].join(" ")}
              aria-hidden={imageIndex !== index}
            >
              <SmartImage
                src={image.src}
                alt={image.alt}
                fill
                priority={imageIndex < 2}
                unoptimized
                className="sf-page__gallery-img"
                sizes="(max-width: 960px) 100vw, min(100vw, var(--container-max))"
              />
            </div>
          ))}
        </div>
      </figure>

      <div className="sf-page__gallery-controls">
        <button
          type="button"
          className="sf-page__gallery-arrow"
          onClick={() => go(index - 1)}
          aria-label="Previous photo"
        >
          <ChevronLeftIcon />
        </button>

        <p className="sf-page__gallery-counter" aria-live="polite">
          <span className="sf-page__gallery-counter-current">{index + 1}</span>
          <span className="sf-page__gallery-counter-sep" aria-hidden>
            /
          </span>
          <span className="sf-page__gallery-counter-total">{total}</span>
        </p>

        <button
          type="button"
          className="sf-page__gallery-arrow"
          onClick={() => go(index + 1)}
          aria-label="Next photo"
        >
          <ChevronRightIcon />
        </button>
      </div>

      <div className="sf-page__gallery-thumbs" role="tablist" aria-label="Gallery thumbnails">
        {images.map((image, imageIndex) => (
          <button
            key={`thumb-${image.id}`}
            type="button"
            role="tab"
            aria-selected={imageIndex === index}
            aria-label={`Show photo ${imageIndex + 1} of ${total}`}
            className={[
              "sf-page__gallery-thumb",
              imageIndex === index ? "sf-page__gallery-thumb--active" : "",
            ].join(" ")}
            onClick={() => go(imageIndex)}
          >
            <SmartImage
              src={image.src}
              alt=""
              fill
              className="sf-page__gallery-thumb-img"
              sizes="72px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
