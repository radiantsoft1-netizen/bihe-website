import type { HostelFacilityIconName } from "@/lib/student-life-pages/types";

type HostelFacilityIconProps = {
  name: HostelFacilityIconName;
};

export function HostelFacilityIcon({ name }: HostelFacilityIconProps) {
  switch (name) {
    case "accommodation":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
          <path d="M4 10V20M20 10V20" />
          <path d="M4 14h16" />
          <path d="M7 14v6M17 14v6" />
          <path d="M9 10V7a3 3 0 0 1 6 0v3" />
        </svg>
      );
    case "safety":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
          <path d="M12 3l8 4v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V7l8-4z" />
          <path d="M9.5 12.5l2 2 4-4" />
        </svg>
      );
    case "dining":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
          <path d="M6 4v8M8 4v8M7 12v8" />
          <path d="M5 4c0 2 1 3 2 4" />
          <path d="M14 4v16" />
          <path d="M18 4c0 4-1 6-4 6v10" />
        </svg>
      );
    case "medical":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
          <rect x="4" y="6" width="16" height="14" rx="2" />
          <path d="M12 10v6M9 13h6" />
        </svg>
      );
    case "housekeeping":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
          <path d="M12 3l1.2 3.6L17 8l-3.6 1.2L12 13l-1.2-3.8L7 8l3.8-1.4L12 3z" />
          <path d="M5 16l1 2.5L8.5 20l-2.5 1L5 23.5 3.5 21 1 20l2.5-1.5L5 16z" />
          <path d="M19 14l0.8 2 2.2 0.8-2.2 0.8L19 20l-0.8-2.2L16 17l2.2-0.8L19 14z" />
        </svg>
      );
    case "common-facilities":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
          <path d="M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      );
  }
}
