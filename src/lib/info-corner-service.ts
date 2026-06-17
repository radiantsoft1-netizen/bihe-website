import "server-only";

import {
  getInfoCornerPage as getStaticInfoCornerPage,
  type InfoCornerPageConfig,
} from "@/lib/info-corner-content";
import { getSitePageByPath } from "@/lib/pages-service";
import { mapStandardPageContent } from "@/lib/site-page-content";

export async function getInfoCornerPage(slug: string): Promise<InfoCornerPageConfig | undefined> {
  const fallback = getStaticInfoCornerPage(slug);
  const apiPage = await getSitePageByPath(`/info-corner/${slug}`);
  const mapped = apiPage?.content
    ? mapStandardPageContent(slug, apiPage.content, fallback, { introBadge: "Info - Corner" })
    : undefined;

  return mapped ?? fallback;
}
