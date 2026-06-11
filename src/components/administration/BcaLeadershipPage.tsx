import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { AcademicLeadershipShowcaseSection } from "@/components/administration/AcademicLeadershipShowcaseSection";
import {
  BCA_LEADERSHIP_PAGE_LEAD,
  BCA_LEADERSHIP_SHOWCASES,
} from "@/lib/bca-leadership-content";

export function BcaLeadershipPage() {
  return (
    <article className="principal-page academic-leadership-page about-bihe-page">
      <AboutInnerHero
        currentPage="Academic Leadership of BCA"
        title="BCA"
        lead={BCA_LEADERSHIP_PAGE_LEAD}
        eyebrow="Administration"
        sectionLabel="Administration"
        sectionHref="/principal"
      />

      {BCA_LEADERSHIP_SHOWCASES.map((section, index) => (
        <AcademicLeadershipShowcaseSection
          key={section.id}
          section={section}
          sectionIndex={index}
          isFirst={index === 0}
          pageId="bca-leadership"
        />
      ))}
    </article>
  );
}
