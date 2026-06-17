import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NewsDetailPage } from "@/components/news/NewsDetailPage";
import { SitePageShell } from "@/components/layout/SitePageShell";
import { getAllNewsSlugs, getNewsBySlug } from "@/lib/news-service";

type NewsDetailRouteProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllNewsSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: NewsDetailRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);

  if (!item) {
    return { title: "News & Events | BIHE" };
  }

  return {
    title: item.seo?.title ?? `${item.title} | News & Events | BIHE`,
    description: item.seo?.description ?? item.description,
    keywords: item.seo?.keywords ?? undefined,
  };
}

export default async function NewsDetailRoutePage({ params }: NewsDetailRouteProps) {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);

  if (!item || slug.startsWith("fallback-")) {
    notFound();
  }

  return (
    <SitePageShell>
      <NewsDetailPage item={item} />
    </SitePageShell>
  );
}
