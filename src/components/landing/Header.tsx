"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { SmartImage } from "@/components/ui/SmartImage";
import {
  ArrowRightIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  YouTubeIcon,
} from "@/components/ui/icons";
import { isAboutUsPath } from "@/lib/about-routes";
import { ABOUT_SUBMENU } from "@/lib/about-submenu";
import { isAcademicsPath } from "@/lib/academics-routes";
import { ACADEMICS_SUBMENU } from "@/lib/academics-submenu";
import { isAdmissionsPath } from "@/lib/admissions-routes";
import { ADMISSIONS_SUBMENU } from "@/lib/admissions-submenu";
import { isResearchPath } from "@/lib/research-routes";
import { RESEARCH_SUBMENU } from "@/lib/research-submenu";
import { isInfoCornerPath } from "@/lib/info-corner-routes";
import { INFO_CORNER_SUBMENU } from "@/lib/info-corner-submenu";
import { isStudentLifePath } from "@/lib/student-life-routes";
import { STUDENT_LIFE_SUBMENU } from "@/lib/student-life-submenu";
import { isAdministrationPath } from "@/lib/administration-routes";
import { ADMINISTRATION_SUBMENU } from "@/lib/administration-submenu";
import { debugPerf, logDebug } from "@/lib/debug-perf";
import { images } from "@/lib/images";
import { SITE_LINKS } from "@/lib/site-links";

type NavChild = {
  label: string;
  href: string;
};

type NavItem = {
  label: string;
  href: string;
  dropdown?: boolean;
  children?: NavChild[];
};

/** About Us dropdown — submenu links from ABOUT_SUBMENU */
const aboutSubmenu: NavChild[] = ABOUT_SUBMENU.map(({ label, href }) => ({
  label,
  href,
}));

const administrationSubmenu: NavChild[] = ADMINISTRATION_SUBMENU.map(
  ({ label, href }) => ({
    label,
    href,
  }),
);

const academicsSubmenu: NavChild[] = ACADEMICS_SUBMENU.map(({ label, href }) => ({
  label,
  href,
}));

const admissionsSubmenu: NavChild[] = ADMISSIONS_SUBMENU.map(({ label, href }) => ({
  label,
  href,
}));

const researchSubmenu: NavChild[] = RESEARCH_SUBMENU.map(({ label, href }) => ({
  label,
  href,
}));

const studentLifeSubmenu: NavChild[] = STUDENT_LIFE_SUBMENU.map(({ label, href }) => ({
  label,
  href,
}));

const infoCornerSubmenu: NavChild[] = INFO_CORNER_SUBMENU.map(({ label, href }) => ({
  label,
  href,
}));

const navItems: NavItem[] = [
  { label: "Home", href: SITE_LINKS.home },
  {
    label: "About Us",
    href: SITE_LINKS.aboutBihe,
    dropdown: true,
    children: aboutSubmenu,
  },
  {
    label: "Administration",
    href: "/principal",
    dropdown: true,
    children: administrationSubmenu,
  },
  {
    label: "Academics",
    href: SITE_LINKS.academicsBca,
    dropdown: true,
    children: academicsSubmenu,
  },
  {
    label: "Admissions",
    href: SITE_LINKS.admissionsAdmissionProcess,
    dropdown: true,
    children: admissionsSubmenu,
  },
  {
    label: "Research",
    href: SITE_LINKS.researchIncubationCentre,
    dropdown: true,
    children: researchSubmenu,
  },
  {
    label: "Student Life",
    href: SITE_LINKS.studentLifeSportsFacilities,
    dropdown: true,
    children: studentLifeSubmenu,
  },
  {
    label: "Info - Corner",
    href: SITE_LINKS.infoCornerRtiDetails,
    dropdown: true,
    children: infoCornerSubmenu,
  },
  { label: "Contact Us", href: SITE_LINKS.contact },
];

