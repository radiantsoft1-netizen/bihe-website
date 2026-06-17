import type { FacilityIconName } from "@/components/landing/FacilityIcon";
import { images } from "@/lib/images";
import { SITE_LINKS } from "@/lib/site-links";

export type FacilityItem = {
  title: string;
  description: string;
  image: string;
  icon: FacilityIconName;
  href: string;
};

export const FACILITIES_ITEMS: readonly FacilityItem[] = [
  {
    title: "Library",
    description:
      "Digital and print resources with quiet study spaces for research and coursework.",
    image: images.facility.library,
    icon: "library",
    href: SITE_LINKS.academicsLibrary,
  },
  {
    title: "Computer Labs",
    description:
      "Modern IT labs with updated systems for hands-on learning and projects.",
    image: images.facility.computerLabs,
    icon: "computer-labs",
    href: SITE_LINKS.studentLifeComputerLab,
  },
  {
    title: "Hostel for Boys & Girls",
    description:
      "Safe, comfortable on-campus accommodation for outstation students.",
    image: images.facility.hostel,
    icon: "hostel",
    href: SITE_LINKS.studentLifeHostelFacilities,
  },
  {
    title: "Training & Placement Cell",
    description:
      "Career guidance, internships, and placement support for every graduate.",
    image: images.facility.placement,
    icon: "placement",
    href: SITE_LINKS.studentLifePlacementCell,
  },
  {
    title: "Extra curricular Activities",
    description:
      "Clubs, events, and cultural programs that build confidence beyond the classroom.",
    image: images.facility.extracurricular,
    icon: "extracurricular",
    href: SITE_LINKS.studentLifeNssDetails,
  },
  {
    title: "Canteen",
    description:
      "Hygienic dining with affordable meals for students and staff.",
    image: images.facility.canteen,
    icon: "canteen",
    href: SITE_LINKS.studentLifeCanteen,
  },
  {
    title: "Sports",
    description:
      "Outdoor grounds and activities that encourage fitness and teamwork.",
    image: images.facility.sports,
    icon: "sports",
    href: SITE_LINKS.studentLifeSportsFacilities,
  },
  {
    title: "Auditorium",
    description:
      "A spacious venue for seminars, celebrations, and institutional events.",
    image: images.facility.auditorium,
    icon: "auditorium",
    href: SITE_LINKS.studentLifeAuditorium,
  },
] as const;
