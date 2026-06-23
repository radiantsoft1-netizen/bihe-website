"use client";

import { useCallback, useEffect, useState } from "react";

const SCROLL_SHOW_AT = 280;

function getHeaderScrollOffset(): number {
  const raw = getComputedStyle(document.documentElement).getPropertyValue("--site-header-height");
  const height = parseFloat(raw);
  return Number.isFinite(height) ? -height : -120;
}

const scrollEasing = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

function ChevronUpIcon() {
  return (
    <svg
      className="back-to-hero__icon"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M10 4v12" />
      <path d="M5 9l5-5 5 5" />
    </svg>
  );
}

export function BackToHeroButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const readScroll = () => window.__lenis?.scroll ?? window.scrollY;
    const update = () => setVisible(readScroll() > SCROLL_SHOW_AT);

    const onScroll = () => update();

    const bindLenis = () => {
      const lenis = window.__lenis;
      if (!lenis) return;
      window.removeEventListener("scroll", onScroll);
      update();
      lenis.on("scroll", onScroll);
    };

    const unbindLenis = () => {
      window.__lenis?.off("scroll", onScroll);
      window.addEventListener("scroll", onScroll, { passive: true });
    };

    update();
    window.addEventListener("lenis:ready", bindLenis);
    if (window.__lenis) {
      bindLenis();
    } else {
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    return () => {
      window.removeEventListener("lenis:ready", bindLenis);
      window.removeEventListener("scroll", onScroll);
      unbindLenis();
    };
  }, []);

  const scrollToTop = useCallback(() => {
    const hero = document.getElementById("hero") ?? document.getElementById("page-hero");
    const lenis = window.__lenis;
    const headerOffset = getHeaderScrollOffset();

    if (lenis) {
      lenis.scrollTo(hero ?? 0, {
        offset: hero ? headerOffset : 0,
        duration: 1.2,
        easing: scrollEasing,
      });
      return;
    }

    const top = hero
      ? hero.getBoundingClientRect().top + window.scrollY + headerOffset
      : 0;

    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }, []);

  return (
    <button
      type="button"
      className={`back-to-hero${visible ? " back-to-hero--visible" : ""}`}
      aria-label="Back to top"
      onClick={scrollToTop}
    >
      <ChevronUpIcon />
    </button>
  );
}
