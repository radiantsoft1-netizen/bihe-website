import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BihePdfDocumentCard } from "@/components/ui/BihePdfDocumentCard";
import {
  CONSTITUENT_UNITS_DOCUMENTS,
  CONSTITUENT_UNITS_INTRO_POINTS,
} from "@/lib/constituent-units-content";

export function ConstituentUnitsPage() {
  return (
    <article className="cu-page about-bihe-page">
      <AboutInnerHero
        currentPage="Affliation"
        title="Affliation"
        lead="Affiliation and university recognition documents for BIHE undergraduate programmes."
      />

      <section className="cu-page__intro" aria-labelledby="cu-overview">
        <div className="cu-page__container">
          <Reveal>
            <SectionHeader
              badge="Affiliation"
              title="University affiliation"
              align="left"
            />
            <ul className="bihe-bullet-list cu-page__intro-list" id="cu-overview">
              {CONSTITUENT_UNITS_INTRO_POINTS.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section
        className="cu-page__documents"
        aria-labelledby="cu-documents-title"
      >
        <div className="cu-page__container">
          <Reveal>
            <SectionHeader
              badge="PDF"
              title="Affiliation documents"
              align="center"
            />
          </Reveal>
          <ul className="cu-page__doc-grid">
            {CONSTITUENT_UNITS_DOCUMENTS.map((doc, index) => (
              <Reveal key={doc.title} delay={80 + index * 60} direction="up">
                <BihePdfDocumentCard
                  title={doc.title}
                  description={doc.description}
                  href={doc.href}
                  fileName={doc.fileName}
                  titleId={index === 0 ? "cu-documents-title" : undefined}
                />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}
