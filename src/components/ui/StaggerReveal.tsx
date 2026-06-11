"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type StaggerRevealProps = {
  children: ReactNode;
  className?: string;
};

export function StaggerReveal({ children, className = "" }: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`bihe-stagger${visible ? " is-visible" : ""}${className ? ` ${className}` : ""}`}
    >
      {children}
    </div>
  );
}
