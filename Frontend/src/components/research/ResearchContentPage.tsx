import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { Reveal } from "@/components/ui/Reveal";
import { RichTextParagraph } from "@/components/ui/RichTextParagraph";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RESEARCH_BASE_PATH } from "@/lib/research-routes";
import type { ResearchPageConfig } from "@/lib/research-content";

type ResearchContentPageProps = ResearchPageConfig;

export function ResearchContentPage({
  currentPage,
  title,
  lead,
  introBadge,
  introTitle,
  paragraphs,
}: ResearchContentPageProps) {
  return (
    <>
      <AboutInnerHero
        currentPage={currentPage}
        title={title}
        lead={lead}
        eyebrow="Research"
        sectionLabel="Research"
        sectionHref={RESEARCH_BASE_PATH}
      />

      <section className="about-bihe-intro administration-page" aria-labelledby="research-content">
        <div className="about-bihe-hero__container">
          <Reveal>
            <SectionHeader badge={introBadge} title={introTitle} align="left" showIcon={false} />
            <div className="about-bihe-intro__body" id="research-content">
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
