import type { StudentFacilityNavIconName } from "@/lib/student-facilities-nav";

type StudentFacilityNavIconProps = {
  name: StudentFacilityNavIconName;
};

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function StudentFacilityNavIcon({ name }: StudentFacilityNavIconProps) {
  switch (name) {
    case "sports":
      return (
        <svg {...iconProps}>
          <path d="M6 9h12l-1.5 9H7.5L6 9z" />
          <path d="M9 9V6a3 3 0 0 1 6 0v3" />
          <path d="M8 13h8" />
        </svg>
      );
    case "nss":
      return (
        <svg {...iconProps}>
          <path d="M12 3 4 7v5c0 4.5 3.2 7.8 8 9 4.8-1.2 8-4.5 8-9V7l-8-4z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "hostel":
      return (
        <svg {...iconProps}>
          <path d="M4 20V9l8-5 8 5v11" />
          <path d="M9 20v-5h6v5" />
          <path d="M9 12h1M14 12h1M9 15h1M14 15h1" />
        </svg>
      );
    case "placement":
      return (
        <svg {...iconProps}>
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M8 7V5.5A4 4 0 0 1 16 5.5V7" />
          <path d="M12 12v4M10 14h4" />
        </svg>
      );
    case "grievance":
      return (
        <svg {...iconProps}>
          <path d="M14 3H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h9l5-3V5a2 2 0 0 0-2-2z" />
          <path d="M8 9h6M8 13h4" />
        </svg>
      );
    case "health":
      return (
        <svg {...iconProps}>
          <path d="M12 21s-6-3.6-6-9.5A4.5 4.5 0 0 1 12 8a4.5 4.5 0 0 1 6 3.5C18 17.4 12 21 12 21z" />
          <path d="M12 11v5M9.5 13.5h5" />
        </svg>
      );
    case "icc":
      return (
        <svg {...iconProps}>
          <path d="M12 3 4 7v5c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V7l-8-4z" />
          <path d="M9.5 12.5 11 14l3.5-4" />
        </svg>
      );
    case "anti-ragging":
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="9" />
          <path d="M8 8l8 8" />
          <path d="M9.5 7.5h5v5" />
        </svg>
      );
    case "equal-opportunity":
      return (
        <svg {...iconProps}>
          <path d="M12 3v18" />
          <path d="M6 7h12" />
          <path d="M8 21h8" />
          <circle cx="8" cy="14" r="2" />
          <circle cx="16" cy="14" r="2" />
        </svg>
      );
    case "sedg":
      return (
        <svg {...iconProps}>
          <circle cx="9" cy="8" r="2.5" />
          <circle cx="16" cy="9" r="2" />
          <path d="M4 19c0-2.8 2.2-5 5-5s4 2 7 2 3.5-2 3.5-4.5" />
          <path d="M12 14v3" />
        </svg>
      );
    case "differently-abled":
      return (
        <svg {...iconProps}>
          <circle cx="14" cy="6" r="2" />
          <path d="M11 8.5 9 11v4" />
          <path d="M9 11h4.5a2 2 0 0 1 2 2v2.5" />
          <circle cx="6.5" cy="18.5" r="2.5" />
          <path d="M4 18.5h9" />
        </svg>
      );
    case "computer-lab":
      return (
        <svg {...iconProps}>
          <rect x="2" y="4" width="20" height="13" rx="2" />
          <path d="M8 20h8" />
          <path d="M12 17v3" />
          <path d="M7 9h10M7 12h6" />
        </svg>
      );
    case "auditorium":
      return (
        <svg {...iconProps}>
          <path d="M4 20V10l8-4 8 4v10" />
          <path d="M4 20h16" />
          <path d="M10 14h4" />
        </svg>
      );
    case "canteen":
      return (
        <svg {...iconProps}>
          <path d="M4 11h16" />
          <path d="M6 11v6M10 11v6M14 11v6M18 11v6" />
          <path d="M3 8c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
        </svg>
      );
    case "youth-red-cross":
      return (
        <svg {...iconProps}>
          <path d="M12 3 5 6.5v5C5 17 8.5 20.5 12 22c3.5-1.5 7-5 7-10.5v-5L12 3z" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      );
  }
}
