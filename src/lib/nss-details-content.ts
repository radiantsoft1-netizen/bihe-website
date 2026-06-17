import { images } from "@/lib/images";
import type { StudentLifeShowcase } from "@/lib/student-life-showcase";

export const NSS_PAGE_LEAD =
  "National Service Scheme programmes, community outreach, and social responsibility initiatives at Bapuji Institute of Hi-Tech Education.";

export const NSS_INTRO_TITLE = "National Service Scheme (NSS) Details";

export const NSS_MOTTO_QUOTE = "Not Me But You";

export const NSS_EMBLEM = images.nssDetails.emblem;
export const NSS_EMBLEM_ALT = "National Service Scheme emblem";

export const NSS_ABOUT = {
  title: "About NSS",
  text: `The motto of NSS — "Not Me But You" — reflects the essence of democratic living and upholds the need for selfless service. NSS helps students develop appreciation for other people's points of view and show consideration for other living beings. The philosophy of NSS is well expressed in this motto, which underlines the belief that the welfare of an individual is ultimately dependent on the welfare of society as a whole. NSS volunteers strive for the well-being of the community.`,
} as const;

export const NSS_AIM = {
  title: "Aim",
  text: `The programme aims to inculcate social welfare in students and to provide service to society without bias. NSS volunteers work to ensure that everyone who is needy gets help to enhance their standard of living and lead a life of dignity. In doing so, volunteers learn from people in villages how to lead a good life despite a scarcity of resources. NSS also provides help in natural and man-made disasters by providing food, clothing, and first aid to victims.`,
} as const;

export const NSS_MOTTO = {
  title: "Motto",
  text: `The NSS motto "${NSS_MOTTO_QUOTE}" reflects democratic living and selfless service. Volunteers learn to place community welfare above individual interest while building empathy, civic responsibility, and leadership through meaningful social work.`,
} as const;

export const NSS_OBJECTIVES_TITLE = "Objectives";

export const NSS_OBJECTIVES = [
  "Understand the community in which they work.",
  "Understand themselves in relation to their community.",
  "Identify the needs and problems of the community and involve them in problem-solving.",
  "Develop among themselves a sense of social and civic responsibility.",
  "Utilize their knowledge in finding practical solutions to individual and community problems.",
  "Develop competence required for group-living and sharing of responsibilities.",
  "Gain skills in mobilizing community participation.",
  "Develop capacity to meet emergencies and natural disasters.",
] as const;

export const NSS_DETAILS_TITLE = "National Service Scheme (NSS)";

export const NSS_DETAILS_PARAGRAPHS = [
  `The National Service Scheme (NSS) is a centrally sponsored programme under the Ministry of Youth Affairs and Sports, Government of India, launched with the objective of developing the personality and character of students through voluntary community service. NSS aims to inculcate social responsibility, leadership qualities, discipline, and a spirit of selfless service among youth, guided by its motto, "${NSS_MOTTO_QUOTE}."`,
  "The National Service Scheme (NSS) Unit of Bapuji Institute of Hi-Tech Education (BIHE) was formally inaugurated on 10th October 2024 with great enthusiasm and active participation from students, faculty members, and invited dignitaries. The inauguration marked the beginning of structured community-oriented activities under the NSS banner and served as a platform to familiarize students with the ideals of voluntary service, civic responsibility, and national development. The programme aimed to inculcate values of empathy, leadership, discipline, and civic consciousness among students.",
  "Since its inception, the NSS Unit has been actively involved in organizing a variety of extension and outreach programmes that address social, environmental, health, and educational issues. Students actively participate in activities such as tree plantation drives, cleanliness campaigns, awareness rallies, blood donation camps, health and hygiene awareness programmes, road safety campaigns, environmental conservation initiatives, voter awareness programmes, and community development activities.",
  "The NSS unit also encourages students to engage with local communities through village visits, educational support programmes, and awareness campaigns on issues such as digital literacy, women's empowerment, substance abuse prevention, and public health. These activities help students understand societal challenges and contribute meaningfully towards community welfare.",
  "Special emphasis is placed on developing leadership skills, teamwork, communication abilities, and problem-solving capabilities among student volunteers. Through participation in NSS activities, students gain practical exposure to social realities and develop a sense of responsibility towards society and the nation.",
  "The institution regularly observes important national and international days, including Independence Day, Republic Day, National Youth Day, International Yoga Day, World Environment Day, Constitution Day, and National Voters' Day. These programmes promote awareness of national values, constitutional responsibilities, environmental sustainability, and healthy lifestyles.",
  "BIHE encourages NSS volunteers to participate in university-level, state-level, and national-level NSS programmes, camps, and workshops. Such participation provides students with opportunities to interact with peers from diverse backgrounds, broaden their perspectives, and enhance their leadership and organizational skills.",
  "Through its NSS activities, Bapuji Institute of Hi-Tech Education remains committed to nurturing socially responsible citizens who are dedicated to community service, nation-building, and sustainable development. The NSS Unit continues to play a vital role in bridging the gap between academic learning and societal engagement, thereby contributing to the holistic development of students.",
] as const;

export const NSS_COMMITTEE_TITLE = "The Details of Committee as given below";

export const NSS_COMMITTEE_MEMBERS = [
  {
    slNo: "01",
    name: "Dr. B. Veerappa",
    designation: "President",
    role: "Principal",
  },
  {
    slNo: "02",
    name: "Siddalingappa K",
    designation: "Program Officer",
    role: "Vice Principal",
  },
  {
    slNo: "03",
    name: "Sadashivappa G R",
    designation: "Program Officer",
    role: "Physical Director",
  },
] as const;

export const NSS_ACTIVITIES_TITLE = "The Following Activities Conducted By NSS Unit";

