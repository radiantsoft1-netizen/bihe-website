import type { ReactNode } from "react";

type SportsEventCardIconProps = {
  name: SportsEventIconName;
};

export type SportsEventIconName =
  | "events"
  | "badminton"
  | "football"
  | "table-tennis"
  | "chess";

const ICONS: Record<SportsEventIconName, ReactNode> = {
  events: (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden>
      <path
        d="M16 30h16M20 18v12M28 18v12M14 10h20l2 8H12l2-8Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 34h24"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  badminton: (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden>
      <circle cx="30" cy="14" r="7" stroke="currentColor" strokeWidth="2" />
      <path
        d="M10 38 30 18"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
      <path
        d="M8 40c3-1 6-3 8-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  football: (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden>
      <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="2" />
      <path
        d="M24 10 18 16l2 10h8l2-10-6-6ZM18 16l-8 2 4 8 6-2M30 16l8 2-4 8-6-2M20 26l-2 10 6 4 6-4-2-10"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  ),
  "table-tennis": (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden>
      <ellipse cx="18" cy="30" rx="10" ry="6" stroke="currentColor" strokeWidth="2" />
      <path
        d="M28 22c6-6 12-4 14 2s-2 12-8 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="36" cy="14" r="3" fill="currentColor" />
    </svg>
  ),
  chess: (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden>
      <path
        d="M18 10h12v4c0 4-6 4-6 8h6v14H18V22h6c0-4-6-4-6-8v-4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M14 36h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
};

export function getSportsEventIconName(sectionId: string): SportsEventIconName {
  if (sectionId === "events-2024-25") return "events";
  if (sectionId === "badminton") return "badminton";
  if (sectionId === "football") return "football";
  if (sectionId === "table-tennis") return "table-tennis";
  return "chess";
}

export function SportsEventCardIcon({ name }: SportsEventCardIconProps) {
  return <span className="sf-page__event-card-icon">{ICONS[name]}</span>;
}
