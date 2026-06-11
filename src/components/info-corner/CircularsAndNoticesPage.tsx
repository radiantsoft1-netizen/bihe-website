import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { BihePdfDocumentCard } from "@/components/ui/BihePdfDocumentCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { INFO_CORNER_BASE_PATH } from "@/lib/info-corner-routes";
import {
  CIRCULARS_DOCUMENTS,
  CIRCULARS_PAGE_LEAD,
  CIRCULARS_SECTION_TITLE,
} from "@/lib/info-corner-pages/circulars-and-notices-content";

export function CircularsAndNoticesPage() {
  return (
    <article className="cu-page ic-page ic-page--circulars about-bihe-page">
      <AboutInnerHero
        currentPage="Circulars and Notices"
        title="Circulars and Notices"
        lead={CIRCULARS_PAGE_LEAD}
        eyebrow="Info - Corner"
        sectionLabel="Info - Corner"
        sectionHref={INFO_CORNER_BASE_PATH}
      />

      <section className="cu-page__documents" aria-labelledby="circulars-documents-title">
        <div className="cu-page__container">
          <Reveal>
            <SectionHeader
              badge="PDF"
              title={CIRCULARS_SECTION_TITLE}
              align="center"
              titleId="circulars-documents-title"
            />
          </Reveal>

          <ul className="cu-page__doc-grid">
            {CIRCULARS_DOCUMENTS.map((document, index) => (
              <Reveal key={document.id} delay={80 + index * 60} direction="up">
                <BihePdfDocumentCard
                  title={document.title}
                  description={document.description}
                  href={document.href}
                  fileName={document.fileName}
                />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}
