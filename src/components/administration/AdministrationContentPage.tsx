import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { AdministrationPageConfig } from "@/lib/administration-pages";

type AdministrationContentPageProps = AdministrationPageConfig;

export function AdministrationContentPage({
  currentPage,
  title,
  lead,
  introBadge,
  introTitle,
  paragraphs,
}: AdministrationContentPageProps) {
  return (
    <>
      <AboutInnerHero
        currentPage={currentPage}
        title={title}
        lead={lead}
        eyebrow="Administration"
        sectionLabel="Administration"
        sectionHref="/principal"
      />

      <section className="about-bihe-intro administration-page" aria-labelledby="administration-content">
        <div className="about-bihe-hero__container">
          <Reveal>
            <SectionHeader badge={introBadge} title={introTitle} align="left" showIcon={false} />
            <div className="about-bihe-intro__body" id="administration-content">
              {paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="about__desc">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
