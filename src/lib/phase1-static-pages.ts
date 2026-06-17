/**
 * Phase 1 static pages — no Laravel CMS / API wiring.
 *
 * Content lives in components and `src/lib/*-content.ts`. Do not add admin CRUD
 * or `fetchApi*` calls for these routes without explicit approval.
 *
 * @see `.cursor/rules/frontend-preservation.mdc`
 * @see `docs/BIHE-Admin-Integration-Guide.md` — Phase 1 static pages
 */

export type Phase1StaticPageGroup = {
  category: string;
  description: string;
  routes: readonly string[];
  contentSources: readonly string[];
};

/** Canonical Phase 1 static page groups (public Next.js site). */
export const PHASE1_STATIC_PAGE_GROUPS: readonly Phase1StaticPageGroup[] = [
  {
    category: "About Us",
    description: "Institutional overview and governance documents under About Us nav.",
    routes: [
      "/about-bihe",
      "/memorandum-of-association",
      "/institutional-development-plan",
      "/constituent-units",
      "/recognition",
      "/annual-reports",
      "/audit-report",
    ],
    contentSources: [
      "src/lib/about-bihe-content.ts",
      "src/lib/memorandum-content.ts",
      "src/lib/idp-content.ts",
      "src/lib/constituent-units-content.ts",
      "src/lib/about-document-pages.ts",
    ],
  },
  {
    category: "Vision & Mission",
    description: "Strategic vision and mission statements (IDP page and related copy).",
    routes: ["/institutional-development-plan"],
    contentSources: ["src/lib/idp-content.ts"],
  },
  {
    category: "IQAC",
    description: "Internal Quality Assurance Cell page and quality-assurance copy.",
    routes: ["/academics/iqac"],
    contentSources: ["src/lib/iqac-content.ts"],
  },
  {
    category: "NAAC",
    description:
      "No dedicated NAAC route yet. Accreditation references stay static on homepage and IQAC.",
    routes: ["/#accreditation"],
    contentSources: [
      "src/components/landing/AccreditationSection.tsx",
      "src/lib/iqac-content.ts",
    ],
  },
  {
    category: "Principal Message",
    description: "Full principal page and homepage principal quote block.",
    routes: ["/principal"],
    contentSources: [
      "src/lib/principal-content.ts",
      "src/components/landing/PrincipalMessage.tsx",
    ],
  },
  {
    category: "Academic Calendar",
    description: "Semester schedules and academic date information.",
    routes: ["/academics/academic-calendar"],
    contentSources: ["src/lib/academic-calendar-content.ts"],
  },
  {
    category: "Committee Pages",
    description: "Administration governance and statutory committee pages.",
    routes: [
      "/internal-complaint-committee",
      "/ombudsperson",
      "/finance-section",
      "/controller-of-examination",
    ],
    contentSources: [
      "src/lib/internal-complaint-committee-content.ts",
      "src/lib/ombudsperson-content.ts",
      "src/lib/finance-section-content.ts",
      "src/lib/controller-of-examination-content.ts",
      "src/lib/administration-pages.ts",
    ],
  },
  {
    category: "Admission Information",
    description: "Admission process, policies, and application formats.",
    routes: [
      "/admissions/admission-process",
      "/admissions/fee-refund-policy",
      "/admissions/online-admission-format",
      "/info-corner/international-students-admission",
    ],
    contentSources: [
      "src/lib/admissions-content.ts",
      "src/lib/admission-process-content.ts",
      "src/lib/fee-refund-policy-content.ts",
      "src/lib/online-admission-format-content.ts",
      "src/lib/info-corner-pages/international-students-admission-content.ts",
    ],
  },
  {
    category: "Academic Information Pages",
    description:
      "Programme pages, examination info, library, and other academics submenu content (page copy and structure).",
    routes: [
      "/academics/b-com",
      "/academics/bca",
      "/academics/academics-and-examination",
      "/academics/library",
      "/bca",
      "/b-com",
    ],
    contentSources: [
      "src/lib/academics-pages.ts",
      "src/lib/bca-academics-content.ts",
      "src/lib/b-com-admin-content.ts",
      "src/lib/academics-examination-content.ts",
      "src/lib/library-content.ts",
      "src/lib/bca-leadership-content.ts",
      "src/lib/b-com-leadership-content.ts",
    ],
  },
] as const;

/** Flat list of Phase 1 static paths (for guards and documentation). */
export const PHASE1_STATIC_ROUTES: readonly string[] = PHASE1_STATIC_PAGE_GROUPS.flatMap(
  (group) => group.routes,
);

/**
 * Routes already wired to Laravel in Phase 1 (not in the static list above).
 * Faculty roster data on faculty pages is dynamic; page chrome stays static.
 */
export const PHASE1_DYNAMIC_ROUTES = [
  "/",
  "/news",
  "/news/*",
  "/gallery",
  "/gallery/*",
  "/academics/faculty-and-staff",
  "/academics/b-com-faculty",
  "/academics/bca-faculty",
  "/academics/non-teaching-staff",
  "/contact",
  "/governing-bodies",
] as const;

export function isPhase1StaticRoute(pathname: string): boolean {
  const normalized = pathname.replace(/\/$/, "") || "/";
  return PHASE1_STATIC_ROUTES.some(
    (route) => normalized === route || normalized.startsWith(`${route}/`),
  );
}
