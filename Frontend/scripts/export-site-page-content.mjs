/**
 * Exports editable page copy from Next.js static content into
 * Backend/database/data/site-page-content.json for the CMS.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = (relativePath) => pathToFileURL(join(root, relativePath)).href;

function pickStandardFields(config) {
  return {
    title: config.title,
    lead: config.lead,
    currentPage: config.currentPage,
    introBadge: config.introBadge,
    introTitle: config.introTitle,
    paragraphs: [...(config.paragraphs ?? [])],
  };
}

function richParagraphs(config) {
  if (Array.isArray(config.intro?.paragraphs) && config.intro.paragraphs.length > 0) {
    return [...config.intro.paragraphs];
  }

  if (Array.isArray(config.showcase?.paragraphs) && config.showcase.paragraphs.length > 0) {
    return config.showcase.paragraphs
      .map((paragraph) =>
        typeof paragraph === "string" ? paragraph : paragraph?.text ?? "",
      )
      .filter((paragraph) => paragraph.trim() !== "");
  }

  if (Array.isArray(config.paragraphs) && config.paragraphs.length > 0) {
    return [...config.paragraphs];
  }

  return [];
}

function pickRichPageFields(config) {
  return {
    title: config.title,
    lead: config.lead,
    currentPage: config.currentPage,
    introBadge: config.intro?.kicker ?? config.showcase?.badge ?? "Student Life",
    introTitle: config.intro?.title ?? config.showcase?.title?.lead ?? config.title,
    paragraphs: richParagraphs(config),
  };
}

async function main() {
  const [
    studentLife,
    studentLifePages,
    academicsPages,
    researchContent,
    infoCornerContent,
    rdcContent,
  ] = await Promise.all([
    import(src("src/lib/student-life-content.ts")),
    import(src("src/lib/student-life-pages/index.ts")),
    import(src("src/lib/academics-pages.ts")),
    import(src("src/lib/research-content.ts")),
    import(src("src/lib/info-corner-content.ts")),
    import(src("src/lib/research-development-cell-content.ts")),
  ]);

  const output = {};

  for (const slug of studentLife.STUDENT_LIFE_PAGE_SLUGS) {
    const rich = studentLifePages.getStudentLifeRichPage(slug);
    const simple = studentLife.getStudentLifePage(slug);
    const config = rich ?? simple;

    if (config) {
      output[`/student-life/${slug}`] = rich
        ? pickRichPageFields(rich)
        : pickStandardFields(simple);
    }
  }

  for (const slug of academicsPages.ACADEMICS_PAGE_SLUGS) {
    const config = academicsPages.getAcademicsPage(slug);
    if (config) {
      output[`/academics/${slug}`] = pickStandardFields(config);
    }
  }

  for (const slug of researchContent.RESEARCH_PAGE_SLUGS) {
    const config = researchContent.getResearchPage(slug);
    if (config) {
      output[`/research/${slug}`] = pickStandardFields(config);
    }
  }

  for (const slug of infoCornerContent.INFO_CORNER_PAGE_SLUGS) {
    const config = infoCornerContent.getInfoCornerPage(slug);
    if (config) {
      output[`/info-corner/${slug}`] = pickStandardFields(config);
    }
  }

  const rdcPath = "/research/research-and-development-cell";
  if (output[rdcPath]) {
    output[rdcPath].projects = rdcContent.RDC_PROJECTS.map((project) => ({
      id: project.id,
      aim: project.aim,
      conclusion: project.conclusion,
    }));
  }

  const dataDir = join(root, "..", "Backend/database/data");
  mkdirSync(dataDir, { recursive: true });
  const target = join(dataDir, "site-page-content.json");
  writeFileSync(target, `${JSON.stringify(output, null, 2)}\n`, "utf8");
  console.log(`Exported ${Object.keys(output).length} pages to ${target}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
