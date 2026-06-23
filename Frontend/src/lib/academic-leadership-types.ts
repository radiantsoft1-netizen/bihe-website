export type AcademicLeadershipShowcase = {
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
  subheading?: string;
  paragraphs: readonly { text: string; emphasis: boolean }[];
  image: string;
  imageAlt: string;
};
