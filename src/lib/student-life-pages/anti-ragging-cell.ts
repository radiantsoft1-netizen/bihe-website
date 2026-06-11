import { images } from "@/lib/images";
import type { StudentLifeRichPageConfig } from "./types";

export const ANTI_RAGGING_PAGE: StudentLifeRichPageConfig = {
  slug: "anti-ragging-cell",
  currentPage: "Anti-Ragging Cell",
  title: "Anti-Ragging Cell",
  lead:
    "Zero-tolerance anti-ragging measures, awareness programmes, and student protection on campus.",
  banner: {
    src: images.studentLife.antiRaggingBanner,
    alt: "Anti-ragging awareness programme at BIHE",
    kicker: "Student Life",
    overlayTitle: "Anti-Ragging Cell",
  },
  intro: {
    title: "Anti-Ragging Cell",
    paragraphs: [
      "Bapuji Institute of Hi-Tech Education maintains a zero-tolerance policy towards ragging in any form. Ragging is strictly prohibited within the campus, hostels, and all institute-related activities, in accordance with UGC regulations and Supreme Court guidelines.",
      "The institute is committed to providing a safe, respectful, and inclusive learning environment for all students. An Anti-Ragging Committee and Anti-Ragging Squad have been constituted to prevent, monitor, and address any incidents promptly. Strict disciplinary action, including suspension or expulsion, will be taken against those found guilty of ragging.",
      "All students are required to submit an Anti-Ragging Affidavit at the time of admission. New students are encouraged to report any instance of ragging without fear, as the institute ensures confidentiality and protection for complainants.",
      "Bapuji Institute of Hi-Tech Education strives to promote discipline, mutual respect, and harmony among students to foster academic excellence and personal growth.",
    ],
  },
  tables: [
    {
      id: "committee",
      title: "Anti-Ragging Cell Committee List",
      caption: "Anti-ragging committee members",
      columns: [
        { key: "slNo", header: "SL. NO." },
        { key: "name", header: "Name" },
        { key: "designation", header: "Designation" },
        { key: "profession", header: "Profession" },
        { key: "mobile", header: "Mobile" },
        { key: "email", header: "Email" },
      ],
      rows: [
        { id: "1", slNo: "01", name: "Dr. B. veerappa", designation: "Chairperson", profession: "Principal", mobile: "9844260695", email: "bveerappa@gmail.com" },
        { id: "2", slNo: "02", name: "Nagaraj B S", designation: "Co-ordinator", profession: "Asst.Professor", mobile: "9886696272", email: "reach2bs@gmail.com" },
        { id: "3", slNo: "03", name: "Bakkesh K S", designation: "Program Advisor", profession: "Asst.Professor", mobile: "9008765418", email: "bakkesh@gmail.com" },
        { id: "4", slNo: "04", name: "Sidasivappa G R", designation: "Convener", profession: "Physical Director", mobile: "9986917064", email: "harvikags2015@gmail.com" },
        { id: "5", slNo: "05", name: "Manjunatha K V", designation: "Member", profession: "Asst.Professor", mobile: "9972474118", email: "srigurukarunya@gmail.com" },
        { id: "6", slNo: "06", name: "Prashanthini B M", designation: "Member", profession: "Asst.Professor", mobile: "9206617784", email: "prashanthinibalegar@gmail.com" },
        { id: "7", slNo: "07", name: "Anup K G", designation: "Member", profession: "Asst.Professor", mobile: "8296496397", email: "anupalira@gmail.com" },
      ],
    },
  ],
  sections: [
    {
      id: "powers",
      title: "Powers and Functions of the Anti-Ragging Committee",
      bullets: [
        "To uphold and comply with the directions of the Hon'ble Supreme Court and be vigilant on any acts amounting to ragging.",
        "To publicize to all students and prevalent directives and the actions that can be taken against those indulging in ragging.",
        "To consider the complaints received from the students and conduct enquiry and submit report to the Anti-Ragging Committee along with punishment recommended for the offenders.",
        "To oversee the procedure of obtaining undertaking from the students in accordance with the provisions.",
        "To conduct workshops against ragging and orient the students.",
        "To provide students the information pertaining to contact address and telephone numbers of the person(s) identified to receive complaints/distress calls.",
        "To offer services of counselling and create awareness to the students.",
        "To take all necessary measures for prevention of Ragging inside the Campus/Hostels.",
      ],
    },
    {
      id: "procedure",
      title: "Anti Ragging Awareness Programme",
      image: {
        src: images.antiRagging.awarenessProgramme,
        alt: "Students attending the anti-ragging Program",
      },
      paragraphs: [
        "The institution follows a strict zero-tolerance policy towards ragging and is committed to providing a safe and supportive learning environment for all students. Various preventive measures such as round-the-clock availability of hostel wardens, display of anti-ragging helpline numbers, CCTV surveillance, awareness programmers, and orientation sessions are implemented regularly. An active Anti-Ragging Committee functions as per UGC regulations to address complaints promptly and ensure strict action against offenders. Through continuous monitoring, counselling, and student participation, the college strives to create a ragging-free campus that promotes discipline, mutual respect, and holistic student development.",
      ],
    },
    {
      id: "objectives",
      title: "Procedures for addressing incidence of Ragging",
      paragraphs: [
        "The information on ragging can be received in the following manner:",
      ],
      bullets: [
        "Through the notified contact details of the Committee members.",
        "Through any other member of the College.",
        "In the event of receipt of information of ragging by any of the officers mentioned above, he/she will promptly alert/inform the Chairman of the Anti-Ragging Committee of the College or any of its members. The activity shall be completed, at the most, within two hours of receipt of this information.",
        "The Anti-Ragging Committee of the College shall promptly conduct a preliminary on the spot enquiry and collect details of the incident as available prima facie. The preliminary investigation and details of the incident shall be immediately brought to the notice of the Chairman of the College. The activity shall be completed, at the most, within twenty-four hours of receipt of information.",
        "The Anti-Ragging Committee of the College shall promptly conduct enquiry into the incident as per provisions laid down in the UGC Regulations.",
        "The Anti-Ragging Committee of the College shall complete the enquiry and submit its report along with recommendations to the Chairman of the Anti-Ragging Committee of the College within fifteen days of the incident.",
        "Thereafter, the said report and recommendations shall be considered by the Anti-Ragging Committee for deciding the punishment on the erring students in terms of provisions contained at Clause 9.1 of the UGC Regulations.",
      ],
    },
    {
      id: "objectives-academic-session",
      title: "Objective of the awareness session",
      bullets: [
        "Ragging's definition.",
        "To provide knowledge on how to identify ragging activities and role of anti-ragging squad.",
        "To provide knowledge on how to file affidavit of anti-ragging on UGC portal.",
        "To inspire them to cooperate with anti-ragging committee to keep campus ragging free.",
      ],
    },
  ],
};
