import "server-only";

import { fetchApiItem, fetchApiList } from "@/lib/api/client";
import {
  FALLBACK_ALUMNI_EVENTS,
  FALLBACK_ALUMNI_PROFILES,
} from "@/lib/alumni-content";
import type { AlumniEvent, AlumniEventCard, AlumniProfile } from "@/lib/types/alumni";
import { SITE_LINKS } from "@/lib/site-links";

type ApiAlumniProfile = {
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
  bioParagraphs?: string[] | null;
  testimonialParagraphs?: string[] | null;
  photo?: string | null;
  linkedinUrl?: string | null;
  isFeatured?: boolean;
  href?: string | null;
  sortOrder?: number;
};

type ApiAlumniEvent = {
  id: string;
  slug: string;
  title: string;
  summary?: string | null;
  body?: string | null;
  bodyParagraphs?: string[] | null;
  eventDate?: string | null;
  venue?: string | null;
  image?: string | null;
  href?: string | null;
  dateLabel?: string | null;
  yearLabel?: string | null;
  sortOrder?: number;
};

function profileHref(slug: string, href?: string | null) {
  return href ?? `${SITE_LINKS.alumni}/${slug}`;
}

function eventHref(slug: string, href?: string | null) {
  return href ?? `${SITE_LINKS.alumni}/events/${slug}`;
}

function mapProfile(item: ApiAlumniProfile): AlumniProfile {
  const fallback = FALLBACK_ALUMNI_PROFILES.find((entry) => entry.slug === item.slug);

  return {
    id: item.slug,
    slug: item.slug,
    name: item.name,
    batchYear: item.passoutYear ?? item.batchYear ?? fallback?.batchYear,
    passoutYear: item.passoutYear ?? item.batchYear ?? fallback?.batchYear,
    admissionYear: item.admissionYear ?? undefined,
    program: item.program,
    classSection: item.classSection ?? undefined,
    currentRole: item.currentRole ?? fallback?.currentRole,
    currentEmployer: item.currentEmployer ?? fallback?.currentEmployer,
    currentLocation: item.currentLocation ?? undefined,
    currentStatus: item.currentStatus ?? undefined,
    willingToMentor: item.willingToMentor ?? undefined,
    bio: item.bio ?? fallback?.bio,
    testimonial: item.testimonial ?? fallback?.testimonial,
    bioParagraphs: item.bioParagraphs ?? undefined,
    testimonialParagraphs: item.testimonialParagraphs ?? undefined,
    photo: item.photo ?? undefined,
    linkedinUrl: item.linkedinUrl ?? undefined,
    isFeatured: item.isFeatured ?? fallback?.isFeatured,
    href: profileHref(item.slug, item.href),
    sortOrder: item.sortOrder,
  };
}

function mapEvent(item: ApiAlumniEvent, includeBody = false): AlumniEvent {
  const fallback = FALLBACK_ALUMNI_EVENTS.find((entry) => entry.slug === item.slug);

  return {
    id: item.slug,
    slug: item.slug,
    title: item.title,
    summary: item.summary ?? fallback?.summary,
    body: includeBody ? item.body ?? undefined : undefined,
    bodyParagraphs: includeBody ? item.bodyParagraphs ?? undefined : undefined,
    eventDate: item.eventDate ?? fallback?.eventDate,
    venue: item.venue ?? fallback?.venue,
    image: item.image ?? undefined,
    href: eventHref(item.slug, item.href),
    dateLabel: item.dateLabel ?? fallback?.dateLabel,
    yearLabel: item.yearLabel ?? fallback?.yearLabel,
    sortOrder: item.sortOrder,
  };
}

function mapEventCard(item: ApiAlumniEvent): AlumniEventCard {
  const event = mapEvent(item);

  return {
    id: event.id,
    slug: event.slug,
    title: event.title,
    summary: event.summary,
    href: event.href,
    dateLabel: event.dateLabel,
    yearLabel: event.yearLabel,
    image: event.image,
  };
}

export async function getAlumniProfiles(): Promise<AlumniProfile[]> {
  const data = await fetchApiList<ApiAlumniProfile>("/api/v1/alumni-profiles");

  if (!data?.length) {
    return FALLBACK_ALUMNI_PROFILES.map((item) => mapProfile(item as ApiAlumniProfile));
  }

  return data.map(mapProfile);
}

export async function getAlumniProfileBySlug(slug: string): Promise<AlumniProfile | null> {
  if (slug === "events") {
    return null;
  }

  const data = await fetchApiItem<ApiAlumniProfile>(`/api/v1/alumni-profiles/${slug}`);
  const fallback = FALLBACK_ALUMNI_PROFILES.find((entry) => entry.slug === slug);

  if (!data) {
    return fallback ? mapProfile(fallback as ApiAlumniProfile) : null;
  }

  return mapProfile(data);
}

export async function getAllAlumniProfileSlugs(): Promise<string[]> {
  const data = await fetchApiList<ApiAlumniProfile>("/api/v1/alumni-profiles");

  if (!data?.length) {
    return FALLBACK_ALUMNI_PROFILES.map((item) => item.slug);
  }

  return data.map((item) => item.slug).filter((slug) => slug !== "events" && slug !== "register");
}

export async function getAlumniEventCards(): Promise<AlumniEventCard[]> {
  const data = await fetchApiList<ApiAlumniEvent>("/api/v1/alumni-events");

  if (!data?.length) {
    return FALLBACK_ALUMNI_EVENTS.map((item) => mapEventCard(item as ApiAlumniEvent));
  }

  return data.map(mapEventCard);
}

export async function getAlumniEvents(): Promise<AlumniEvent[]> {
  const data = await fetchApiList<ApiAlumniEvent>("/api/v1/alumni-events");

  if (!data?.length) {
    return FALLBACK_ALUMNI_EVENTS.map((item) => mapEvent(item as ApiAlumniEvent));
  }

  return data.map((item) => mapEvent(item));
}

export async function getAlumniEventBySlug(slug: string): Promise<AlumniEvent | null> {
  const data = await fetchApiItem<ApiAlumniEvent>(`/api/v1/alumni-events/${slug}`);
  const fallback = FALLBACK_ALUMNI_EVENTS.find((entry) => entry.slug === slug);

  if (!data) {
    return fallback ? mapEvent(fallback as ApiAlumniEvent, true) : null;
  }

  return mapEvent(data, true);
}

export async function getAllAlumniEventSlugs(): Promise<string[]> {
  const data = await fetchApiList<ApiAlumniEvent>("/api/v1/alumni-events");

  if (!data?.length) {
    return FALLBACK_ALUMNI_EVENTS.map((item) => item.slug);
  }

  return data.map((item) => item.slug);
}

export function mapAlumniEventToRefCard(event: AlumniEventCard) {
  return {
    id: event.slug,
    title: event.title,
    description: event.summary ?? undefined,
    dateLabel: event.dateLabel ?? undefined,
    yearLabel: event.yearLabel ?? undefined,
    href: event.href,
    image: event.image ?? undefined,
    imageAlt: event.title,
  };
}
