import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InfoCornerItemDetailPage } from "@/components/info-corner/InfoCornerItemDetailPage";
import { NewsletterEditionDetailPage } from "@/components/info-corner/NewsletterEditionDetailPage";
import { SitePageShell } from "@/components/layout/SitePageShell";
import {
  getAllInfoCornerItemParams,
  getInfoCornerItem,
} from "@/lib/info-corner-items-service";
import { getInfoCornerPage } from "@/lib/info-corner-service";

export const dynamic = "force-dynamic";

type InfoCornerItemRouteProps = {
  params: Promise<{ slug: string; itemSlug: string }>;
};

export async function generateStaticParams() {
  const params = await getAllInfoCornerItemParams();

  return params.map(({ category, itemSlug }) => ({
    slug: category,
    itemSlug,
  }));
}

export async function generateMetadata({
  params,
}: InfoCornerItemRouteProps): Promise<Metadata> {
  const { slug, itemSlug } = await params;
  const item = await getInfoCornerItem(slug, itemSlug);

  if (!item) {
    return { title: "Info - Corner | BIHE" };
  }

  return {
    title: `${item.title} | ${item.category?.name ?? "Info - Corner"} | BIHE`,
    description: item.subtitle ?? item.excerpt ?? item.content?.[0] ?? undefined,
  };
}

export default async function InfoCornerItemRoutePage({ params }: InfoCornerItemRouteProps) {
  const { slug, itemSlug } = await params;
  const [item, page] = await Promise.all([
    getInfoCornerItem(slug, itemSlug),
    getInfoCornerPage(slug),
  ]);

  if (!item) {
    notFound();
  }

  const categoryLead = page?.lead ?? item.category?.description ?? "";

  return (
    <SitePageShell>
      {slug === "newsletters" ? (
        <NewsletterEditionDetailPage item={item} categoryLead={categoryLead} />
      ) : (
        <InfoCornerItemDetailPage item={item} categoryLead={categoryLead} />
      )}
    </SitePageShell>
  );
}
