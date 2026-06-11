"use client";

import { useEffect, useRef, useState } from "react";
import { debugPerf, logDebug } from "@/lib/debug-perf";
import { Reveal } from "@/components/ui/Reveal";

const quotes = [
  {
    text: "BIHE provides quality education and strong placement support — a key asset for Davangere's next generation of professionals.",
    author: "Industry Partner",
    role: "Recruitment Lead",
  },
  {
    text: "The BCA program builds solid fundamentals. Graduates are well prepared for IT careers and further studies.",
    author: "Alumni",
    role: "Software Engineer",
  },
  {
    text: "B.Com at BIHE balances theory and practice. Students gain skills needed in today's competitive business world.",
    author: "Faculty",
    role: "Commerce Department",
  },
];

export function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const [changing, setChanging] = useState(false);
  const pendingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const quote = quotes[index];

  useEffect(() => {
    const timer = setInterval(() => {
      setChanging(true);
      pendingTimeoutRef.current = setTimeout(() => {
        pendingTimeoutRef.current = null;
        setIndex((i) => (i + 1) % quotes.length);
        setChanging(false);
      }, 400);
    }, 5500);
    return () => {
      clearInterval(timer);
      if (pendingTimeoutRef.current) {
        debugPerf.testimonialUnmountWithPendingTimeout += 1;
        logDebug("H4", "TestimonialsSection.tsx:cleanup", "unmount with pending testimonial timeout", {});
        clearTimeout(pendingTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section className="bihe-section bihe-testimonials" aria-labelledby="testimonials-title">
      <div className="bihe-container">
        <Reveal>
          <p className="bihe-eyebrow" style={{ color: "var(--maroon-100)", textAlign: "center" }}>
            Testimonials
          </p>
          <h2
            className="bihe-display bihe-display--lg"
            id="testimonials-title"
            style={{ color: "#fff", textAlign: "center" }}
          >
            What partners say about us
          </h2>
        </Reveal>
        <div className="bihe-testimonials__slider">
          <p className={`bihe-testimonials__quote${changing ? " is-changing" : ""}`}>
            &ldquo;{quote.text}&rdquo;
          </p>
          <p className="bihe-testimonials__author">{quote.author}</p>
          <p className="bihe-testimonials__role">{quote.role}</p>
          <div className="bihe-testimonials__nav" role="tablist">
            {quotes.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Testimonial ${i + 1}`}
                className={`bihe-testimonials__dot${i === index ? " bihe-testimonials__dot--active" : ""}`}
                onClick={() => {
                  setChanging(true);
                  if (pendingTimeoutRef.current) {
                    clearTimeout(pendingTimeoutRef.current);
                  }
                  pendingTimeoutRef.current = setTimeout(() => {
                    pendingTimeoutRef.current = null;
                    setIndex(i);
                    setChanging(false);
                  }, 300);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
