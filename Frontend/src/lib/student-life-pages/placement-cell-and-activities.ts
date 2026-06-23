import { images } from "@/lib/images";
import { MEGA_PLACEMENT_DRIVE_2025_PATH } from "@/lib/placement-routes";
import type { StudentLifeRichPageConfig, StudentLifePageRefCard } from "./types";

export const PLACEMENT_CELL_PAGE_REF_CARDS: readonly StudentLifePageRefCard[] = [
  {
    id: "mega-placement-drive-2025",
    title: "Mega Placement Drive 2025",
    eyebrow: "Campus to Corporate · Batch 1",
    description: "26th September 2025 · BIHE Campus, Davangere",
    dateLabel: "26 SEP",
    yearLabel: "2025",
    href: MEGA_PLACEMENT_DRIVE_2025_PATH,
  },
] as const;

export const PLACEMENT_CELL_INTRO_SLIDER_IMAGES = [
  {
    src: images.placement.bcaBatch202526,
    alt: "BCA Batch 2025-26 placement congratulations poster with selected students and recruiter logos",
    fit: "contain" as const,
    caption: "BCA Batch 2025-26 · Placement Success",
  },
  {
    src: images.megaPlacementDrive.offerLettersBanner,
    alt: "Students receiving offer letters during the Mega Placement Drive at BIHE",
    caption: "Mega Placement Drive 2025",
  },
  {
    src: images.megaPlacementDrive.inauguralCeremony,
    alt: "Inaugural ceremony of the Mega Placement Drive at BIHE campus",
    caption: "Campus Recruitment Drive",
  },
  {
    src: images.megaPlacementDrive.companyHrInterviews,
    alt: "Company HR representatives conducting interviews with BIHE students",
    caption: "Industry Interview Sessions",
  },
] as const;

export const PLACEMENT_CELL_PAGE: StudentLifeRichPageConfig = {
  slug: "placement-cell-and-activities",
  currentPage: "Placement Cell & Activities",
  title: "Placement Cell & Activities",
  lead:
    "The Placement Cell guides students towards successful careers through training, industry interaction, and campus recruitment.",
  intro: {
    kicker: "Placement Cell",
    title: "Placement Cell and its activities",
    paragraphs: [
      "The Placement Cell of Bapuji Institute of Hi-Tech Education plays a vital role in guiding students towards successful careers and employment opportunities. The cell acts as a bridge between students and industries by facilitating campus recruitment and career-oriented activities. It works continuously to enhance students' employability skills and prepare them for the competitive job market.",
      "The Placement Cell organizes campus drives, job fairs, and recruitment programs in collaboration with reputed companies from various sectors. It conducts regular training programs such as aptitude training, communication skills, resume writing, interview techniques, and personality development to build confidence among students. Industrial visits, internships, guest lectures, and career guidance sessions are also arranged to expose students to real-world industry practices.",
      "All our committee members will take responsibilities and participation in all the activities of Placement committee to make all the events to get success in this committee.",
    ],
    sliderImages: PLACEMENT_CELL_INTRO_SLIDER_IMAGES,
  },
  tables: [
    {
      id: "committee",
      title: "Placement Committee",
      caption: "Placement cell committee members",
      columns: [
        { key: "slNo", header: "SL. NO." },
        { key: "name", header: "Name" },
        { key: "designation", header: "Designation" },
        { key: "profession", header: "Profession" },
      ],
      rows: [
        { id: "1", slNo: "01", name: "Dr. B. Veerappa", designation: "Chairperson", profession: "Principal" },
        { id: "2", slNo: "02", name: "Vageesh M V", designation: "Co-ordinator", profession: "Asst. Professor" },
        { id: "3", slNo: "03", name: "Jyothi N", designation: "Convener", profession: "Asst. Professor" },
        { id: "4", slNo: "04", name: "Nandesh G N", designation: "Member", profession: "Asst. Professor" },
        { id: "5", slNo: "05", name: "Nikhil S N", designation: "Member", profession: "Asst. Professor" },
        { id: "6", slNo: "06", name: "Darshan L", designation: "Member", profession: "Asst. Professor" },
      ],
    },
  ],
  pageRefCards: PLACEMENT_CELL_PAGE_REF_CARDS,
};
