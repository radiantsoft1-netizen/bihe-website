import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { StudentFacilitiesNavSection } from "@/components/student-life/StudentFacilitiesNavSection";
import { StudentLifeShowcaseSection } from "@/components/student-life/StudentLifeShowcaseSection";
import {
  DIFFERENTLY_ABLED_HERO,
  DIFFERENTLY_ABLED_PAGE_LEAD,
  DIFFERENTLY_ABLED_SHOWCASES,
} from "@/lib/differently-abled-content";
import { STUDENT_LIFE_BASE_PATH } from "@/lib/student-life-routes";

export function DifferentlyAbledStudentsPage() {
  return (
    <article className="principal-page differently-abled-page about-bihe-page">
      <AboutInnerHero
        currentPage="Facilities for Differently-abled Students"
        title="Facilities for Differently-abled Students"
        lead={DIFFERENTLY_ABLED_PAGE_LEAD}
        eyebrow="Student Life"
        sectionLabel="Student Life"
        sectionHref={STUDENT_LIFE_BASE_PATH}
      />

      <section
        className="differently-abled-page__intro"
        aria-labelledby="differently-abled-intro-title"
      >
        <div className="principal-page__container">
          <p className="differently-abled-page__intro-kicker">{DIFFERENTLY_ABLED_HERO.kicker}</p>
          <h2 className="differently-abled-page__intro-title" id="differently-abled-intro-title">
            {DIFFERENTLY_ABLED_HERO.overlayTitle}
          </h2>
          <p className="differently-abled-page__intro-lead">{DIFFERENTLY_ABLED_HERO.overlayLead}</p>
        </div>
      </section>

      {DIFFERENTLY_ABLED_SHOWCASES.map((section, index) => (
        <StudentLifeShowcaseSection
          key={section.id}
          section={section}
          sectionIndex={index}
          isFirst={index === 0}
          pageId="differently-abled"
        />
      ))}

      <StudentFacilitiesNavSection />
    </article>
  );
}
