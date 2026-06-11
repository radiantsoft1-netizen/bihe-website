import type { GalleryFilterId } from "@/lib/gallery-page-content";

export type GalleryPhotoFilterId = Exclude<GalleryFilterId, "all">;

export type GalleryPhotoRecord = {
  id: string;
  title: string;
  category: string;
  filterId: GalleryPhotoFilterId;
  details: string;
  imageUrl: string;
  published: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};
