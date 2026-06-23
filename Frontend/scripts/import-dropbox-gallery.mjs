#!/usr/bin/env node
/**
 * Import gallery images from shared Dropbox folders into public/images/gallery/{slug}/.
 * Run: node scripts/import-dropbox-gallery.mjs
 */

import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const WORK = path.join(ROOT, "tmp", "dropbox-gallery");
const OUT = path.join(ROOT, "public", "images", "gallery");
const LIMIT = 15;

const DROPBOX = {
  cultura: "https://www.dropbox.com/scl/fo/xaytdbuzz9vokw6urahsj/AOOrF0lCPDPwE9TpifIXTQ4?rlkey=qw1acmmpxdodnc7k9flvap2yw&dl=1",
  canteen: "https://www.dropbox.com/scl/fo/r5k77hbnn04io521f8mcn/AJDGy07SIw3x6K1ahvQhogo?rlkey=5wr7mmqn2xcqs1bd7uewtu9f6&dl=1",
  campusLife: "https://www.dropbox.com/scl/fo/t1kx8xnqubzvkjf6ghzsm/ADEOWq5hcyPP4ZTqgMwwjUE?rlkey=awf8nferuwxa6865mbgf3e6s6&dl=1",
  college: "https://www.dropbox.com/scl/fo/8hahdr5gdqpwau11od0n2/ABjKxJ_K7xBJ0h-ZXcLTiUo?rlkey=ronwgfu0jkfdrwzoq416hxxio&dl=1",
  sports: "https://www.dropbox.com/scl/fo/by6g39gw7t56nwdvp6puu/AGER6tt4EcVpYXrXgxOrc8w?rlkey=5mpq67esam0nvf7c6tu8gqkg1&dl=1",
  basketball: "https://www.dropbox.com/scl/fo/thmibpaujaopt0rbhp9f9/AJIYFQH98o-0Akim2R55vZE?rlkey=o9m5akc9dvhgi7tji9mwytbcl&dl=1",
};

const IMAGE_RE = /\.(jpe?g|png|webp)$/i;

function run(cmd) {
  execSync(cmd, { stdio: "inherit" });
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function download(name, url) {
  const zipPath = path.join(WORK, `${name}.zip`);
  if (!fs.existsSync(zipPath) || fs.statSync(zipPath).size < 1024) {
    ensureDir(WORK);
    console.log(`Downloading ${name}...`);
    run(`curl -sL "${url}" -o "${zipPath}"`);
  }
  return zipPath;
}

function listZipImages(zipPath) {
  const output = execSync(`unzip -Z1 "${zipPath}"`, { encoding: "utf8" });
  return output
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && IMAGE_RE.test(line) && !line.startsWith("__MACOSX"));
}

function extractOne(zipPath, entry, destPath) {
  ensureDir(path.dirname(destPath));
  execSync(`unzip -p "${zipPath}" "${entry}" > "${destPath}"`);
}

function optimizeImage(srcPath, destPath) {
  ensureDir(path.dirname(destPath));
  try {
    run(`sips -Z 1920 -s format jpeg "${srcPath}" --out "${destPath}" >/dev/null`);
  } catch {
    fs.copyFileSync(srcPath, destPath);
  }
}

function writeAlbum(slug, sources) {
  const albumDir = path.join(OUT, slug);
  if (fs.existsSync(albumDir)) {
    for (const file of fs.readdirSync(albumDir)) {
      fs.unlinkSync(path.join(albumDir, file));
    }
  } else {
    ensureDir(albumDir);
  }

  const picked = sources.slice(0, LIMIT);
  const tempDir = path.join(WORK, "extract", slug);
  ensureDir(tempDir);

  picked.forEach(({ zipPath, entry }, index) => {
    const raw = path.join(tempDir, `raw-${index}${path.extname(entry).toLowerCase() || ".jpg"}`);
    const outFile = path.join(albumDir, `${String(index + 1).padStart(2, "0")}.jpg`);
    extractOne(zipPath, entry, raw);
    optimizeImage(raw, outFile);
  });

  console.log(`  ${slug}: ${picked.length} images`);
}

function main() {
  const culturaZip = download("cultura", DROPBOX.cultura);
  const canteenZip = download("canteen", DROPBOX.canteen);
  const campusLifeZip = download("campus-life", DROPBOX.campusLife);
  const collegeZip = download("college", DROPBOX.college);
  const sportsZip = download("sports", DROPBOX.sports);
  const basketballZip = download("basketball", DROPBOX.basketball);

  const culturaImages = listZipImages(culturaZip).map((entry) => ({ zipPath: culturaZip, entry }));
  const canteenImages = listZipImages(canteenZip).map((entry) => ({ zipPath: canteenZip, entry }));
  const campusLifeImages = listZipImages(campusLifeZip).map((entry) => ({ zipPath: campusLifeZip, entry }));
  const sportsImages = listZipImages(sportsZip).map((entry) => ({ zipPath: sportsZip, entry }));
  const basketballImages = listZipImages(basketballZip).map((entry) => ({ zipPath: basketballZip, entry }));

  const collegeAll = listZipImages(collegeZip);
  const collegeFacilities = collegeAll
    .filter((entry) => /^(Library\.jpg|hostels\/)/i.test(entry))
    .map((entry) => ({ zipPath: collegeZip, entry }));
  const collegeCampus = collegeAll
    .filter((entry) => !/^sports\//i.test(entry) && !/^(Library\.jpg|hostels\/)/i.test(entry))
    .map((entry) => ({ zipPath: collegeZip, entry }));

  console.log("Writing gallery albums...");
  writeAlbum("annual-events-celebrations", culturaImages);
  writeAlbum("campus-facilities", [...canteenImages, ...collegeFacilities]);
  writeAlbum("campus-life-moments", [...campusLifeImages, ...collegeCampus]);
  writeAlbum("inter-college-sports-meet", sportsImages);
  writeAlbum("basketball-championship", basketballImages);
  console.log("Done.");
}

main();
