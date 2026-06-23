import { images } from "@/lib/images";
import type { StudentLifeImage, StudentLifeRichPageConfig } from "./types";

export const YOUTH_RED_CROSS_ACTIVITY_GALLERY: readonly StudentLifeImage[] = [
  {
    src: images.studentLife.yrcActivityPeaceWalkathon,
    alt: "BIHE Youth Red Cross members at the International Day of Peace walkathon",
    caption: "International Day of Peace Walkathon — Walk for Humanity",
  },
  {
    src: images.studentLife.yrcActivityBloodDonationCamp,
    alt: "Blood donation camp organized by the Youth Red Cross unit at BIHE",
    caption: "Blood Donation Camp — Indian Red Cross Society, Davangere",
  },
  {
    src: images.studentLife.yrcActivityBloodDonationDrive,
    alt: "Youth Red Cross blood donation drive with faculty and student volunteers at BIHE",
    caption: "Youth Red Cross Blood Donation Drive",
  },
  {
    src: images.studentLife.yrcActivityWellbeingSeminar,
    alt: "Student awareness programme on physical and psychological well-being at BIHE auditorium",
    caption: "Awareness Programme — Physical and Psychological Well-being",
  },
] as const;

export const YOUTH_RED_CROSS_PAGE: StudentLifeRichPageConfig = {
  slug: "youth-red-cross",
  currentPage: "Youth Red Cross",
  title: "Youth Red Cross (YRC)",
  lead:
    "A voluntary humanitarian movement promoting health, service, and friendship among BIHE students.",
  banner: {
    src: images.studentLife.yrcBanner,
    alt: "Youth Red Cross emblem",
    kicker: "Student Life",
    overlayTitle: "Youth Red Cross",
    imageFit: "contain",
  },
  intro: {
    title: "About Youth Red Cross",
    paragraphs: [
      "The Youth Red Cross (YRC) is the youth wing of the Indian Red Cross Society and functions as an integral part of educational institutions across the country. It is a voluntary humanitarian movement dedicated to promoting health, service, and friendship among students. The YRC aims to cultivate social awareness, humanitarian values, leadership qualities, and a spirit of selfless service among young people.",
      "The Youth Red Cross Unit of Bapuji Institute of Hi-Tech Education serves as a platform for students to participate in community service, health awareness programs, environmental initiatives, and disaster preparedness activities. The unit strives to develop socially responsible citizens who contribute positively to society and uphold the ideals of humanity, compassion, and service.",
    ],
  },
  postIntroSections: [
    {
      id: "objectives",
      title: "Objectives",
      bullets: [
        "Promote humanitarian values and voluntary service among students.",
        "Create awareness about health, hygiene, and disease prevention.",
        "Encourage blood donation and organ donation awareness.",
        "Develop leadership qualities and social commitment.",
        "Support disaster preparedness and relief activities.",
        "Foster national integration, friendship, and community welfare.",
        "Encourage environmental conservation and sustainable practices.",
      ],
      bulletColumns: 2,
    },
    {
      id: "activities",
      title: "Activities",
      paragraphs: ["The Youth Red Cross Unit regularly organizes:"],
      bullets: [
        "Blood Donation Camps",
        "Health Check-up and Medical Awareness Programs",
        "First Aid Training Workshops",
        "Environmental Awareness and Tree Plantation Drives",
        "Cleanliness and Sanitation Campaigns",
        "Disaster Management and Preparedness Programs",
        "Community Outreach and Social Service Activities",
        "Awareness Programs on Mental Health, Nutrition, and Public Health",
        "Observance of World Red Cross Day and other important health-related events",
      ],
      bulletColumns: 2,
    },
  ],
  facilityCards: [
    {
      number: "01",
      title: "Vision",
      text: "To build a generation of socially conscious, compassionate, and responsible youth committed to humanitarian service and community development.",
    },
    {
      number: "02",
      title: "Mission",
      text: "To inspire students to serve humanity through voluntary action, promote health and well-being, and contribute to creating a more caring and resilient society.",
    },
    {
      number: "03",
      title: "Motto",
      text: "\"Service to Humanity is Service to God.\"",
    },
  ],
  activityGallery: {
    id: "yrc-activities",
    title: "Youth Red Cross in Action",
    images: YOUTH_RED_CROSS_ACTIVITY_GALLERY,
  },
  sections: [
    {
      id: "benefits",
      title: "Benefits for Students",
      paragraphs: ["Through participation in Youth Red Cross activities, students gain:"],
      bullets: [
        "Leadership and organizational skills",
        "Teamwork and communication abilities",
        "Social awareness and civic responsibility",
        "Opportunities for community engagement",
        "Experience in volunteerism and humanitarian service",
        "Personal growth and character development",
      ],
      bulletColumns: 2,
    },
  ],
};
