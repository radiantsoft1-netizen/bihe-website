import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { SportsFacilityNavCards } from "@/components/student-life/SportsFacilityNavCards";
import { StudentFacilitiesNavSection } from "@/components/student-life/StudentFacilitiesNavSection";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import {
  SF_BANNER_IMAGE,
  SF_BANNER_IMAGE_ALT,
  SF_FACILITY_NAV_CARDS,
  SF_FACILITIES_TITLE,
  SF_INTRO_PARAGRAPHS,
  SF_INTRO_TITLE,
  SF_PAGE_LEAD,
} from "@/lib/sports-facilities-content";
import { STUDENT_LIFE_BASE_PATH } from "@/lib/student-life-routes";

export function SportsFacilitiesPage() {
  return (
    <article className="sf-page about-bihe-page">
      <AboutInnerHero
        currentPage="Sports Facilities"
        title="Sports Facilities"
        lead={SF_PAGE_LEAD}
        eyebrow="Student Life"
        sectionLabel="Student Life"
        sectionHref={STUDENT_LIFE_BASE_PATH}
      />

      <section className="sf-page__banner" aria-label="Sports campus highlight">
        <div className="sf-page__banner-frame">
          <SmartImage
            src={SF_BANNER_IMAGE}
            alt={SF_BANNER_IMAGE_ALT}
            fill
            priority
            className="sf-page__banner-img"
            sizes="100vw"
          />
          <span className="sf-page__banner-scrim" aria-hidden />
        </div>
      </section>

      <section className="sf-page__intro" aria-labelledby="sf-intro-title">
        <div className="sf-page__container">
          <Reveal>
            <h2 className="sf-page__section-title sf-page__section-title--maroon" id="sf-intro-title">
              {SF_INTRO_TITLE}
            </h2>
            <div className="sf-page__intro-body">
              {SF_INTRO_PARAGRAPHS.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="sf-page__text">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="sf-page__facilities" aria-labelledby="sf-facilities-title">
        <div className="sf-page__container">
          <Reveal>
            <h2
              className="sf-page__section-title sf-page__section-title--maroon"
              id="sf-facilities-title"
            >
              {SF_FACILITIES_TITLE}
            </h2>
          </Reveal>

          <SportsFacilityNavCards cards={SF_FACILITY_NAV_CARDS} />
        </div>
      </section>

      <StudentFacilitiesNavSection />
    </article>
  );
}
