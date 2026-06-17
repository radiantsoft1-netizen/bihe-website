import "server-only";

import {
  getAcademicsPage as getStaticAcademicsPage,
  type AcademicsPageConfig,
} from "@/lib/academics-pages";
import { getSitePageByPath } from "@/lib/pages-service";
import { mapStandardPageContent } from "@/lib/site-page-content";

export async function getAcademicsPage(slug: string): Promise<AcademicsPageConfig | undefined> {
  const fallback = getStaticAcademicsPage(slug);
  const apiPage = await getSitePageByPath(`/academics/${slug}`);
  const mapped = apiPage?.content
    ? mapStandardPageContent(slug, apiPage.content, fallback, { introBadge: "Academics" })
    : undefined;

  return mapped ?? fallback;
}
