import "server-only";

import {
  getResearchPage as getStaticResearchPage,
  type ResearchPageConfig,
} from "@/lib/research-content";
import { getSitePageByPath } from "@/lib/pages-service";
import { mapStandardPageContent } from "@/lib/site-page-content";

export async function getResearchPage(slug: string): Promise<ResearchPageConfig | undefined> {
  const fallback = getStaticResearchPage(slug);
  const apiPage = await getSitePageByPath(`/research/${slug}`);
  const mapped = apiPage?.content
    ? mapStandardPageContent(slug, apiPage.content, fallback, { introBadge: "Research" })
    : undefined;

  return mapped ?? fallback;
}
