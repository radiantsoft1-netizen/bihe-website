import type { ReactNode } from "react";

type IconProps = {
  className?: string;
};

export function MortarboardIcon({ className }: IconProps = {}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6L23 9 12 3zm0 2.27l6.18 3.45L12 12.18 5.82 8.72 12 5.27zM7 11.09v4.36L12 18l5-2.55v-4.36L12 14.55 7 11.09z" />
    </svg>
  );
}

/** Standard CTA arrow — used on all primary / link buttons */
export function ArrowRightIcon({ className = "btn__icon" }: IconProps = {}) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 10h12" />
      <path d="M11 5l5 5-5 5" />
    </svg>
  );
}

export function ChevronLeftIcon() {
  return (
    <svg
      className="hero__chevron-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M15 6l-6 6 6 6" />
    </svg>
  );
}

export function PdfFileIcon({ className }: IconProps = {}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M10 13h4M10 17h4M8 13h.01M8 17h.01" />
    </svg>
  );
}

export function ChevronRightIcon() {
  return (
    <svg
      className="hero__chevron-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

type SocialIconProps = IconProps & {
  size?: number;
};

const SOCIAL_STROKE = 1.85;

const socialStroke = {
  stroke: "currentColor",
  strokeWidth: SOCIAL_STROKE,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function SocialSvg({
  className,
  size = 24,
  children,
}: SocialIconProps & { children: ReactNode }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      {children}
    </svg>
  );
}

/** Matched stroke-style social icons for header and footer */
export function FacebookIcon({ className, size = 24 }: SocialIconProps = {}) {
  return (
    <SocialSvg className={className} size={size}>
      <path
        d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
        {...socialStroke}
      />
    </SocialSvg>
  );
}

export function LinkedInIcon({ className, size = 24 }: SocialIconProps = {}) {
  return (
    <SocialSvg className={className} size={size}>
      <path
        d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
        {...socialStroke}
      />
      <rect x="2" y="9" width="4" height="12" {...socialStroke} />
      <circle cx="4" cy="4" r="2" {...socialStroke} />
    </SocialSvg>
  );
}

export function YouTubeIcon({ className, size = 24 }: SocialIconProps = {}) {
  return (
    <SocialSvg className={className} size={size}>
      <path
        d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"
        {...socialStroke}
      />
      <path d="m10 15 5-3-5-3z" fill="currentColor" stroke="none" />
    </SocialSvg>
  );
}

export function InstagramIcon({ className, size = 24 }: SocialIconProps = {}) {
  return (
    <SocialSvg className={className} size={size}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" {...socialStroke} />
      <circle cx="12" cy="12" r="4" {...socialStroke} />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </SocialSvg>
  );
}
