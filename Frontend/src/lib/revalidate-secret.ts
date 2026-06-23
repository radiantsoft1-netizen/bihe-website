import "server-only";

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

function parseEnvValue(raw: string): string {
  const trimmed = raw.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function readFromEnvFile(filename: string): string | undefined {
  const path = join(process.cwd(), filename);
  if (!existsSync(path)) {
    return undefined;
  }

  for (const line of readFileSync(path, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }
    if (trimmed.startsWith("REVALIDATE_SECRET=")) {
      return parseEnvValue(trimmed.slice("REVALIDATE_SECRET=".length));
    }
  }

  return undefined;
}

/** Runtime secret for Hostinger/self-host (build may not inline env vars). */
export function getRevalidateSecret(): string | undefined {
  const fromProcess = process.env.REVALIDATE_SECRET?.trim();
  if (fromProcess) {
    return fromProcess;
  }

  return readFromEnvFile(".env.production") ?? readFromEnvFile(".env");
}
