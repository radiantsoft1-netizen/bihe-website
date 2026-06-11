"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { debugPerf, logDebug } from "@/lib/debug-perf";

const SCROLL_IDLE_MS = 150;

const anchorEasing = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

function getHeaderScrollOffset(): number {
  const raw = getComputedStyle(document.documentElement).getPropertyValue("--site-header-height");
  const height = parseFloat(raw);
  return Number.isFinite(height) ? -height : -120;
}

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.13,
      smoothWheel: true,
      syncTouch: true,
      syncTouchLerp: 0.12,
      wheelMultiplier: 1,
      touchMultiplier: 1,
    });

    const onAnchorClick = (event: MouseEvent) => {
      const link = (event.target as Element).closest<HTMLAnchorElement>("a[href]");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href || href === "#") return;

      let hash: string | null = null;
      if (href.startsWith("#") && href.length > 1) {
        hash = href;
      } else if (href.startsWith("/#") && window.location.pathname === "/") {
        hash = href.slice(1);
      }

      if (!hash) return;

      const target = document.querySelector<HTMLElement>(hash);
      if (!target) return;

      event.preventDefault();
      lenis.scrollTo(target, {
        offset: getHeaderScrollOffset(),
        duration: 1.55,
        easing: anchorEasing,
      });
    };

    document.addEventListener("click", onAnchorClick);

    let idleTimer: ReturnType<typeof setTimeout> | undefined;
    let isScrollingActive = false;

    const markScrolling = () => {
      const now = performance.now();
      if (debugPerf.lastScrollTickAt > 0) {
        const delta = now - debugPerf.lastScrollTickAt;
        debugPerf.scroll.ticks += 1;
        if (delta > debugPerf.scroll.maxFrameDeltaMs) {
          debugPerf.scroll.maxFrameDeltaMs = Math.round(delta);
        }
      }
      debugPerf.lastScrollTickAt = now;

      if (!isScrollingActive) {
        isScrollingActive = true;
        debugPerf.scroll.isScrollingToggles += 1;
        document.documentElement.classList.add("is-scrolling");
      }

      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        isScrollingActive = false;
        debugPerf.scroll.isScrollingToggles += 1;
        document.documentElement.classList.remove("is-scrolling");
      }, SCROLL_IDLE_MS);
    };

    lenis.on("scroll", markScrolling);

    const reportTimer = window.setTimeout(() => {
      logDebug(
        "H6",
        "SmoothScroll.tsx:lenis",
        "lenis scroll frame sample",
        {
          scrollTicks: debugPerf.scroll.ticks,
          maxFrameDeltaMs: debugPerf.scroll.maxFrameDeltaMs,
          isScrollingToggles: debugPerf.scroll.isScrollingToggles,
          lerp: 0.13,
        },
        "scroll-tune",
      );
    }, 4000);

    const scrollToLocationHash = () => {
      const hash = window.location.hash;
      if (!hash || hash === "#") return;

      const target = document.querySelector<HTMLElement>(hash);
      if (!target) return;

      requestAnimationFrame(() => {
        lenis.scrollTo(target, {
          offset: getHeaderScrollOffset(),
          duration: 0.85,
          easing: anchorEasing,
        });
      });
    };

    window.__lenis = lenis;
    document.documentElement.classList.add("has-smooth-scroll");
    window.dispatchEvent(new CustomEvent("lenis:ready"));
    scrollToLocationHash();
    window.addEventListener("hashchange", scrollToLocationHash);

    return () => {
      window.clearTimeout(reportTimer);
      window.removeEventListener("hashchange", scrollToLocationHash);
      document.removeEventListener("click", onAnchorClick);
      if (idleTimer) clearTimeout(idleTimer);
      document.documentElement.classList.remove("is-scrolling");
      lenis.destroy();
      delete window.__lenis;
      document.documentElement.classList.remove("has-smooth-scroll");
    };
  }, []);

  return null;
}
