import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SitePageShell } from "@/components/layout/SitePageShell";
import { RdcProjectDetailPage } from "@/components/research/RdcProjectDetailPage";
import {
  getAllRdcProjectSlugs,
  getRdcProjectBySlug,
} from "@/lib/research-development-cell-service";

type RdcProjectRoutePageProps = {
  params: Promise<{ projectSlug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllRdcProjectSlugs();

  return slugs.map((projectSlug) => ({ projectSlug }));
}

export async function generateMetadata({
  params,
}: RdcProjectRoutePageProps): Promise<Metadata> {
  const { projectSlug } = await params;
  const project = await getRdcProjectBySlug(projectSlug);

  if (!project) {
    return { title: "Research Project | Research | BIHE" };
  }

  return {
    title: `${project.title} | Research and Development Cell | BIHE`,
    description: project.aim,
  };
}

export default async function RdcProjectRoutePage({ params }: RdcProjectRoutePageProps) {
  const { projectSlug } = await params;
  const project = await getRdcProjectBySlug(projectSlug);

  if (!project) {
    notFound();
  }

  return (
    <SitePageShell>
      <RdcProjectDetailPage project={project} />
    </SitePageShell>
  );
}
