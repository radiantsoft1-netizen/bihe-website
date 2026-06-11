"use client";

import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import type { StudentLifeStat } from "@/lib/student-life-pages/types";

function parseStatValue(value?: string) {
  if (!value) return null;

  const match = value.match(/^(\d+)(.*)$/);
  if (!match) return null;

  return {
    count: Number(match[1]),
    suffix: match[2] || "",
  };
}

type StudentLifeStatsBarProps = {
  stats: readonly StudentLifeStat[];
  variant?: "bar" | "cards";
};

export function StudentLifeStatsBar({ stats, variant = "bar" }: StudentLifeStatsBarProps) {
  if (variant === "cards") {
    return (
      <section className="mpd-page__stats" aria-label="Placement drive highlights">
        <div className="mpd-page__container">
          <ul className="mpd-page__stats-grid">
            {stats.map((stat, index) => {
              const parsed = parseStatValue(stat.value);
              const description = stat.description ?? stat.label ?? "";

              return (
                <li key={description || stat.value || String(index)}>
                  <Reveal delay={60 + index * 50} direction="up">
                    <div
                      className={[
                        "mpd-page__stats-card",
                        parsed ? "" : "mpd-page__stats-card--highlight",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {parsed ? (
                        <p className="mpd-page__stats-value">
                          <CountUp end={parsed.count} suffix={parsed.suffix} />
                        </p>
                      ) : null}
                      <p className="mpd-page__stats-description">{description}</p>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section className="sl-rich-page__stats" aria-label="Placement drive highlights">
      <div className="sl-rich-page__container">
        <ul className="sl-rich-page__stats-bar">
          {stats.map((stat, index) => {
            const parsed = parseStatValue(stat.value);
            const description = stat.description ?? stat.label ?? "";

            return (
              <li
                key={description || stat.value || String(index)}
                className={[
                  "sl-rich-page__stats-item",
                  parsed ? "" : "sl-rich-page__stats-item--highlight",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {parsed ? (
                  <p className="sl-rich-page__stats-value">
                    <CountUp end={parsed.count} suffix={parsed.suffix} />
                  </p>
                ) : null}
                <p className="sl-rich-page__stats-description">{description}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
