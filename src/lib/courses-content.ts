import { images } from "@/lib/images";

export type CourseItem = {
  code: string;
  name: string;
  kicker: string;
  description: string;
  image: string;
  reverse: boolean;
  highlights: string[];
  meta: string[];
};

export const COURSES: CourseItem[] = [
  {
    code: "BCA",
    name: "Bachelor of Computer Application",
    kicker: "Undergraduate Program",
    description:
      "The wider objective is to prepare undergraduate students of BCA for productive careers in software industry/information technology / academia by providing an outstanding environment for teaching and research in the core and emerging areas of the discipline.",
    image: images.bcaLab,
    reverse: false,
    highlights: [],
    meta: ["3 Years", "Full Time", "DAVV Affiliated"],
  },
  {
    code: "B.Com",
    name: "Bachelor of Commerce",
    kicker: "Undergraduate Program",
    description:
      "Program aims to develop a strong understanding of commerce, business, finance, accounting, and management principles. The course equips students with analytical, decision-making, and problem-solving skills required in today's competitive business environment.",
    image: images.bcom,
    reverse: true,
    highlights: [],
    meta: ["3 Years", "Full Time", "DAVV Affiliated"],
  },
];
