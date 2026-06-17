import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AlumniEventDetailPage } from "@/components/alumni/AlumniEventDetailPage";
import { SitePageShell } from "@/components/layout/SitePageShell";
import { getAllAlumniEventSlugs, getAlumniEventBySlug } from "@/lib/alumni-service";

type AlumniEventRouteProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllAlumniEventSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: AlumniEventRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getAlumniEventBySlug(slug);

  if (!event) {
    return { title: "Alumni Events | BIHE" };
  }

  return {
    title: `${event.title} | Alumni Events | BIHE`,
    description: event.summary ?? undefined,
  };
}

export default async function AlumniEventRoutePage({ params }: AlumniEventRouteProps) {
  const { slug } = await params;
  const event = await getAlumniEventBySlug(slug);

  if (!event) {
    notFound();
  }

  return (
    <SitePageShell>
      <AlumniEventDetailPage event={event} />
    </SitePageShell>
  );
}
