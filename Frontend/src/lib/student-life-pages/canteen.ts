import { images } from "@/lib/images";
import type { StudentLifeRichPageConfig } from "./types";

export const CANTEEN_PAGE: StudentLifeRichPageConfig = {
  slug: "canteen",
  currentPage: "Canteen",
  title: "Canteen",
  lead:
    "Hygienic canteen facilities offering affordable meals for students and staff.",
  showcase: {
    id: "canteen-intro",
    hideBadge: true,
    titleVariant: "plain",
    badge: "Student Life",
    title: { lead: "Canteen" },
    paragraphs: [
      {
        text: "Owing to the diverse student culture at BIHE, the college canteen caters to a wide range of palates. We have an experienced cooking team that specializes in healthy and green diet. The canteen is a favorite hangout for all the students. It provides year round day service. The outsourced canteen provides quality food.",
        emphasis: false,
      },
    ],
    image: images.studentLife.canteenBanner,
    imageAlt: "BIHE college canteen dining area",
  },
};
