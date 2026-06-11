import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { INFO_CORNER_BASE_PATH } from "@/lib/info-corner-routes";
import type { InfoCornerPageConfig } from "@/lib/info-corner-content";

type InfoCornerContentPageProps = InfoCornerPageConfig;

export function InfoCornerContentPage({
  currentPage,
  title,
  lead,
  introBadge,
  introTitle,
  paragraphs,
}: InfoCornerContentPageProps) {
  return (
    <article className="about-bihe-page">
      <AboutInnerHero
        currentPage={currentPage}
        title={title}
        lead={lead}
        eyebrow="Info - Corner"
        sectionLabel="Info - Corner"
        sectionHref={INFO_CORNER_BASE_PATH}
      />

      <section className="about-bihe-intro administration-page" aria-labelledby="info-corner-content">
        <div className="about-bihe-hero__container">
          <Reveal>
            <SectionHeader badge={introBadge} title={introTitle} align="left" showIcon={false} />
            <div className="about-bihe-intro__body" id="info-corner-content">
              {paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="about__desc">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
