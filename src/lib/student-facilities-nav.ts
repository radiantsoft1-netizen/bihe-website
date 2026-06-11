import { images } from "@/lib/images";
import { STUDENT_LIFE_SUBMENU } from "@/lib/student-life-submenu";

export type StudentFacilityNavIconName =
  | "sports"
  | "nss"
  | "hostel"
  | "placement"
  | "grievance"
  | "health"
  | "icc"
  | "anti-ragging"
  | "equal-opportunity"
  | "sedg"
  | "differently-abled"
  | "computer-lab"
  | "auditorium"
  | "canteen"
  | "youth-red-cross";

export type StudentFacilityNavItem = {
  slug: string;
  label: string;
  href: string;
  image: string;
  imageAlt: string;
  icon: StudentFacilityNavIconName;
};

const STUDENT_FACILITY_NAV_META: Record<
  string,
  Pick<StudentFacilityNavItem, "image" | "imageAlt" | "icon">
> = {
  "sports-facilities": {
    icon: "sports",
    image: images.facility.sports,
    imageAlt: "Sports facilities at BIHE campus",
  },
  "nss-details": {
    icon: "nss",
    image: images.nssDetails.heroBanner,
    imageAlt: "NSS programme at BIHE",
  },
  "hostel-facilities": {
    icon: "hostel",
    image: images.studentLife.hostel1,
    imageAlt: "Hostel facilities at BIHE",
  },
  "placement-cell-and-activities": {
    icon: "placement",
    image: images.facility.placement,
    imageAlt: "Placement cell activities at BIHE",
  },
  "student-grievance-redressal-committee": {
    icon: "grievance",
    image: images.aboutMain,
    imageAlt: "Student grievance redressal support at BIHE",
  },
  "health-facilities": {
    icon: "health",
    image: images.studentLife.healthBanner,
    imageAlt: "Health facilities for students at BIHE",
  },
  "internal-complaint-committee": {
    icon: "icc",
    image: images.iccObjectivesInfographic,
    imageAlt: "Internal Complaint Committee at BIHE",
  },
  "anti-ragging-cell": {
    icon: "anti-ragging",
    image: images.studentLife.antiRaggingBanner,
    imageAlt: "Anti-ragging awareness at BIHE",
  },
  "equal-opportunity-cell": {
    icon: "equal-opportunity",
    image: images.studentLife.equalOpportunityBanner,
    imageAlt: "Equal opportunity initiatives at BIHE",
  },
  "socio-economically-disadvantaged-groups": {
    icon: "sedg",
    image: images.studentLife.sedgBanner,
    imageAlt: "Support for socio-economically disadvantaged groups at BIHE",
  },
  "facilities-for-differently-abled-students": {
    icon: "differently-abled",
    image: images.studentLife.auditorium2,
    imageAlt: "Facilities for differently abled students at BIHE",
  },
  "computer-lab": {
    icon: "computer-lab",
    image: images.studentLife.computerLab1,
    imageAlt: "Computer laboratory at BIHE",
  },
  auditorium: {
    icon: "auditorium",
    image: images.studentLife.auditorium1,
    imageAlt: "Auditorium at BIHE",
  },
  canteen: {
    icon: "canteen",
    image: images.facility.canteen,
    imageAlt: "Canteen facility at BIHE",
  },
  "youth-red-cross": {
    icon: "youth-red-cross",
    image: images.studentLife.yrcBanner,
    imageAlt: "Youth Red Cross activities at BIHE",
  },
};

export const STUDENT_FACILITIES_NAV_ITEMS: readonly StudentFacilityNavItem[] =
  STUDENT_LIFE_SUBMENU.map((item) => {
    const meta = STUDENT_FACILITY_NAV_META[item.slug];

    return {
      slug: item.slug,
      label: item.label,
      href: item.href,
      image: meta.image,
      imageAlt: meta.imageAlt,
      icon: meta.icon,
    };
  });

export const STUDENT_FACILITIES_NAV_TITLE = "Student Facilities";

export function isActiveStudentFacilityPath(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function getActiveStudentFacilitySlug(pathname: string): string | null {
  const match = STUDENT_FACILITIES_NAV_ITEMS.find((item) =>
    isActiveStudentFacilityPath(pathname, item.href),
  );

  return match?.slug ?? null;
}
