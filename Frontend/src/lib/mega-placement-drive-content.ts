import { images } from "@/lib/images";
import type { StudentLifeStat } from "@/lib/student-life-pages/types";
import type { StudentLifeShowcase } from "@/lib/student-life-showcase";

export const MEGA_PLACEMENT_DRIVE_PAGE_LEAD =
  "Campus to Corporate – Batch 1: BIHE's Mega Placement Drive 2025 connecting students with leading recruiters.";

export const MEGA_PLACEMENT_DRIVE_BANNER = images.megaPlacementDrive.offerLettersBanner;
export const MEGA_PLACEMENT_DRIVE_BANNER_ALT =
  "Principal, Placement HRs, and Staff Members presenting on-the-spot offer letters to selected candidates during the Mega Placement Drive 2025";

export const MEGA_PLACEMENT_DRIVE_BANNER_CONTENT = {
  caption:
    "Principal, Placement HRs, and Staff Members presenting on-the-spot offer letters to selected candidates during the Mega Placement Drive 2025",
  title: "Mega Placement Drive 2025",
  paragraphs: [
    "The Mega Placement Drive 2025 – \"Campus to Corporate Batch-1\" was a resounding success. It not only provided employment opportunities for graduating students but also showcased the institution's commitment to nurturing employable and industry-ready professionals.",
    "The management and faculty members expressed pride in the performance of the students and the collaborative efforts that made the event possible. The drive fostered confidence among participants and reinforced the college's role as a catalyst for career growth.",
    "The event concluded at 5:30 PM with a valedictory session, during which appreciation certificates were presented to company representatives, volunteers, and coordinators. The Principal, MBA Director, and Placement Officer extended gratitude to all stakeholders for their support and cooperation.",
  ],
} as const;

export const MEGA_PLACEMENT_DRIVE_INTRO = {
  kicker: "Placement Cell",
  title: "Mega Placement Drive 2025",
  paragraphs: [
    "Date: 26th September 2025",
    "Theme: \"Campus to Corporate – Batch 1\"",
    "Venue: BIHE Campus, Davangere",
    "Bapuji Institute of Hi-Tech Education, Davangere, organized a grand Mega Placement Drive 2025 under the banner \"Campus to Corporate – Batch 1\" on 26th September 2025. The event was designed to provide students of various disciplines with opportunities to connect directly with leading companies and step confidently into the corporate world.",
    "The Mega Placement Drive 2025 was open to students from multiple streams, including BCA, B.Com, BBA, B.Sc., and MBA. The main objective of the event was to bridge the gap between academic learning and the demands of the modern workplace, helping students gain exposure and confidence in real-world recruitment processes.",
    "A dedicated registration counter was arranged for each course, ensuring a smooth and organized registration process. Students from all departments actively participated, representing their respective courses with enthusiasm and professionalism. A beautifully designed welcome board at the entrance greeted all the participants, company representatives, and guests, setting a positive tone for the day.",
  ],
} as const;

export const MEGA_PLACEMENT_DRIVE_STATS: readonly StudentLifeStat[] = [
  {
    value: "500+",
    description: "Participants from multiple districts and colleges.",
  },
  {
    value: "13+",
    description: "Companies participating from both IT and Non-IT sectors.",
  },
  {
    value: "65+",
    description: "Students selected on the same day.",
  },
  {
    description:
      "Several students shortlisted for final rounds to be held at company offices.",
  },
];

