"use client";

import { useCallback, useEffect, useState } from "react";
import { SmartImage } from "@/components/ui/SmartImage";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/icons";
import type { StudentLifeImage } from "@/lib/student-life-pages/types";

type StudentLifeIntroImageSliderProps = {
  images: readonly StudentLifeImage[];
  ariaLabel: string;
};

const AUTOPLAY_MS = 6000;

export function StudentLifeIntroImageSlider({
  images,
  ariaLabel,
}: StudentLifeIntroImageSliderProps) {
  const [index, setIndex] = useState(0);
  const total = images.length;
  const current = images[index] ?? images[0];

  const go = useCallback(
    (next: number) => {
      if (total === 0) {
        return;
      }

      setIndex(((next % total) + total) % total);
    },
    [total],
  );

  const prev = () => go(index - 1);
  const next = () => go(index + 1);

  useEffect(() => {
    if (total <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setIndex((currentIndex) => (currentIndex + 1) % total);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [total]);

  if (!current) {
    return null;
  }

  return (
    <div className="sl-rich-page__intro-slider" aria-roledescription="carousel" aria-label={ariaLabel}>
      <figure className="sl-rich-page__intro-slider-card">
        <div
          className={[
            "sl-rich-page__intro-slider-media",
            current.fit === "contain" ? "sl-rich-page__intro-slider-media--contain" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {images.map((image, imageIndex) => (
            <div
              key={`${image.src}-${imageIndex}`}
              className={[
                "sl-rich-page__intro-slider-slide",
                imageIndex === index ? "sl-rich-page__intro-slider-slide--active" : "",
              ].join(" ")}
              aria-hidden={imageIndex !== index}
            >
              <SmartImage
                src={image.src}
                alt={image.alt}
                fill
                priority={imageIndex === 0}
                className={[
                  "sl-rich-page__intro-slider-img",
                  image.fit === "contain" ? "sl-rich-page__intro-slider-img--contain" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                sizes="(max-width: 960px) 100vw, 36rem"
              />
            </div>
          ))}
        </div>

        {current.caption ? (
          <figcaption className="sl-rich-page__intro-slider-caption">{current.caption}</figcaption>
        ) : null}
      </figure>

      {total > 1 ? (
        <div className="sl-rich-page__intro-slider-controls">
          <button
            type="button"
            className="sl-rich-page__intro-slider-arrow"
            onClick={prev}
            aria-label="Previous image"
          >
            <ChevronLeftIcon />
          </button>

          <div className="sl-rich-page__intro-slider-dots" role="tablist" aria-label="Placement highlights">
            {images.map((image, imageIndex) => (
              <button
                key={`dot-${image.src}-${imageIndex}`}
                type="button"
                role="tab"
                aria-selected={imageIndex === index}
                aria-label={`Show image ${imageIndex + 1} of ${total}`}
                className={[
                  "sl-rich-page__intro-slider-dot",
                  imageIndex === index ? "sl-rich-page__intro-slider-dot--active" : "",
                ].join(" ")}
                onClick={() => go(imageIndex)}
              />
            ))}
          </div>

          <button
            type="button"
            className="sl-rich-page__intro-slider-arrow"
            onClick={next}
            aria-label="Next image"
          >
            <ChevronRightIcon />
          </button>
        </div>
      ) : null}
    </div>
  );
}
