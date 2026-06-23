/**
 * Phase 1 static for iqac, academic-calendar, library, bca, b-com, etc.
 * Exception: `faculty-and-staff` loads roster from API — see `phase1-static-pages.ts`.
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AcademicCalendarPage } from "@/components/academics/AcademicCalendarPage";
import { AcademicsExaminationPage } from "@/components/academics/AcademicsExaminationPage";
import { AcademicsContentPage } from "@/components/academics/AcademicsContentPage";
import { IqacPage } from "@/components/academics/IqacPage";
import { FacultyAndStaffPage } from "@/components/academics/FacultyAndStaffPage";
import { FacultyDepartmentPage } from "@/components/academics/FacultyDepartmentPage";
import { LibraryPage } from "@/components/academics/LibraryPage";
import { BcaAcademicsPage } from "@/components/academics/BcaAcademicsPage";
import { BComAcademicsPage } from "@/components/academics/BComAcademicsPage";
import { ACADEMIC_CALENDAR_PAGE_LEAD } from "@/lib/academic-calendar-content";
import { ACADEMICS_EXAMINATION_PAGE_LEAD } from "@/lib/academics-examination-content";
import { IQAC_PAGE_LEAD } from "@/lib/iqac-content";
import { LIBRARY_PAGE_LEAD } from "@/lib/library-content";
import { SitePageShell } from "@/components/layout/SitePageShell";
import { BCA_PAGE_LEAD } from "@/lib/bca-academics-content";
import { B_COM_PAGE_LEAD } from "@/lib/b-com-admin-content";
import { FACULTY_AND_STAFF_PAGE_LEAD } from "@/lib/faculty-service";
import { isFacultyPageSlug } from "@/lib/faculty-pages";
import { ACADEMICS_PAGE_SLUGS } from "@/lib/academics-pages";
import { getAcademicsPage } from "@/lib/academics-service";

type AcademicsRoutePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return ACADEMICS_PAGE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: AcademicsRoutePageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getAcademicsPage(slug);

  if (!page) {
    return { title: "Academics | BIHE" };
  }

  return {
    title: `${page.title} | Academics | BIHE`,
    description:
      slug === "b-com"
        ? B_COM_PAGE_LEAD
        : slug === "bca"
          ? BCA_PAGE_LEAD
          : slug === "academic-calendar"
            ? ACADEMIC_CALENDAR_PAGE_LEAD
            : slug === "academics-and-examination"
              ? ACADEMICS_EXAMINATION_PAGE_LEAD
              : slug === "iqac"
                ? IQAC_PAGE_LEAD
                : slug === "library"
                  ? LIBRARY_PAGE_LEAD
                  : slug === "faculty-and-staff"
                    ? FACULTY_AND_STAFF_PAGE_LEAD
                    : page.lead,
  };
}

export default async function AcademicsRoutePage({ params }: AcademicsRoutePageProps) {
  const { slug } = await params;
  const page = await getAcademicsPage(slug);

  if (!page) {
    notFound();
  }

  return (
    <SitePageShell>
      {slug === "b-com" ? (
        <BComAcademicsPage />
      ) : slug === "bca" ? (
        <BcaAcademicsPage />
      ) : slug === "academic-calendar" ? (
        <AcademicCalendarPage />
      ) : slug === "academics-and-examination" ? (
        <AcademicsExaminationPage />
      ) : slug === "iqac" ? (
        <IqacPage />
      ) : slug === "library" ? (
        <LibraryPage />
      ) : slug === "faculty-and-staff" ? (
        <FacultyAndStaffPage />
      ) : isFacultyPageSlug(slug) ? (
        <FacultyDepartmentPage slug={slug} />
      ) : (
        <AcademicsContentPage {...page} />
      )}
    </SitePageShell>
  );
}
