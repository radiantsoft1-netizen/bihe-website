import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { RdcProjectSection } from "@/components/research/RdcProjectSection";
import { RESEARCH_BASE_PATH } from "@/lib/research-routes";
import { RDC_PAGE_LEAD, RDC_PROJECTS } from "@/lib/research-development-cell-content";

export function ResearchDevelopmentCellPage() {
  return (
    <article className="rdc-page about-bihe-page">
      <AboutInnerHero
        currentPage="Research and Development Cell"
        title="Research and Development Cell"
        lead={RDC_PAGE_LEAD}
        eyebrow="Research"
        sectionLabel="Research"
        sectionHref={RESEARCH_BASE_PATH}
      />

      {RDC_PROJECTS.map((project, index) => (
        <RdcProjectSection key={project.id} project={project} index={index} />
      ))}
    </article>
  );
}
