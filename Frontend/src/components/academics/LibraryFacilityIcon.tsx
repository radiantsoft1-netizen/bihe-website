import type { LibraryFacilityIcon } from "@/lib/library-content";

type LibraryFacilityIconProps = {
  name: LibraryFacilityIcon;
};

export function LibraryFacilityIcon({ name }: LibraryFacilityIconProps) {
  switch (name) {
    case "reading":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
          <path d="M4 19h16M6 17V7M10 17V5M14 17V7M18 17V9" />
        </svg>
      );
    case "digital":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
          <rect x="3" y="4" width="18" height="12" rx="2" />
          <path d="M8 20h8M12 16v4" />
        </svg>
      );
    case "reprography":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
          <rect x="6" y="3" width="12" height="8" rx="1" />
          <rect x="4" y="13" width="16" height="8" rx="1" />
          <path d="M8 17h8" />
        </svg>
      );
    case "reference":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
          <path d="M5 4h7l2 3h5v13H5z" />
          <path d="M9 12h6M9 16h4" />
        </svg>
      );
    case "internet":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
        </svg>
      );
    case "newspaper":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
          <rect x="4" y="5" width="16" height="14" rx="1" />
          <path d="M8 9h8M8 13h8M8 17h5" />
        </svg>
      );
  }
}
