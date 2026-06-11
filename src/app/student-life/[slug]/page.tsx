import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SitePageShell } from "@/components/layout/SitePageShell";
import { DifferentlyAbledStudentsPage } from "@/components/student-life/DifferentlyAbledStudentsPage";
import { NssDetailsPage } from "@/components/student-life/NssDetailsPage";
import { SportsFacilitiesPage } from "@/components/student-life/SportsFacilitiesPage";
import { StudentLifeContentPage } from "@/components/student-life/StudentLifeContentPage";
import { StudentLifeRichPage } from "@/components/student-life/StudentLifeRichPage";
import {
  getStudentLifePage,
  STUDENT_LIFE_PAGE_SLUGS,
} from "@/lib/student-life-content";
import { getStudentLifeRichPage } from "@/lib/student-life-pages";
import { DIFFERENTLY_ABLED_PAGE_LEAD } from "@/lib/differently-abled-content";
import { NSS_PAGE_LEAD } from "@/lib/nss-details-content";
import { SF_PAGE_LEAD } from "@/lib/sports-facilities-content";

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
  const page = getStudentLifePage(slug);

  if (!page) {
    return { title: "Student Life | BIHE" };
  }

  const richPage = getStudentLifeRichPage(slug);

  const description =
    slug === "sports-facilities"
      ? SF_PAGE_LEAD
      : slug === "nss-details"
        ? NSS_PAGE_LEAD
        : slug === "facilities-for-differently-abled-students"
          ? DIFFERENTLY_ABLED_PAGE_LEAD
          : richPage?.lead ?? page.lead;

  return {
    title: `${page.title} | Student Life | BIHE`,
    description,
  };
}

export default async function StudentLifeRoutePage({ params }: StudentLifeRoutePageProps) {
  const { slug } = await params;
  const page = getStudentLifePage(slug);

  if (!page) {
    notFound();
  }

  const richPage = getStudentLifeRichPage(slug);

  return (
    <SitePageShell>
      {slug === "sports-facilities" ? (
        <SportsFacilitiesPage />
      ) : slug === "nss-details" ? (
        <NssDetailsPage />
      ) : slug === "facilities-for-differently-abled-students" ? (
        <DifferentlyAbledStudentsPage />
      ) : richPage ? (
        <StudentLifeRichPage config={richPage} />
      ) : (
        <StudentLifeContentPage {...page} />
      )}
    </SitePageShell>
  );
}
