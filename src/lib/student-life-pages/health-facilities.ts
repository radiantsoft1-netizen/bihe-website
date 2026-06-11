import { images } from "@/lib/images";
import type { StudentLifeShowcase } from "@/lib/student-life-showcase";
import type { StudentLifeRichPageConfig } from "./types";

export const HEALTH_FACILITIES_SHOWCASES: readonly StudentLifeShowcase[] = [
  {
    id: "first-aid",
    hideBadge: true,
    titleVariant: "plain",
    badge: "Student Life",
    title: { lead: "First-Aid" },
    paragraphs: [
      {
        text: "First-aid facilities are made available in various departments of the college to provide immediate medical assistance during minor injuries or health emergencies. Each department is equipped with basic first-aid kits containing essential medical supplies. Faculty and staff members are trained to offer initial care and professional medical help is arranged if required.",
        emphasis: false,
      },
    ],
    image: images.healthFacilities.firstAidKit,
    imageAlt: "First-aid kits and medical supplies available at BIHE campus",
  },
  {
    id: "health-awareness",
    hideBadge: true,
    titleVariant: "plain",
    badge: "Student Life",
    title: { lead: "Health Awareness Initiatives" },
    paragraphs: [
      {
        text: "The institution ensures the availability of health awareness initiatives within the campus to support physical and mental wellness. Students and staff are encouraged to participate in programmes that promote hygiene, preventive care, and healthy living practices.",
        emphasis: false,
      },
    ],
    image: images.healthFacilities.healthAwarenessCamp,
    imageAlt: "Students at a health awareness camp organized at BIHE campus",
  },
  {
    id: "medical-assistance",
    hideBadge: true,
    titleVariant: "plain",
    badge: "Student Life",
    title: { lead: "Preventive Care & Medical Assistance" },
    paragraphs: [
      {
        text: "Through systematic health record maintenance, preventive care measures, and timely medical assistance, the college strives to provide a safe, hygienic, and supportive environment for all members of the institution.",
        emphasis: false,
      },
    ],
    image: images.healthFacilities.fireSafetyEquipment,
    imageAlt: "Fire safety equipment installed on BIHE campus for student and staff protection",
  },
] as const;

export const HEALTH_FACILITIES_PAGE: StudentLifeRichPageConfig = {
  slug: "health-facilities",
  currentPage: "Health Facilities",
  title: "Health Facilities",
  lead:
    "First-aid support, health awareness programmes, and referral assistance for students on campus.",
  banner: {
    src: images.healthFacilities.banner,
    alt: "Blood pressure check and health monitoring support at BIHE campus",
    kicker: "Student Life",
    overlayTitle: "Health Facilities",
  },
  intro: {
    title: "HEALTH FACILITIES",
    paragraphs: [
      "Bapuji Institute of Hi-Tech Education College places strong emphasis on the health and well-being of its students and staff, recognizing that a healthy academic environment is essential for effective learning and personal development. The institution ensures the availability of basic healthcare facilities, first-aid services, and health awareness initiatives within the campus to support physical and mental wellness.",
      "Through systematic health record maintenance, preventive care measures, and timely medical assistance, the college strives to provide a safe, hygienic, and supportive environment for all members of the institution.",
    ],
  },
  tables: [
    {
      id: "committee",
      title: "THE DETAILS OF COMMITTEE AS GIVEN BELOW",
      caption: "Health facilities committee members",
      columns: [
        { key: "slNo", header: "SL. NO." },
        { key: "name", header: "Name" },
        { key: "designation", header: "Designation" },
        { key: "profession", header: "Profession" },
      ],
      rows: [
        { id: "1", slNo: "01", name: "Dr. B. Veerappa", designation: "President", profession: "Principal" },
        { id: "2", slNo: "02", name: "Siddalingappa K", designation: "Program officer", profession: "Vice principal" },
        { id: "3", slNo: "03", name: "Sidasivappa G R", designation: "Program officer", profession: "Physical director" },
      ],
    },
  ],
  showcases: HEALTH_FACILITIES_SHOWCASES,
};
