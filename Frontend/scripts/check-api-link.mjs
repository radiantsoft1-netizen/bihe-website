#!/usr/bin/env node
/**
 * Verifies the Next.js site can reach the Laravel admin API.
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function readEnvValue(name) {
  for (const file of [".env.local", ".env"]) {
    const path = join(root, file);
    if (!existsSync(path)) continue;

    const match = readFileSync(path, "utf8").match(new RegExp(`^${name}=(.+)$`, "m"));
    if (match) {
      return match[1].trim().replace(/^['"]|['"]$/g, "");
    }
  }

  return process.env[name]?.trim() ?? null;
}

const apiUrl = readEnvValue("NEXT_PUBLIC_API_URL");

if (!apiUrl) {
  console.error("[api-link] NEXT_PUBLIC_API_URL is not set.");
  console.error("[api-link] Copy .env.example to .env.local and set the Laravel API URL.");
  process.exit(1);
}

const endpoints = [
  "/api/v1/hero-banners",
  "/api/v1/announcements",
  "/api/v1/recruiting-partners",
  "/api/v1/faculty",
  "/api/v1/faculty/sections",
  "/api/v1/faculty?department=bca",
  "/api/v1/faculty?department=b-com",
  "/api/v1/faculty?department=non-teaching-staff",
  "/api/v1/news",
  "/api/v1/gallery",
];

let failed = 0;

for (const endpoint of endpoints) {
  const url = `${apiUrl.replace(/\/$/, "")}${endpoint}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      failed += 1;
      console.error(`[api-link] FAIL ${response.status} ${url}`);
      continue;
    }

    console.log(`[api-link] OK ${url}`);
  } catch (error) {
    failed += 1;
    console.error(`[api-link] FAIL ${url} (${error.message})`);
  }
}

if (failed > 0) {
  console.error("[api-link] Start Laravel with: cd Backend && php artisan serve --host=127.0.0.1 --port=8099");
  process.exit(1);
}

console.log("[api-link] Website is linked to the admin API.");
