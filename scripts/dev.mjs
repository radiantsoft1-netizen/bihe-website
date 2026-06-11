#!/usr/bin/env node
/**
 * Stable dev startup for local preview.
 *
 * Why the server used to "disconnect":
 * - `npm run build` writes production output into `.next`
 * - `next dev` also uses `.next` for development
 * - Running both at once corrupts dev manifests → browser shows 500 until restart
 *
 * Fixes in this repo:
 * - Production builds use `.next-build` (see next.config.ts + package.json)
 * - This script restarts only when the server is actually unhealthy
 * - Corrupted `.next` (prod files mixed in) is cleared automatically before restart
 */
import { spawn, execSync } from "node:child_process";
import { existsSync, rmSync, writeFileSync, unlinkSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const port = process.env.PORT ?? "3000";
const host = process.env.HOST ?? "127.0.0.1";
const url = `http://${host}:${port}/`;
const pidFile = join(root, ".next", "dev-server.pid");
const devCacheDir = join(root, ".next");

process.chdir(root);

function log(message) {
  console.log(`[dev] ${message}`);
}

async function isHealthy() {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);
    return response.ok;
  } catch {
    return false;
  }
}

function getPortPids() {
  try {
    const output = execSync(`lsof -ti:${port}`, { stdio: ["pipe", "pipe", "ignore"] })
      .toString()
      .trim();
    if (!output) return [];
    return output.split("\n").map((value) => Number(value)).filter(Boolean);
  } catch {
    return [];
  }
}

async function stopPortProcesses() {
  const pids = getPortPids();
  if (pids.length === 0) return;

  log(`Stopping process(es) on port ${port}: ${pids.join(", ")}`);
  for (const pid of pids) {
    try {
      process.kill(pid, "SIGTERM");
    } catch {
      /* already exited */
    }
  }

  const deadline = Date.now() + 2000;
  while (Date.now() < deadline && getPortPids().length > 0) {
    await new Promise((resolve) => setTimeout(resolve, 200));
  }

  for (const pid of getPortPids()) {
    try {
      process.kill(pid, "SIGKILL");
    } catch {
      /* already exited */
    }
  }
}

function healDevCacheIfNeeded() {
  const prodMarkers = [
    join(devCacheDir, "required-server-files.json"),
    join(devCacheDir, "prerender-manifest.json"),
    join(devCacheDir, "export-marker.json"),
  ];

  if (prodMarkers.some((marker) => existsSync(marker))) {
    log("Detected production build files inside .next — clearing dev cache...");
    rmSync(devCacheDir, { recursive: true, force: true });
  }
}

function writePidFile(pid) {
  try {
    writeFileSync(pidFile, String(pid), "utf8");
  } catch {
    /* non-fatal */
  }
}

function removePidFile() {
  try {
    if (existsSync(pidFile)) unlinkSync(pidFile);
  } catch {
    /* non-fatal */
  }
}

function readStoredPid() {
  try {
    if (!existsSync(pidFile)) return null;
    const value = Number(readFileSync(pidFile, "utf8").trim());
    return Number.isFinite(value) ? value : null;
  } catch {
    return null;
  }
}

async function main() {
  if (await isHealthy()) {
    log(`Already running at ${url}`);
    process.exit(0);
  }

  const portInUse = getPortPids().length > 0;
  if (portInUse) {
    log(`Dev server on port ${port} is unhealthy — restarting...`);
    await stopPortProcesses();
    await new Promise((resolve) => setTimeout(resolve, 400));
  }

  healDevCacheIfNeeded();

  const stalePid = readStoredPid();
  if (stalePid) {
    try {
      process.kill(stalePid, 0);
      log(`Stopping stale dev process ${stalePid}...`);
      process.kill(stalePid, "SIGTERM");
    } catch {
      /* not running */
    }
    removePidFile();
  }

  if (process.env.DEV_CLEAN === "1") {
    for (const dir of [".next", "node_modules/.cache"]) {
      const target = join(root, dir);
      if (existsSync(target)) {
        log(`Removing ${dir}...`);
        rmSync(target, { recursive: true, force: true });
      }
    }
  }

  log(`Starting Next.js at ${url}`);
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
    detached: false,
  });

  writePidFile(child.pid);

  const cleanup = () => {
    removePidFile();
  };

  child.on("exit", (code) => {
    cleanup();
    process.exit(code ?? 0);
  });

  process.on("SIGINT", () => {
    child.kill("SIGINT");
  });

  process.on("SIGTERM", () => {
    child.kill("SIGTERM");
  });
}

main();
