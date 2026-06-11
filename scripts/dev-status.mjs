#!/usr/bin/env node
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const host = process.env.HOST ?? "127.0.0.1";
const port = process.env.PORT ?? "3000";
const url = `http://${host}:${port}/`;

async function main() {
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(2500) });
    if (response.ok) {
      console.log(`[dev] Running at ${url}`);
      process.exit(0);
    }
    console.log(`[dev] Unhealthy (${response.status}) at ${url}`);
    process.exit(1);
  } catch {
    console.log(`[dev] Not running at ${url}`);
    process.exit(1);
  }
}

process.chdir(join(dirname(fileURLToPath(import.meta.url)), ".."));
main();
