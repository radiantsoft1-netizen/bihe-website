type RevealCallback = () => void;

const callbacks = new WeakMap<Element, RevealCallback>();
const observed = new Set<Element>();

let observer: IntersectionObserver | null = null;
let scrollFallbackAttached = false;

function isInRevealViewport(el: Element): boolean {
  const rect = el.getBoundingClientRect();
  const viewH = window.innerHeight || document.documentElement.clientHeight;
  return rect.top < viewH * 0.94 && rect.bottom > viewH * 0.06;
}

function revealElement(el: Element) {
  const onVisible = callbacks.get(el);
  if (!onVisible) return;

  onVisible();
  observer?.unobserve(el);
  callbacks.delete(el);
  observed.delete(el);
}

function checkObservedElements() {
  for (const el of observed) {
    if (isInRevealViewport(el)) {
      revealElement(el);
    }
  }
}

function attachScrollFallback() {
  if (scrollFallbackAttached || typeof window === "undefined") return;
  scrollFallbackAttached = true;

  window.addEventListener("scroll", checkObservedElements, { passive: true });

  const bindLenis = () => {
    const lenis = (window as Window & { __lenis?: { on: (event: string, cb: () => void) => void } })
      .__lenis;
    lenis?.on("scroll", checkObservedElements);
  };

  const hasLenis = Boolean(
    (window as Window & { __lenis?: { on: (event: string, cb: () => void) => void } }).__lenis,
  );

  if (hasLenis) {
    bindLenis();
  } else {
    window.addEventListener("lenis:ready", bindLenis, { once: true });
  }
}

function getObserver() {
  if (observer || typeof IntersectionObserver === "undefined") {
    return observer;
  }

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        revealElement(entry.target);
      }
    },
    { threshold: 0.08, rootMargin: "0px 0px 4% 0px" },
  );

  attachScrollFallback();
  return observer;
}

export function observeReveal(el: Element, onVisible: RevealCallback) {
  const obs = getObserver();
  if (!obs) {
    onVisible();
    return () => {};
  }

  callbacks.set(el, onVisible);
  observed.add(el);
  obs.observe(el);
  attachScrollFallback();

  requestAnimationFrame(() => {
    if (!observed.has(el) || !isInRevealViewport(el)) return;

    // Double rAF so mobile paints the hidden state before animating in.
    requestAnimationFrame(() => {
      if (observed.has(el) && isInRevealViewport(el)) {
        revealElement(el);
      }
    });
  });

  return () => {
    obs.unobserve(el);
    callbacks.delete(el);
    observed.delete(el);
  };
}
