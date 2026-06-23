"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowRightIcon } from "@/components/ui/icons";
import { SmartImage } from "@/components/ui/SmartImage";
import type { StudentLifePageRefCard } from "@/lib/student-life-pages/types";

const AUTOPLAY_MS = 4500;
const TRANSITION_MS = 650;

function getVisibleCount(width: number) {
  if (width < 640) return 1;
  if (width < 900) return 2;
  if (width < 1200) return 3;
  return 4;
}

function PageRefCardContent({ card }: { card: StudentLifePageRefCard }) {
  if (card.image) {
    return (
      <div className="sl-rich-page__page-ref-media">
        <SmartImage
          src={card.image}
          alt={card.imageAlt ?? card.title}
          fill
          className="sl-rich-page__page-ref-img"
          sizes="(max-width: 640px) 92vw, (max-width: 1200px) 33vw, 25vw"
        />
        <span className="sl-rich-page__page-ref-scrim" aria-hidden />
        <div className="sl-rich-page__page-ref-copy">
          {card.eyebrow ? (
            <span className="sl-rich-page__page-ref-eyebrow">{card.eyebrow}</span>
          ) : null}
          <h3 className="sl-rich-page__page-ref-title">{card.title}</h3>
          {card.description ? (
            <p className="sl-rich-page__page-ref-desc">{card.description}</p>
          ) : null}
          <span className="sl-rich-page__page-ref-cta">
            View details
            <ArrowRightIcon className="sl-rich-page__page-ref-cta-icon" />
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="sl-rich-page__page-ref-panel">
      <span className="sl-rich-page__page-ref-decor" aria-hidden>
        {card.yearLabel ? (
          <span className="sl-rich-page__page-ref-watermark">{card.yearLabel}</span>
        ) : null}
        <span className="sl-rich-page__page-ref-ring" />
      </span>

      <div className="sl-rich-page__page-ref-layout">
        <div className="sl-rich-page__page-ref-content">
          {card.eyebrow ? (
            <span className="sl-rich-page__page-ref-eyebrow">{card.eyebrow}</span>
          ) : null}
          <h3 className="sl-rich-page__page-ref-title">{card.title}</h3>
          {card.description ? (
            <p className="sl-rich-page__page-ref-desc">{card.description}</p>
          ) : null}
        </div>

        <div className="sl-rich-page__page-ref-footer">
          {card.dateLabel ? (
            <div className="sl-rich-page__page-ref-date">
              <span className="sl-rich-page__page-ref-date-day">{card.dateLabel}</span>
              {card.yearLabel ? (
                <span className="sl-rich-page__page-ref-date-year">{card.yearLabel}</span>
              ) : null}
            </div>
          ) : (
            <span className="sl-rich-page__page-ref-link-hint">Open event page</span>
          )}
          <span className="sl-rich-page__page-ref-go" aria-hidden>
            <ArrowRightIcon />
          </span>
        </div>
      </div>
    </div>
  );
}

export function StudentLifePageRefCards({
  cards,
  compactGrid = false,
}: {
  cards: readonly StudentLifePageRefCard[];
  compactGrid?: boolean;
}) {
  const [visibleCount, setVisibleCount] = useState(4);
  const [trackIndex, setTrackIndex] = useState(0);
  const [slideStep, setSlideStep] = useState(0);
  const [isSmooth, setIsSmooth] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isTrackSettled, setIsTrackSettled] = useState(true);
  const trackRef = useRef<HTMLUListElement>(null);
  const slideRef = useRef<HTMLLIElement>(null);
  const isAnimatingRef = useRef(false);

  const cardCount = cards.length;
  const hasLoop = cardCount > visibleCount;

  const loopCards = useMemo(() => {
    if (!hasLoop) {
      return [...cards];
    }

    return [...cards, ...cards, ...cards];
  }, [cards, hasLoop]);

  const loopStart = hasLoop ? cardCount : 0;

  useEffect(() => {
    const updateVisibleCount = () => {
      const base = getVisibleCount(window.innerWidth);
      setVisibleCount(compactGrid ? Math.min(base, cardCount || 1) : base);
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);

    return () => {
      window.removeEventListener("resize", updateVisibleCount);
    };
  }, [cardCount, compactGrid]);

  useEffect(() => {
    setTrackIndex(loopStart);
    setIsSmooth(true);
    isAnimatingRef.current = false;
    setIsTrackSettled(true);
  }, [cardCount, loopStart, visibleCount]);

  useEffect(() => {
    const measure = () => {
      const slide = slideRef.current;
      const track = trackRef.current;

      if (!slide || !track) {
        return;
      }

      const slideStyles = window.getComputedStyle(slide);
      const trackStyles = window.getComputedStyle(track);
      const slideWidth = slide.getBoundingClientRect().width;
      const gap = Number.parseFloat(trackStyles.columnGap || trackStyles.gap || "0");
      const marginLeft = Number.parseFloat(slideStyles.marginLeft || "0");
      const marginRight = Number.parseFloat(slideStyles.marginRight || "0");

      setSlideStep(slideWidth + gap + marginLeft + marginRight);
    };

    measure();

    const observer = new ResizeObserver(measure);
    const slide = slideRef.current;
    const track = trackRef.current;

    if (slide) {
      observer.observe(slide);
    }

    if (track) {
      observer.observe(track);
    }

    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [cardCount, loopCards.length, visibleCount]);

  const activeDot = hasLoop ? trackIndex % cardCount : 0;

  const snapWithoutAnimation = useCallback((nextIndex: number) => {
    setIsSmooth(false);
    setTrackIndex(nextIndex);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsSmooth(true);
        isAnimatingRef.current = false;
        setIsTrackSettled(true);
      });
    });
  }, []);

  const handleTrackTransitionEnd = useCallback(
    (event: React.TransitionEvent<HTMLUListElement>) => {
      if (
        !hasLoop ||
        event.target !== trackRef.current ||
        event.propertyName !== "transform"
      ) {
        return;
      }

      if (trackIndex >= cardCount * 2) {
        snapWithoutAnimation(trackIndex - cardCount);
        return;
      }

      if (trackIndex < cardCount) {
        snapWithoutAnimation(trackIndex + cardCount);
        return;
      }

      isAnimatingRef.current = false;
      setIsTrackSettled(true);
    },
    [cardCount, hasLoop, snapWithoutAnimation, trackIndex],
  );

  const moveBy = useCallback(
    (delta: number) => {
      if (!hasLoop || isAnimatingRef.current) {
        return;
      }

      isAnimatingRef.current = true;
      setIsTrackSettled(false);
      setTrackIndex((current) => current + delta);
    },
    [hasLoop],
  );

  const goToCard = useCallback(
    (dotIndex: number) => {
      if (!hasLoop || isAnimatingRef.current) {
        return;
      }

      const normalized = ((dotIndex % cardCount) + cardCount) % cardCount;
      const targetIndex = cardCount + normalized;

      if (targetIndex === trackIndex) {
        return;
      }

      isAnimatingRef.current = true;
      setIsTrackSettled(false);
      setTrackIndex(targetIndex);
    },
    [cardCount, hasLoop, trackIndex],
  );

  const goToPreviousCard = useCallback(() => moveBy(-1), [moveBy]);
  const goToNextCard = useCallback(() => moveBy(1), [moveBy]);

  useEffect(() => {
    if (!hasLoop || isPaused || !isTrackSettled) {
      return;
    }

    const timer = window.setTimeout(() => {
      goToNextCard();
    }, AUTOPLAY_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, [goToNextCard, hasLoop, isPaused, isTrackSettled, trackIndex]);

  if (cardCount === 0) {
    return null;
  }

  return (
    <section className="sl-rich-page__page-refs" aria-label="Related pages">
      <div className="sl-rich-page__container">
        <div
            className={[
              "sl-rich-page__page-ref-carousel",
              hasLoop ? "sl-rich-page__page-ref-carousel--loop" : "",
              compactGrid && !hasLoop ? "sl-rich-page__page-ref-carousel--start" : "",
              !isTrackSettled ? "sl-rich-page__page-ref-carousel--moving" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            style={
              {
                "--sl-page-ref-visible": visibleCount,
                "--sl-page-ref-active-count": Math.min(cardCount, visibleCount),
                "--sl-page-ref-track-index": trackIndex,
                "--sl-page-ref-slide-step-px": slideStep ? `${slideStep}px` : undefined,
                "--sl-page-ref-motion": `${TRANSITION_MS}ms`,
              } as React.CSSProperties
            }
            aria-roledescription="carousel"
            aria-label="Placement events"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocusCapture={() => setIsPaused(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setIsPaused(false);
              }
            }}
          >
            {hasLoop ? (
              <button
                type="button"
                className="sl-rich-page__page-ref-arrow sl-rich-page__page-ref-arrow--prev"
                onClick={goToPreviousCard}
                aria-label="Previous event"
              >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M15 6l-6 6 6 6"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            ) : null}

            <div className="sl-rich-page__page-ref-viewport">
              <ul
                ref={trackRef}
                className={[
                  "sl-rich-page__page-ref-track",
                  isSmooth ? "" : "sl-rich-page__page-ref-track--instant",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onTransitionEnd={handleTrackTransitionEnd}
              >
                {loopCards.map((card, index) => (
                  <li
                    key={`${card.id}-${index}`}
                    ref={index === loopStart ? slideRef : undefined}
                    className="sl-rich-page__page-ref-slide"
                  >
                    <Link
                      href={card.href}
                      className={[
                        "sl-rich-page__page-ref-card",
                        card.image ? "" : "sl-rich-page__page-ref-card--panel",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      <PageRefCardContent card={card} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {hasLoop ? (
              <button
                type="button"
                className="sl-rich-page__page-ref-arrow sl-rich-page__page-ref-arrow--next"
                onClick={goToNextCard}
                aria-label="Next event"
              >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M9 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            ) : null}
          </div>

          {hasLoop ? (
            <div className="sl-rich-page__page-ref-dots" role="tablist" aria-label="Event slides">
              {cards.map((card, index) => (
                <button
                  key={card.id}
                  type="button"
                  role="tab"
                  aria-selected={index === activeDot}
                  aria-label={`Go to ${card.title}`}
                  className={[
                    "sl-rich-page__page-ref-dot",
                    index === activeDot ? "sl-rich-page__page-ref-dot--active" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => goToCard(index)}
                />
              ))}
            </div>
          ) : null}
      </div>
    </section>
  );
}
