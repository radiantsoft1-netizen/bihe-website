import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { StudentFacilitiesNavSection } from "@/components/student-life/StudentFacilitiesNavSection";
import { StudentLifeShowcaseSection } from "@/components/student-life/StudentLifeShowcaseSection";
import { DIFFERENTLY_ABLED_PAGE_LEAD, DIFFERENTLY_ABLED_SHOWCASES } from "@/lib/differently-abled-content";
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
