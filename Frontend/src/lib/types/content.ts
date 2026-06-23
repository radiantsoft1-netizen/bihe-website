export type HeroSlide = {
  id?: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  image?: string | null;
};

export type AnnouncementItem = {
  id?: string;
  message: string;
  link?: string | null;
};

export type NewsEventItem = {
  id?: string;
  title: string;
  tag: string;
  date: string;
  image: string;
  slug?: string;
};

export type HomepageGalleryItem = {
  id: string;
  title: string;
  category: string;
  image: string;
  layout: "feature" | "accent" | "wide" | "standard";
};

export type GalleryTagStat = {
  label: string;
  count: number;
};

export type RecruitingPartnerItem = {
  id?: string;
  name: string;
  logo: string;
};
