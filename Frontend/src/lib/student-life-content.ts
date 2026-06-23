import { STUDENT_LIFE_SUBMENU } from "@/lib/student-life-submenu";

export type StudentLifePageConfig = {
  slug: string;
  currentPage: string;
  title: string;
  lead: string;
  introBadge: string;
  introTitle: string;
  paragraphs: string[];
};

const STUDENT_LIFE_ROUTED_SLUGS = STUDENT_LIFE_SUBMENU.filter((item) =>
  item.href.startsWith("/student-life/"),
).map((item) => item.slug);

function pageFromSubmenu(slug: string, paragraphs: string[]): StudentLifePageConfig {
  const item = STUDENT_LIFE_SUBMENU.find((entry) => entry.slug === slug);

  if (!item) {
    throw new Error(`Missing student life submenu entry for slug: ${slug}`);
  }

  return {
    slug,
    currentPage: item.label,
    title: item.label,
    lead: item.description,
    introBadge: "Student Life",
    introTitle: item.label,
    paragraphs,
  };
}

const STUDENT_LIFE_PAGE_CONTENT: Record<string, StudentLifePageConfig> = {
  "sports-facilities": pageFromSubmenu("sports-facilities", [
    "BIHE provides sports facilities that encourage physical fitness, teamwork, and participation in indoor and outdoor games. Students are motivated to balance academics with active campus life through regular practice and institutional sports events.",
    "Sports activities at the institute support holistic development and help students build discipline, leadership, and collaborative skills beyond the classroom.",
  ]),
  "nss-details": pageFromSubmenu("nss-details", [
    "The National Service Scheme (NSS) at Bapuji Institute of Hi-Tech Education enables students to contribute to community development while developing social responsibility and leadership qualities.",
    "NSS units organise awareness drives, cleanliness campaigns, blood donation programmes, and outreach activities that connect students with real-world social challenges.",
  ]),
  "hostel-facilities": pageFromSubmenu("hostel-facilities", [
    "Hostel facilities at BIHE offer safe and comfortable accommodation for outstation students with essential amenities that support focused study and daily campus life.",
    "Residential arrangements are maintained with attention to security, hygiene, and a supportive environment for boys and girls pursuing undergraduate programmes.",
  ]),
  "placement-cell-and-activities": pageFromSubmenu("placement-cell-and-activities", [
    "The Training & Placement Cell coordinates career guidance, skill development programmes, internships, and campus recruitment for BCA and B.Com students.",
    "Placement activities include industry interactions, aptitude training, resume preparation support, and coordination with recruiters to help students transition into professional careers.",
  ]),
  "student-grievance-redressal-committee": pageFromSubmenu(
    "student-grievance-redressal-committee",
    [
      "The Student Grievance Redressal Committee provides a structured mechanism for students to raise academic and campus-related concerns and seek fair resolution.",
      "The committee functions in accordance with institutional policies to ensure transparency, timely redressal, and a supportive learning environment.",
    ],
  ),
  "health-facilities": pageFromSubmenu("health-facilities", [
    "Health facilities at BIHE include first-aid support on campus along with health awareness programmes for students and staff.",
    "The institution encourages preventive health practices and provides guidance and referral assistance when specialised medical attention is required.",
  ]),
  "anti-ragging-cell": pageFromSubmenu("anti-ragging-cell", [
    "The Anti-Ragging Cell at BIHE enforces a zero-tolerance policy against ragging and promotes a safe, respectful campus environment for all students.",
    "Awareness programmes, complaint mechanisms, and disciplinary procedures are in place to prevent ragging and protect student welfare.",
  ]),
  "equal-opportunity-cell": pageFromSubmenu("equal-opportunity-cell", [
    "The Equal Opportunity Cell works to ensure that all students have fair access to academic resources, campus facilities, and institutional opportunities.",
    "The cell promotes inclusion and supports measures that reduce barriers to participation in teaching, learning, and campus activities.",
  ]),
  "socio-economically-disadvantaged-groups": pageFromSubmenu(
    "socio-economically-disadvantaged-groups",
    [
      "BIHE implements support measures for students from socio-economically disadvantaged groups through welfare schemes, guidance, and institutional assistance programmes.",
      "These initiatives aim to improve access, retention, and academic success for students who may face financial or social barriers to higher education.",
    ],
  ),
  "facilities-for-differently-abled-students": pageFromSubmenu(
    "facilities-for-differently-abled-students",
    [
      "The institute provides facilities and support services for differently-abled students to ensure accessible learning and comfortable participation in campus life.",
      "Reasonable accommodations, assistance, and inclusive practices are encouraged across academic and administrative processes.",
    ],
  ),
  "computer-lab": pageFromSubmenu("computer-lab", [
    "Computer laboratories at BIHE are equipped with modern systems and software tools that support practical learning, programming assignments, and project work.",
    "Labs are maintained to provide students with hands-on experience in information technology and application development under faculty supervision.",
  ]),
  auditorium: pageFromSubmenu("auditorium", [
    "The BIHE auditorium is a spacious venue for seminars, guest lectures, cultural programmes, and major institutional events.",
    "It serves as a central space for academic presentations, celebrations, and community gatherings that enrich student life on campus.",
  ]),
  canteen: pageFromSubmenu("canteen", [
    "The campus canteen provides hygienic and affordable meal options for students and staff throughout the academic day.",
    "It offers a convenient dining space that supports the daily routines of students living on and off campus.",
  ]),
  "youth-red-cross": pageFromSubmenu("youth-red-cross", [
    "Youth Red Cross activities at BIHE promote humanitarian values, health education, and voluntary service among students.",
    "Students participate in first-aid awareness, blood donation drives, and community welfare initiatives aligned with Red Cross principles.",
  ]),
};

export const STUDENT_LIFE_PAGE_SLUGS = STUDENT_LIFE_ROUTED_SLUGS as readonly string[];

export function getStudentLifePage(slug: string): StudentLifePageConfig | undefined {
  return STUDENT_LIFE_PAGE_CONTENT[slug];
}
