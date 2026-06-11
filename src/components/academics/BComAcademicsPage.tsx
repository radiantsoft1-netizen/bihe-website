import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { BComDepartmentSection } from "@/components/academics/BComDepartmentSection";
import { BComFacultySection } from "@/components/administration/BComFacultySection";
import { BComProgrammeSection } from "@/components/administration/BComProgrammeSection";
import { BComShowcaseSection } from "@/components/administration/BComShowcaseSection";
import { ACADEMICS_BASE_PATH } from "@/lib/academics-routes";
import {
  B_COM_ACADEMICS_SHOWCASES,
  B_COM_PAGE_LEAD,
} from "@/lib/b-com-admin-content";

export function BComAcademicsPage() {
  return (
    <article className="principal-page academic-leadership-page b-com-admin-page about-bihe-page">
      <AboutInnerHero
        currentPage="B.COM"
        title="Bachelor of Commerce"
        lead={B_COM_PAGE_LEAD}
        eyebrow="Academics"
        sectionLabel="Academics"
        sectionHref={ACADEMICS_BASE_PATH}
      />

      <BComProgrammeSection />
      <BComDepartmentSection />

      {B_COM_ACADEMICS_SHOWCASES.map((section, index) => (
        <BComShowcaseSection
          key={section.id}
          section={section}
          sectionIndex={index}
          isFirst={index === 0}
          pageId="b-com-academics"
        />
      ))}

      <BComFacultySection />
    </article>
  );
}
