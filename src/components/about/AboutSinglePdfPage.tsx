import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BihePdfDocumentCard } from "@/components/ui/BihePdfDocumentCard";
import type { AboutSinglePdfPageConfig } from "@/lib/about-document-pages";

type AboutSinglePdfPageProps = AboutSinglePdfPageConfig;

export function AboutSinglePdfPage({
  currentPage,
  title,
  lead,
  introBadge,
  introTitle,
  intro,
  documentsBadge,
  documentsTitle,
  document,
}: AboutSinglePdfPageProps) {
  const sectionId = title.toLowerCase().replace(/\s+/g, "-");

  return (
    <article className="cu-page about-bihe-page">
      <AboutInnerHero currentPage={currentPage} title={title} lead={lead} />

      <section className="cu-page__intro" aria-labelledby={`${sectionId}-overview`}>
        <div className="cu-page__container">
          <Reveal>
            <SectionHeader badge={introBadge} title={introTitle} align="left" />
            <p className="cu-page__lead" id={`${sectionId}-overview`}>
              {intro}
            </p>
          </Reveal>
        </div>
      </section>

      <section
        className="cu-page__documents"
        aria-labelledby={`${sectionId}-documents-title`}
      >
        <div className="cu-page__container">
          <Reveal>
            <SectionHeader
              badge={documentsBadge}
              title={documentsTitle}
              align="center"
            />
          </Reveal>
          <ul className="cu-page__doc-grid cu-page__doc-grid--single">
            <Reveal delay={80} direction="up">
              <BihePdfDocumentCard
                title={document.title}
                description={document.description}
                href={document.href}
                fileName={document.fileName}
                titleId={`${sectionId}-documents-title`}
              />
            </Reveal>
          </ul>
        </div>
      </section>
    </article>
  );
}
