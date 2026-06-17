import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { RdcProjectSection } from "@/components/research/RdcProjectSection";
import type { RdcProject } from "@/lib/research-development-cell-content";
import { RESEARCH_BASE_PATH } from "@/lib/research-routes";

type RdcProjectDetailPageProps = {
  project: RdcProject;
};

export function RdcProjectDetailPage({ project }: RdcProjectDetailPageProps) {
  return (
    <article className="rdc-page about-bihe-page">
      <AboutInnerHero
        currentPage={project.title}
        title={project.title}
        lead={project.category}
        eyebrow="Research"
        sectionLabel="Research"
        sectionHref={RESEARCH_BASE_PATH}
        parentPage="Research and Development Cell"
        parentHref={RESEARCH_BASE_PATH}
      />

      <RdcProjectSection project={project} index={0} />
    </article>
  );
}
