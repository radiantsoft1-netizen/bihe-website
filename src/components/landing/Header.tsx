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
import { isAcademicsPath } from "@/lib/academics-routes";
import { isAdmissionsPath } from "@/lib/admissions-routes";
import { isResearchPath } from "@/lib/research-routes";
import { isInfoCornerPath } from "@/lib/info-corner-routes";
import { isStudentLifePath } from "@/lib/student-life-routes";
import { isAdministrationPath } from "@/lib/administration-routes";
import { images } from "@/lib/images";
import { isAlumniPath } from "@/lib/alumni-routes";
import { ALUMNI_SUBMENU } from "@/lib/alumni-submenu";
import { SITE_LINKS } from "@/lib/site-links";
import { STATIC_HEADER_NAV, type HeaderNavItem } from "@/lib/static-navigation";

const ALUMNI_TOPBAR_ITEM = {
  label: "Alumni",
  href: SITE_LINKS.alumniHome,
  children: ALUMNI_SUBMENU,
} as const;

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

type HeaderProps = {
  navigation?: HeaderNavItem[];
  prospectus?: {
    label: string;
    href: string;
    openInNewTab?: boolean;
  } | null;
};

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

function submenuHrefPath(href: string): string {
  const hashIndex = href.indexOf("#");
  return hashIndex === -1 ? href : href.slice(0, hashIndex);
}

function pathMatchesSubmenuLink(pathname: string, href: string): boolean {
  const path = submenuHrefPath(href);
  if (!path) return false;
  if (path === "/") return pathname === "/";
  return pathname === path || pathname.startsWith(`${path}/`);
}

function isSubmenuLinkActive(
  pathname: string,
  href: string,
  siblings: NavChild[],
): boolean {
  const path = submenuHrefPath(href);
  if (!pathMatchesSubmenuLink(pathname, path)) return false;

  const bestMatch = siblings
    .map((child) => submenuHrefPath(child.href))
    .filter((candidate) => pathMatchesSubmenuLink(pathname, candidate))
    .sort((a, b) => b.length - a.length)[0];

  return bestMatch === path;
}

function isGalleryPath(pathname: string): boolean {
  return pathname === SITE_LINKS.gallery || pathname.startsWith(`${SITE_LINKS.gallery}/`);
}

