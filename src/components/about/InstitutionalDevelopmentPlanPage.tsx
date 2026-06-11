import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { IdpGrowthIcon } from "@/components/about/IdpGrowthIcon";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import {
  IDP_ACADEMIC_GROWTH_CARDS,
  IDP_ACADEMIC_GROWTH_ITEMS,
  IDP_EXPERIENCE_BADGE,
  IDP_MISSION_INTRO,
  IDP_MISSION_ITEMS,
  IDP_VISION_TEXT,
} from "@/lib/idp-content";
import { images } from "@/lib/images";

export function InstitutionalDevelopmentPlanPage() {
  return (
    <article className="idp-page about-bihe-page">
      <AboutInnerHero
        currentPage="Institutional Development Plan"
        title="Institutional Development Plan"
        lead="Vision, mission, and academic growth priorities that guide BIHE's development in computer applications and technology education."
      />

      <section className="idp-page__vision" aria-labelledby="idp-vision-title">
        <div className="idp-page__container idp-page__vision-grid">
          <Reveal direction="left" className="idp-page__vision-visual">
            <div className="idp-page__mission-frame">
              <div className="idp-page__mission-photo-wrap">
                <SmartImage
                  src={images.hero}
                  alt="Bapuji Institute of Hi-Tech Education campus"
                  fill
                  className="idp-page__mission-img"
                  sizes="(max-width: 960px) 100vw, 22rem"
                  priority
                />
              </div>
            </div>
          </Reveal>
          <Reveal delay={80} direction="right">
            <div className="idp-page__vision-copy">
              <h2 className="idp-page__section-label" id="idp-vision-title">
                Vision
              </h2>
              <p className="idp-page__mission-lead">{IDP_VISION_TEXT}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="idp-page__mission" aria-labelledby="idp-mission-title">
        <div className="idp-page__container idp-page__mission-grid">
          <Reveal>
            <div className="idp-page__mission-copy">
              <h2 className="idp-page__section-label" id="idp-mission-title">
                Mission
              </h2>
              <p className="idp-page__mission-lead">{IDP_MISSION_INTRO}</p>
              <p className="idp-page__mission-subhead">Our mission is to:</p>
              <ul className="bihe-bullet-list">
                {IDP_MISSION_ITEMS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={80} direction="up">
            <div className="idp-page__mission-visual">
              <div className="idp-page__mission-frame">
                <div className="idp-page__mission-photo-wrap">
                  <SmartImage
                    src={images.bcaLab}
                    alt="BIHE students learning with technology"
                    fill
                    className="idp-page__mission-img"
                    sizes="(max-width: 960px) 90vw, 22rem"
                  />
                </div>
                <div
                  className="idp-page__mission-badge"
                  aria-label={`${IDP_EXPERIENCE_BADGE.years} ${IDP_EXPERIENCE_BADGE.label}`}
                >
                  <span className="idp-page__mission-badge-ring" aria-hidden />
                  <span className="idp-page__mission-badge-years">
                    {IDP_EXPERIENCE_BADGE.years}
                  </span>
                  <span className="idp-page__mission-badge-label">
                    {IDP_EXPERIENCE_BADGE.label}
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        className="idp-page__growth-list"
        aria-labelledby="idp-growth-list-title"
      >
        <div className="idp-page__container idp-page__growth-list-grid">
          <Reveal direction="left" className="idp-page__growth-visual">
            <div className="idp-page__growth-photo-deck" aria-hidden>
              <span className="idp-page__growth-photo-deck-back" />
              <span className="idp-page__growth-photo-deck-ring" />
            </div>
            <div className="idp-page__growth-photo-frame">
              <div className="idp-page__growth-photo">
                <SmartImage
                  src={images.facility.library}
                  alt="Library and academic resources at BIHE"
                  fill
                  className="idp-page__growth-photo-img"
                  sizes="(max-width: 960px) 100vw, 24rem"
                />
              </div>
              <span className="idp-page__growth-photo-chip">
                <svg
                  className="idp-page__growth-photo-chip-icon"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    fill="currentColor"
                    d="M6 4h12a2 2 0 0 1 2 2v14l-4-2-4 2-4-2-4 2V6a2 2 0 0 1 2-2zm2 3v11.5l2-1 2 1V7H8zm6 0v11.5l2-1V7h-2z"
                  />
                </svg>
                Library & Resources
              </span>
            </div>
          </Reveal>
          <Reveal delay={80} direction="right">
            <div className="idp-page__growth-copy">
              <h2 className="idp-page__section-label" id="idp-growth-list-title">
                Academic Growth
              </h2>
              <ul className="bihe-bullet-list">
                {IDP_ACADEMIC_GROWTH_ITEMS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        className="idp-page__growth-panel"
        aria-labelledby="idp-growth-panel-title"
      >
        <div className="idp-page__container idp-page__growth-panel-inner">
          <Reveal>
            <header className="idp-page__growth-panel-head">
              <h2 className="idp-page__growth-panel-title" id="idp-growth-panel-title">
                Academic Growth
              </h2>
              <p className="idp-page__growth-panel-subtitle">
                Affordable Courses for Everyone
              </p>
            </header>
          </Reveal>
          <ul className="idp-page__growth-cards">
            {IDP_ACADEMIC_GROWTH_CARDS.map((card, index) => (
              <Reveal
                key={card.title}
                as="li"
                className="idp-page__growth-card"
                delay={60 + index * 45}
                direction="up"
              >
                <span className="idp-page__growth-card-icon" aria-hidden>
                  <IdpGrowthIcon name={card.icon} />
                </span>
                <h3 className="idp-page__growth-card-title">{card.title}</h3>
                <p className="idp-page__growth-card-text">{card.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}
