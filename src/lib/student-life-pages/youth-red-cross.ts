import { images } from "@/lib/images";
import type { StudentLifeRichPageConfig } from "./types";

export const YOUTH_RED_CROSS_PAGE: StudentLifeRichPageConfig = {
  slug: "youth-red-cross",
  currentPage: "Youth Red Cross",
  title: "Youth Red Cross",
  lead:
    "Youth Red Cross activities promoting health, humanitarian service, and community care.",
  banner: {
    src: images.studentLife.yrcBanner,
    alt: "Youth Red Cross logo",
    kicker: "Student Life",
    overlayTitle: "Youth Red Cross",
    imageFit: "contain",
  },
  intro: {
    title: "Youth Red Cross",
    paragraphs: [
      "The Youth Red Cross is a constituent of the Indian Red Cross Society (Karnataka). A group movement organized at the initial stages for students between 18 to 25 years of age. We in our college, have a Youth Red Cross wing. Any student of any discipline can become a YRC member. Our YRC unit has 100 members, under the guidance of a programme officer.",
    ],
  },
  postIntroSections: [
    {
      id: "objectives",
      title: "Objectives of YRC",
      bullets: [
        "Protection of health and life.",
        "Service to the sick and suffering.",
        "Promotion of National and International friendship.",
        "Promotion of potentialities of the Youth to enable them to render skilled philanthropic service toned up by a sense of self-sacrifice, for the mitigation of suffering of the needy and the distressed.",
        "Promotion of health, hygiene and sanitation and cognate subjects among the members of the community for prevention of diseases and mitigation of suffering.",
        "Promotion of motivations among the youth for fostering friendship and fraternity at the national and international level.",
        "Promotion of qualities of leadership and traits of personality among the youth.",
        "Promotion of spirit of self-reliance and dignity of labor among the youth.",
        "Promotion of training in various skills to render qualified service to the needy.",
        "Promotion of factors which may contribute to the establishment of peace at the national and international level.",
      ],
      bulletColumns: 2,
    },
  ],
  showcase: {
    id: "yrc-officer",
    hideBadge: true,
    titleVariant: "plain",
    badge: "Student Life",
    title: {
      lead: "YRC Officer",
    },
    paragraphs: [
      {
        text: "The YRC wing is headed by Asst.Prof. Naveen H, who is Post graduated from VTU, Master of Computer Applications.",
        emphasis: false,
      },
    ],
    image: images.studentLife.yrcOfficer,
    imageAlt: "Naveen H, Youth Red Cross Program Officer at BIHE",
    profile: {
      name: "Naveen H",
      role: "Asst. Professor",
      detail: "M.C.A., VTU",
    },
  },
  tables: [
    {
      id: "committee",
      title: "Youth Red Cross Advisory Committee",
      caption: "YRC advisory committee members",
      columns: [
        { key: "slNo", header: "SL NO" },
        { key: "name", header: "Name" },
        { key: "yrcDesignation", header: "YRC Designation" },
        { key: "collegeDesignation", header: "Designation in college" },
      ],
      rows: [
        { id: "1", slNo: "01", name: "Dr. B. veerappa", yrcDesignation: "President", collegeDesignation: "Principal" },
        { id: "2", slNo: "02", name: "Naveen H", yrcDesignation: "Program officer", collegeDesignation: "Asst.Professor" },
        { id: "3", slNo: "03", name: "Manjunatha KV", yrcDesignation: "Representative", collegeDesignation: "Asst.Professor" },
        { id: "4", slNo: "04", name: "Karthikeya Y", yrcDesignation: "Vice President", collegeDesignation: "Student" },
        { id: "5", slNo: "05", name: "Chandana R Vatan", yrcDesignation: "Secretary", collegeDesignation: "Student" },
        { id: "6", slNo: "06", name: "Ravi kumar AJ", yrcDesignation: "District Representative", collegeDesignation: "YRC Officer" },
      ],
    },
    {
      id: "activities",
      title: "Activities Conducted by Youth Red Cross Unit",
      caption: "Youth Red Cross unit activities",
      columns: [
        { key: "slNo", header: "SL NO" },
        { key: "event", header: "Activities" },
        { key: "date", header: "Date" },
      ],
      rows: [
        { id: "1", slNo: "01", event: "Covid-19 Test", date: "04-12-2020 and 07-12-2020" },
        {
          id: "2",
          slNo: "02",
          event: "Essay competition The Roll of Republic for the overall country Development",
          date: "11-01-2021",
        },
        { id: "3", slNo: "03", event: "Essay competition November Month", date: "15-11-2021" },
        { id: "4", slNo: "04", event: "YRC Inauguration for the academic year 2021-22", date: "17-12-2021" },
        {
          id: "5",
          slNo: "05",
          event: "Student Awareness Program Physical and Psychological well-being",
          date: "06-01-2022",
        },
        { id: "6", slNo: "06", event: "Celebrated world Environment Day", date: "08-06-2022" },
        {
          id: "7",
          slNo: "07",
          event: "Essay competition The effect of drugs on younger generation and the solution",
          date: "27-06-2022",
        },
        { id: "8", slNo: "08", event: "Blood Donation Camp", date: "30-06-2022" },
        { id: "9", slNo: "09", event: "GENEVA CONVENTION DAY", date: "12-08-2022" },
        { id: "10", slNo: "10", event: "75th Anniversary of Indian Independence", date: "11-08-2022" },
        { id: "11", slNo: "11", event: "Karnataka Rajyotsava 2022", date: "01-09-2022" },
        {
          id: "12",
          slNo: "12",
          event: "The Roll of Red Cross for the Overall country Development",
          date: "14-11-2022",
        },
        { id: "13", slNo: "13", event: "Blood Donation Camp", date: "18-05-2023" },
      ],
    },
  ],
};
