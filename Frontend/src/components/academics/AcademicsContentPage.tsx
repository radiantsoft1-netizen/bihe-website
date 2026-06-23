import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { Reveal } from "@/components/ui/Reveal";
import { RichTextParagraph } from "@/components/ui/RichTextParagraph";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ACADEMICS_BASE_PATH } from "@/lib/academics-routes";
import type { AcademicsPageConfig } from "@/lib/academics-pages";

type AcademicsContentPageProps = AcademicsPageConfig;

export function AcademicsContentPage({
  currentPage,
  title,
  lead,
  introBadge,
  introTitle,
  paragraphs,
}: AcademicsContentPageProps) {
  return (
    <>
      <AboutInnerHero
        currentPage={currentPage}
        title={title}
        lead={lead}
        eyebrow="Academics"
        sectionLabel="Academics"
        sectionHref={ACADEMICS_BASE_PATH}
      />

      <section className="about-bihe-intro administration-page" aria-labelledby="academics-content">
        <div className="about-bihe-hero__container">
          <Reveal>
            <SectionHeader badge={introBadge} title={introTitle} align="left" showIcon={false} />
            <div className="about-bihe-intro__body" id="academics-content">
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
    </>
  );
}
