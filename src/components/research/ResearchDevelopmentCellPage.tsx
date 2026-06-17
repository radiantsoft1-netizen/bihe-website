import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { RdcProjectCard } from "@/components/research/RdcProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RDC_PAGE_LEAD } from "@/lib/research-development-cell-content";
import { getRdcProjects } from "@/lib/research-development-cell-service";
import { RESEARCH_BASE_PATH } from "@/lib/research-routes";

export async function ResearchDevelopmentCellPage() {
  const projects = await getRdcProjects();

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

      <section className="rdc-page__catalog" aria-labelledby="rdc-catalog-title">
        <div className="rdc-page__container">
          <Reveal>
            <SectionHeader
              badge="Research Projects"
              title="Student & Faculty Research"
              align="center"
              titleId="rdc-catalog-title"
            />
          </Reveal>

          <div className="rdc-page__project-grid">
            {projects.map((project, index) => (
              <RdcProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
