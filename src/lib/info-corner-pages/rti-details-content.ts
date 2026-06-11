import { images } from "@/lib/images";

export const RTI_PAGE_LEAD =
  "Right to Information Act compliance, designated public information officers, and application procedures at Bapuji Institute of Hi-Tech Education.";

export const RTI_INTRO = {
  badge: "RTI Act",
  title: "Right to information (RTI)",
  paragraphs: [
    "The Right to Information (RTI) is a legal right provided to Indian citizens under the RTI Act, 2005, which allows them to seek information from public authorities. Its main purpose is to promote transparency, accountability, and good governance by enabling citizens to access government records, documents, and decisions. Any Indian citizen can file an RTI application without giving a reason, and public authorities are required to respond within a fixed time frame, usually 30 days.",
  ],
} as const;

export type RtiCpioDetail = {
  label: string;
  value: string;
  href?: string;
};

export const RTI_CPIO_SHOWCASE = {
  badge: "Officer",
  title: {
    lead: "Central Public Information Officer",
    accent: "(CPIO)",
  },
  profile: {
    name: "B. Veerappa",
    titleLine: "Principal",
    qualifications: "Department of BCA",
  },
  details: [
    { label: "Name", value: "B. Veerappa" },
    { label: "Designation", value: "Principal" },
    { label: "Department", value: "Department of BCA" },
    {
      label: "Address",
      value: "Post Box No.302, Lake view campus, S S Layout, Davangere-577004.",
    },
    { label: "Phone Number", value: "9844260695", href: "tel:+919844260695" },
    {
      label: "Email",
      value: "principal@bihedvg.org",
      href: "mailto:principal@bihedvg.org",
    },
  ] satisfies readonly RtiCpioDetail[],
  paragraph:
    "The Central Public Information Officer (CPIO) is an official appointed in every Central Government public authority to receive RTI applications and provide information to applicants. The CPIO must supply the requested information within 30 days or explain valid reasons for denial under the RTI Act, 2005.",
  image: images.principal,
  imageAlt: "B. Veerappa, Central Public Information Officer and Principal of BIHE",
} as const;
