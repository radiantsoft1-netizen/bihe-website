import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ADMISSIONS_BASE_PATH } from "@/lib/admissions-routes";
import type { AdmissionsPageConfig } from "@/lib/admissions-content";

type AdmissionsContentPageProps = AdmissionsPageConfig;

export function AdmissionsContentPage({
  currentPage,
  title,
  lead,
  introBadge,
  introTitle,
  paragraphs,
  listTitle,
  listItems,
}: AdmissionsContentPageProps) {
  return (
    <>
      <AboutInnerHero
        currentPage={currentPage}
        title={title}
        lead={lead}
        eyebrow="Admissions"
        sectionLabel="Admissions"
        sectionHref={ADMISSIONS_BASE_PATH}
      />

      <section className="about-bihe-intro administration-page" aria-labelledby="admissions-content">
        <div className="about-bihe-hero__container">
          <Reveal>
            <SectionHeader badge={introBadge} title={introTitle} align="left" showIcon={false} />
            <div className="about-bihe-intro__body" id="admissions-content">
              {paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="about__desc">
                  {paragraph}
                </p>
              ))}

              {listTitle && listItems?.length ? (
                <>
                  <h3 className="about-bihe-intro__subtitle">{listTitle}</h3>
                  <ul className="bihe-bullet-list">
                    {listItems.map((item) => (
                      <li key={item.slice(0, 48)}>{item}</li>
                    ))}
                  </ul>
                </>
              ) : null}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
