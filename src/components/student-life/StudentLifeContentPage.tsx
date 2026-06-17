import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { StudentFacilitiesNavSection } from "@/components/student-life/StudentFacilitiesNavSection";
import { Reveal } from "@/components/ui/Reveal";
import { RichTextParagraph } from "@/components/ui/RichTextParagraph";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { STUDENT_LIFE_BASE_PATH } from "@/lib/student-life-routes";
import type { StudentLifePageConfig } from "@/lib/student-life-content";

type StudentLifeContentPageProps = StudentLifePageConfig;

export function StudentLifeContentPage({
  currentPage,
  title,
  lead,
  introBadge,
  introTitle,
  paragraphs,
}: StudentLifeContentPageProps) {
  return (
    <article className="about-bihe-page">
      <AboutInnerHero
        currentPage={currentPage}
        title={title}
        lead={lead}
        eyebrow="Student Life"
        sectionLabel="Student Life"
        sectionHref={STUDENT_LIFE_BASE_PATH}
      />

      <section className="about-bihe-intro administration-page" aria-labelledby="student-life-content">
        <div className="about-bihe-hero__container">
          <Reveal>
            <SectionHeader badge={introBadge} title={introTitle} align="left" showIcon={false} />
            <div className="about-bihe-intro__body" id="student-life-content">
              {paragraphs.map((paragraph) => (
                <RichTextParagraph
                  key={paragraph.slice(0, 48)}
                  html={paragraph}
                  className="about__desc"
                />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <StudentFacilitiesNavSection />
    </article>
  );
}
