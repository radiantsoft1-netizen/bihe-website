import { NextResponse } from "next/server";
import { getApiBaseUrl } from "@/lib/api/client";

export async function POST(request: Request) {
  const base = getApiBaseUrl();
  if (!base) {
    return NextResponse.json(
      { message: "Registration service unavailable. Please try again later." },
      { status: 503 },
    );
  }

  try {
    const body = await request.json();
    const response = await fetch(`${base}/api/v1/alumni/register/status`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const json = await response.json().catch(() => ({}));

    return NextResponse.json(json, { status: response.status });
  } catch {
    return NextResponse.json(
      { message: "Unable to check registration status right now. Please try again later." },
      { status: 503 },
    );
  }
}
