"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowRightIcon } from "@/components/ui/icons";
import { SmartImage } from "@/components/ui/SmartImage";
import {
  getSportsEventIconName,
  SportsEventCardIcon,
} from "@/components/student-life/SportsEventCardIcon";
import type { SportsFacilityNavCard } from "@/lib/sports-facilities-content";
import { sportsFacilitiesSectionHref } from "@/lib/sports-facilities-routes";

const AUTOPLAY_MS = 4500;
const TRANSITION_MS = 650;

type SportsInterCollegeCarouselProps = {
  cards: readonly SportsFacilityNavCard[];
};

function getVisibleCount(width: number) {
  if (width < 640) return 1;
  if (width < 900) return 2;
  if (width < 1200) return 3;
  return 4;
}

export function SportsInterCollegeCarousel({ cards }: SportsInterCollegeCarouselProps) {
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
      setVisibleCount(getVisibleCount(window.innerWidth));
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);

    return () => {
      window.removeEventListener("resize", updateVisibleCount);
    };
  }, []);

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
    <div className="sf-page__event-carousel-wrap">
      <div
        className={[
          "sf-page__event-carousel",
          hasLoop ? "sf-page__event-carousel--loop" : "",
          !isTrackSettled ? "sf-page__event-carousel--moving" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      style={
        {
          "--sf-event-visible": visibleCount,
          "--sf-event-track-index": trackIndex,
          "--sf-event-slide-step-px": slideStep ? `${slideStep}px` : undefined,
          "--sf-event-motion": `${TRANSITION_MS}ms`,
        } as React.CSSProperties
      }
      aria-roledescription="carousel"
      aria-label="Inter college sports events"
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
          className="sf-page__event-arrow sf-page__event-arrow--prev"
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

      <div className="sf-page__event-viewport">
        <ul
          ref={trackRef}
          className={[
            "sf-page__event-track",
            isSmooth ? "" : "sf-page__event-track--instant",
          ]
            .filter(Boolean)
            .join(" ")}
          onTransitionEnd={handleTrackTransitionEnd}
        >
          {loopCards.map((card, index) => (
            <li
              key={`${card.id}-${index}`}
              ref={index === loopStart ? slideRef : undefined}
              className="sf-page__event-slide"
            >
              <Link
                href={sportsFacilitiesSectionHref(card.sectionId)}
                className="sf-page__event-card"
              >
                <div className="sf-page__event-media">
                  <SmartImage
                    src={card.image}
                    alt={card.imageAlt}
                    fill
                    className="sf-page__event-img"
                    sizes="(max-width: 640px) 88vw, (max-width: 1200px) 33vw, 22rem"
                    priority={index < visibleCount + 1}
                  />
                  <span className="sf-page__event-scrim" aria-hidden />
                </div>

                <div className="sf-page__event-body">
                  <SportsEventCardIcon name={getSportsEventIconName(card.sectionId)} />
                  <h3 className="sf-page__event-title">{card.title}</h3>
                  <span className="sf-page__event-cta">
                    Read More
                    <ArrowRightIcon className="sf-page__event-cta-icon" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {hasLoop ? (
        <button
          type="button"
          className="sf-page__event-arrow sf-page__event-arrow--next"
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
        <div className="sf-page__event-dots" role="tablist" aria-label="Event slides">
          {cards.map((card, index) => (
            <button
              key={card.id}
              type="button"
              role="tab"
              aria-selected={index === activeDot}
              aria-label={`Go to ${card.title}`}
              className={[
                "sf-page__event-dot",
                index === activeDot ? "sf-page__event-dot--active" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => goToCard(index)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
