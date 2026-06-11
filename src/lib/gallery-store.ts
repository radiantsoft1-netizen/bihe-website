import "server-only";

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { put, list } from "@vercel/blob";
import type { GalleryPhotoRecord } from "@/lib/types/gallery";
import { GALLERY_PAGE_ITEMS } from "@/lib/gallery-page-content";

const DATA_DIR = path.join(process.cwd(), "data");
const GALLERY_JSON_PATH = path.join(DATA_DIR, "gallery.json");
const BLOB_MANIFEST_PATH = "gallery/manifest.json";

function usesBlobStorage(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function nowIso(): string {
  return new Date().toISOString();
}

function seedRecords(): GalleryPhotoRecord[] {
  const timestamp = nowIso();

  return GALLERY_PAGE_ITEMS.map((item, index) => ({
    id: item.id,
    title: item.title,
    category: item.category,
    filterId: item.filterId,
    details: "",
    imageUrl: item.image,
    published: true,
    sortOrder: index,
    createdAt: timestamp,
    updatedAt: timestamp,
  }));
}

async function readManifestFromDisk(): Promise<GalleryPhotoRecord[]> {
  await mkdir(DATA_DIR, { recursive: true });

  try {
    const raw = await readFile(GALLERY_JSON_PATH, "utf8");
    const parsed = JSON.parse(raw) as GalleryPhotoRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    const seeded = seedRecords();
    await writeManifestToDisk(seeded);
    return seeded;
  }
}

async function writeManifestToDisk(records: GalleryPhotoRecord[]): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(GALLERY_JSON_PATH, JSON.stringify(records, null, 2), "utf8");
}

async function readManifestFromBlob(): Promise<GalleryPhotoRecord[]> {
  const { blobs } = await list({ prefix: BLOB_MANIFEST_PATH, limit: 1 });

  if (blobs.length === 0) {
    const seeded = seedRecords();
    await writeManifestToBlob(seeded);
    return seeded;
  }

  const response = await fetch(blobs[0].url, { cache: "no-store" });
  if (!response.ok) {
    return seedRecords();
  }

  const parsed = (await response.json()) as GalleryPhotoRecord[];
  return Array.isArray(parsed) ? parsed : [];
}

async function writeManifestToBlob(records: GalleryPhotoRecord[]): Promise<void> {
  await put(BLOB_MANIFEST_PATH, JSON.stringify(records, null, 2), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

async function readGalleryRecords(): Promise<GalleryPhotoRecord[]> {
  if (usesBlobStorage()) {
    return readManifestFromBlob();
  }

  return readManifestFromDisk();
}

export async function getPublishedGalleryRecords(): Promise<GalleryPhotoRecord[]> {
  const records = await readGalleryRecords();
  return records
    .filter((record) => record.published)
    .sort((a, b) => a.sortOrder - b.sortOrder || b.createdAt.localeCompare(a.createdAt));
}
