import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BihePdfDocumentCard } from "@/components/ui/BihePdfDocumentCard";
import {
  AP_PAGE_LEAD,
  AP_PROJECT_DOCUMENTS,
  AP_SECTION_TITLE,
} from "@/lib/academic-projects-content";
import { RESEARCH_BASE_PATH } from "@/lib/research-routes";

export function AcademicProjectsPage() {
  return (
    <article className="ap-page about-bihe-page">
      <AboutInnerHero
        currentPage="Academic Projects"
        title="Academic Projects"
        lead={AP_PAGE_LEAD}
        eyebrow="Research"
        sectionLabel="Research"
        sectionHref={RESEARCH_BASE_PATH}
      />

      <section className="cu-page__documents" aria-labelledby="ap-catalog-title">
        <div className="cu-page__container">
          <Reveal>
            <SectionHeader
              badge="PDF"
              title={AP_SECTION_TITLE}
              align="center"
              titleId="ap-catalog-title"
            />
          </Reveal>

          <ul className="cu-page__doc-grid cu-page__doc-grid--single">
            {AP_PROJECT_DOCUMENTS.map((document, index) => (
              <Reveal key={document.id} delay={80 + index * 60} direction="up">
                <BihePdfDocumentCard
                  title={document.title}
                  description={document.description}
                  href={document.href}
                  fileName={document.fileName}
                  titleId={index === 0 ? "ap-first-document-title" : undefined}
                />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}
