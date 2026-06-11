import { images } from "@/lib/images";
import type { StudentLifeRichPageConfig } from "./types";

export const COMPUTER_LAB_PAGE: StudentLifeRichPageConfig = {
  slug: "computer-lab",
  currentPage: "Computer Lab",
  title: "Computer Lab",
  lead:
    "Modern computer laboratories with updated systems for practical learning and projects.",
  banner: {
    src: images.studentLife.computerLabBanner,
    alt: "BIHE computer laboratory with students at work",
    kicker: "Student Life",
    overlayTitle: "Computer Lab",
  },
  intro: {
    title: "Computer Lab",
    paragraphs: [
      "Keeping in view the growing importance of computer learning, the college has established a well-equipped set of five computer labs to keep students updated with the latest computer knowledge. The labs can accommodate 160 students at a time. The college provides Hi-Tech computers with LAN and internet services through wireless connectivity, as well as LCD projection systems, hardware and software tools, printers, and scanners.",
      "Students, faculty, and staff have access to the computer labs, which provide the tools and technologies needed to produce websites, edit papers, complete class assignments, communicate via email, conduct data analysis, and access library resources. Microsoft Windows software is available for word processing, statistics, spreadsheets, and database management. A variety of graphics and website-creation software programs are also available.",
      "The computers in the lab are well-configured and suitable for users. These systems are upgraded as per the university syllabus requirements and software version updates.",
      "The computers and related electronic equipment are tested and maintained on a scheduled basis to keep the facility up and running.",
    ],
  },
  splitPanel: {
    title: "Lab Rules",
    bullets: [
      "Students must wear uniform, apron, identity card, and name plate while entering the lab.",
      "Students must bring manual and observation book compulsory.",
      "Students must be present five minutes early before starting the lab.",
      "Students must maintain discipline and silence in the lab.",
      "Students must take permission from faculty before leaving the lab.",
      "Mobile phones are strictly prohibited in the lab.",
      "Students must shut down the computer after completion of the lab.",
    ],
  },
  tables: [
    {
      id: "inventory",
      title: "Lab Inventory",
      caption: "Computer lab inventory at BIHE",
      columns: [
        { key: "slNo", header: "SL NO" },
        { key: "labNo", header: "Lab No" },
        { key: "computers", header: "No Of Computers" },
      ],
      rows: [
        { id: "1", slNo: "01", labNo: "LAB – I", computers: "36" },
        { id: "2", slNo: "02", labNo: "LAB – II", computers: "36" },
        { id: "3", slNo: "03", labNo: "LAB – III", computers: "28" },
        { id: "4", slNo: "04", labNo: "LAB – IV", computers: "30" },
        { id: "5", slNo: "05", labNo: "LAB – V", computers: "30" },
        { id: "6", slNo: "", labNo: "Total", computers: "160" },
      ],
    },
    {
      id: "hours",
      title: "Lab Timings And Batches",
      caption: "Computer lab working hours",
      columns: [
        { key: "days", header: "Days" },
        { key: "hours", header: "Lab Working Hours" },
      ],
      rows: [
        {
          id: "1",
          days: "Monday to Friday",
          hours: "08:30 AM – 01:30 PM\n02:30 PM – 05:30 PM",
        },
        { id: "2", days: "Saturday", hours: "08:30 AM – 01:30 PM" },
      ],
    },
  ],
};
