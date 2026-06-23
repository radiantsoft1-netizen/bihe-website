export type AdmissionsPageNavItem = {
  id: string;
  label: string;
  href: string;
  matchPaths: readonly string[];
};

export const ADMISSIONS_PAGE_NAV: readonly AdmissionsPageNavItem[] = [
  {
    id: "admissions-and-fee",
    label: "Admissions and Fee",
    href: "/admissions/admission-process",
    matchPaths: ["/admissions/admission-process", "/admissions/fee-refund-policy"],
  },
  {
    id: "online-admission-format",
    label: "Online Admission Format",
    href: "/admissions/online-admission-format",
    matchPaths: ["/admissions/online-admission-format"],
  },
] as const;

export function isAdmissionsPageNavActive(
  pathname: string,
  item: AdmissionsPageNavItem,
): boolean {
  return item.matchPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}
