import "server-only";

import { fetchApiList } from "@/lib/api/client";
import {
  GOVERNING_BODIES_SHOWCASES,
  type GoverningBodiesShowcase,
} from "@/lib/governing-bodies-content";

type ApiGoverningBodyParagraph = {
  text: string;
  emphasis: boolean;
};

type ApiGoverningBody = {
  id: string;
  reverse?: boolean;
  profile: {
    name: string;
    titleLine: string;
    qualifications: string;
  };
  badge: string;
  title: {
    lead: string;
    accent: string;
  };
  paragraphs: ApiGoverningBodyParagraph[];
  image?: string | null;
  imageAlt: string;
  sortOrder?: number;
};

function mapApiShowcase(item: ApiGoverningBody, index: number): GoverningBodiesShowcase {
  const fallback = GOVERNING_BODIES_SHOWCASES[index];

  return {
    id: item.id,
    reverse: item.reverse ?? false,
    profile: {
      name: item.profile.name,
      titleLine: item.profile.titleLine,
      qualifications: item.profile.qualifications,
    },
    badge: item.badge,
    title: {
      lead: item.title.lead,
      accent: item.title.accent,
    },
    paragraphs: item.paragraphs.map((paragraph) => ({
      text: paragraph.text,
      emphasis: paragraph.emphasis,
    })),
    image: item.image ?? fallback?.image ?? GOVERNING_BODIES_SHOWCASES[0].image,
    imageAlt: item.imageAlt,
  };
}

export async function getGoverningBodiesShowcases(): Promise<readonly GoverningBodiesShowcase[]> {
  const data = await fetchApiList<ApiGoverningBody>("/api/v1/governing-bodies");

  if (!data?.length) {
    return GOVERNING_BODIES_SHOWCASES;
  }

  return data.map((item, index) => mapApiShowcase(item, index));
}
