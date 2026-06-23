import type { InfoCornerCategory } from "@/lib/info-corner-items-service";

export type InfoCornerNavLink = {
  slug: string;
  name: string;
  href: string;
  description?: string;
};

export const INFO_CORNER_DEDICATED_NAV: InfoCornerNavLink[] = [
  {
    slug: "rti-details",
    name: "RTI Details",
    href: "/info-corner/rti-details",
    description:
      "Right to Information Act details, public information officers, and disclosure procedures at BIHE.",
  },
  {
    slug: "international-students-admission",
    name: "Admission procedure and facilities provided to International Students.",
    href: "/info-corner/international-students-admission",
    description:
      "Admission guidelines, eligibility, and campus facilities available for international students at BIHE.",
  },
];

export function buildInfoCornerNavLinks(categories: InfoCornerCategory[]): InfoCornerNavLink[] {
  return categories.map((category) => ({
    slug: category.slug,
    name: category.name,
    href: category.href,
    description: category.description ?? undefined,
  }));
}

export function buildInfoCornerSidebarLinks(categories: InfoCornerCategory[]): InfoCornerNavLink[] {
  return [...INFO_CORNER_DEDICATED_NAV, ...buildInfoCornerNavLinks(categories)];
}