function isNavItemActive(pathname: string, item: NavItem): boolean {
  if (item.label === "Home") return pathname === "/";
  if (item.label === "About the Institution") return isAboutUsPath(pathname);
  if (item.label === "Administration") return isAdministrationPath(pathname);
  if (item.label === "Academics") return isAcademicsPath(pathname);
  if (item.label === "Admissions & Fee") return isAdmissionsPath(pathname);
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

export function Header({ navigation, prospectus }: HeaderProps = {}) {
  const navItems = navigation ?? STATIC_HEADER_NAV;
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const syncHeaderHeight = () => {
      const topbar = el.querySelector<HTMLElement>(".bihe-site-header__topbar");
      const navbar = el.querySelector<HTMLElement>(".bihe-site-header__navbar");
      if (!topbar || !navbar) return;

      const height =
        topbar.getBoundingClientRect().height +
        navbar.getBoundingClientRect().height;

      document.documentElement.style.setProperty(
        "--site-header-height",
        `${Math.round(height)}px`,
      );
    };

    syncHeaderHeight();
    const ro = new ResizeObserver(syncHeaderHeight);
    ro.observe(el);
    const topbar = el.querySelector<HTMLElement>(".bihe-site-header__topbar");
    const navbar = el.querySelector<HTMLElement>(".bihe-site-header__navbar");
    if (topbar) ro.observe(topbar);
    if (navbar) ro.observe(navbar);
    window.addEventListener("resize", syncHeaderHeight);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", syncHeaderHeight);
    };
  }, [menuOpen]);

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
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        update(readScroll());
      });
    };

    const onLenisScroll = (e: { scroll: number }) => {
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

    return () => {
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

      if (item.classList.contains("bihe-site-header__topbar-dropdown")) {
        submenu.style.removeProperty("--submenu-top");
        submenu.style.removeProperty("--submenu-left");
        submenu.style.removeProperty("--submenu-right");
        return;
      }

      const rect = item.getBoundingClientRect();
      submenu.style.setProperty("--submenu-top", `${rect.bottom + 4}px`);
      submenu.style.setProperty("--submenu-left", `${rect.left}px`);
      submenu.style.removeProperty("--submenu-right");
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
          submenu.style.removeProperty("--submenu-right");
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
      className={`bihe-site-header${scrolled ? " bihe-site-header--scrolled" : ""}${menuOpen ? " bihe-site-header--menu-open" : ""}`}
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
            {prospectus ? (
              <a
                href={prospectus.href}
                className="bihe-site-header__topbar-link bihe-site-header__topbar-link--prospectus"
                target={prospectus.openInNewTab ? "_blank" : undefined}
                rel={prospectus.openInNewTab ? "noopener noreferrer" : undefined}
              >
                {prospectus.label}
              </a>
            ) : null}
            <Link
              href={SITE_LINKS.gallery}
              className={`bihe-site-header__topbar-link${isGalleryPath(pathname) ? " is-active" : ""}`}
              aria-current={isGalleryPath(pathname) ? "page" : undefined}
            >
              Gallery
            </Link>
            <div
              className={`bihe-site-header__topbar-dropdown bihe-site-header__nav-item--dropdown${
                openDropdown === ALUMNI_TOPBAR_ITEM.label ? " is-open" : ""
              }${isAlumniPath(pathname) ? " is-active" : ""}`}
              data-nav-dropdown={ALUMNI_TOPBAR_ITEM.label}
            >
              <div
                className={`bihe-site-header__topbar-link-group bihe-site-header__topbar-link-group--menu${
                  isAlumniPath(pathname) ? " is-active" : ""
                }${openDropdown === ALUMNI_TOPBAR_ITEM.label ? " is-open" : ""}`}
              >
                <Link
                  href={ALUMNI_TOPBAR_ITEM.href}
                  className="bihe-site-header__topbar-link bihe-site-header__topbar-link--menu"
                  aria-current={isAlumniPath(pathname) ? "page" : undefined}
                  aria-expanded={openDropdown === ALUMNI_TOPBAR_ITEM.label}
                  onClick={(e) => handleDropdownTrigger(e, ALUMNI_TOPBAR_ITEM, true)}
                >
                  {ALUMNI_TOPBAR_ITEM.label}
                </Link>
                <button
                  type="button"
                  className={`bihe-site-header__topbar-chevron-btn bihe-site-header__topbar-chevron-btn--menu${
                    openDropdown === ALUMNI_TOPBAR_ITEM.label ? " is-open" : ""
                  }`}
                  aria-expanded={openDropdown === ALUMNI_TOPBAR_ITEM.label}
                  aria-label={`${openDropdown === ALUMNI_TOPBAR_ITEM.label ? "Close" : "Open"} Alumni submenu`}
                  onClick={(e) => handleDropdownTrigger(e, ALUMNI_TOPBAR_ITEM, true)}
                >
                  <IconChevron />
                </button>
              </div>
              <ul
                className={`bihe-site-header__submenu${
                  openDropdown === ALUMNI_TOPBAR_ITEM.label ? " bihe-site-header__submenu--open" : ""
                }`}
                role="menu"
              >
                {ALUMNI_TOPBAR_ITEM.children.map((child) => {
                  const isChildActive = isSubmenuLinkActive(
                    pathname,
                    child.href,
                    ALUMNI_TOPBAR_ITEM.children,
                  );

                  return (
                    <li key={child.label} role="none">
                      <Link
                        href={child.href}
                        className={`bihe-site-header__submenu-link${
                          isChildActive ? " is-active" : ""
                        }`}
                        role="menuitem"
                        aria-current={isChildActive ? "page" : undefined}
                        onClick={() => setOpenDropdown(null)}
                      >
                        {child.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
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
                        {item.children!.map((child) => {
                          const isChildActive = isSubmenuLinkActive(
                            pathname,
                            child.href,
                            item.children!,
                          );

                          return (
                            <li key={child.label} role="none">
                              <Link
                                href={child.href}
                                className={`bihe-site-header__submenu-link${
                                  isChildActive ? " is-active" : ""
                                }`}
                                role="menuitem"
                                aria-current={isChildActive ? "page" : undefined}
                                onClick={() => {
                                  setOpenDropdown(null);
                                  closeMenu();
                                }}
                              >
                                {child.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    ) : null}
                  </li>
                );
              })}
            </ul>

            <div className="bihe-site-header__nav-extras" aria-label="Quick links">
              <ul className="bihe-site-header__nav-extras-list">
                {prospectus ? (
                  <li className="bihe-site-header__nav-extras-item">
                    <a
                      href={prospectus.href}
                      className="bihe-site-header__nav-extras-link"
                      target={prospectus.openInNewTab ? "_blank" : undefined}
                      rel={prospectus.openInNewTab ? "noopener noreferrer" : undefined}
                      onClick={closeMenu}
                    >
                      {prospectus.label}
                    </a>
                  </li>
                ) : null}
                <li className="bihe-site-header__nav-extras-item">
                  <Link
                    href={SITE_LINKS.gallery}
                    className={`bihe-site-header__nav-extras-link${isGalleryPath(pathname) ? " is-active" : ""}`}
                    aria-current={isGalleryPath(pathname) ? "page" : undefined}
                    onClick={closeMenu}
                  >
                    Gallery
                  </Link>
                </li>
                <li
                  className={`bihe-site-header__nav-extras-item bihe-site-header__nav-item--dropdown${
                    openDropdown === "Alumni (menu)" ? " is-open" : ""
                  }`}
                  data-nav-dropdown="Alumni (menu)"
                >
                  <div className="bihe-site-header__nav-link-group">
                    <Link
                      href={ALUMNI_TOPBAR_ITEM.href}
                      className={`bihe-site-header__nav-extras-link${isAlumniPath(pathname) ? " is-active" : ""}`}
                      aria-expanded={openDropdown === "Alumni (menu)"}
                      onClick={(e) =>
                        handleDropdownTrigger(
                          e,
                          { ...ALUMNI_TOPBAR_ITEM, label: "Alumni (menu)" },
                          true,
                        )
                      }
                    >
                      Alumni
                    </Link>
                    <button
                      type="button"
                      className={`bihe-site-header__chevron-btn${openDropdown === "Alumni (menu)" ? " is-open" : ""}`}
                      aria-expanded={openDropdown === "Alumni (menu)"}
                      aria-label={`${openDropdown === "Alumni (menu)" ? "Close" : "Open"} Alumni submenu`}
                      onClick={(e) =>
                        handleDropdownTrigger(
                          e,
                          { ...ALUMNI_TOPBAR_ITEM, label: "Alumni (menu)" },
                          true,
                        )
                      }
                    >
                      <IconChevron />
                    </button>
                  </div>
                  <ul
                    className={`bihe-site-header__submenu${
                      openDropdown === "Alumni (menu)" ? " bihe-site-header__submenu--open" : ""
                    }`}
                    role="menu"
                  >
                    {ALUMNI_TOPBAR_ITEM.children.map((child) => {
                      const isChildActive = isSubmenuLinkActive(
                        pathname,
                        child.href,
                        ALUMNI_TOPBAR_ITEM.children,
                      );

                      return (
                        <li key={child.label} role="none">
                          <Link
                            href={child.href}
                            className={`bihe-site-header__submenu-link${
                              isChildActive ? " is-active" : ""
                            }`}
                            role="menuitem"
                            aria-current={isChildActive ? "page" : undefined}
                            onClick={closeMenu}
                          >
                            {child.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              </ul>
              <Link
                href={SITE_LINKS.apply}
                className="bihe-site-header__nav-extras-apply"
                onClick={closeMenu}
              >
                Apply Now
                <ArrowRightIcon />
              </Link>
            </div>
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
