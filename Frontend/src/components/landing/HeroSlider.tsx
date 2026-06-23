"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { SmartImage } from "@/components/ui/SmartImage";
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/icons";
import { FALLBACK_HERO_IMAGE, FALLBACK_HERO_SLIDES } from "@/lib/homepage-fallbacks";
import { SITE_LINKS } from "@/lib/site-links";
import type { HeroSlide } from "@/lib/types/content";

type HeroSliderProps = {
  slides?: HeroSlide[];
  backgroundImage?: string;
};

export function HeroSlider({
  slides = FALLBACK_HERO_SLIDES,
  backgroundImage = FALLBACK_HERO_IMAGE,
}: HeroSliderProps) {
  const [index, setIndex] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const slide = slides[index] ?? slides[0];
  const total = slides.length;
  const counter = String(index + 1).padStart(2, "0");
  const totalLabel = String(total).padStart(2, "0");
  const heroImage = slide?.image ?? backgroundImage;

  const go = useCallback(
    (next: number) => {
      setIndex(next);
      setAnimKey((k) => k + 1);
    },
    [],
  );

  const prev = () => go(index === 0 ? slides.length - 1 : index - 1);
  const next = () => go((index + 1) % slides.length);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
      setAnimKey((k) => k + 1);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="hero" id="hero" aria-label="Hero">
      <div className="hero__media">
        <SmartImage
          key={heroImage}
          src={heroImage}
          alt="Bapuji Institute campus"
          fill
          className="hero__bg"
          sizes="100vw"
          quality={80}
          priority
        />
      </div>
      <div className="hero__overlay" aria-hidden />

      <div className="hero__inner">
        <div className="hero__container">
          <div className="hero__main">
            <div key={animKey} className="hero__content hero__content--animate">
              <p className="hero__eyebrow">
                <span className="hero__eyebrow-dot" aria-hidden />
                {slide.eyebrow}
              </p>
              <h1 className="hero__title">{slide.title}</h1>
              <p className="hero__subtitle">{slide.subtitle}</p>
              <div className="hero__actions">
                <Link href={SITE_LINKS.courses} className="btn btn--primary btn--shine hero__cta">
                  Explore Courses
                  <ArrowRightIcon />
                </Link>
              </div>
            </div>
          </div>

          <div className="hero__footer">
            <div className="hero__counter" aria-live="polite">
              <span className="hero__counter-current">{counter}</span>
              <span className="hero__counter-sep" aria-hidden>
                /
              </span>
              <span className="hero__counter-total">{totalLabel}</span>
            </div>

            <div className="hero__controls">
              <button
                type="button"
                className="hero__arrow"
                onClick={prev}
                aria-label="Previous slide"
              >
                <ChevronLeftIcon />
              </button>

              <div className="hero__dots" role="tablist" aria-label="Hero slides">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`Slide ${i + 1}`}
                    className={`hero__dot${i === index ? " hero__dot--active" : ""}`}
                    onClick={() => go(i)}
                  />
                ))}
              </div>

              <button
                type="button"
                className="hero__arrow"
                onClick={next}
                aria-label="Next slide"
              >
                <ChevronRightIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
