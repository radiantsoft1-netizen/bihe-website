import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { StudentFacilitiesNavSection } from "@/components/student-life/StudentFacilitiesNavSection";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import {
  SF_ATHLETICS_EVENTS,
  SF_EVENTS_IMAGE,
  SF_EVENTS_IMAGE_ALT,
  SF_EVENTS_PAGE_LEAD,
  SF_EVENTS_TITLE,
  SF_INTER_COLLEGE_INTRO,
  SF_INTER_COLLEGE_TITLE,
  SF_TEAM_EVENTS,
  SF_EVENTS_SECTION_ID,
  SF_TOURNAMENTS,
} from "@/lib/sports-facilities-content";
import { SPORTS_FACILITIES_PATH } from "@/lib/sports-facilities-routes";
import { STUDENT_LIFE_BASE_PATH } from "@/lib/student-life-routes";

export function SportsEventsPage() {
  return (
    <article className="sf-page about-bihe-page">
      <AboutInnerHero
        currentPage="Events 2024-25"
        title="Events 2024-25"
        lead={SF_EVENTS_PAGE_LEAD}
        eyebrow="Student Life"
        sectionLabel="Student Life"
        sectionHref={STUDENT_LIFE_BASE_PATH}
        parentPage="Sports Facilities"
        parentHref={SPORTS_FACILITIES_PATH}
      />

      <section
        id={SF_EVENTS_SECTION_ID}
        className="sf-page__events sf-page__anchor"
        aria-labelledby="sf-events-title"
      >
        <div className="sf-page__container sf-page__events-grid">
          <Reveal direction="left">
            <div className="sf-page__events-copy">
              <h2
                className="sf-page__section-title sf-page__section-title--maroon"
                id="sf-events-title"
              >
                {SF_EVENTS_TITLE}
              </h2>

              <div className="sf-page__events-block">
                <h3 className="sf-page__events-subtitle">Team Events</h3>
                <ul className="sf-page__events-list">
                  {SF_TEAM_EVENTS.map((event) => (
                    <li key={event}>{event}</li>
                  ))}
                </ul>
              </div>

              <div className="sf-page__events-block">
                <h3 className="sf-page__events-subtitle">Athletics Events (Boys &amp; Girls)</h3>
                <ul className="sf-page__events-list">
                  {SF_ATHLETICS_EVENTS.map((event) => (
                    <li key={event}>{event}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal direction="right" delay={80}>
            <figure className="sf-page__events-visual">
              <div className="sf-page__events-frame">
                <SmartImage
                  src={SF_EVENTS_IMAGE}
                  alt={SF_EVENTS_IMAGE_ALT}
                  fill
                  className="sf-page__events-img"
                  sizes="(max-width: 960px) 90vw, 24rem"
                />
              </div>
            </figure>
          </Reveal>
        </div>
      </section>

      <section className="sf-page__tournaments" aria-labelledby="sf-tournaments-title">
        <div className="sf-page__container">
          <Reveal>
            <h2
              className="sf-page__section-title sf-page__section-title--maroon"
              id="sf-tournaments-title"
            >
              {SF_INTER_COLLEGE_TITLE}
            </h2>
            <p className="sf-page__tournaments-lead">{SF_INTER_COLLEGE_INTRO}</p>
          </Reveal>

          <div className="sf-page__tournament-stack">
            {SF_TOURNAMENTS.map((tournament, index) => {
              const reverse = index % 2 === 1;

              return (
                <article
                  key={tournament.id}
                  id={tournament.id}
                  className={[
                    "sf-page__tournament",
                    "sf-page__anchor",
                    reverse ? "sf-page__tournament--reverse" : "",
                    index % 2 === 0 ? "sf-page__tournament--light" : "sf-page__tournament--muted",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  aria-labelledby={`sf-tournament-${tournament.id}-title`}
                >
                  <div className="sf-page__container sf-page__tournament-grid">
                    <Reveal direction={reverse ? "right" : "left"} className="sf-page__tournament-visual">
                      <div className="sf-page__tournament-frame">
                        <SmartImage
                          src={tournament.image}
                          alt={tournament.imageAlt}
                          fill
                          className="sf-page__tournament-img"
                          sizes="(max-width: 960px) 92vw, 28rem"
                        />
                      </div>
                    </Reveal>

                    <Reveal
                      delay={80}
                      direction={reverse ? "left" : "right"}
                      className="sf-page__tournament-copy"
                    >
                      <h3 className="sf-page__tournament-title" id={`sf-tournament-${tournament.id}-title`}>
                        {tournament.title}
                      </h3>
                      <p className="sf-page__text">{tournament.paragraph}</p>
                    </Reveal>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <StudentFacilitiesNavSection />
    </article>
  );
}
