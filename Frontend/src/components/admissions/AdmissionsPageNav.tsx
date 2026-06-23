"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ADMISSIONS_PAGE_NAV,
  isAdmissionsPageNavActive,
} from "@/lib/admissions-page-nav";

export function AdmissionsPageNav() {
  const pathname = usePathname();

  return (
    <nav className="admissions-page-nav" aria-label="Admissions section navigation">
      <div className="admissions-page-nav__container">
        <ul className="admissions-page-nav__list">
          {ADMISSIONS_PAGE_NAV.map((item) => {
            const isActive = isAdmissionsPageNavActive(pathname, item);

            return (
              <li key={item.id} className="admissions-page-nav__item">
                <Link
                  href={item.href}
                  className={[
                    "admissions-page-nav__link",
                    isActive ? "admissions-page-nav__link--active" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
