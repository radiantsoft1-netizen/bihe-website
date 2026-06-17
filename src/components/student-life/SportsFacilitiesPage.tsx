import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { SportsFacilitiesGalleryCarousel } from "@/components/student-life/SportsFacilitiesGalleryCarousel";
import { SportsFacilityCards } from "@/components/student-life/SportsFacilityCards";
import { SportsInterCollegeCarousel } from "@/components/student-life/SportsInterCollegeCarousel";
import { StudentFacilitiesNavSection } from "@/components/student-life/StudentFacilitiesNavSection";
import { Reveal } from "@/components/ui/Reveal";
import type { SportsGalleryImage } from "@/lib/sports-facilities-content";
import {
  SF_FACILITY_CARDS,
  SF_FACILITY_NAV_CARDS,
  SF_FACILITIES_TITLE,
  SF_GALLERY_TITLE,
  SF_INTER_COLLEGE_TITLE,
  SF_INTRO_PARAGRAPHS,
  SF_INTRO_TITLE,
  SF_PAGE_LEAD,
} from "@/lib/sports-facilities-content";
import { STUDENT_LIFE_BASE_PATH } from "@/lib/student-life-routes";

type SportsFacilitiesPageProps = {
  galleryImages: readonly SportsGalleryImage[];
};

export function SportsFacilitiesPage({ galleryImages }: SportsFacilitiesPageProps) {
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

      <section className="sf-page__grounds" aria-labelledby="sf-grounds-title">
        <div className="sf-page__container">
          <Reveal>
            <h2
              className="sf-page__section-title sf-page__section-title--maroon"
              id="sf-grounds-title"
            >
              {SF_FACILITIES_TITLE}
            </h2>
          </Reveal>

          <SportsFacilityCards cards={SF_FACILITY_CARDS} />
        </div>
      </section>

      <section className="sf-page__inter-college" aria-labelledby="sf-inter-college-title">
        <div className="sf-page__container">
          <Reveal>
            <h2
              className="sf-page__section-title sf-page__section-title--maroon"
              id="sf-inter-college-title"
            >
              {SF_INTER_COLLEGE_TITLE}
            </h2>
          </Reveal>

          <SportsInterCollegeCarousel cards={SF_FACILITY_NAV_CARDS} />
        </div>
      </section>

      {galleryImages.length > 0 ? (
        <section className="sf-page__gallery" aria-labelledby="sf-gallery-title">
          <div className="sf-page__container">
            <Reveal>
              <h2
                className="sf-page__section-title sf-page__section-title--maroon"
                id="sf-gallery-title"
              >
                {SF_GALLERY_TITLE}
              </h2>
            </Reveal>

            <SportsFacilitiesGalleryCarousel images={galleryImages} />
          </div>
        </section>
      ) : null}

      <StudentFacilitiesNavSection />
    </article>
  );
}
