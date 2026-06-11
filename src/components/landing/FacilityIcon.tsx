export type FacilityIconName =
  | "library"
  | "computer-labs"
  | "hostel"
  | "placement"
  | "extracurricular"
  | "canteen"
  | "sports"
  | "auditorium";

type FacilityIconProps = {
  name: FacilityIconName;
};

export function FacilityIcon({ name }: FacilityIconProps) {
  switch (name) {
    case "library":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
          <path d="M5 4h14v16H5z" />
          <path d="M9 8h6M9 12h6M9 16h4" />
        </svg>
      );
    case "computer-labs":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
          <rect x="3" y="4" width="18" height="12" rx="2" />
          <path d="M8 20h8M12 16v4" />
        </svg>
      );
    case "hostel":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
          <path d="M4 20V9l8-5 8 5v11" />
          <path d="M9 20v-6h6v6" />
        </svg>
      );
    case "placement":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M8 7V5a4 4 0 0 1 8 0v2" />
        </svg>
      );
    case "extracurricular":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
          <circle cx="9" cy="8" r="3" />
          <circle cx="16" cy="9" r="2.5" />
          <path d="M4 20c0-3 2.5-5 5-5s5 2 8 2 3-2 3-5" />
        </svg>
      );
    case "canteen":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
          <path d="M4 11h16v2H4z" />
          <path d="M6 13v5M10 13v5M14 13v5M18 13v5" />
          <path d="M8 6h8l-1 5H9L8 6z" />
        </svg>
      );
    case "sports":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3c2 3 2 15 0 18M3 12h18" />
        </svg>
      );
    case "auditorium":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
          <path d="M8 20V10l4-3 4 3v10" />
          <path d="M6 20h12" />
          <path d="M12 7v2" />
        </svg>
      );
  }
}
