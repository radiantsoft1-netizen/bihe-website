import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SitePageShell } from "@/components/layout/SitePageShell";
import { MegaPlacementDrivePage } from "@/components/student-life/MegaPlacementDrivePage";
import { PlacementDriveDetailPage } from "@/components/student-life/PlacementDriveDetailPage";
import { MEGA_PLACEMENT_DRIVE_PAGE_LEAD } from "@/lib/mega-placement-drive-content";
import {
  getAllPlacementDriveSlugs,
  getPlacementDriveBySlug,
  getRelatedPlacementDriveCards,
} from "@/lib/placement-drives-service";

const MEGA_PLACEMENT_DRIVE_2025_SLUG = "mega-placement-drive-2025";

type PlacementDriveRoutePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllPlacementDriveSlugs();

  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PlacementDriveRoutePageProps): Promise<Metadata> {
  const { slug } = await params;

  if (slug === MEGA_PLACEMENT_DRIVE_2025_SLUG) {
    return {
      title: "Mega Placement Drive 2025 | Placement Cell | Student Life | BIHE",
      description: MEGA_PLACEMENT_DRIVE_PAGE_LEAD,
    };
  }

  const drive = await getPlacementDriveBySlug(slug);

  if (!drive) {
    return { title: "Placement Drive | Student Life | BIHE" };
  }

  return {
    title: `${drive.title} | Placement Cell | Student Life | BIHE`,
    description: drive.heroLead,
  };
}

export default async function PlacementDriveRoutePage({ params }: PlacementDriveRoutePageProps) {
  const { slug } = await params;

  if (slug === MEGA_PLACEMENT_DRIVE_2025_SLUG) {
    return (
      <SitePageShell>
        <MegaPlacementDrivePage />
      </SitePageShell>
    );
  }

  const drive = await getPlacementDriveBySlug(slug);

  if (!drive) {
    notFound();
  }

  const relatedCards = await getRelatedPlacementDriveCards(slug);

  return (
    <SitePageShell>
      <PlacementDriveDetailPage drive={drive} relatedCards={relatedCards} />
    </SitePageShell>
  );
}
