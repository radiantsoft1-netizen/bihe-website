import "server-only";

import type { StudentLifeImage, StudentLifePageRefCard } from "@/lib/student-life-pages/types";

export type StandardPageContent = {
  slug: string;
  currentPage: string;
  title: string;
  lead: string;
  introBadge: string;
  introTitle: string;
  paragraphs: string[];
};

function stringField(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() !== "" ? value.trim() : undefined;
}

function extractParagraphs(content: Record<string, unknown>): string[] | undefined {
  if (Array.isArray(content.paragraphs)) {
    const paragraphs = content.paragraphs.filter(
      (item): item is string => typeof item === "string" && item.trim() !== "",
    );

    return paragraphs.length > 0 ? paragraphs : undefined;
  }

  const intro = content.intro;

  if (intro && typeof intro === "object" && !Array.isArray(intro)) {
    const introParagraphs = (intro as Record<string, unknown>).paragraphs;

    if (Array.isArray(introParagraphs)) {
      const paragraphs = introParagraphs.filter(
        (item): item is string => typeof item === "string" && item.trim() !== "",
      );

      return paragraphs.length > 0 ? paragraphs : undefined;
    }
  }

  return undefined;
}

export function extractIntroSliderImages(
  content: Record<string, unknown>,
): StudentLifeImage[] | undefined {
  const raw = content.introSliderImages;

  if (!Array.isArray(raw) || raw.length === 0) {
    return undefined;
  }

  const images = raw
    .map((item) => {
      if (!item || typeof item !== "object" || Array.isArray(item)) {
        return null;
      }

      const record = item as Record<string, unknown>;
      const src = stringField(record.src);
      const alt = stringField(record.alt);

      if (!src || !alt) {
        return null;
      }

      const fit = record.fit === "contain" ? "contain" : record.fit === "cover" ? "cover" : undefined;
      const caption = stringField(record.caption);

      return {
        src,
        alt,
        ...(fit ? { fit } : {}),
        ...(caption ? { caption } : {}),
      };
    })
    .filter((item): item is StudentLifeImage => item !== null);

  return images.length > 0 ? images : undefined;
}

export function extractPageRefCards(
  content: Record<string, unknown>,
): StudentLifePageRefCard[] | undefined {
  const raw = content.pageRefCards;

  if (!Array.isArray(raw) || raw.length === 0) {
    return undefined;
  }

  const cards = raw
    .map((item, index) => {
      if (!item || typeof item !== "object" || Array.isArray(item)) {
        return null;
      }

      const record = item as Record<string, unknown>;
      const title = stringField(record.title);
      const href = stringField(record.href);

      if (!title || !href) {
        return null;
      }

      const id = stringField(record.id) ?? `page-ref-${index + 1}`;
      const eyebrow = stringField(record.eyebrow);
      const description = stringField(record.description);
      const dateLabel = stringField(record.dateLabel);
      const yearLabel = stringField(record.yearLabel);
      const image = stringField(record.image);
      const imageAlt = stringField(record.imageAlt);

      return {
        id,
        title,
        href,
        ...(eyebrow ? { eyebrow } : {}),
        ...(description ? { description } : {}),
        ...(dateLabel ? { dateLabel } : {}),
        ...(yearLabel ? { yearLabel } : {}),
        ...(image ? { image } : {}),
        ...(imageAlt ? { imageAlt } : {}),
      };
    })
    .filter((item): item is StudentLifePageRefCard => item !== null);

  return cards.length > 0 ? cards : undefined;
}

export function hasEditableSitePageContent(content: Record<string, unknown>): boolean {
  return Boolean(
    extractParagraphs(content) ||
      stringField(content.lead) ||
      stringField(content.introTitle) ||
      stringField(content.currentPage) ||
      stringField(content.introBadge),
  );
}

export function mapStandardPageContent(
  slug: string,
  content: Record<string, unknown>,
  fallback?: Partial<StandardPageContent>,
  defaults?: { introBadge?: string },
): StandardPageContent | undefined {
  const paragraphs = extractParagraphs(content) ?? fallback?.paragraphs;

  if (!paragraphs?.length && !hasEditableSitePageContent(content) && !fallback) {
    return undefined;
  }

  return {
    slug,
    currentPage:
      stringField(content.currentPage) ?? fallback?.currentPage ?? fallback?.title ?? slug,
    title: stringField(content.title) ?? fallback?.title ?? slug,
    lead: stringField(content.lead) ?? fallback?.lead ?? "",
    introBadge:
      stringField(content.introBadge) ??
      fallback?.introBadge ??
      defaults?.introBadge ??
      "BIHE",
    introTitle:
      stringField(content.introTitle) ??
      fallback?.introTitle ??
      fallback?.title ??
      slug,
    paragraphs: paragraphs ?? [],
  };
}
