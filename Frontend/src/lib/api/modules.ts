/**
 * Next.js API module registry — mirrors `Backend/config/modules.php`.
 *
 * Use `getEnabledModules()` for dynamic fetch paths; future modules stay
 * `enabled: false` until wired. Do not fetch disabled modules in production pages.
 *
 * @see docs/FUTURE-PHASES.md
 */

export type ApiModuleGroup = "content" | "admin" | "portal";

export type ApiModuleDefinition = {
  /** Internal slug; matches Laravel module key */
  key: string;
  enabled: boolean;
  label: string;
  group: ApiModuleGroup;
  /** Permission prefix (Laravel); for documentation and future client-side guards */
  permissionPrefix: string;
  /** Primary public read API path (no trailing slash) */
  apiPrefix: string | null;
  /** Suggested Next.js service module path */
  serviceFile: string | null;
  /** Phase 1 static routes this module may extend (not replace) */
  extendsStaticRoutes?: readonly string[];
};

/** Phase 1 — live modules */
const PHASE1_MODULES: readonly ApiModuleDefinition[] = [
  {
    key: "announcements",
    enabled: true,
    label: "Announcements",
    group: "content",
    permissionPrefix: "content.announcements",
    apiPrefix: "/api/v1/announcements",
    serviceFile: "src/lib/api/homepage.ts",
  },
  {
    key: "programs",
    enabled: true,
    label: "Programs",
    group: "content",
    permissionPrefix: "content.programs",
    apiPrefix: "/api/v1/programs",
    serviceFile: null,
  },
  {
    key: "faculty",
    enabled: true,
    label: "Faculty",
    group: "content",
    permissionPrefix: "content.faculty",
    apiPrefix: "/api/v1/faculty",
    serviceFile: "src/lib/faculty-service.ts",
  },
  {
    key: "news-events",
    enabled: true,
    label: "News & Events",
    group: "content",
    permissionPrefix: "content.news",
    apiPrefix: "/api/v1/news",
    serviceFile: "src/lib/news-service.ts",
  },
  {
    key: "circular-notices",
    enabled: true,
    label: "Circular Notices",
    group: "content",
    permissionPrefix: "content.circular_notices",
    apiPrefix: "/api/v1/circular-notices",
    serviceFile: "src/lib/circular-notices-service.ts",
    extendsStaticRoutes: ["/info-corner/circulars-and-notices"],
  },
  {
    key: "documents",
    enabled: true,
    label: "Documents",
    group: "content",
    permissionPrefix: "content.documents",
    apiPrefix: "/api/v1/documents",
    serviceFile: null,
  },
  {
    key: "gallery",
    enabled: true,
    label: "Gallery",
    group: "content",
    permissionPrefix: "content.gallery",
    apiPrefix: "/api/v1/gallery",
    serviceFile: "src/lib/gallery-service.ts",
  },
  {
    key: "hero-banners",
    enabled: true,
    label: "Hero Banners",
    group: "content",
    permissionPrefix: "content.hero_banners",
    apiPrefix: "/api/v1/hero-banners",
    serviceFile: "src/lib/api/homepage.ts",
  },
  {
    key: "recruiting-partners",
    enabled: true,
    label: "Recruiting Partners",
    group: "content",
    permissionPrefix: "content.recruiting_partners",
    apiPrefix: "/api/v1/recruiting-partners",
    serviceFile: "src/lib/api/homepage.ts",
  },
  {
    key: "governing-bodies",
    enabled: true,
    label: "Governing Bodies",
    group: "content",
    permissionPrefix: "content.governing_bodies",
    apiPrefix: "/api/v1/governing-bodies",
    serviceFile: "src/lib/governing-bodies-service.ts",
    extendsStaticRoutes: ["/governing-bodies"],
  },
  {
    key: "navigation",
    enabled: true,
    label: "Navigation",
    group: "content",
    permissionPrefix: "content.navigation",
    apiPrefix: "/api/v1/navigation",
    serviceFile: "src/lib/navigation-service.ts",
  },
  {
    key: "site-pages",
    enabled: true,
    label: "Site Pages",
    group: "content",
    permissionPrefix: "content.site_pages",
    apiPrefix: "/api/v1/site-pages",
    serviceFile: "src/lib/pages-service.ts",
  },
  {
    key: "contact",
    enabled: true,
    label: "Contact Form",
    group: "content",
    permissionPrefix: "content.contact",
    apiPrefix: "/api/v1/contact",
    serviceFile: null,
  },
] as const;

/** Future Phase — stubs (enabled: false) */
const FUTURE_MODULES: readonly ApiModuleDefinition[] = [
  {
    key: "alumni",
    enabled: true,
    label: "Alumni",
    group: "content",
    permissionPrefix: "alumni",
    apiPrefix: "/api/v1/alumni-profiles",
    serviceFile: "src/lib/alumni-service.ts",
  },
  {
    key: "student-portal",
    enabled: false,
    label: "Student Portal",
    group: "portal",
    permissionPrefix: "student-portal",
    apiPrefix: "/api/v1/student",
    serviceFile: "src/lib/student-portal-service.ts",
  },
  {
    key: "admissions-online",
    enabled: false,
    label: "Online Admissions",
    group: "content",
    permissionPrefix: "admissions.online",
    apiPrefix: "/api/v1/admissions",
    serviceFile: "src/lib/admissions-online-service.ts",
    extendsStaticRoutes: [
      "/admissions/admission-process",
      "/admissions/online-admission-format",
    ],
  },
  {
    key: "placement",
    enabled: false,
    label: "Placement",
    group: "content",
    permissionPrefix: "placement",
    apiPrefix: "/api/v1/placement-drives",
    serviceFile: "src/lib/placement-drives-service.ts",
  },
  {
    key: "downloads",
    enabled: false,
    label: "Downloads",
    group: "content",
    permissionPrefix: "downloads",
    apiPrefix: "/api/v1/downloads",
    serviceFile: "src/lib/downloads-service.ts",
  },
] as const;

export const API_MODULES: readonly ApiModuleDefinition[] = [
  ...PHASE1_MODULES,
  ...FUTURE_MODULES,
];

export function getEnabledModules(): ApiModuleDefinition[] {
  return API_MODULES.filter((module) => module.enabled);
}

export function getModuleByKey(key: string): ApiModuleDefinition | undefined {
  return API_MODULES.find((module) => module.key === key);
}

export function getApiPath(moduleKey: string, suffix = ""): string | null {
  const apiModule = getModuleByKey(moduleKey);
  if (!apiModule?.enabled || !apiModule.apiPrefix) return null;
  return suffix ? `${apiModule.apiPrefix}${suffix}` : apiModule.apiPrefix;
}

/** Default API version for new fetchers */
export const DEFAULT_API_VERSION = "v1" as const;
