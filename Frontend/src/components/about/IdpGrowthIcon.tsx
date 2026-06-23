type IdpGrowthIconProps = {
  name: "nurturing" | "opportunity" | "career" | "holistic" | "innovation";
};

export function IdpGrowthIcon({ name }: IdpGrowthIconProps) {
  switch (name) {
    case "nurturing":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 20c0-3.5 3.1-6 7-6s7 2.5 7 6" />
        </svg>
      );
    case "opportunity":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2l2.2 6.8H21l-5.5 4 2.1 6.7L12 15.5 6.4 19.5l2.1-6.7L3 8.8h6.8L12 2z" />
        </svg>
      );
    case "career":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M8 7V5a4 4 0 0 1 8 0v2" />
        </svg>
      );
    case "holistic":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
          <circle cx="12" cy="12" r="9" />
          <path d="M2 12h20M12 2a14 14 0 0 1 0 20M12 2a14 14 0 0 0 0 20" />
        </svg>
      );
    case "innovation":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
          <path d="M9 18h6M10 22h4" />
          <path d="M12 2a6 6 0 0 0-4 10.5c.6.5 1 1.2 1 2h6c0-.8.4-1.5 1-2A6 6 0 0 0 12 2z" />
        </svg>
      );
  }
}
