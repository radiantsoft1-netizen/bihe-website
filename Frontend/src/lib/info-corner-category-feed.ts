import "server-only";

import {
  circularNoticeToCardProps,
  infoCornerItemToCardProps,
  type InfoCornerItemCardProps,
} from "@/components/info-corner/InfoCornerItemCard";
import { getCircularNotices } from "@/lib/circular-notices-service";
import { stripInfoCornerListMedia } from "@/lib/info-corner-detail";
import {
  getInfoCornerItems,
  infoCornerItemHref,
} from "@/lib/info-corner-items-service";
import { ANNOUNCEMENTS_FEED_TITLE } from "@/lib/info-corner-pages/announcements-content";
import { CIRCULARS_FEED_TITLE } from "@/lib/info-corner-pages/circulars-and-notices-content";
import { JOB_OPENINGS_FEED_TITLE } from "@/lib/info-corner-pages/job-openings-content";
import { NEWS_EVENTS_ACHIEVEMENTS_FEED_TITLE } from "@/lib/info-corner-pages/news-events-achievements-content";
import { NEWSLETTERS_FEED_TITLE } from "@/lib/info-corner-pages/newsletters-content";

export type InfoCornerFeedEntry = {
  key: string;
  card: InfoCornerItemCardProps;
};

const CATEGORY_FEED_META: Record<string, { feedTitle: string; emptyMessage: string }> = {
  announcements: {
    feedTitle: ANNOUNCEMENTS_FEED_TITLE,
    emptyMessage: "No published items in this category yet. Please check back soon.",
  },
  newsletters: {
    feedTitle: NEWSLETTERS_FEED_TITLE,
    emptyMessage: "No newsletter editions have been published yet. Please check back soon.",
  },
  "news-events-achievements": {
    feedTitle: NEWS_EVENTS_ACHIEVEMENTS_FEED_TITLE,
    emptyMessage: "No news, events, or achievements have been published yet. Please check back soon.",
  },
  "circulars-and-notices": {
    feedTitle: CIRCULARS_FEED_TITLE,
    emptyMessage: "No circulars or notices have been published yet. Please check back soon.",
  },
  "job-openings": {
    feedTitle: JOB_OPENINGS_FEED_TITLE,
    emptyMessage: "No job openings are listed at this time. Please check back for future recruitment notices.",
  },
};

export function resolveInfoCornerFeedTitle(categorySlug: string, categoryName: string): string {
  return CATEGORY_FEED_META[categorySlug]?.feedTitle ?? categoryName;
}

export function resolveInfoCornerEmptyMessage(categorySlug: string): string {
  return (
    CATEGORY_FEED_META[categorySlug]?.emptyMessage ??
    "No published items in this category yet. Please check back soon."
  );
}

export async function getInfoCornerCategoryFeed(
  categorySlug: string,
): Promise<InfoCornerFeedEntry[]> {
  if (categorySlug === "circulars-and-notices") {
    const notices = await getCircularNotices();

    return notices.map((notice) => ({
      key: notice.slug,
      card: circularNoticeToCardProps(notice),
    }));
  }

  const items = await getInfoCornerItems(categorySlug);

  return items.map((item) => {
    const cardItem = stripInfoCornerListMedia(item);

    return {
      key: item.slug,
      card: infoCornerItemToCardProps({
        ...cardItem,
        href: cardItem.href ?? infoCornerItemHref(categorySlug, cardItem.slug),
      }),
    };
  });
}
