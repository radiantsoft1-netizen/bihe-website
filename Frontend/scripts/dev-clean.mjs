#!/usr/bin/env node
/**
 * Full dev reset: stop server, clear .next cache, then run Next.js.
 * Use only when you see stale chunk errors — normal work should use `npm run dev`.
 */
import { spawn, execSync } from "node:child_process";
import { rmSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const port = process.env.PORT ?? "3000";
const host = process.env.HOST ?? "127.0.0.1";

process.chdir(root);

function log(message) {
  console.log(`[dev] ${message}`);
}

log(`Stopping any process on port ${port}...`);
try {
  if (process.platform === "win32") {
    execSync(
      `for /f "tokens=5" %a in ('netstat -aon ^| findstr :${port}') do taskkill /F /PID %a`,
      { stdio: "ignore" },
    );
  } else {
    execSync(`lsof -ti:${port} | xargs kill -9 2>/dev/null || true`, {
      stdio: "ignore",
    });
  }
} catch {
  /* port already free */
}

for (const dir of [".next", "node_modules/.cache"]) {
  if (existsSync(join(root, dir))) {
    log(`Removing ${dir}...`);
    rmSync(join(root, dir), { recursive: true, force: true });
  }
}

log(`Starting Next.js at http://${host}:${port} ...`);
const useTurbopack = process.env.DEV_WEBPACK !== "1";
const args = [
  "next",
  "dev",
  ...(useTurbopack ? ["--turbopack"] : []),
  "--hostname",
  host,
  "--port",
  port,
];

const child = spawn("npx", args, {
  cwd: root,
  stdio: "inherit",
  env: { ...process.env, FORCE_COLOR: "1" },
});

child.on("exit", (code) => process.exit(code ?? 0));