function IconChevron() {
  return (
    <svg className="bihe-site-header__chevron" width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
      <path d="M2 3L5 6L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function SocialIcon({
  children,
  label,
  href = SITE_LINKS.external.website,
}: {
  children: ReactNode;
  label: string;
  href?: string;
}) {
  return (
    <a
      href={href}
      className="bihe-site-header__social-btn"
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}

function isNavItemActive(pathname: string, item: NavItem): boolean {
  if (item.label === "Home") return pathname === "/";
  if (item.label === "About Us") return isAboutUsPath(pathname);
  if (item.label === "Administration") return isAdministrationPath(pathname);
  if (item.label === "Academics") return isAcademicsPath(pathname);
  if (item.label === "Admissions") return isAdmissionsPath(pathname);
  if (item.label === "Research") return isResearchPath(pathname);
  if (item.label === "Student Life") return isStudentLifePath(pathname);
  if (item.label === "Info - Corner") return isInfoCornerPath(pathname);

  if (item.href.includes("#")) {
    // Section anchors (/#courses, /#contact, …) — highlight via scroll/hash later if needed
    return false;
  }

  const path = item.href;
  return pathname === path || (path !== "/" && pathname.startsWith(`${path}/`));
}

export function Header() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const syncHeaderHeight = () => {
      document.documentElement.style.setProperty(
        "--site-header-height",
        `${el.offsetHeight}px`,
      );
    };

    syncHeaderHeight();
    const ro = new ResizeObserver(syncHeaderHeight);
    ro.observe(el);
    window.addEventListener("resize", syncHeaderHeight);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", syncHeaderHeight);
    };
  }, []);

  useEffect(() => {
    let rafId = 0;

    const readScroll = () => window.__lenis?.scroll ?? window.scrollY;

    const SCROLL_COMPACT_AT = 20;
    const SCROLL_EXPAND_AT = 6;

    const update = (scroll: number) => {
      setScrolled((compact) => {
        if (!compact && scroll > SCROLL_COMPACT_AT) return true;
        if (compact && scroll < SCROLL_EXPAND_AT) return false;
        return compact;
      });
    };

    const onScroll = () => {
      debugPerf.headerScroll.window += 1;
      const now = Date.now();
      if (now - debugPerf.lastLenisScrollAt < 16) {
        debugPerf.headerScroll.duplicateBurst += 1;
      }
      debugPerf.lastWindowScrollAt = now;
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        update(readScroll());
      });
    };

    const onLenisScroll = (e: { scroll: number }) => {
      debugPerf.headerScroll.lenis += 1;
      const now = Date.now();
      if (now - debugPerf.lastWindowScrollAt < 16) {
        debugPerf.headerScroll.duplicateBurst += 1;
      }
      debugPerf.lastLenisScrollAt = now;
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        update(e.scroll);
      });
    };

    const bindLenis = () => {
      const lenis = window.__lenis;
      if (!lenis) return;
      window.removeEventListener("scroll", onScroll);
      update(lenis.scroll);
      lenis.on("scroll", onLenisScroll);
    };

    const unbindLenis = () => {
      window.__lenis?.off("scroll", onLenisScroll);
      window.addEventListener("scroll", onScroll, { passive: true });
    };

    onScroll();
    window.addEventListener("lenis:ready", bindLenis);
    if (window.__lenis) {
      bindLenis();
    } else {
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    const reportTimer = window.setTimeout(() => {
      logDebug("H2", "Header.tsx:scrollEffect", "scroll listener activity sample", {
        windowEvents: debugPerf.headerScroll.window,
        lenisEvents: debugPerf.headerScroll.lenis,
        duplicateBurst: debugPerf.headerScroll.duplicateBurst,
        usesLenis: Boolean(window.__lenis),
      });
    }, 3500);

    return () => {
      window.clearTimeout(reportTimer);
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("lenis:ready", bindLenis);
      unbindLenis();
    };
  }, []);

  useEffect(() => {
    const lenis = window.__lenis;
    if (menuOpen) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      lenis?.start();
      setOpenDropdown(null);
    }
    return () => {
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [menuOpen]);

  useEffect(() => {
    const header = headerRef.current;
    if (!openDropdown || !header) return;

    const syncSubmenuPosition = () => {
      const item = header.querySelector<HTMLElement>(
        `[data-nav-dropdown="${openDropdown}"]`,
      );
      const submenu = item?.querySelector<HTMLElement>(".bihe-site-header__submenu");
      if (!item || !submenu) return;

      const rect = item.getBoundingClientRect();
      submenu.style.setProperty("--submenu-top", `${rect.bottom + 4}px`);
      submenu.style.setProperty("--submenu-left", `${rect.left}px`);
    };

    syncSubmenuPosition();
    const ro = new ResizeObserver(syncSubmenuPosition);
    ro.observe(header);
    window.addEventListener("resize", syncSubmenuPosition);

    const closeOnOutsideClick = (event: globalThis.MouseEvent) => {
      const target = event.target as Element;
      if (target.closest(`[data-nav-dropdown="${openDropdown}"]`)) {
        return;
      }
      setOpenDropdown(null);
    };

    document.addEventListener("mousedown", closeOnOutsideClick);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", syncSubmenuPosition);
      document.removeEventListener("mousedown", closeOnOutsideClick);
      header
        .querySelectorAll<HTMLElement>(".bihe-site-header__submenu")
        .forEach((submenu) => {
          submenu.style.removeProperty("--submenu-top");
          submenu.style.removeProperty("--submenu-left");
        });
    };
  }, [openDropdown]);

  const toggleDropdown = (label: string) => {
    setOpenDropdown((current) => (current === label ? null : label));
  };

  const handleDropdownTrigger = (
    event: MouseEvent,
    item: NavItem,
    hasSubmenu: boolean,
  ) => {
    if (!hasSubmenu) return;
    event.preventDefault();
    event.stopPropagation();
    toggleDropdown(item.label);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setOpenDropdown(null);
  };

  return (
    <header
      ref={headerRef}
      className={`bihe-site-header${scrolled ? " bihe-site-header--scrolled" : ""}`}
    >
      <div className="bihe-site-header__topbar">
        <div className="bihe-site-header__container bihe-site-header__topbar-inner">
          <div className="bihe-site-header__follow">
            <span>Follow Us :</span>
            <SocialIcon label="Facebook">
              <FacebookIcon className="bihe-site-header__social-icon" size={15} />
            </SocialIcon>
            <SocialIcon label="LinkedIn">
              <LinkedInIcon className="bihe-site-header__social-icon" size={15} />
            </SocialIcon>
            <SocialIcon label="YouTube">
              <YouTubeIcon className="bihe-site-header__social-icon" size={15} />
            </SocialIcon>
            <SocialIcon label="Instagram">
              <InstagramIcon className="bihe-site-header__social-icon" size={15} />
            </SocialIcon>
          </div>
          <div className="bihe-site-header__topbar-actions">
            <Link href={SITE_LINKS.gallery} className="bihe-site-header__topbar-link">
              Gallery
            </Link>
            <Link href={SITE_LINKS.aboutBihe} className="bihe-site-header__topbar-link">
              Alumni
            </Link>
            <Link href={SITE_LINKS.apply} className="bihe-site-header__apply-top">
              Apply Now
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </div>

      <div className="bihe-site-header__navbar">
        <div className="bihe-site-header__container bihe-site-header__navbar-inner">
          <Link href="/" className="bihe-site-header__brand" onClick={closeMenu}>
            <SmartImage
              src={images.logo}
              alt="BIHE"
              width={80}
              height={57}
              className="bihe-site-header__logo"
              priority
            />
            <span className="bihe-site-header__brand-text">
              <span className="bihe-site-header__brand-kn" lang="kn">
                ಬಾಪೂಜಿ ಇನ್ಸ್ಟಿಟ್ಯೂಟ್ ಆಫ್ ಹೈಟೆಕ್ ಎಜುಕೇಶನ್
              </span>
              <span className="bihe-site-header__brand-en" lang="en">
                Bapuji Institute of High-Tech Education
              </span>
            </span>
          </Link>

          <nav
            className={`bihe-site-header__nav${menuOpen ? " is-open" : ""}`}
            aria-label="Main navigation"
          >
            <ul className="bihe-site-header__nav-list">
              {navItems.map((item) => {
                const hasSubmenu = Boolean(item.children?.length);
                const isDropdownOpen = openDropdown === item.label;
                const isActive = isNavItemActive(pathname, item);

                return (
                  <li
                    key={item.label}
                    data-nav-dropdown={hasSubmenu ? item.label : undefined}
                    className={`bihe-site-header__nav-item${hasSubmenu ? " bihe-site-header__nav-item--dropdown" : ""}${isDropdownOpen ? " is-open" : ""}`}
                  >
                    {hasSubmenu ? (
                      <div
                        className={`bihe-site-header__nav-link-group${isActive ? " is-active" : ""}`}
                      >
                        <Link
                          href={item.href}
                          className="bihe-site-header__nav-link"
                          aria-expanded={isDropdownOpen}
                          onClick={(e) => handleDropdownTrigger(e, item, hasSubmenu)}
                        >
                          {item.label}
                        </Link>
                        <button
                          type="button"
                          className={`bihe-site-header__chevron-btn${isDropdownOpen ? " is-open" : ""}`}
                          aria-expanded={isDropdownOpen}
                          aria-label={`${isDropdownOpen ? "Close" : "Open"} ${item.label} submenu`}
                          onClick={(e) => handleDropdownTrigger(e, item, hasSubmenu)}
                        >
                          <IconChevron />
                        </button>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className={`bihe-site-header__nav-link${isActive ? " is-active" : ""}`}
                        onClick={closeMenu}
                      >
                        {item.label}
                        {item.dropdown ? <IconChevron /> : null}
                      </Link>
                    )}

                    {hasSubmenu ? (
                      <ul
                        className={`bihe-site-header__submenu${
                          isDropdownOpen ? " bihe-site-header__submenu--open" : ""
                        }${
                          item.children!.length >= 10
                            ? " bihe-site-header__submenu--columns"
                            : ""
                        }`}
                        role="menu"
                      >
                        {item.children!.map((child) => (
                          <li key={child.label} role="none">
                            <Link
                              href={child.href}
                              className="bihe-site-header__submenu-link"
                              role="menuitem"
                              onClick={() => {
                                setOpenDropdown(null);
                                closeMenu();
                              }}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </nav>

          <button
            type="button"
            className={`bihe-site-header__menu-btn${menuOpen ? " is-active" : ""}`}
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
