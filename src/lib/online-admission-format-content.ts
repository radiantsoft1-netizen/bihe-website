import { images } from "@/lib/images";

export const ONLINE_ADMISSION_FORMAT_PAGE_LEAD =
  "Step-by-step guide to complete online admission registration, document verification, fee payment, and approval for BCA and B.Com programmes at BIHE.";

export const ONLINE_ADMISSION_STEP_01_INTRO = {
  title: "Step 01 : Student admissions steps.",
  lead:
    "Please follow the steps below for UG student candidate registration on the UUCMS portal.",
  portalLabel: "UUCMS login link:",
  portalHref: "https://uucms.karnataka.gov.in/Login/Index",
  portalText: "https://uucms.karnataka.gov.in/Login/Index",
  imageCaption: "UUCMS login Page",
  image: {
    src: images.bcomDepartment,
    alt: "UUCMS login page for UG student candidate registration",
  },
} as const;

export type OnlineAdmissionStep = {
  id: string;
  step: string;
  title: string;
  hideStepPrefix?: boolean;
  paragraphs?: readonly string[];
  image?: { src: string; alt: string; caption?: string };
  listTitle?: string;
  listItems?: readonly string[];
  orderedItems?: readonly string[];
  portal?: { label: string; href: string; text: string };
};

export const ONLINE_ADMISSION_STEPS: readonly OnlineAdmissionStep[] = [
  {
    id: "step-02",
    step: "02",
    title: "New Candidate Registration",
    hideStepPrefix: true,
    paragraphs: ["Fill and upload the relevant information."],
    image: {
      src: images.uucmsNewCandidateRegistration,
      alt: "UUCMS new candidate registration form showing personal details, photo, category, quota, and education sections",
      caption: "New Candidate Registration",
    },
    orderedItems: [
      "Personal details.",
      "Photo & signature",
      "Category/special category.",
      "Quota Details,",
      "Previous Education Details",
      "Submit",
    ],
  },
  {
    id: "step-03",
    step: "02",
    title: "Student admission steps.",
    paragraphs: [
      "Please follow the steps below to student apply for UG application on the UUCMS portal.",
    ],
    portal: {
      label: "UUCMS login link:",
      href: "https://uucms.karnataka.gov.in/Login/Index",
      text: "https://uucms.karnataka.gov.in/Login/Index",
    },
    orderedItems: [
      "View application",
      "Select an academic year",
      "Select a program level",
      "Select a program name",
      "Select a discipline",
      "View",
      "Submit",
    ],
  },
  {
    id: "step-04",
    step: "03",
    title: "Admission Document Verification steps for UG students",
    paragraphs: [
      "Please follow the steps below to student document verification on UUCMS portal.",
    ],
    portal: {
      label: "UUCMS login link:",
      href: "https://uucms.karnataka.gov.in/Login/Index",
      text: "https://uucms.karnataka.gov.in/Login/Index",
    },
    orderedItems: [
      "College admin login",
      "Admissions",
      "Admission document verification (student invite & verify document)",
      "View student details",
      "Submit",
    ],
  },
  {
    id: "step-05",
    step: "04",
    title: "Admission fee pay steps for UG students.",
    paragraphs: [
      "Please follow the steps below to student document verification on UUCMS portal.",
    ],
    portal: {
      label: "UUCMS login link:",
      href: "https://uucms.karnataka.gov.in/Login/Index",
      text: "https://uucms.karnataka.gov.in/Login/Index",
    },
    orderedItems: [
      "UUCMS login",
      "Create a view application",
      "View existing application details",
      "Action",
      "Pay Fee (Online/Offline)",
      "Submit",
    ],
  },
  {
    id: "step-06",
    step: "05",
    title: "Admission Approval steps for UG students",
    paragraphs: [
      "Please follow the steps below to student document verification on UUCMS portal.",
    ],
    portal: {
      label: "UUCMS login link:",
      href: "https://uucms.karnataka.gov.in/Login/Index",
      text: "https://uucms.karnataka.gov.in/Login/Index",
    },
    orderedItems: [
      "College admin login",
      "Admissions",
      "Student Admission Approval",
      "Select Academic Year",
      "Select Seat Type.",
      "Select Program Level.",
      "Select Program Name.",
      "Select Discipline Name.",
      "View Student Details.",
      "Approve / Reject",
    ],
  },
] as const;
