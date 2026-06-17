import "server-only";

import {
  RDC_PROJECTS,
  type RdcImageTone,
  type RdcProject,
  type RdcProjectImage,
} from "@/lib/research-development-cell-content";
import { getSitePageByPath } from "@/lib/pages-service";

type ApiRdcProjectImage = {
  src?: string;
  path?: string;
  alt?: string;
  tone?: RdcImageTone;
};

type ApiRdcProject = {
  id?: string;
  title?: string;
  category?: string;
  aim?: string;
  conclusion?: string;
  images?: ApiRdcProjectImage[];
};

export async function getRdcProjects(): Promise<readonly RdcProject[]> {
  const apiPage = await getSitePageByPath("/research/research-and-development-cell");
  const apiProjects = apiPage?.content?.projects;

  if (!Array.isArray(apiProjects) || apiProjects.length === 0) {
    return RDC_PROJECTS;
  }

  const overrides = new Map<string, ApiRdcProject>();

  for (const project of apiProjects) {
    if (project && typeof project === "object" && typeof project.id === "string") {
      overrides.set(project.id, project as ApiRdcProject);
    }
  }

  if (overrides.size === 0) {
    return RDC_PROJECTS;
  }

  return RDC_PROJECTS.map((project) => mergeRdcProjectOverride(project, overrides.get(project.id)));
}

function mergeRdcProjectOverride(
  project: RdcProject,
  override: ApiRdcProject | undefined,
): RdcProject {
  if (!override) {
    return project;
  }

  return {
    ...project,
    title:
      typeof override.title === "string" && override.title.trim() !== ""
        ? override.title
        : project.title,
    category:
      typeof override.category === "string" && override.category.trim() !== ""
        ? override.category
        : project.category,
    aim:
      typeof override.aim === "string" && override.aim.trim() !== ""
        ? override.aim
        : project.aim,
    conclusion:
      typeof override.conclusion === "string" && override.conclusion.trim() !== ""
        ? override.conclusion
        : project.conclusion,
    images: mergeRdcProjectImages(project.images, override.images),
  };
}

function mergeRdcProjectImages(
  defaults: readonly [RdcProjectImage, RdcProjectImage],
  apiImages?: ApiRdcProjectImage[] | null,
): [RdcProjectImage, RdcProjectImage] {
  if (!Array.isArray(apiImages) || apiImages.length === 0) {
    return [defaults[0], defaults[1]];
  }

  const mergeImage = (index: 0 | 1): RdcProjectImage => {
    const fallback = defaults[index];
    const apiImage = apiImages[index];

    if (!apiImage || typeof apiImage !== "object") {
      return fallback;
    }

    const src =
      typeof apiImage.src === "string" && apiImage.src.trim() !== ""
        ? apiImage.src
        : fallback.src;

    return {
      src,
      alt:
        typeof apiImage.alt === "string" && apiImage.alt.trim() !== ""
          ? apiImage.alt
          : fallback.alt,
      tone: isRdcImageTone(apiImage.tone) ? apiImage.tone : fallback.tone,
    };
  };

  return [mergeImage(0), mergeImage(1)];
}

function isRdcImageTone(value: unknown): value is RdcImageTone {
  return value === "navy" || value === "aqua" || value === "lavender" || value === "green";
}

export async function getAllRdcProjectSlugs(): Promise<string[]> {
  const projects = await getRdcProjects();
  return projects.map((project) => project.id);
}

export async function getRdcProjectBySlug(slug: string): Promise<RdcProject | null> {
  const projects = await getRdcProjects();
  return projects.find((project) => project.id === slug) ?? null;
}
