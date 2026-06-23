export type NewsCategory = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
};

export type NewsItem = {
  id: string;
  title: string;
  slug: string;
  description: string;
  summary?: string | null;
  content?: string | null;
  body?: string | null;
  date: string;
  eventDate?: string | null;
  image: string;
  pdf?: string | null;
  pdfName?: string | null;
  category: NewsCategory | null;
  tag: string;
  isFeatured?: boolean;
  showInTicker?: boolean;
  seo?: {
    title?: string | null;
    description?: string | null;
    keywords?: string | null;
  };
};

export type NewsTickerItem = {
  id: string;
  title: string;
  slug: string;
};
