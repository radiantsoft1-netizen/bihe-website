import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SitePageShell } from "@/components/layout/SitePageShell";
import { DifferentlyAbledStudentsPage } from "@/components/student-life/DifferentlyAbledStudentsPage";
import { NssDetailsPage } from "@/components/student-life/NssDetailsPage";
import { SportsFacilitiesPage } from "@/components/student-life/SportsFacilitiesPage";
import { StudentGrievanceRedressalPage } from "@/components/student-life/StudentGrievanceRedressalPage";
import { StudentLifeContentPage } from "@/components/student-life/StudentLifeContentPage";
import { StudentLifeRichPage } from "@/components/student-life/StudentLifeRichPage";
import { STUDENT_LIFE_PAGE_SLUGS } from "@/lib/student-life-content";
import {
  getStudentLifePage,
  getStudentLifeRichPageConfig,
} from "@/lib/student-life-service";
import { DIFFERENTLY_ABLED_PAGE_LEAD } from "@/lib/differently-abled-content";
import { GRIEVANCE_PAGE_LEAD } from "@/lib/student-life-pages/student-grievance-redressal-committee";
import { NSS_PAGE_LEAD } from "@/lib/nss-details-content";
import { SF_PAGE_LEAD } from "@/lib/sports-facilities-content";
import { getSportsFacilitiesGalleryImages } from "@/lib/sports-facilities-gallery-service";

type StudentLifeRoutePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return STUDENT_LIFE_PAGE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: StudentLifeRoutePageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getStudentLifePage(slug);

  if (!page) {
    return { title: "Student Life | BIHE" };
  }

  const richPage = await getStudentLifeRichPageConfig(slug);

  const description =
    slug === "sports-facilities"
      ? SF_PAGE_LEAD
      : slug === "nss-details"
        ? NSS_PAGE_LEAD
        : slug === "facilities-for-differently-abled-students"
          ? DIFFERENTLY_ABLED_PAGE_LEAD
          : slug === "student-grievance-redressal-committee"
            ? GRIEVANCE_PAGE_LEAD
            : richPage?.lead ?? page.lead;

  return {
    title: `${page.title} | Student Life | BIHE`,
    description,
  };
}

export default async function StudentLifeRoutePage({ params }: StudentLifeRoutePageProps) {
  const { slug } = await params;
  const page = await getStudentLifePage(slug);

  if (!page) {
    notFound();
  }

  const richPage = await getStudentLifeRichPageConfig(slug);
  const sportsGalleryImages =
    slug === "sports-facilities" ? await getSportsFacilitiesGalleryImages() : [];

  return (
    <SitePageShell>
      {slug === "sports-facilities" ? (
        <SportsFacilitiesPage galleryImages={sportsGalleryImages} />
      ) : slug === "nss-details" ? (
        <NssDetailsPage />
      ) : slug === "facilities-for-differently-abled-students" ? (
        <DifferentlyAbledStudentsPage />
      ) : slug === "student-grievance-redressal-committee" ? (
        <StudentGrievanceRedressalPage />
      ) : richPage ? (
        <StudentLifeRichPage config={richPage} />
      ) : (
        <StudentLifeContentPage {...page} />
      )}
    </SitePageShell>
  );
}
