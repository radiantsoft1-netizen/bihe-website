import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AlumniGalleryDetailPage } from "@/components/alumni/AlumniGalleryDetailPage";
import { SitePageShell } from "@/components/layout/SitePageShell";
import {
  getAllAlumniGalleryImageIds,
  getAlumniGalleryImageDetail,
} from "@/lib/alumni-gallery-service";

type AlumniGalleryPhotoRouteProps = {
  params: Promise<{ imageId: string }>;
};

export async function generateStaticParams() {
  const imageIds = await getAllAlumniGalleryImageIds();
  return imageIds.map((imageId) => ({ imageId }));
}

export async function generateMetadata({ params }: AlumniGalleryPhotoRouteProps): Promise<Metadata> {
  const { imageId } = await params;
  const detail = await getAlumniGalleryImageDetail(imageId);

  if (!detail) {
    return { title: "Alumni Gallery Photo | BIHE" };
  }

  return {
    title: `${detail.image.alt} | Alumni Gallery | BIHE`,
    description: detail.paragraphs[0],
  };
}

export default async function AlumniGalleryPhotoRoutePage({ params }: AlumniGalleryPhotoRouteProps) {
  const { imageId } = await params;
  const detail = await getAlumniGalleryImageDetail(imageId);

  if (!detail) {
    notFound();
  }

  return (
    <SitePageShell>
      <AlumniGalleryDetailPage detail={detail} />
    </SitePageShell>
  );
}
