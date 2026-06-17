"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ACADEMICS_FACULTY_NAV,
  isAcademicsFacultyNavActive,
} from "@/lib/academics-faculty-nav";

export function AcademicsFacultyNav() {
  const pathname = usePathname();

  return (
    <nav className="admissions-page-nav" aria-label="Academics faculty navigation">
      <div className="admissions-page-nav__container">
        <ul className="admissions-page-nav__list">
          {ACADEMICS_FACULTY_NAV.map((item) => {
            const isActive = isAcademicsFacultyNavActive(pathname, item);

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
