import Link from "next/link";
import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { ExamStatuteShowcase } from "@/components/academics/ExamStatuteShowcase";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowRightIcon } from "@/components/ui/icons";
import {
  ACADEMICS_EXAMINATION_INTRO,
  ACADEMICS_EXAMINATION_INTRO_TITLE,
  ACADEMICS_EXAMINATION_PAGE_LEAD,
  ACADEMICS_EXAMINATION_QUICK_LINKS,
  EXAM_STATUTE_SECTIONS,
} from "@/lib/academics-examination-content";
import { ACADEMICS_BASE_PATH } from "@/lib/academics-routes";

export function AcademicsExaminationPage() {
  return (
    <article className="exam-page about-bihe-page">
      <AboutInnerHero
        currentPage="Academics & Examination"
        title="Academics & Examination"
        lead={ACADEMICS_EXAMINATION_PAGE_LEAD}
        eyebrow="Academics"
        sectionLabel="Academics"
        sectionHref={ACADEMICS_BASE_PATH}
      />

      <section className="exam-page__intro" aria-labelledby="exam-intro-title">
        <div className="exam-page__container">
          <Reveal>
            <SectionHeader
              badge="Academics"
              title={ACADEMICS_EXAMINATION_INTRO_TITLE}
              align="left"
              showIcon={false}
              titleId="exam-intro-title"
            />
            <p className="exam-page__intro-text">{ACADEMICS_EXAMINATION_INTRO}</p>
          </Reveal>
        </div>
      </section>

      {EXAM_STATUTE_SECTIONS.map((section) => (
        <ExamStatuteShowcase key={section.id} section={section} />
      ))}

      <section className="exam-page__resources" aria-labelledby="exam-resources-title">
        <div className="exam-page__container">
          <Reveal>
            <SectionHeader
              badge="Academics"
              title="Related resources"
              align="center"
              showIcon={false}
              titleId="exam-resources-title"
            />
          </Reveal>

          <ul className="exam-page__resource-grid">
            {ACADEMICS_EXAMINATION_QUICK_LINKS.map((link, index) => (
              <Reveal key={link.id} delay={80 + index * 60} direction="up" as="li">
                <Link href={link.href} className="exam-page__resource-card">
                  <h3 className="exam-page__resource-title">{link.title}</h3>
                  <p className="exam-page__resource-desc">{link.description}</p>
                  <span className="exam-page__resource-cta">
                    View
                    <ArrowRightIcon className="exam-page__resource-cta-icon" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}
