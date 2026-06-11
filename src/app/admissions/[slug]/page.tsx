import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdmissionProcessPage } from "@/components/admissions/AdmissionProcessPage";
import { FeeRefundPolicyPage } from "@/components/admissions/FeeRefundPolicyPage";
import { OnlineAdmissionFormatPage } from "@/components/admissions/OnlineAdmissionFormatPage";
import { SitePageShell } from "@/components/layout/SitePageShell";
import { ADMISSION_PROCESS_PAGE_LEAD } from "@/lib/admission-process-content";
import { FEE_REFUND_POLICY_PAGE_LEAD } from "@/lib/fee-refund-policy-content";
import { ONLINE_ADMISSION_FORMAT_PAGE_LEAD } from "@/lib/online-admission-format-content";
import { ADMISSIONS_PAGE_SLUGS, getAdmissionsPage } from "@/lib/admissions-content";

type AdmissionsRoutePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return ADMISSIONS_PAGE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: AdmissionsRoutePageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getAdmissionsPage(slug);

  if (!page) {
    return { title: "Admissions | BIHE" };
  }

  return {
    title: `${page.title} | Admissions | BIHE`,
    description:
      slug === "fee-refund-policy"
        ? FEE_REFUND_POLICY_PAGE_LEAD
        : slug === "admission-process"
          ? ADMISSION_PROCESS_PAGE_LEAD
          : slug === "online-admission-format"
            ? ONLINE_ADMISSION_FORMAT_PAGE_LEAD
            : page.lead,
  };
}

export default async function AdmissionsRoutePage({ params }: AdmissionsRoutePageProps) {
  const { slug } = await params;
  const page = getAdmissionsPage(slug);

  if (!page) {
    notFound();
  }

  return (
    <SitePageShell>
      {slug === "admission-process" ? (
        <AdmissionProcessPage />
      ) : slug === "fee-refund-policy" ? (
        <FeeRefundPolicyPage />
      ) : slug === "online-admission-format" ? (
        <OnlineAdmissionFormatPage />
      ) : null}
    </SitePageShell>
  );
}
