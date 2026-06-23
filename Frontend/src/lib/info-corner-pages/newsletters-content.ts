import { images } from "@/lib/images";
import type { InfoCornerItem } from "@/lib/info-corner-items-service";

export const NEWSLETTERS_BASE_PATH = "/info-corner/newsletters";

export const NEWSLETTERS_FEED_TITLE = "Newsletter editions";

export const BCOM_NEWSLETTER_BADGE = "B.com";
export const BCOM_NEWSLETTER_SUBTITLE = "B.com newsletter";

const NEWSLETTER_TITLE_BY_SLUG: Record<string, string> = {
  "beacon-2023": "B.com - 2023",
  "bcom-2022": "B.com - 2022",
  "bcom-2021": "B.com - 2021",
  "bcom-2020": "B.com - 2020",
};

function normalizeBcomNewsletterTitle(title: string): string {
  if (/beacon/i.test(title)) {
    const year = title.match(/(20\d{2})/)?.[1] ?? "2023";
    return `B.com - ${year}`;
  }

  const year = title.match(/(20\d{2})/)?.[1];
  if (year && /b\.?\s*com|bcom/i.test(title)) {
    return `B.com - ${year}`;
  }

  return title;
}

export function normalizeNewsletterItem(item: InfoCornerItem): InfoCornerItem {
  const isNewsletter =
    item.category?.slug === "newsletters" ||
    item.categories?.some((category) => category.slug === "newsletters") ||
    item.slug in NEWSLETTER_TITLE_BY_SLUG;

  if (!isNewsletter) {
    return item;
  }

  const title =
    NEWSLETTER_TITLE_BY_SLUG[item.slug] ?? normalizeBcomNewsletterTitle(item.title);

  return {
    ...item,
    title,
    subtitle: BCOM_NEWSLETTER_SUBTITLE,
    badgeLabel: BCOM_NEWSLETTER_BADGE,
  };
}

export const FALLBACK_NEWSLETTER_ITEMS: InfoCornerItem[] = [
  {
    id: "beacon-2023",
    slug: "beacon-2023",
    title: "B.com - 2023",
    subtitle: BCOM_NEWSLETTER_SUBTITLE,
    badgeLabel: BCOM_NEWSLETTER_BADGE,
    excerpt:
      "The B.com 2023 newsletter edition highlights academic milestones, campus events, student achievements, and programme updates from Bapuji Institute of Hi-Tech Education.",
    publishedDate: "2024-03-01",
    publishedDateLabel: "1 Mar 2024",
    image: images.bcom,
    imageAlt: "B.com 2023 newsletter cover preview",
    category: {
      id: "newsletters",
      slug: "newsletters",
      name: "Newsletters",
      href: "/info-corner/newsletters",
    },
    href: "/info-corner/newsletters/beacon-2023",
    content: [
      "The B.com newsletter captures department-level academic developments, campus activities, and community initiatives for the B.Com programme at Bapuji Institute of Hi-Tech Education.",
      "The 2023 edition documents key events, student participation, faculty contributions, and programme milestones for students, alumni, and stakeholders.",
    ],
  },
  {
    id: "bcom-2022",
    slug: "bcom-2022",
    title: "B.com - 2022",
    subtitle: BCOM_NEWSLETTER_SUBTITLE,
    badgeLabel: BCOM_NEWSLETTER_BADGE,
    excerpt:
      "The B.com 2022 newsletter edition features department activities, academic highlights, and student engagement at BIHE.",
    publishedDate: "2023-08-11",
    publishedDateLabel: "11 Aug 2023",
    image: images.bcom,
    imageAlt: "B.com 2022 newsletter cover preview",
    category: {
      id: "newsletters",
      slug: "newsletters",
      name: "Newsletters",
      href: "/info-corner/newsletters",
    },
    href: "/info-corner/newsletters/bcom-2022",
    content: [
      "This B.com newsletter edition presents department-level updates, student activities, and academic highlights from the 2022 academic period.",
      "Readers can explore programme-related events, faculty notes, and campus participation documented for the B.Com community at BIHE.",
    ],
  },
  {
    id: "bcom-2021",
    slug: "bcom-2021",
    title: "B.com - 2021",
    subtitle: BCOM_NEWSLETTER_SUBTITLE,
    badgeLabel: BCOM_NEWSLETTER_BADGE,
    excerpt:
      "The B.com 2021 newsletter archives department news, student initiatives, and academic updates from BIHE.",
    publishedDate: "2023-08-11",
    publishedDateLabel: "11 Aug 2023",
    image: images.bcomDepartment,
    imageAlt: "B.com 2021 newsletter cover preview",
    category: {
      id: "newsletters",
      slug: "newsletters",
      name: "Newsletters",
      href: "/info-corner/newsletters",
    },
    href: "/info-corner/newsletters/bcom-2021",
    content: [
      "The B.com 2021 newsletter edition records departmental activities, student participation, and institutional communications for the academic year.",
      "This archive supports students, faculty, and alumni in reviewing past B.Com programme highlights at Bapuji Institute of Hi-Tech Education.",
    ],
  },
  {
    id: "bcom-2020",
    slug: "bcom-2020",
    title: "B.com - 2020",
    subtitle: BCOM_NEWSLETTER_SUBTITLE,
    badgeLabel: BCOM_NEWSLETTER_BADGE,
    excerpt:
      "The B.com 2020 newsletter edition documents campus news, academic updates, and student activities from BIHE.",
    publishedDate: "2023-08-11",
    publishedDateLabel: "11 Aug 2023",
    image: images.bcomProgrammeStudents,
    imageAlt: "B.com 2020 newsletter cover preview",
    category: {
      id: "newsletters",
      slug: "newsletters",
      name: "Newsletters",
      href: "/info-corner/newsletters",
    },
    href: "/info-corner/newsletters/bcom-2020",
    content: [
      "The B.com 2020 newsletter captures departmental updates, student engagement, and institutional news from the corresponding academic period.",
      "This edition is preserved as part of the BIHE newsletter archive for reference by students, parents, and faculty.",
    ],
  },
];

export function resolveNewsletterSeriesLabel(item: InfoCornerItem): string {
  if (
    /b\.?\s*com|bcom|beacon/i.test(item.title) ||
    /b\.?\s*com|bcom/i.test(item.subtitle ?? "")
  ) {
    return BCOM_NEWSLETTER_BADGE;
  }

  const badge = item.badgeLabel?.trim();
  if (badge && !/^(new|notice)$/i.test(badge)) {
    return badge;
  }

  return "Newsletter";
}
