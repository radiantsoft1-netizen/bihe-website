import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GalleryAlbumPage } from "@/components/gallery/GalleryAlbumPage";
import { SitePageShell } from "@/components/layout/SitePageShell";
import {
  getAllGallerySlugs,
  getGalleryDetailBySlug,
} from "@/lib/gallery-service";

type GalleryAlbumRouteProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllGallerySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: GalleryAlbumRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const album = await getGalleryDetailBySlug(slug);

  if (!album) {
    return { title: "Gallery Album | BIHE" };
  }

  return {
    title: `${album.title} | Campus Gallery | BIHE`,
    description: album.lead,
  };
}

export default async function GalleryAlbumRoutePage({ params }: GalleryAlbumRouteProps) {
  const { slug } = await params;
  const album = await getGalleryDetailBySlug(slug);

  if (!album || slug.startsWith("fallback-")) {
    notFound();
  }

  return (
    <SitePageShell>
      <GalleryAlbumPage album={album} />
    </SitePageShell>
  );
}
