import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { AcademicsFacultyNav } from "@/components/academics/AcademicsFacultyNav";
import { FacultyStaffSection } from "@/components/academics/FacultyStaffSection";
import { ACADEMICS_BASE_PATH } from "@/lib/academics-routes";
import { FACULTY_AND_STAFF_PAGE_LEAD } from "@/lib/faculty-service";

export async function FacultyAndStaffPage() {
  return (
    <article className="principal-page academic-leadership-page b-com-admin-page about-bihe-page">
      <AboutInnerHero
        currentPage="Faculty And Staff Details"
        title="Faculty And Staff Details"
        lead={FACULTY_AND_STAFF_PAGE_LEAD}
        eyebrow="Academics"
        sectionLabel="Academics"
        sectionHref={ACADEMICS_BASE_PATH}
      />

      <AcademicsFacultyNav />
      <FacultyStaffSection />
    </article>
  );
}
