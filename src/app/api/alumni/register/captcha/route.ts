import { NextResponse } from "next/server";
import { getApiBaseUrl } from "@/lib/api/client";

export async function GET() {
  const base = getApiBaseUrl();
  if (!base) {
    return NextResponse.json({ error: "Registration service unavailable" }, { status: 503 });
  }

  try {
    const response = await fetch(`${base}/api/v1/alumni/register/captcha`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Unable to load CAPTCHA" }, { status: response.status });
    }

    const json = await response.json();
    return NextResponse.json(json);
  } catch {
    return NextResponse.json({ error: "Unable to load CAPTCHA" }, { status: 503 });
  }
}
