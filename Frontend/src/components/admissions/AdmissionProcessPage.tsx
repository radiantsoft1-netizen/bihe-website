import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { AdmissionProcessShowcaseSection } from "@/components/admissions/AdmissionProcessShowcaseSection";
import { AdmissionsPageNav } from "@/components/admissions/AdmissionsPageNav";
import { Reveal } from "@/components/ui/Reveal";
import { ADMISSIONS_BASE_PATH } from "@/lib/admissions-routes";
import {
  ADMISSION_COUNSELLING,
  ADMISSION_PROCESS_INTRO,
  ADMISSION_PROCESS_PAGE_LEAD,
  ADMISSION_PROCESS_SHOWCASES,
} from "@/lib/admission-process-content";

export function AdmissionProcessPage() {
  return (
    <article className="principal-page admission-process-page about-bihe-page">
      <AboutInnerHero
        currentPage="Admission Process"
        title="Admission Process"
        lead={ADMISSION_PROCESS_PAGE_LEAD}
        eyebrow="Admissions"
        sectionLabel="Admissions"
        sectionHref={ADMISSIONS_BASE_PATH}
      />

      <AdmissionsPageNav />

      <section className="admission-process-page__intro" aria-labelledby="admission-intro-title">
        <div className="admission-process-page__container">
          <Reveal>
            <div className="admission-process-page__intro-copy">
              <p className="admission-process-page__eyebrow">{ADMISSION_PROCESS_INTRO.eyebrow}</p>
              <h2 className="admission-process-page__intro-title" id="admission-intro-title">
                {ADMISSION_PROCESS_INTRO.title}
              </h2>
              {ADMISSION_PROCESS_INTRO.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="admission-process-page__intro-text">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {ADMISSION_PROCESS_SHOWCASES.map((section, index) => (
        <AdmissionProcessShowcaseSection
          key={section.id}
          section={section}
          sectionIndex={index}
          isFirst={index === 0}
        />
      ))}

      <section
        className="admission-process-page__documents"
        aria-labelledby="admission-documents-title"
      >
        <div className="admission-process-page__container">
          <Reveal>
            <div className="admission-process-page__documents-panel">
              <h2
                className="admission-process-page__documents-title"
                id="admission-documents-title"
              >
                {ADMISSION_COUNSELLING.title}
              </h2>
              {ADMISSION_COUNSELLING.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="admission-process-page__documents-text">
                  {paragraph}
                </p>
              ))}
              <p className="admission-process-page__documents-text">
                {ADMISSION_COUNSELLING.portalLabel}{" "}
                <a
                  className="admission-process-page__documents-link"
                  href={ADMISSION_COUNSELLING.portalHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {ADMISSION_COUNSELLING.portalText}
                </a>{" "}
                {ADMISSION_COUNSELLING.portalSuffix}
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
