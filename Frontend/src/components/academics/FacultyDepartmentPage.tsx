import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { AcademicsFacultyNav } from "@/components/academics/AcademicsFacultyNav";
import { FacultyStaffSection } from "@/components/academics/FacultyStaffSection";
import { ACADEMICS_BASE_PATH } from "@/lib/academics-routes";
import { getFacultyPageConfig, type FacultyPageSlug } from "@/lib/faculty-pages";

type FacultyDepartmentPageProps = {
  slug: FacultyPageSlug;
};

export async function FacultyDepartmentPage({ slug }: FacultyDepartmentPageProps) {
  const page = getFacultyPageConfig(slug);

  return (
    <article className="principal-page academic-leadership-page b-com-admin-page about-bihe-page">
      <AboutInnerHero
        currentPage={page.currentPage}
        title={page.title}
        lead={page.lead}
        eyebrow="Academics"
        sectionLabel="Academics"
        sectionHref={ACADEMICS_BASE_PATH}
      />

      <AcademicsFacultyNav />
      <FacultyStaffSection department={page.department} />
    </article>
  );
}
