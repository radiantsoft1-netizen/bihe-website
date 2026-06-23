"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { StudentFacilityNavIcon } from "@/components/student-life/StudentFacilityNavIcon";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import {
  isActiveStudentFacilityPath,
  STUDENT_FACILITIES_NAV_ITEMS,
  STUDENT_FACILITIES_NAV_TITLE,
} from "@/lib/student-facilities-nav";

const CENTER_DWELL_MS = 2000;

function getVisibleCount(width: number) {
  if (width <= 640) return 2;
  if (width <= 860) return 3;
  return 5;
}

function getMaxDistance(visibleCount: number) {
  return Math.floor(visibleCount / 2);
}

type CardPosition = "center" | "near" | "side" | "hidden";

function getCardPosition(
  slideIndex: number,
  trackIndex: number,
  maxDistance: number,
): CardPosition {
  const distance = Math.abs(slideIndex - trackIndex);

  if (distance > maxDistance) {
    return "hidden";
  }

  if (distance === 0) {
    return "center";
  }

  if (distance === 1) {
    return "near";
  }

  return "side";
}

function getFacilityToneIndex(slug: string) {
  return STUDENT_FACILITIES_NAV_ITEMS.findIndex((entry) => entry.slug === slug);
}

function FacilityCard({
  item,
  position,
}: {
  item: (typeof STUDENT_FACILITIES_NAV_ITEMS)[number];
  position: CardPosition;
}) {
  const isCenter = position === "center";
  const isAltTone = getFacilityToneIndex(item.slug) % 2 === 1;

  return (
    <Link
      href={item.href}
      className={[
        "sl-facilities-nav__card",
        isCenter ? "sl-facilities-nav__card--center" : "sl-facilities-nav__card--side",
      ].join(" ")}
      aria-current={isCenter ? "true" : undefined}
      tabIndex={position === "hidden" ? -1 : undefined}
    >
      <div className="sl-facilities-nav__media" aria-hidden={!isCenter}>
        <SmartImage
          src={item.image}
          alt=""
          fill
          className="sl-facilities-nav__image"
          sizes={isCenter ? "280px" : "160px"}
        />
        <span className="sl-facilities-nav__scrim" />
      </div>

      <div className="sl-facilities-nav__body">
        <span
          className={[
            "sl-facilities-nav__icon-wrap",
            isAltTone ? "sl-facilities-nav__icon-wrap--alt" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <StudentFacilityNavIcon name={item.icon} />
        </span>
        <h3 className="sl-facilities-nav__label">{item.label}</h3>
        <span className="sl-facilities-nav__cta" aria-hidden={!isCenter}>
          View
          <svg viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}

export function StudentFacilitiesNavSection() {
  const pathname = usePathname();
  const [visibleCount, setVisibleCount] = useState(5);
  const [trackIndex, setTrackIndex] = useState(0);
  const [slideStep, setSlideStep] = useState(0);
  const [isSmooth, setIsSmooth] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isTrackSettled, setIsTrackSettled] = useState(true);
  const trackRef = useRef<HTMLUListElement>(null);
  const slideRef = useRef<HTMLLIElement>(null);
  const isAnimatingRef = useRef(false);

  const visibleCards = STUDENT_FACILITIES_NAV_ITEMS.filter(
    (item) => !isActiveStudentFacilityPath(pathname, item.href),
  );

  const cardCount = visibleCards.length;
  const hasLoop = cardCount > 1;

  const loopCards = useMemo(() => {
    if (!hasLoop) {
      return visibleCards;
    }

    return [...visibleCards, ...visibleCards, ...visibleCards];
  }, [hasLoop, visibleCards]);

  const loopStart = hasLoop ? cardCount : 0;

  const maxDistance = getMaxDistance(visibleCount);

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
  }, [cardCount, loopStart, pathname]);

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
  }, [cardCount, loopCards.length]);

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

      const normalized =
        ((dotIndex % cardCount) + cardCount) % cardCount;
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
    }, CENTER_DWELL_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, [goToNextCard, hasLoop, isPaused, isTrackSettled, trackIndex]);

  if (visibleCards.length === 0) {
    return null;
  }

  return (
    <section
      className="sl-facilities-nav"
      aria-labelledby="sl-facilities-nav-title"
      style={
        {
          "--sl-facilities-visible": visibleCount,
        } as React.CSSProperties
      }
    >
      <div className="sl-facilities-nav__container">
        <Reveal>
          <div className="sl-facilities-nav__header">
            <h2
              className="sl-facilities-nav__title"
              id="sl-facilities-nav-title"
            >
              {STUDENT_FACILITIES_NAV_TITLE}
            </h2>
            <p className="sl-facilities-nav__subtitle">
              Explore campus facilities and student support services
            </p>
          </div>
        </Reveal>

        <div
          className={[
            "sl-facilities-nav__slider",
            !isTrackSettled ? "sl-facilities-nav__slider--moving" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          aria-roledescription="carousel"
          aria-label={STUDENT_FACILITIES_NAV_TITLE}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setIsPaused(false);
            }
          }}
        >
          <button
            type="button"
            className="sl-facilities-nav__arrow sl-facilities-nav__arrow--prev"
            onClick={goToPreviousCard}
            disabled={!hasLoop}
            aria-label="Previous facility"
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

          <div className="sl-facilities-nav__viewport">
            <ul
              ref={trackRef}
              className={[
                "sl-facilities-nav__track",
                isSmooth ? "" : "sl-facilities-nav__track--instant",
              ]
                .filter(Boolean)
                .join(" ")}
              onTransitionEnd={handleTrackTransitionEnd}
              style={
                {
                  "--sl-facilities-track-index": trackIndex,
                  "--sl-facilities-slide-step-px":
                    slideStep > 0 ? `${slideStep}px` : undefined,
                } as React.CSSProperties
              }
            >
              {loopCards.map((item, slideIndex) => {
                const position = getCardPosition(
                  slideIndex,
                  trackIndex,
                  maxDistance,
                );

                return (
                  <li
                    key={`${item.slug}-${slideIndex}`}
                    ref={slideIndex === loopStart ? slideRef : undefined}
                    className={[
                      "sl-facilities-nav__slide",
                      position === "center"
                        ? "sl-facilities-nav__slide--center"
                        : "",
                      position === "near" ? "sl-facilities-nav__slide--near" : "",
                      position === "side" ? "sl-facilities-nav__slide--side" : "",
                      position === "hidden"
                        ? "sl-facilities-nav__slide--hidden"
                        : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    aria-hidden={position === "hidden"}
                  >
                    <FacilityCard item={item} position={position} />
                  </li>
                );
              })}
            </ul>
          </div>

          <button
            type="button"
            className="sl-facilities-nav__arrow sl-facilities-nav__arrow--next"
            onClick={goToNextCard}
            disabled={!hasLoop}
            aria-label="Next facility"
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
        </div>

        {hasLoop ? (
          <div
            className="sl-facilities-nav__dots"
            role="tablist"
            aria-label="Facilities"
          >
            {visibleCards.map((item, dotIndex) => (
              <button
                key={item.slug}
                type="button"
                role="tab"
                aria-selected={dotIndex === activeDot}
                aria-label={`Go to ${item.label}`}
                className={[
                  "sl-facilities-nav__dot",
                  dotIndex === activeDot ? "sl-facilities-nav__dot--active" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => goToCard(dotIndex)}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
