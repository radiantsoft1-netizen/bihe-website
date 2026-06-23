import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { BcaBenefitsSection } from "@/components/academics/BcaBenefitsSection";
import { BcaDepartmentSection } from "@/components/academics/BcaDepartmentSection";
import { BcaEligibilitySection } from "@/components/academics/BcaEligibilitySection";
import { BcaFacultySection } from "@/components/academics/BcaFacultySection";
import { BcaHighlightsSection } from "@/components/academics/BcaHighlightsSection";
import { BcaProgrammeSection } from "@/components/academics/BcaProgrammeSection";
import { ACADEMICS_BASE_PATH } from "@/lib/academics-routes";
import { BCA_PAGE_LEAD } from "@/lib/bca-academics-content";

export function BcaAcademicsPage() {
  return (
    <article className="principal-page academic-leadership-page b-com-admin-page about-bihe-page">
      <AboutInnerHero
        currentPage="BCA"
        title="Bachelor of Computer Applications"
        lead={BCA_PAGE_LEAD}
        eyebrow="Academics"
        sectionLabel="Academics"
        sectionHref={ACADEMICS_BASE_PATH}
      />

      <BcaProgrammeSection />
      <BcaDepartmentSection />
      <BcaEligibilitySection />
      <BcaFacultySection />
      <BcaHighlightsSection />
      <BcaBenefitsSection />
    </article>
  );
}
