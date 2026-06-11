import type { FacilityIconName } from "@/components/landing/FacilityIcon";
import { images } from "@/lib/images";

export type FacilityItem = {
  title: string;
  description: string;
  image: string;
  icon: FacilityIconName;
};

export const FACILITIES_ITEMS: readonly FacilityItem[] = [
  {
    title: "Library",
    description:
      "Digital and print resources with quiet study spaces for research and coursework.",
    image: images.facility.library,
    icon: "library",
  },
  {
    title: "Computer Labs",
    description:
      "Modern IT labs with updated systems for hands-on learning and projects.",
    image: images.facility.computerLabs,
    icon: "computer-labs",
  },
  {
    title: "Hostel for Boys & Girls",
    description:
      "Safe, comfortable on-campus accommodation for outstation students.",
    image: images.facility.hostel,
    icon: "hostel",
  },
  {
    title: "Training & Placement Cell",
    description:
      "Career guidance, internships, and placement support for every graduate.",
    image: images.facility.placement,
    icon: "placement",
  },
  {
    title: "Extra curricular Activities",
    description:
      "Clubs, events, and cultural programs that build confidence beyond the classroom.",
    image: images.facility.extracurricular,
    icon: "extracurricular",
  },
  {
    title: "Canteen",
    description:
      "Hygienic dining with affordable meals for students and staff.",
    image: images.facility.canteen,
    icon: "canteen",
  },
  {
    title: "Sports",
    description:
      "Outdoor grounds and activities that encourage fitness and teamwork.",
    image: images.facility.sports,
    icon: "sports",
  },
  {
    title: "Auditorium",
    description:
      "A spacious venue for seminars, celebrations, and institutional events.",
    image: images.facility.auditorium,
    icon: "auditorium",
  },
] as const;
