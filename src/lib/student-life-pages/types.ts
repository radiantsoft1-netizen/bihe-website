import type { StudentLifeShowcase } from "@/lib/student-life-showcase";

export type HostelFacilityIconName =
  | "accommodation"
  | "safety"
  | "dining"
  | "medical"
  | "housekeeping"
  | "common-facilities";

export type StudentLifeImage = {
  src: string;
  alt: string;
  /** Defaults to cover; use contain for portrait posters and collages. */
  fit?: "cover" | "contain";
  caption?: string;
  /** Short label for split banner panels. */
  label?: string;
};

export type StudentLifeOfficer = {
  name: string;
  title: string;
  role: string;
  image: string;
  imageAlt: string;
};

export type StudentLifeTableColumn = {
  key: string;
  header: string;
};

export type StudentLifeTable = {
  id: string;
  title: string;
  caption: string;
  columns: readonly StudentLifeTableColumn[];
  rows: readonly Record<string, string>[];
};

export type StudentLifeSubsection = {
  title: string;
  paragraphs?: readonly string[];
  bullets?: readonly string[];
  /** Split bullets into two side-by-side columns when set to 2. */
  bulletColumns?: 1 | 2;
  /** Span full width inside a subsection grid. */
  span?: "full";
  /** Emphasized closing block styling. */
  variant?: "objective";
};

export type StudentLifeTextSection = {
  id: string;
  title: string;
  paragraphs?: readonly string[];
  bullets?: readonly string[];
  /** Split bullets into two side-by-side columns when set to 2. */
  bulletColumns?: 1 | 2;
  subsections?: readonly StudentLifeSubsection[];
  image?: StudentLifeImage;
};

export type StudentLifeFacilityCard = {
  number: string;
  title: string;
  text: string;
};

export type StudentLifeStat = {
  value?: string;
  label?: string;
  description?: string;
};

export type StudentLifePageRefCard = {
  id: string;
  title: string;
  description?: string;
  eyebrow?: string;
  dateLabel?: string;
  yearLabel?: string;
  href: string;
  image?: string;
  imageAlt?: string;
};

export type StudentLifeSplitPanel = {
  title: string;
  bullets: readonly string[];
  image?: StudentLifeImage;
  dark?: boolean;
};

export type StudentLifeAlternatingSection = {
  id: string;
  title: string;
  paragraphs: readonly string[];
  image?: StudentLifeImage;
  reverse?: boolean;
};

export type StudentLifeIntroHighlight = {
  id: string;
  title: string;
  description: string;
  image?: StudentLifeImage;
  icon?: HostelFacilityIconName;
};

export type StudentLifeRichPageConfig = {
  slug: string;
  currentPage: string;
  title: string;
  lead: string;
  banner?: StudentLifeImage & {
    kicker?: string;
    overlayTitle?: string;
    imageFit?: "cover" | "contain";
    /** When set, renders a side-by-side split banner instead of a single image. */
    images?: readonly StudentLifeImage[];
  };
  intro?: {
    title: string;
    paragraphs: readonly string[];
    kicker?: string;
    bulletsTitle?: string;
    bullets?: readonly string[];
    image?: StudentLifeImage;
    images?: readonly StudentLifeImage[];
    /** Right-side intro slider cards (auto-rotating). */
    sliderImages?: readonly StudentLifeImage[];
    /** Full-width infographic layout with highlight cards. */
    variant?: "default" | "infographic";
    highlights?: readonly StudentLifeIntroHighlight[];
    footerParagraphs?: readonly string[];
  };
  officers?: readonly StudentLifeOfficer[];
  showcase?: StudentLifeShowcase;
  showcases?: readonly StudentLifeShowcase[];
  /** Compact image + text cards instead of full-height showcase strips. */
  highlightVariant?: "cards" | "rows";
  postIntroSections?: readonly StudentLifeTextSection[];
  sections?: readonly StudentLifeTextSection[];
  tables?: readonly StudentLifeTable[];
  facilityCards?: readonly StudentLifeFacilityCard[];
  stats?: readonly StudentLifeStat[];
  pageRefCards?: readonly StudentLifePageRefCard[];
  splitPanel?: StudentLifeSplitPanel;
  alternating?: readonly StudentLifeAlternatingSection[];
};