export const NSS_ACTIVITIES = [
  { slNo: "01", event: "Demonstration on Life Saving", date: "07-12-2022" },
  { slNo: "02", event: "Swamy Vivekananda Jayanti", date: "12-01-2023" },
  { slNo: "03", event: "Republic Day Celebration", date: "26-01-2023" },
  { slNo: "04", event: "Blood Donation Camp", date: "18-05-2023" },
  {
    slNo: "05",
    event: "Cleaning the College Campus by Sweeping",
    date: "19-05-2023",
  },
] as const;

export type NssReportSection = {
  id: string;
  title: string;
  paragraphs: readonly string[];
};

export const NSS_REPORT_SECTIONS: readonly NssReportSection[] = [
  {
    id: "welcome",
    title: "Welcome & Commencement",
    paragraphs: [
      "The programme commenced with a warm welcome address by the NSS Programme Officer, Mr. Sidalingappa K, who briefed the gathering about the importance of NSS in higher education. This was followed by the lighting of the ceremonial lamp, symbolizing knowledge, service, and enlightenment, and the rendering of the NSS Song, which energized the participants and set a purposeful tone for the event.",
    ],
  },
  {
    id: "principal",
    title: "Principal's Address",
    paragraphs: [
      "The Principal and Head of the Institution, Dr. B. Veerappa, addressed the gathering and emphasized the crucial role of youth in community development and social upliftment. He highlighted how NSS activities help bridge the gap between academic learning and real-life societal needs, enabling students to become socially responsible citizens.",
    ],
  },
  {
    id: "introduction",
    title: "Introduction to NSS",
    paragraphs: [
      "A detailed overview of the National Service Scheme was presented, covering its history, objectives, organizational structure, and the motto \"Not Me But You.\" A short video presentation and an informative speech helped students understand the scope and impact of NSS activities across the nation.",
    ],
  },
  {
    id: "chief-guest",
    title: "Chief Guest's Address",
    paragraphs: [
      "The Chief Guest, Dr. B. Veerappa, Principal, inspired the students by sharing real-life examples of impactful NSS initiatives. He stressed the importance of volunteerism, leadership, and teamwork in bringing about positive social change and encouraged students to actively engage in NSS activities.",
    ],
  },
  {
    id: "oath",
    title: "Volunteer Oath Ceremony",
    paragraphs: [
      "A significant highlight of the programme was the NSS Volunteer Oath Ceremony, during which all student volunteers pledged to dedicate themselves to social service, uphold national values, and work towards the welfare of society with sincerity and commitment.",
    ],
  },
  {
    id: "cultural",
    title: "Cultural Programme",
    paragraphs: [
      "The students presented meaningful cultural performances including songs, skits, and a street play focusing on contemporary social issues such as cleanliness, education, health awareness, environmental protection, and social harmony. These performances effectively conveyed social messages and showcased students' creativity and social sensitivity.",
    ],
  },
  {
    id: "plantation",
    title: "Tree Plantation Drive",
    paragraphs: [
      "As a symbolic and practical beginning to NSS activities, a Tree Plantation Drive was conducted within the campus premises. The activity emphasized the importance of environmental conservation and sustainability, reinforcing the NSS commitment towards ecological responsibility.",
    ],
  },
];

export const NSS_PROGRAMME_TITLE = "NSS Inauguration Programme";

export const NSS_ACTIVITY_SHOWCASES: readonly StudentLifeShowcase[] = [
  {
    id: "community-awareness",
    hideBadge: true,
    titleVariant: "plain",
    badge: "Student Life",
    title: { lead: "Environmental awareness" },
    paragraphs: [
      {
        text: "The NSS unit of the college conducted a tree plantation drive to promote environmental awareness and sustainability. Students actively participated in planting saplings within the campus and nearby areas. This initiative aimed to create a greener environment and instill a sense of responsibility towards nature among the students.",
        emphasis: false,
      },
    ],
    image: images.nssDetails.gallery1,
    imageAlt: "NSS volunteers participating in a tree plantation drive for environmental awareness",
  },
  {
    id: "campus-outreach",
    hideBadge: true,
    titleVariant: "plain",
    badge: "Student Life",
    title: { lead: "Eye check-up camp" },
    paragraphs: [
      {
        text: "The college organized an eye check-up camp in collaboration with medical professionals to ensure students' eye health. Students and staff participated in the screening, which included vision tests and eye health assessments. The initiative aimed to raise awareness about eye care and provide guidance for maintaining good vision.",
        emphasis: false,
      },
    ],
    image: images.nssDetails.gallery2,
    imageAlt: "NSS students and staff at an eye check-up camp on campus",
  },
  {
    id: "social-service",
    hideBadge: true,
    titleVariant: "plain",
    badge: "Student Life",
    title: { lead: "Swachh abhiyan campaign" },
    paragraphs: [
      {
        text: "Students of the college actively participated in the Swachh Abhiyan campaign to promote cleanliness and hygiene within the campus and surrounding areas. They took part in cleaning drives, proper waste disposal, and spreading awareness about maintaining a clean environment. This initiative encouraged a sense of social responsibility and contributed to creating a cleaner and healthier campus.",
        emphasis: false,
      },
    ],
    image: images.nssDetails.gallery3,
    imageAlt: "NSS students participating in a Swachh Abhiyan cleanliness campaign",
  },
] as const;

export const NSS_BANNER_IMAGE = images.nssDetails.heroBanner;
export const NSS_BANNER_IMAGE_ALT =
  "BIHE NSS volunteers at a World Environment Day programme on campus";

export const NSS_FEATURED_IMAGE = images.nssDetails.featuredEvent;
export const NSS_FEATURED_IMAGE_ALT =
  "NSS volunteers seated during an institutional programme at BIHE";
