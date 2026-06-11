"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { debugPerf, logDebug } from "@/lib/debug-perf";
import { observeReveal } from "@/lib/shared-reveal-observer";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale";
  as?: "div" | "section" | "article" | "li";
};

export function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    debugPerf.revealObservers += 1;
    if (debugPerf.revealObservers % 10 === 0) {
      logDebug("H3", "Reveal.tsx:useEffect", "reveal element registered", {
        total: debugPerf.revealObservers,
      });
    }

    return observeReveal(el, () => setVisible(true));
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={`reveal reveal--${direction}${visible ? " is-visible" : ""}${className ? ` ${className}` : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
