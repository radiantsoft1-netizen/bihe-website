import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { AcademicLeadershipShowcaseSection } from "@/components/administration/AcademicLeadershipShowcaseSection";
import {
  B_COM_LEADERSHIP_PAGE_LEAD,
  B_COM_LEADERSHIP_SHOWCASES,
} from "@/lib/b-com-leadership-content";

export function BComLeadershipPage() {
  return (
    <article className="principal-page academic-leadership-page about-bihe-page">
      <AboutInnerHero
        currentPage="Academic Leadership of B.com"
        title="B.Com"
        lead={B_COM_LEADERSHIP_PAGE_LEAD}
        eyebrow="Administration"
        sectionLabel="Administration"
        sectionHref="/principal"
      />

      {B_COM_LEADERSHIP_SHOWCASES.map((section, index) => (
        <AcademicLeadershipShowcaseSection
          key={section.id}
          section={section}
          sectionIndex={index}
          isFirst={index === 0}
          pageId="b-com-leadership"
        />
      ))}
    </article>
  );
}
