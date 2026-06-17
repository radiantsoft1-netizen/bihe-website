import { SITE_LINKS } from "@/lib/site-links";

export const FOOTER_INSTITUTE_NAME_KN =
  "ಬಾಪೂಜಿ ಇನ್ಸ್ಟಿಟ್ಯೂಟ್ ಆಫ್ ಹೈಟೆಕ್ ಎಜುಕೇಶನ್";

export const FOOTER_INSTITUTE_NAME_EN = "Bapuji Institute of High-Tech Education";

export const FOOTER_DESCRIPTION =
  "Bapuji Institute of Hi-Tech Education imparts advanced curriculum course on Bachelor of Computer Application (BCA) & Bachelor of Commerce (B.Com).";

export const FOOTER_GALLERY_LINKS = [
  { label: "Image Gallery", href: SITE_LINKS.gallery },
  { label: "Prospectus", href: SITE_LINKS.admissionsAdmissionProcess },
  { label: "Video Gallery", href: SITE_LINKS.gallerySection },
] as const;

export const FOOTER_ADMISSIONS_LINKS = [
  {
    label: "Admission Process & Guidelines",
    href: SITE_LINKS.admissionsAdmissionProcess,
  },
  { label: "Fee Refund Policy", href: SITE_LINKS.admissionsFeeRefundPolicy },
  { label: "Application", href: SITE_LINKS.admissionsOnlineAdmissionFormat },
] as const;

export const FOOTER_CONTACT = {
  phone: "08192-221625",
  phoneHref: SITE_LINKS.external.phone,
  email: "principal@bihedvg.org",
  emailHref: SITE_LINKS.external.email,
} as const;

export type FooterLinkColumn = {
  title: string;
  links: readonly { label: string; href: string }[];
};

export const FOOTER_LINK_COLUMNS: readonly FooterLinkColumn[] = [
  {
    title: "Admissions",
    links: FOOTER_ADMISSIONS_LINKS,
  },
  {
    title: "Gallery",
    links: FOOTER_GALLERY_LINKS,
  },
  {
    title: "Campus Life",
    links: [
      { label: "Sports", href: SITE_LINKS.studentLifeSportsFacilities },
      { label: "Hostel", href: SITE_LINKS.studentLifeHostelFacilities },
      { label: "Placement Cell", href: SITE_LINKS.studentLifePlacementCell },
      { label: "Anti-Ragging Cell", href: SITE_LINKS.studentLifeAntiRaggingCell },
      { label: "Computer Lab", href: SITE_LINKS.studentLifeComputerLab },
      { label: "Auditorium", href: SITE_LINKS.studentLifeAuditorium },
      { label: "Canteen", href: SITE_LINKS.studentLifeCanteen },
    ],
  },
  {
    title: "About the Institution",
    links: [
      { label: "About BEA", href: SITE_LINKS.governingBodies },
      { label: "About BIHE", href: SITE_LINKS.aboutBihe },
      { label: "Hon. Secretary", href: SITE_LINKS.governingBodies },
      { label: "Hon. Joint Secretary", href: SITE_LINKS.governingBodies },
      { label: "Chairman", href: SITE_LINKS.governingBodies },
      { label: "Principal", href: SITE_LINKS.principal },
    ],
  },
  {
    title: "Academics",
    links: [
      { label: "Programs Offered", href: SITE_LINKS.courses },
      { label: "Academic Calendar", href: SITE_LINKS.academicCalendar },
      { label: "B.Com Faculty", href: SITE_LINKS.academicsBComFaculty },
      { label: "BCA Faculty", href: SITE_LINKS.academicsBcaFaculty },
      { label: "Non - Teaching Staff", href: SITE_LINKS.academicsNonTeachingStaff },
      { label: "Library", href: SITE_LINKS.academicsLibrary },
      {
        label: "Internal Quality Assurance Cell (IQAC)",
        href: SITE_LINKS.iqac,
      },
    ],
  },
  {
    title: "Information Corner",
    links: [
      { label: "RTI Details", href: SITE_LINKS.infoCornerRtiDetails },
      {
        label: "Circulars & Notices",
        href: SITE_LINKS.infoCornerCircularsAndNotices,
      },
      { label: "Announcements", href: SITE_LINKS.infoCornerAnnouncements },
      { label: "Newsletters", href: SITE_LINKS.infoCornerNewsletters },
      {
        label: "News, Events & Achievements",
        href: SITE_LINKS.infoCornerNewsEventsAchievements,
      },
      { label: "Careers", href: SITE_LINKS.infoCornerJobOpenings },
    ],
  },
] as const;

export const FOOTER_COPYRIGHT = "Website Copyright @ BIHE";
