import "server-only";

import { fetchApiItem } from "@/lib/api/client";
import {
  STATIC_FOOTER_NAV,
  STATIC_HEADER_NAV,
  type FooterNavColumn,
  type HeaderNavItem,
} from "@/lib/static-navigation";

type ApiHeaderNavChild = {
  label: string;
  href: string;
  description?: string | null;
  openInNewTab?: boolean;
};

type ApiHeaderNavItem = {
  label: string;
  href: string;
  openInNewTab?: boolean;
  children?: ApiHeaderNavChild[];
};

type ApiFooterNavColumn = {
  title: string;
  links: { label: string; href: string; openInNewTab?: boolean }[];
};

type ApiNavigation = {
  header: ApiHeaderNavItem[];
  footer: ApiFooterNavColumn[];
};

export type SiteNavigation = {
  header: HeaderNavItem[];
  footer: FooterNavColumn[];
};

function mapHeader(items: ApiHeaderNavItem[]): HeaderNavItem[] {
  return items.map((item) => ({
    label: item.label,
    href: item.href,
    dropdown: (item.children?.length ?? 0) > 0,
    children: item.children?.map((child) => ({
      label: child.label,
      href: child.href,
    })),
  }));
}

function mapFooter(columns: ApiFooterNavColumn[]): FooterNavColumn[] {
  return columns.map((column) => ({
    title: column.title,
    links: column.links.map((link) => ({
      label: link.label,
      href: link.href,
      openInNewTab: link.openInNewTab,
    })),
  }));
}

export async function getSiteNavigation(): Promise<SiteNavigation> {
  const data = await fetchApiItem<ApiNavigation>("/api/v1/navigation");

  if (!data?.header?.length) {
    return {
      header: STATIC_HEADER_NAV,
      footer: STATIC_FOOTER_NAV,
    };
  }

  return {
    header: mapHeader(data.header),
    footer: data.footer?.length ? mapFooter(data.footer) : STATIC_FOOTER_NAV,
  };
}
