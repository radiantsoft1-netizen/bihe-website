import { NextResponse } from "next/server";
import { getPublishedGalleryRecords } from "@/lib/gallery-store";

export async function GET() {
  const items = await getPublishedGalleryRecords();
  return NextResponse.json({ items });
}
