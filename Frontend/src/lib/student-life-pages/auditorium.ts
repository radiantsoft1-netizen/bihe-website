import { images } from "@/lib/images";
import type { StudentLifeRichPageConfig } from "./types";

export const AUDITORIUM_PAGE: StudentLifeRichPageConfig = {
  slug: "auditorium",
  currentPage: "Auditorium",
  title: "Auditorium",
  lead:
    "Spacious auditorium for seminars, cultural programmes, and institutional events.",
  intro: {
    kicker: "Student Life",
    title: "Auditorium",
    paragraphs: [
      "The Institute has state of the art Auditorium. This auditorium is used for several occasions such as Graduation ceremony, First year inauguration, Fresher's party, Felicitation functions, Alumni events, Major department level events, and others. The following is the list of auditoriums with seating capacities.",
    ],
    images: [
      {
        src: images.studentLife.auditorium2,
        alt: "Students presenting at a BIHE auditorium event",
      },
      {
        src: images.studentLife.auditorium3,
        alt: "BIHE auditorium seating during an institutional programme",
      },
      {
        src: images.studentLife.auditorium4,
        alt: "Graduation ceremony at the BIHE auditorium",
      },
    ],
  },
  facilityCards: [
    { number: "01", title: "Seating capacity", text: "Comfortable seating arrangement that can accommodate up to 307 attendees." },
    { number: "02", title: "Wi-Fi", text: "High-speed Wi-Fi connectivity available for seamless digital access." },
    { number: "03", title: "Seating capacity", text: "Equipped with dual projectors for clear and impactful presentations." },
    { number: "04", title: "Lighting System", text: "Professional stage lighting for seminars and cultural programmes." },
  ],
  sections: [
    {
      id: "amphitheater",
      title: "Amphitheater",
      bullets: [
        "Seating capacity: 307",
        "Seating capacity: 600 and above",
        "Attracted by nature for scenic beauty",
      ],
    },
  ],
};
