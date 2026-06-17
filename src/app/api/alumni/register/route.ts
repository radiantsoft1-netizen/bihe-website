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
    const formData = await request.formData();
    const response = await fetch(`${base}/api/v1/alumni/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    });

    const json = await response.json().catch(() => ({}));

    return NextResponse.json(json, { status: response.status });
  } catch {
    return NextResponse.json(
      { message: "Unable to submit your profile right now. Please try again later." },
      { status: 503 },
    );
  }
}
