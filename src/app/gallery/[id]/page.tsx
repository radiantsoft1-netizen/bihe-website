import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GalleryDetailPage } from "@/components/gallery/GalleryDetailPage";
import { SitePageShell } from "@/components/layout/SitePageShell";
import {
  getAllGalleryIds,
  getGalleryDetailById,
  getRelatedGalleryItems,
} from "@/lib/gallery-service";

type GalleryDetailRouteProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  const ids = await getAllGalleryIds();
  return ids.map((id) => ({ id }));
}

export async function generateMetadata({ params }: GalleryDetailRouteProps): Promise<Metadata> {
  const { id } = await params;
  const item = await getGalleryDetailById(id);

  if (!item) {
    return { title: "Gallery Photo | BIHE" };
  }

  return {
    title: `${item.title} | Campus Gallery | BIHE`,
    description: item.lead,
  };
}

export default async function GalleryDetailRoutePage({ params }: GalleryDetailRouteProps) {
  const { id } = await params;
  const item = await getGalleryDetailById(id);

  if (!item) {
    notFound();
  }

  const relatedItems = await getRelatedGalleryItems(id);

  return (
    <SitePageShell>
      <GalleryDetailPage item={item} relatedItems={relatedItems} />
    </SitePageShell>
  );
}
