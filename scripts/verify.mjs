#!/usr/bin/env node
/**
 * Fast verification that does NOT touch the dev server's `.next` cache.
 * Use this during active development instead of `npm run build`.
 */
import { execSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

process.chdir(root);

console.log("[verify] Type-checking (dev server can stay running)...");
execSync("npx tsc --noEmit", { stdio: "inherit" });

console.log("[verify] Linting...");
execSync("npm run lint", { stdio: "inherit" });

console.log("[verify] OK");
