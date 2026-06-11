import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CircularsAndNoticesPage } from "@/components/info-corner/CircularsAndNoticesPage";
import { InfoCornerContentPage } from "@/components/info-corner/InfoCornerContentPage";
import { InternationalStudentsAdmissionPage } from "@/components/info-corner/InternationalStudentsAdmissionPage";
import { RtiDetailsPage } from "@/components/info-corner/RtiDetailsPage";
import { SitePageShell } from "@/components/layout/SitePageShell";
import {
  getInfoCornerPage,
  INFO_CORNER_PAGE_SLUGS,
} from "@/lib/info-corner-content";

const DEDICATED_INFO_CORNER_PAGES = {
  "rti-details": RtiDetailsPage,
  "circulars-and-notices": CircularsAndNoticesPage,
  "international-students-admission": InternationalStudentsAdmissionPage,
} as const;

type InfoCornerRoutePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return INFO_CORNER_PAGE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: InfoCornerRoutePageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getInfoCornerPage(slug);

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
  const page = getInfoCornerPage(slug);

  if (!page) {
    notFound();
  }

  const DedicatedPage =
    slug in DEDICATED_INFO_CORNER_PAGES
      ? DEDICATED_INFO_CORNER_PAGES[slug as keyof typeof DEDICATED_INFO_CORNER_PAGES]
      : null;

  return (
    <SitePageShell>
      {DedicatedPage ? <DedicatedPage /> : <InfoCornerContentPage {...page} />}
    </SitePageShell>
  );
}
