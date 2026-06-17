import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InfoCornerCategoryPage } from "@/components/info-corner/InfoCornerCategoryPage";
import { CircularsAndNoticesPage } from "@/components/info-corner/CircularsAndNoticesPage";
import { InternationalStudentsAdmissionPage } from "@/components/info-corner/InternationalStudentsAdmissionPage";
import { JobOpeningsPage } from "@/components/info-corner/JobOpeningsPage";
import { NewsEventsAchievementsPage } from "@/components/info-corner/NewsEventsAchievementsPage";
import { NewslettersPage } from "@/components/info-corner/NewslettersPage";
import { RtiDetailsPage } from "@/components/info-corner/RtiDetailsPage";
import { SitePageShell } from "@/components/layout/SitePageShell";
import { INFO_CORNER_CATEGORY_SLUGS, isInfoCornerCategorySlug } from "@/lib/info-corner-items-service";
import { getInfoCornerPage } from "@/lib/info-corner-service";

const DEDICATED_INFO_CORNER_PAGES = {
  "rti-details": RtiDetailsPage,
  "international-students-admission": InternationalStudentsAdmissionPage,
  newsletters: NewslettersPage,
  "news-events-achievements": NewsEventsAchievementsPage,
  "job-openings": JobOpeningsPage,
  "circulars-and-notices": CircularsAndNoticesPage,
} as const;

type InfoCornerRoutePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  const dedicated = ["rti-details", "international-students-admission"];
  const slugs = [...new Set([...INFO_CORNER_CATEGORY_SLUGS, ...dedicated])];

  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: InfoCornerRoutePageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getInfoCornerPage(slug);

  if (!page) {
    return { title: "Info - Corner | BIHE" };
  }

  return {
    title: `${page.title} | Info - Corner | BIHE`,
    description: page.lead,
  };
}

export default async function InfoCornerRoutePage({ params }: InfoCornerRoutePageProps) {
  const { slug } = await params;

  const DedicatedPage =
    slug in DEDICATED_INFO_CORNER_PAGES
      ? DEDICATED_INFO_CORNER_PAGES[slug as keyof typeof DEDICATED_INFO_CORNER_PAGES]
      : null;

  if (DedicatedPage) {
    return (
      <SitePageShell>
        <DedicatedPage />
      </SitePageShell>
    );
  }

  if (isInfoCornerCategorySlug(slug)) {
    return (
      <SitePageShell>
        <InfoCornerCategoryPage categorySlug={slug} />
      </SitePageShell>
    );
  }

  notFound();
}
