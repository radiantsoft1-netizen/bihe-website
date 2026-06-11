import { images } from "@/lib/images";
import type { StudentLifeRichPageConfig } from "./types";

export const HOSTEL_FACILITIES_PAGE: StudentLifeRichPageConfig = {
  slug: "hostel-facilities",
  currentPage: "Hostel Facilities",
  title: "Hostel Facilities",
  lead:
    "The college hostel provides a safe, comfortable, and disciplined living environment for students with well-furnished rooms, hygienic dining, and round-the-clock security.",
  banner: {
    src: images.studentLife.hostelBanner,
    alt: "BIHE hostel building and campus accommodation",
    kicker: "Student Life",
    overlayTitle: "Hostel Facilities",
  },
  intro: {
    title: "Hostel Details",
    paragraphs: [
      "The college hostel provides a safe, comfortable, and disciplined living environment for students. The hostel is equipped with basic facilities such as well-furnished rooms, clean drinking water, hygienic dining services, and uninterrupted electricity supply. Proper security arrangements, including wardens and surveillance systems, are in place to ensure the safety of residents. First-aid facilities and medical support are available for hostellers, and regular cleanliness and sanitation measures are maintained. The hostel administration ensures that rules and regulations are followed to promote a healthy, peaceful, and supportive atmosphere for students' academic and personal growth.",
    ],
  },
  sections: [
    {
      id: "hostel-for-all",
      title: "Hostel for Girls and Boys",
      paragraphs: [
        "The college hostel provides a secure and comfortable residential facility for students. It offers well-maintained rooms, clean drinking water, nutritious food, and a hygienic living environment. The hostel is supervised by a warden to ensure discipline and safety among students. Basic medical and first-aid facilities are available, and regular cleanliness is maintained to support the health and well-being of the residents.",
      ],
    },
    {
      id: "facilities",
      title: "Facilities in Hostel",
      bulletColumns: 2,
      bullets: [
        "Resident wardens for Girl's hostel.",
        "State of the art GYM facility for boys.",
        "Located in close proximity to the institutes.",
        "Excellent sports facilities both indoor and outdoor.",
        "Cool and calm environment for study.",
        "Hot water facilities.",
        "Vehicle parking area.",
        "Soft water Processing Unit for soft water.",
        "TV Room Facility.",
        "RO water processing Unit for drinking water.",
        "Attached and non-attached rooms.",
        "Water cooler facility floor-wise.",
        "Completely Wi-Fi-enabled campus.",
        "Walk area covered by beautiful garden and landscaping.",
        "Escalator facility for floors.",
        "CC camera surveillance.",
        "Separate dining halls for boys and girls.",
        "24*7 security",
        "Newspaper facility.",
        "Well furnished rooms with wardrobes, bookshelf, study table, chair, cot, bed etc…",
      ],
    },
  ],
};
