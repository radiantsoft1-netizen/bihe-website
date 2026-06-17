import { SITE_LINKS } from "@/lib/site-links";

export type AlumniSubmenuItem = {
  label: string;
  href: string;
};

export const ALUMNI_SUBMENU: AlumniSubmenuItem[] = [
  { label: "Alumni Home", href: SITE_LINKS.alumniHome },
  { label: "About Alumni Association", href: SITE_LINKS.alumniAbout },
  { label: "Alumni Gallery", href: SITE_LINKS.alumniGallery },
  { label: "Alumni Directory", href: SITE_LINKS.alumni },
];
