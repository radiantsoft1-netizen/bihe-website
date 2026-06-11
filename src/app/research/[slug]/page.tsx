import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AcademicProjectsPage } from "@/components/research/AcademicProjectsPage";
import { CentralResearchFacilitiesPage } from "@/components/research/CentralResearchFacilitiesPage";
import { IncubationCentrePage } from "@/components/research/IncubationCentrePage";
import { ResearchContentPage } from "@/components/research/ResearchContentPage";
import { ResearchDevelopmentCellPage } from "@/components/research/ResearchDevelopmentCellPage";
import { SitePageShell } from "@/components/layout/SitePageShell";
import { AP_PAGE_LEAD } from "@/lib/academic-projects-content";
import { CRF_PAGE_LEAD } from "@/lib/central-research-facilities-content";
import { IC_PAGE_LEAD } from "@/lib/incubation-centre-content";
import { getResearchPage, RESEARCH_PAGE_SLUGS } from "@/lib/research-content";
import { RDC_PAGE_LEAD } from "@/lib/research-development-cell-content";

type ResearchRoutePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return RESEARCH_PAGE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ResearchRoutePageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getResearchPage(slug);

  if (!page) {
    return { title: "Research | BIHE" };
  }

  const description =
    slug === "research-and-development-cell"
      ? RDC_PAGE_LEAD
      : slug === "academic-projects"
        ? AP_PAGE_LEAD
        : slug === "incubation-centre"
          ? IC_PAGE_LEAD
          : slug === "central-research-facilities"
            ? CRF_PAGE_LEAD
            : page.lead;

  return {
    title: `${page.title} | Research | BIHE`,
    description,
  };
}

export default async function ResearchRoutePage({ params }: ResearchRoutePageProps) {
  const { slug } = await params;
  const page = getResearchPage(slug);

  if (!page) {
    notFound();
  }

  return (
    <SitePageShell>
      {slug === "research-and-development-cell" ? (
        <ResearchDevelopmentCellPage />
      ) : slug === "academic-projects" ? (
        <AcademicProjectsPage />
      ) : slug === "incubation-centre" ? (
        <IncubationCentrePage />
      ) : slug === "central-research-facilities" ? (
        <CentralResearchFacilitiesPage />
      ) : (
        <ResearchContentPage {...page} />
      )}
    </SitePageShell>
  );
}
