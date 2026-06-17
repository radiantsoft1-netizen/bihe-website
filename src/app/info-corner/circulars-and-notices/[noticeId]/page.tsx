import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CircularNoticeDetailPage } from "@/components/info-corner/CircularNoticeDetailPage";
import { SitePageShell } from "@/components/layout/SitePageShell";
import { getAllCircularNoticeSlugs, getCircularNoticeBySlug } from "@/lib/circular-notices-service";

export const dynamic = "force-dynamic";

type CircularNoticeRouteProps = {
  params: Promise<{ noticeId: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllCircularNoticeSlugs();

  return slugs.map((noticeId) => ({ noticeId }));
}

export async function generateMetadata({
  params,
}: CircularNoticeRouteProps): Promise<Metadata> {
  const { noticeId } = await params;
  const notice = await getCircularNoticeBySlug(noticeId);

  if (!notice) {
    return { title: "Circulars and Notices | Info - Corner | BIHE" };
  }

  return {
    title: `${notice.title} | Circulars and Notices | BIHE`,
    description: notice.subtitle ?? notice.excerpt ?? notice.content[0] ?? undefined,
  };
}

export default async function CircularNoticeRoutePage({ params }: CircularNoticeRouteProps) {
  const { noticeId } = await params;
  const notice = await getCircularNoticeBySlug(noticeId);

  if (!notice) {
    notFound();
  }

  return (
    <SitePageShell>
      <CircularNoticeDetailPage notice={notice} />
    </SitePageShell>
  );
}
