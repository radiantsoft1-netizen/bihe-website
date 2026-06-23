import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { CRF_FACILITIES, CRF_PAGE_LEAD } from "@/lib/central-research-facilities-content";
import { RESEARCH_BASE_PATH } from "@/lib/research-routes";

export function CentralResearchFacilitiesPage() {
  return (
    <article className="crf-page about-bihe-page">
      <AboutInnerHero
        currentPage="Central Research Facilities"
        title="Central Research Facilities"
        lead={CRF_PAGE_LEAD}
        eyebrow="Research"
        sectionLabel="Research"
        sectionHref={RESEARCH_BASE_PATH}
      />

      {CRF_FACILITIES.map((facility, index) => (
        <section
          key={facility.id}
          className={[
            "crf-page__facility",
            index % 2 === 1 ? "crf-page__facility--muted" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          aria-labelledby={`crf-facility-${facility.id}-title`}
        >
          <div className="crf-page__container">
            <Reveal>
              <h2
                className="crf-page__facility-title"
                id={`crf-facility-${facility.id}-title`}
              >
                {facility.title}
              </h2>
            </Reveal>

            <Reveal delay={60}>
              <figure className="crf-page__facility-visual">
                <div className="crf-page__facility-frame">
                  <SmartImage
                    src={facility.image}
                    alt={facility.imageAlt}
                    fill
                    className="crf-page__facility-img"
                    sizes="(max-width: 960px) 92vw, 75rem"
                    priority={index === 0}
                  />
                </div>
              </figure>
            </Reveal>

            <Reveal delay={100}>
              <p className="crf-page__facility-text">{facility.paragraph}</p>
            </Reveal>
          </div>
        </section>
      ))}
    </article>
  );
}
