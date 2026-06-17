export type AlumniProfile = {
  id: string;
  slug: string;
  name: string;
  batchYear?: number | null;
  passoutYear?: number | null;
  admissionYear?: number | null;
  program: string;
  classSection?: string | null;
  currentRole?: string | null;
  currentEmployer?: string | null;
  currentLocation?: string | null;
  currentStatus?: string | null;
  willingToMentor?: boolean;
  bio?: string | null;
  testimonial?: string | null;
  bioParagraphs?: string[];
  testimonialParagraphs?: string[];
  photo?: string | null;
  linkedinUrl?: string | null;
  isFeatured?: boolean;
  href: string;
  sortOrder?: number;
};

export type AlumniEvent = {
  id: string;
  slug: string;
  title: string;
  summary?: string | null;
  body?: string | null;
  bodyParagraphs?: string[];
  eventDate?: string | null;
  venue?: string | null;
  image?: string | null;
  href: string;
  dateLabel?: string | null;
  yearLabel?: string | null;
  sortOrder?: number;
};

export type AlumniEventCard = Pick<
  AlumniEvent,
  "id" | "slug" | "title" | "summary" | "href" | "dateLabel" | "yearLabel" | "image"
>;
