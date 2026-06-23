import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AlumniProfileDetailPage } from "@/components/alumni/AlumniProfileDetailPage";
import { SitePageShell } from "@/components/layout/SitePageShell";
import { getAllAlumniProfileSlugs, getAlumniProfileBySlug } from "@/lib/alumni-service";
import { isAlumniReservedSlug } from "@/lib/alumni-routes";

type AlumniProfileRouteProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllAlumniProfileSlugs();

  return slugs.filter((slug) => !isAlumniReservedSlug(slug)).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: AlumniProfileRouteProps): Promise<Metadata> {
  const { slug } = await params;

  if (isAlumniReservedSlug(slug)) {
    return { title: "Alumni | BIHE" };
  }

  const profile = await getAlumniProfileBySlug(slug);

  if (!profile) {
    return { title: "Alumni | BIHE" };
  }

  const roleLine = [profile.currentRole, profile.currentEmployer].filter(Boolean).join(" at ");

  return {
    title: `${profile.name} | Alumni | BIHE`,
    description: roleLine || `${profile.program} graduate, Batch ${profile.batchYear ?? ""}`.trim(),
  };
}

export default async function AlumniProfileRoutePage({ params }: AlumniProfileRouteProps) {
  const { slug } = await params;

  if (isAlumniReservedSlug(slug)) {
    notFound();
  }

  const profile = await getAlumniProfileBySlug(slug);

  if (!profile) {
    notFound();
  }

  return (
    <SitePageShell>
      <AlumniProfileDetailPage profile={profile} />
    </SitePageShell>
  );
}
