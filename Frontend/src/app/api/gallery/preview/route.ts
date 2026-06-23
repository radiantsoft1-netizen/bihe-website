import { NextResponse } from "next/server";
import { getApiBaseUrl } from "@/lib/api/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mediaId = searchParams.get("mediaId");

  if (!mediaId) {
    return NextResponse.json({ error: "Missing mediaId" }, { status: 400 });
  }

  const base = getApiBaseUrl();
  if (!base) {
    return NextResponse.json({ error: "Gallery API unavailable" }, { status: 503 });
  }

  const upstream = await fetch(`${base}/api/v1/gallery-media/${mediaId}/preview`, {
    next: { revalidate: 3600 },
  });

  if (!upstream.ok) {
    return NextResponse.json({ error: "Preview unavailable" }, { status: upstream.status });
  }

  const buffer = await upstream.arrayBuffer();

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      "Content-Type": upstream.headers.get("content-type") ?? "image/jpeg",
      "Content-Disposition": "inline",
      "Cache-Control": "private, max-age=3600",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
