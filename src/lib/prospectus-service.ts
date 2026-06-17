import "server-only";

import { fetchApiItem } from "@/lib/api/client";
import type { FooterNavColumn, HeaderNavItem } from "@/lib/static-navigation";

export type ProspectusLink = {
  label: string;
  href: string;
  openInNewTab: boolean;
  fileName?: string;
};

export type FooterNavLink = {
  label: string;
  href: string;
  openInNewTab?: boolean;
};

function isProspectusLabel(label: string): boolean {
  return label.toLowerCase().includes("prospectus");
}

type ApiProspectusSetting = {
  label: string;
  pdfUrl: string;
  fileName?: string | null;
  openInNewTab?: boolean;
};

const FALLBACK_PROSPECTUS: ProspectusLink = {
  label: "Prospectus",
  href: "/documents/bihe-prospectus.pdf",
  openInNewTab: true,
  fileName: "bihe-prospectus.pdf",
};

export async function getProspectusLink(): Promise<ProspectusLink | null> {
  const data = await fetchApiItem<ApiProspectusSetting | null>("/api/v1/site-settings/prospectus");

  if (!data?.pdfUrl) {
    return FALLBACK_PROSPECTUS;
  }

  return {
    label: data.label || "Prospectus",
    href: data.pdfUrl,
    openInNewTab: data.openInNewTab ?? true,
    fileName: data.fileName ?? undefined,
  };
}

/** Drop stale Prospectus rows from header dropdowns; topbar is the canonical link. */
export function applyProspectusToHeaderNav(items: HeaderNavItem[]): HeaderNavItem[] {
  return items.map((item) => {
    if (!item.children?.length) {
      return item;
    }

    return {
      ...item,
      children: item.children.filter((child) => !isProspectusLabel(child.label)),
    };
  });
}

export function applyProspectusToFooterColumns(
  columns: FooterNavColumn[],
  prospectus: ProspectusLink | null,
): FooterNavColumn[] {
  if (!prospectus) {
    return columns;
  }

  return columns.map((column) => ({
    ...column,
    links: column.links.map((link) =>
      isProspectusLabel(link.label)
        ? { ...link, href: prospectus.href, openInNewTab: prospectus.openInNewTab }
        : link,
    ),
  }));
}
