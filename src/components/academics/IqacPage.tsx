import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { IqacQualityGraphic } from "@/components/academics/IqacQualityGraphic";
import { Reveal } from "@/components/ui/Reveal";
import {
  IQAC_COMPOSITION,
  IQAC_COMPOSITION_TITLE,
  IQAC_INTRO_PARAGRAPHS,
  IQAC_INTRO_TITLE,
  IQAC_OBJECTIVES,
  IQAC_OBJECTIVES_TITLE,
  IQAC_PAGE_LEAD,
} from "@/lib/iqac-content";
import { ACADEMICS_BASE_PATH } from "@/lib/academics-routes";

export function IqacPage() {
  return (
    <article className="iqac-page about-bihe-page">
      <AboutInnerHero
        currentPage="Internal Quality Assurance Cell"
        title="Internal Quality Assurance Cell"
        lead={IQAC_PAGE_LEAD}
        eyebrow="Academics"
        sectionLabel="Academics"
        sectionHref={ACADEMICS_BASE_PATH}
      />

      <section className="iqac-page__intro" aria-labelledby="iqac-intro-title">
        <div className="iqac-page__container">
          <div className="iqac-page__intro-grid">
            <Reveal direction="left">
              <IqacQualityGraphic />
            </Reveal>

            <Reveal delay={80} direction="right">
              <div className="iqac-page__intro-copy">
                <h2 className="iqac-page__section-title" id="iqac-intro-title">
                  {IQAC_INTRO_TITLE}
                </h2>
                {IQAC_INTRO_PARAGRAPHS.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)} className="iqac-page__intro-text">
                    {paragraph}
                  </p>
                ))}

                <h3 className="iqac-page__subsection-title">{IQAC_COMPOSITION_TITLE}</h3>
                <ul className="bihe-bullet-list iqac-page__composition-list">
                  {IQAC_COMPOSITION.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="iqac-page__objectives" aria-labelledby="iqac-objectives-title">
        <div className="iqac-page__container">
          <Reveal>
            <h2 className="iqac-page__objectives-title" id="iqac-objectives-title">
              {IQAC_OBJECTIVES_TITLE}
            </h2>
          </Reveal>

          <Reveal delay={80}>
            <ul className="bihe-bullet-list iqac-page__objectives-list">
              {IQAC_OBJECTIVES.map((item) => (
                <li key={item.slice(0, 48)}>{item}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
