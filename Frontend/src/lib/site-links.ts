/** Canonical routes and home-page section anchors (work from any page). */
export const SITE_LINKS = {
  home: "/",
  aboutBihe: "/about-bihe",
  memorandum: "/memorandum-of-association",
  idp: "/institutional-development-plan",
  constituentUnits: "/constituent-units",
  recognition: "/recognition",
  annualReports: "/annual-reports",
  auditReport: "/audit-report",
  principal: "/principal",
  financeSection: "/finance-section",
  controllerOfExamination: "/controller-of-examination",
  ombudsperson: "/ombudsperson",
  governingBodies: "/governing-bodies",
  internalComplaintCommittee: "/internal-complaint-committee",
  bcaAdministration: "/bca",
  bComAdministration: "/b-com",
  academicsBca: "/academics/bca",
  academicsBCom: "/academics/b-com",
  academicCalendar: "/academics/academic-calendar",
  academicsAndExamination: "/academics/academics-and-examination",
  facultyAndStaff: "/academics/faculty-and-staff",
  academicsBComFaculty: "/academics/b-com-faculty",
  academicsBcaFaculty: "/academics/bca-faculty",
  academicsNonTeachingStaff: "/academics/non-teaching-staff",
  iqac: "/academics/iqac",
  academicsLibrary: "/academics/library",
  admissionsAdmissionProcess: "/admissions/admission-process",
  admissionsFeeRefundPolicy: "/admissions/fee-refund-policy",
  admissionsOnlineAdmissionFormat: "/admissions/online-admission-format",
  researchIncubationCentre: "/research/incubation-centre",
  researchCentralFacilities: "/research/central-research-facilities",
  researchDevelopmentCell: "/research/research-and-development-cell",
  researchDevelopmentCellProject: (slug: string) =>
    `/research/research-and-development-cell/${slug}`,
  researchAcademicProjects: "/research/academic-projects",
  studentLifeSportsFacilities: "/student-life/sports-facilities",
  studentLifeSportsFacilitiesEvents: "/student-life/sports-facilities/events",
  studentLifeNssDetails: "/student-life/nss-details",
  studentLifeHostelFacilities: "/student-life/hostel-facilities",
  studentLifePlacementCell: "/student-life/placement-cell-and-activities",
  studentLifeMegaPlacementDrive2025:
    "/student-life/placement-cell-and-activities/mega-placement-drive-2025",
  studentLifeGrievanceRedressal: "/student-life/student-grievance-redressal-committee",
  studentLifeHealthFacilities: "/student-life/health-facilities",
  studentLifeAntiRaggingCell: "/student-life/anti-ragging-cell",
  studentLifeEqualOpportunityCell: "/student-life/equal-opportunity-cell",
  studentLifeSocioEconomicallyDisadvantaged:
    "/student-life/socio-economically-disadvantaged-groups",
  studentLifeDifferentlyAbledFacilities:
    "/student-life/facilities-for-differently-abled-students",
  studentLifeComputerLab: "/student-life/computer-lab",
  studentLifeAuditorium: "/student-life/auditorium",
  studentLifeCanteen: "/student-life/canteen",
  studentLifeYouthRedCross: "/student-life/youth-red-cross",
  courses: "/#courses",
  facilities: "/#facilities",
  accreditation: "/#accreditation",
  announcement: "/info-corner/announcements",
  infoCornerRtiDetails: "/info-corner/rti-details",
  infoCornerAnnouncements: "/info-corner/announcements",
  infoCornerNewsletters: "/info-corner/newsletters",
  infoCornerNewsEventsAchievements: "/info-corner/news-events-achievements",
  infoCornerInternationalStudentsAdmission: "/info-corner/international-students-admission",
  infoCornerCircularsAndNotices: "/info-corner/circulars-and-notices",
  infoCornerCircularNotice: (id: string) => `/info-corner/circulars-and-notices/${id}`,
  infoCornerJobOpenings: "/info-corner/job-openings",
  events: "/news",
  news: "/news",
  newsDetail: (slug: string) => `/news/${slug}`,
  gallery: "/gallery",
  galleryAlbum: (slug: string) => `/gallery/${slug}`,
  galleryPhoto: (slug: string) => `/gallery/${slug}`,
  gallerySection: "/#gallery",
  contact: "/contact",
  alumni: "/alumni",
  alumniHome: "/alumni/home",
  alumniAbout: "/alumni/about",
  alumniGallery: "/alumni/gallery",
  alumniGalleryPhoto: (imageId: string) => `/alumni/gallery/${imageId}`,
  alumniEvents: "/alumni/events",
  alumniRegister: "/alumni/register",
  contactSection: "/#contact",
  apply: "/contact",
  external: {
    website: "https://bihedvg.org/",
    email: "mailto:principal@bihedvg.org",
    phone: "tel:08192221625",
  },
} as const;

/** Static homepage/API fallback slugs — no detail page exists. */
export function isPlaceholderNewsSlug(slug: string | undefined | null): boolean {
  return !slug || slug.startsWith("fallback-");
}

export function newsItemHref(slug: string | undefined | null): string {
  return isPlaceholderNewsSlug(slug) ? SITE_LINKS.news : SITE_LINKS.newsDetail(slug!);
}

/** Gallery mosaic items may use legacy numeric ids when the API is unavailable. */
export function isPlaceholderGallerySlug(slug: string | undefined | null): boolean {
  return !slug || slug.startsWith("fallback-") || /^\d+$/.test(slug);
}

export function galleryAlbumHref(slug: string | undefined | null): string {
  return isPlaceholderGallerySlug(slug) ? SITE_LINKS.gallery : SITE_LINKS.galleryAlbum(slug!);
}
