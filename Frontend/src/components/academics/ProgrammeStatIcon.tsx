type ProgrammeStatIconProps = {
  icon: "intake" | "duration" | "level";
  className?: string;
};

export function ProgrammeStatIcon({ icon, className }: ProgrammeStatIconProps) {
  if (icon === "intake") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M16 11c1.657 0 3-1.567 3-3.5S17.657 4 16 4s-3 1.567-3 3.5 1.343 3.5 3 3.5Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M8 11c1.657 0 3-1.567 3-3.5S9.657 4 8 4 5 5.567 5 7.5 6.343 11 8 11Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M3.5 20v-1.2c0-2.21 2.462-4 5.5-4h.5M20.5 20v-1.2c0-2.21-2.462-4-5.5-4h-.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M12 20v-1.2c0-2.21 2.462-4 5.5-4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (icon === "duration") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect
          x="4"
          y="5"
          width="16"
          height="15"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path d="M8 3v4M16 3v4M4 10h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path
          d="M12 13.5v3.5l2.25 1.25"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6L23 9 12 3zm0 2.27l6.18 3.45L12 12.18 5.82 8.72 12 5.27zM7 11.09v4.36L12 18l5-2.55v-4.36L12 14.55 7 11.09z" />
    </svg>
  );
}
