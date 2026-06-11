import { images } from "@/lib/images";

export const BCA_PAGE_LEAD =
  "Prepare for productive careers in software, information technology, and academia through industry-aligned BCA education at BIHE.";

export const BCA_PROGRAMME = {
  title: "Department of BCA",
  description:
    "Bachelor of Computer Applications (BCA) prepares undergraduate students for productive careers in software, information technology, and academia through industry-aligned teaching, practical exposure, and emerging technology training at BIHE.",
  image: images.bcaLab,
  imageAlt: "BCA students learning in a modern computer laboratory at BIHE",
} as const;

export const BCA_STATS = [
  { value: "180", label: "Annual Intake", suffix: "+" },
  { value: "3", label: "Year Programme", suffix: " Yrs" },
  { value: "UG", label: "Level", suffix: "" },
  { value: "DAVV", label: "Affiliation", suffix: "" },
] as const;

export const BCA_TECH_TAGS = [
  "Cloud Computing",
  "Cyber Security",
  "Data Analysis",
  "Machine Learning",
  "Artificial Intelligence",
] as const;

export const BCA_PROGRAMME_SHOWCASE = {
  ariaLabel: "BCA programme",
  badge: "Undergraduate Programme",
  headline: "BCA",
  subline: "Bachelor of Computer Applications · Department of BCA",
  glass: {
    title: "BCA Laboratory",
    subtitle: "Hands-on IT learning at BIHE",
    statValue: "180+",
    statLabel: "Annual Intake",
  },
  stats: BCA_STATS,
  tagsLabel: "Emerging Technologies",
  tags: BCA_TECH_TAGS,
  image: BCA_PROGRAMME.image,
  imageAlt: BCA_PROGRAMME.imageAlt,
} as const;

export const BCA_ELIGIBILITY = [
  {
    id: "general",
    title: "General Eligibility",
    text: "10+2 from recognized Board / Council with minimum 50% marks",
  },
  {
    id: "reserved",
    title: "Reserved Category",
    text: "A relaxation of 5% marks or its equivalent grade may be allowed for those belonging to SC / ST.",
  },
] as const;

export const BCA_DEPARTMENT = {
  id: "bca",
  label: "Admissions process",
  title: "Department of BCA",
  paragraphs: [
    "The wider objective is to prepare undergraduate students of BCA for productive careers in software industry/information technology/academia by providing an outstanding environment for teaching and research in the core and emerging areas of the discipline.",
    "With the fast-growing demand for computer skills and applications, the popularity of computers in education has also increased rapidly over the past few years. Students prefer to take up computers as their specialized subjects of study or pursue their educational careers in Computer Applications. India has become an IT hub and Indian computer professionals are proving their steps in the present global market.",
    "To meet the demand of the entire socioeconomic spectrum, a number of colleges now offer BCA and MCA courses all over India to train and educate fresh talent to become technologically strong and well-equipped to face the challenges of today and in future. Bachelor of Computer Applications (BCA) pertains to an undergraduate program where students are exposed to various areas of computer applications. At the same time the students retain the changes with the latest developments taking place in the industry.",
  ],
} as const;

export const BCA_PROGRAM_TABLE = {
  columns: [
    { key: "level", header: "Level" },
    { key: "programName", header: "Name of the Program" },
    { key: "duration", header: "Duration" },
    { key: "intake", header: "Intake" },
  ],
  rows: [
    {
      id: "bca-ug",
      level: "UG",
      programName: "BCA",
      duration: "3 Years",
      intake: "180",
    },
  ],
} as const;

export const BCA_HIGHLIGHTS = [
  {
    id: "integrity",
    title: "Integrity",
    text: "Ethics and values are an integral part of cutting-edge competitiveness.",
    tone: "navy",
  },
  {
    id: "trust",
    title: "Trustworthiness",
    text: "Honesty and integrity are non-negotiable.",
    tone: "maroon",
  },
  {
    id: "dedication",
    title: "Dedication",
    text: "Hard work and learning can and should be enjoyable.",
    tone: "navy",
  },
  {
    id: "excellence",
    title: "Excellence",
    text: "Passion, commitment, and a single-minded pursuit of excellence will make all of us true leaders.",
    tone: "maroon",
  },
] as const;

export const BCA_BENEFITS = [
  "Gain education with sound theoretical knowledge absorbed with practical experience in a working environment.",
  "Equip yourself with additional skills required to compete in a global market.",
  "Develop the personality of an innovative thinker and a successful person in society.",
  "Refresh your eyes and your lungs with lots of greenery and fresh air.",
  "Develop excellence in co-curricular and extra-curricular activities.",
  "Information Technology Centre established to nurture new technologies in the area of Information Science.",
  "Provides knowledge to students about new technologies such as Cloud Computing, Cyber Security, Data Analysis, Machine Learning, and Artificial Intelligence, etc.",
] as const;
