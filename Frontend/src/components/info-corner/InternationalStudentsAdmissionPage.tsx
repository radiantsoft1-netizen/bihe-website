import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { InternationalStudentsShowcaseSection } from "@/components/info-corner/InternationalStudentsShowcaseSection";
import { INFO_CORNER_BASE_PATH } from "@/lib/info-corner-routes";
import {
  INTERNATIONAL_STUDENTS_PAGE_LEAD,
  INTERNATIONAL_STUDENTS_SHOWCASES,
} from "@/lib/info-corner-pages/international-students-admission-content";

export function InternationalStudentsAdmissionPage() {
  return (
    <article className="ic-page ic-page--international principal-page international-students-page about-bihe-page">
      <AboutInnerHero
        currentPage="International Students Admission"
        title="International Students Admission"
        lead={INTERNATIONAL_STUDENTS_PAGE_LEAD}
        eyebrow="Info - Corner"
        sectionLabel="Info - Corner"
        sectionHref={INFO_CORNER_BASE_PATH}
      />

      {INTERNATIONAL_STUDENTS_SHOWCASES.map((section, index) => (
        <InternationalStudentsShowcaseSection
          key={section.id}
          section={section}
          sectionIndex={index}
          isFirst={index === 0}
        />
      ))}
    </article>
  );
}