export const MEGA_PLACEMENT_DRIVE_SHOWCASES: readonly StudentLifeShowcase[] = [
  {
    id: "hr-interview",
    hideBadge: true,
    titleVariant: "plain",
    badge: "Placement Cell",
    title: { lead: "HR Interview Process" },
    paragraphs: [
      {
        text: "The inaugural function concluded with a vote of thanks from the Placement Cell, acknowledging the contributions of all departments and coordinators. The Mega Placement Drive 2025 attracted over 500+ students from various colleges across Davangere, Shivamogga, Haveri, Ranebennur, and Chitradurga districts and taluks. Students from different educational backgrounds — including commerce, management, computer applications, and science — actively participated with enthusiasm and determination. The event created a platform for networking, career exploration, and skill demonstration.",
        emphasis: false,
      },
      {
        text: "A total of 13 companies, comprising both IT and Non-IT sectors, took part in the recruitment process. The participating organizations represented diverse industries such as information technology, finance, marketing, human resources, retail, and business process outsourcing (BPO).",
        emphasis: false,
      },
      {
        text: "Each company conducted pre-placement talks, aptitude assessments, group discussions, and personal interviews throughout the day. The structured schedule ensured smooth coordination between recruiters and participants. The companies appreciated the professionalism, confidence, and communication skills demonstrated by the students of BIHE and other participating colleges. The entire placement activity ran from 9:00 AM to 5:30 PM, with continuous engagement across various interview panels, counseling desks, and registration counters.",
        emphasis: false,
      },
      {
        text: "The Placement Cell volunteers, along with faculty coordinators, ensured seamless logistics and hospitality for company representatives. The students were guided at every stage — from resume submission to final interview rounds. Several companies offered on-the-spot offer letters to selected candidates, marking a significant achievement for the institution.",
        emphasis: false,
      },
    ],
    image: images.megaPlacementDrive.hrInterview,
    imageAlt: "HR interview session during the BIHE Mega Placement Drive 2025",
  },
  {
    id: "inaugural-ceremony",
    hideBadge: true,
    titleVariant: "plain",
    badge: "Placement Cell",
    title: { lead: "Inaugural Ceremony" },
    paragraphs: [
      {
        text: "The event began at 11:15 AM with a formal inauguration ceremony held in the college. The ceremony was presided over by Dr. B. Veerappa, Principal of BIHE, Dr. Triponandan, MBA Director along with the Management Committee, Faculty Members, Non-Teaching Staff, and The program started with the lighting of the lamp, symbolizing the enlightenment of knowledge and opportunities, followed by ribbon cutting to mark the official commencement of the placement drive.",
        emphasis: false,
      },
      {
        text: "The dignitaries also participated in the launch of the Placement Drive Logo, signifying the beginning of a new chapter in the institution's placement endeavors.",
        emphasis: false,
      },
    ],
    image: images.megaPlacementDrive.inauguralCeremony,
    imageAlt: "Lamp lighting ceremony at the BIHE Mega Placement Drive 2025 inaugural function",
  },
  {
    id: "company-hr-interviews",
    hideBadge: true,
    titleVariant: "plain",
    badge: "Placement Cell",
    title: { lead: "Company HRs Conducting the Interview Process" },
    paragraphs: [
      {
        text: "Invited HR representatives from participating companies conducting interviews for students during the Mega Placement Drive 2025 at Bapuji Institute of Hi-Tech Education, Davangere.",
        emphasis: false,
      },
    ],
    image: images.megaPlacementDrive.companyHrInterviews,
    imageAlt: "Company HR representatives briefing students during the BIHE Mega Placement Drive 2025",
  },
] as const;

export const MEGA_PLACEMENT_DRIVE_SPECIAL_THANKS = {
  title: "Special thanks were conveyed to:",
  items: [
    "Dr. B. Veerappa, Principal, for his continuous guidance and motivation.",
    "Dr. Thribhuvananda Swamy, MBA Director, for his leadership in organizing and coordinating the event.",
    "Management Members for providing all necessary facilities and resources.",
    "Teaching and Non-Teaching Staff for their teamwork and dedication.",
    "Placement Cell Members and Volunteers for their tireless efforts in managing the event.",
  ],
  closing:
    "The Placement Drive 2025 truly symbolized the transition from \"Campus to Corporate\", opening doors to new opportunities and setting a benchmark for future drives.",
} as const;
