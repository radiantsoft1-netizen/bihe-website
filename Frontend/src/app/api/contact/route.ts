import { NextResponse } from "next/server";
import { getApiBaseUrl } from "@/lib/api/client";

type ContactPayload = {
  name: string;
  email: string;
  mobile: string;
  subject: string;
  message: string;
  captcha_id: string;
  captcha_answer: number;
};

export async function POST(request: Request) {
  const base = getApiBaseUrl();
  if (!base) {
    return NextResponse.json(
      { message: "Contact service unavailable. Please call or email us directly." },
      { status: 503 },
    );
  }

  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  try {
    const response = await fetch(`${base}/api/v1/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const json = await response.json().catch(() => ({}));

    return NextResponse.json(json, { status: response.status });
  } catch {
    return NextResponse.json(
      { message: "Unable to send your message right now. Please try again later." },
      { status: 503 },
    );
  }
}
