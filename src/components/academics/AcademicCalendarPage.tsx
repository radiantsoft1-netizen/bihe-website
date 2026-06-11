import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BihePdfDocumentCard } from "@/components/ui/BihePdfDocumentCard";
import { ACADEMICS_BASE_PATH } from "@/lib/academics-routes";
import {
  ACADEMIC_CALENDAR_DOCUMENTS,
  ACADEMIC_CALENDAR_INTRO,
  ACADEMIC_CALENDAR_INTRO_TITLE,
  ACADEMIC_CALENDAR_PAGE_LEAD,
} from "@/lib/academic-calendar-content";

export function AcademicCalendarPage() {
  return (
    <article className="calendar-page about-bihe-page b-com-admin-page">
      <AboutInnerHero
        currentPage="Academic Calendar"
        title="Academic Calendar"
        lead={ACADEMIC_CALENDAR_PAGE_LEAD}
        eyebrow="Academics"
        sectionLabel="Academics"
        sectionHref={ACADEMICS_BASE_PATH}
      />

      <section className="calendar-page__intro" aria-labelledby="calendar-intro-title">
        <div className="calendar-page__container">
          <Reveal>
            <SectionHeader
              badge="Academic Calendar"
              title={ACADEMIC_CALENDAR_INTRO_TITLE}
              align="left"
              showIcon={false}
              titleId="calendar-intro-title"
            />
            <p className="calendar-page__lead">{ACADEMIC_CALENDAR_INTRO}</p>
          </Reveal>
        </div>
      </section>

      <section className="cu-page__documents" aria-labelledby="calendar-documents-title">
        <div className="cu-page__container">
          <Reveal>
            <SectionHeader badge="PDF" title="Academic calendar documents" align="center" />
          </Reveal>
          <ul className="cu-page__doc-grid">
            {ACADEMIC_CALENDAR_DOCUMENTS.map((doc, index) => (
              <Reveal key={doc.title} delay={80 + index * 60} direction="up">
                <BihePdfDocumentCard
                  title={doc.title}
                  description={doc.description}
                  href={doc.href}
                  fileName={doc.fileName}
                  titleId={index === 0 ? "calendar-documents-title" : undefined}
                />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}
