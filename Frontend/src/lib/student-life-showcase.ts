export type StudentLifeShowcase = {
  id: string;
  reverse?: boolean;
  hideVisual?: boolean;
  hideBadge?: boolean;
  titleVariant?: "quoted" | "plain";
  badge: string;
  title: {
    lead: string;
    accent?: string;
  };
  paragraphs?: readonly { text: string; emphasis: boolean }[];
  bullets?: readonly string[];
  closingHighlight?: string;
  image: string;
  imageAlt: string;
  profile?: {
    name: string;
    role: string;
    detail?: string;
  };
};
