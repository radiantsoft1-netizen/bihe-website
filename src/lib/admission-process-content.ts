import { images } from "@/lib/images";

export type AdmissionProcessImageCard = {
  image: string;
  imageAlt: string;
  profile: {
    name: string;
    titleLine: string;
    qualifications: string;
  };
  tone?: "gold" | "lavender" | "aqua" | "coral" | "navy" | "green" | "black";
};

export type AdmissionProcessShowcase = {
  id: string;
  reverse?: boolean;
  profile?: {
    name: string;
    titleLine: string;
    qualifications: string;
  };
  badge: string;
  title: {
    lead: string;
    accent: string;
  };
  paragraphs: readonly { text: string; emphasis: boolean }[];
  items?: readonly { title: string; subtitle?: string }[];
  plainTitle?: boolean;
  image?: string;
  imageAlt?: string;
  imageCards?: readonly AdmissionProcessImageCard[];
};

export const ADMISSION_PROCESS_PAGE_LEAD =
  "Step-by-step admission procedure for BCA and B.Com programmes at Bapuji Institute of Hi-Tech Education, Davangere.";

export const ADMISSION_PROCESS_SHOWCASES: readonly AdmissionProcessShowcase[] = [
  {
    id: "bca-admissions",
    badge: "BCA Programme Admissions",
    title: {
      lead: "Eligibility",
      accent: "Check",
    },
    paragraphs: [
      {
        text: "Pass 10+2 (PUC) with Science/Computer Science/Commerce with mathematics/Business Mathematics/Accountancy or",
        emphasis: false,
      },
      {
        text: "3 year Diploma with computer science, Information Science or",
        emphasis: false,
      },
      {
        text: "2 year JOC_ITI with computer science shall be eligible",
        emphasis: true,
      },
    ],
    imageCards: [
      {
        image: images.admissionProcessStudent,
        imageAlt: "Prospective student applicant for BCA programme admission at BIHE",
        profile: {
          name: "Bachelor of Computer Applications",
          titleLine: "3 Year Undergraduate Programme",
          qualifications: "Affiliated to Davangere University",
        },
        tone: "gold",
      },
      {
        image: images.admissionProcessStaff,
        imageAlt: "BIHE admission office staff guiding students through the application process",
        profile: {
          name: "Modern Computer Laboratories",
          titleLine: "Practical Learning Environment",
          qualifications: "Industry-aligned BCA Training",
        },
        tone: "lavender",
      },
    ],
  },
  {
    id: "bcom-admissions",
    reverse: true,
    badge: "B.Com Programme Admissions",
    plainTitle: true,
    title: {
      lead: "Key Documents Required",
      accent: "(Photocopies)",
    },
    paragraphs: [],
    items: [
      { title: "SSLC/10th", subtitle: "Standard Marks Card" },
      { title: "PUC/12th", subtitle: "Standard Marks Card (Qualifying Exam)" },
      { title: "Transfer Certificate (TC)" },
      {
        title: "Migration Certificate",
        subtitle: "(for students from other universities)",
      },
      { title: "ID Proof", subtitle: "(Aadhaar Card)" },
      {
        title: "Recent Passport-Size Photographs",
        subtitle: "(3 copies)",
      },
    ],
    imageCards: [
      {
        image: images.admissionProcessBcomStudent,
        imageAlt: "Prospective B.Com student applicant at BIHE campus",
        profile: {
          name: "Bachelor of Commerce",
          titleLine: "3 Year Undergraduate Programme",
          qualifications: "Affiliated to Davangere University",
        },
        tone: "coral",
      },
      {
        image: images.admissionProcessBcomStaff,
        imageAlt: "B.Com student with books and backpack at BIHE campus",
        profile: {
          name: "Department of Commerce",
          titleLine: "Accounting & Business Studies",
          qualifications: "Professional Commerce Education",
        },
        tone: "black",
      },
    ],
  },
  {
    id: "admission-support",
    badge: "Admission Support & Guidance",
    plainTitle: true,
    title: {
      lead: "If Applicable",
      accent: "(for Special Categories)",
    },
    paragraphs: [],
    items: [
      { title: "Caste Certificate", subtitle: "(SC/ST/OBC)" },
      { title: "Income Certificate" },
    ],
    imageCards: [
      {
        image: images.admissionProcessSupportStudent,
        imageAlt: "Student with books seeking admission guidance at BIHE",
        profile: {
          name: "BIHE Admission Office",
          titleLine: "Campus Counselling & Document Verification",
          qualifications: "Bapuji Institute of Hi-Tech Education, Davangere",
        },
        tone: "navy",
      },
      {
        image: images.admissionProcessSupportStaff,
        imageAlt: "Student with study materials at BIHE campus enrollment",
        profile: {
          name: "Campus Visit & Enrollment",
          titleLine: "Orientation & Student Identity Card",
          qualifications: "Begin Your Academic Journey at BIHE",
        },
        tone: "black",
      },
    ],
  },
] as const;

export const ADMISSION_PROCESS_INTRO = {
  eyebrow: "Admission",
  title: "How to apply at BIHE",
  paragraphs: [
    "Bapuji Institute of Hi-Tech Education (BIHE) offers admission to Bachelor of Computer Applications (BCA) and Bachelor of Commerce (B.Com) undergraduate programmes affiliated to Davangere University.",
    "The admission process is designed to help eligible candidates secure a seat through a transparent and systematic procedure. Candidates may obtain the application form from the college office or through notified admission channels and complete all formalities within the scheduled timeline.",
  ],
} as const;

export const ADMISSION_STEPS_TITLE = "Process Of Admission";

export const ADMISSION_STEPS = [
  {
    id: "step-1",
    step: "01",
    title: "Application",
    description:
      "Download the application form from the college office or the notified online portal. Fill in the required details and submit the completed form before the last date of admission.",
  },
  {
    id: "step-2",
    step: "02",
    title: "Documents",
    description:
      "Submit all required documents along with the application form, including 10th and 12th mark sheets, Transfer Certificate, Aadhar Card, and passport-size photographs.",
  },
  {
    id: "step-3",
    step: "03",
    title: "Counselling",
    description:
      "Shortlisted candidates are called for counselling or interview based on merit and programme availability, as scheduled by the admission office.",
  },
  {
    id: "step-4",
    step: "04",
    title: "Admission",
    description:
      "Selected candidates must pay the prescribed admission and programme fees within the notified period to confirm their seat at BIHE.",
  },
  {
    id: "step-5",
    step: "05",
    title: "Enrollment",
    description:
      "Complete enrollment formalities, collect the student identity card, and attend orientation as instructed by the institution.",
  },
] as const;

export const ADMISSION_COUNSELLING = {
  title: "During Admission/Counselling",
  paragraphs: [
    "You'll need to submit these documents with the application form and pay the required fees,",
    "Original document must also be presented for verification during the counseling or final admission stage.",
  ],
  portalLabel: "Always check the official",
  portalHref: "https://bihedvg.org/",
  portalText: "https://bihedvg.org/",
  portalSuffix: "for the latest information",
} as const;
