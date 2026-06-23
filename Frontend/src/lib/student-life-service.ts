import "server-only";

import {
  getStudentLifePage as getStaticStudentLifePage,
  type StudentLifePageConfig,
} from "@/lib/student-life-content";
import { getStudentLifeRichPage } from "@/lib/student-life-pages";
import type { StudentLifeRichPageConfig } from "@/lib/student-life-pages/types";
import { getSitePageByPath } from "@/lib/pages-service";
import { mapStandardPageContent, extractIntroSliderImages, extractPageRefCards } from "@/lib/site-page-content";
import { resolvePlacementPageRefCards } from "@/lib/placement-page-refs-service";

export async function getStudentLifePage(slug: string): Promise<StudentLifePageConfig | undefined> {
  const fallback = getStaticStudentLifePage(slug);
  const apiPage = await getSitePageByPath(`/student-life/${slug}`);
  const mapped = apiPage?.content
    ? mapStandardPageContent(slug, apiPage.content, fallback, { introBadge: "Student Life" })
    : undefined;

  return mapped ?? fallback;
}

export async function getStudentLifeRichPageConfig(
  slug: string,
): Promise<StudentLifeRichPageConfig | undefined> {
  const fallback = getStudentLifeRichPage(slug);

  if (!fallback) {
    return undefined;
  }

  const apiPage = await getSitePageByPath(`/student-life/${slug}`);
  const mapped = apiPage?.content
    ? mapStandardPageContent(slug, apiPage.content, fallback, { introBadge: "Student Life" })
    : undefined;

  if (!mapped) {
    if (slug === "placement-cell-and-activities") {
      return {
        ...fallback,
        pageRefCards: await resolvePlacementPageRefCards(apiPage?.content),
      };
    }

    return fallback;
  }

  const paragraphs =
    mapped.paragraphs.length > 0 ? mapped.paragraphs : (fallback.intro?.paragraphs ?? []);

  const apiSliderImages = apiPage?.content
    ? extractIntroSliderImages(apiPage.content)
    : undefined;

  const apiPageRefCards = apiPage?.content
    ? extractPageRefCards(apiPage.content)
    : undefined;

  const pageRefCards =
    slug === "placement-cell-and-activities"
      ? await resolvePlacementPageRefCards(apiPage?.content)
      : apiPageRefCards && apiPageRefCards.length > 0
        ? apiPageRefCards
        : fallback.pageRefCards;

  return {
    ...fallback,
    currentPage: mapped.currentPage,
    title: mapped.title,
    lead: mapped.lead,
    pageRefCards,
    banner: fallback.banner
      ? {
          ...fallback.banner,
          overlayTitle: mapped.title,
        }
      : undefined,
    intro: fallback.intro
      ? fallback.intro.variant === "infographic"
        ? {
            ...fallback.intro,
            kicker: mapped.introBadge || fallback.intro.kicker,
            title: mapped.introTitle || fallback.intro.title,
          }
        : {
            ...fallback.intro,
            kicker: mapped.introBadge || fallback.intro.kicker,
            title: mapped.introTitle,
            paragraphs,
            sliderImages:
              apiSliderImages && apiSliderImages.length > 0
                ? apiSliderImages
                : fallback.intro.sliderImages,
          }
      : undefined,
  };
}
