import { ABOUT_SUBMENU } from "@/lib/about-submenu";
import { ADMINISTRATION_SUBMENU } from "@/lib/administration-submenu";
import { ACADEMICS_SUBMENU } from "@/lib/academics-submenu";
import { ADMISSIONS_SUBMENU } from "@/lib/admissions-submenu";
import { RESEARCH_SUBMENU } from "@/lib/research-submenu";
import { STUDENT_LIFE_SUBMENU } from "@/lib/student-life-submenu";
import { INFO_CORNER_SUBMENU } from "@/lib/info-corner-submenu";
import { FOOTER_LINK_COLUMNS } from "@/lib/footer-content";
import { SITE_LINKS } from "@/lib/site-links";

export type HeaderNavChild = {
  label: string;
  href: string;
};

export type HeaderNavItem = {
  label: string;
  href: string;
  dropdown?: boolean;
  children?: HeaderNavChild[];
};

export type FooterNavLink = {
  label: string;
  href: string;
  openInNewTab?: boolean;
};

export type FooterNavColumn = {
  title: string;
  links: readonly FooterNavLink[];
};

export const STATIC_HEADER_NAV: HeaderNavItem[] = [
  { label: "Home", href: SITE_LINKS.home },
  {
    label: "About the Institution",
    href: SITE_LINKS.aboutBihe,
    dropdown: true,
    children: ABOUT_SUBMENU.map(({ label, href }) => ({ label, href })),
  },
  {
    label: "Administration",
    href: "/governing-bodies",
    dropdown: true,
    children: ADMINISTRATION_SUBMENU.map(({ label, href }) => ({ label, href })),
  },
  {
    label: "Academics",
    href: SITE_LINKS.academicsBca,
    dropdown: true,
    children: ACADEMICS_SUBMENU.map(({ label, href }) => ({ label, href })),
  },
  {
    label: "Admissions & Fee",
    href: SITE_LINKS.admissionsAdmissionProcess,
    dropdown: true,
    children: ADMISSIONS_SUBMENU.map(({ label, href }) => ({ label, href })),
  },
  {
    label: "Research",
    href: "/research/research-and-development-cell",
    dropdown: true,
    children: RESEARCH_SUBMENU.map(({ label, href }) => ({ label, href })),
  },
  {
    label: "Student Life",
    href: SITE_LINKS.studentLifeSportsFacilities,
    dropdown: true,
    children: STUDENT_LIFE_SUBMENU.map(({ label, href }) => ({ label, href })),
  },
  {
    label: "Info - Corner",
    href: SITE_LINKS.infoCornerRtiDetails,
    dropdown: true,
    children: INFO_CORNER_SUBMENU.map(({ label, href }) => ({ label, href })),
  },
  { label: "Contact Us", href: SITE_LINKS.contact },
];

export const STATIC_FOOTER_NAV: FooterNavColumn[] = FOOTER_LINK_COLUMNS.map((column) => ({
  title: column.title,
  links: column.links,
}));
