import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

type RevalidateBody = {
  secret?: string;
  tags?: string[];
  paths?: string[];
};

export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET?.trim();

  if (!secret) {
    return NextResponse.json({ message: "Revalidation is not configured." }, { status: 503 });
  }

  let body: RevalidateBody;

  try {
    body = (await request.json()) as RevalidateBody;
  } catch {
    return NextResponse.json({ message: "Invalid JSON body." }, { status: 400 });
  }

  if (body.secret !== secret) {
    return NextResponse.json({ message: "Invalid secret." }, { status: 401 });
  }

  const tags = Array.isArray(body.tags) ? body.tags.filter((tag) => typeof tag === "string") : [];
  const paths = Array.isArray(body.paths) ? body.paths.filter((path) => typeof path === "string") : [];

  for (const tag of tags) {
    revalidateTag(tag);
  }

  for (const path of paths) {
    revalidatePath(path);
  }

  return NextResponse.json({
    revalidated: true,
    tags,
    paths,
    at: new Date().toISOString(),
  });
}
