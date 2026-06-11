import { SITE_LINKS } from "@/lib/site-links";

export const CONTACT_PAGE_LEAD =
  "Reach Bapuji Institute of Hi-Tech Education for admissions, academics, and general enquiries. We are here to help students, parents, and visitors.";

export const CONTACT_INTRO = {
  badge: "Get in touch",
  title: "Contact BIHE",
  paragraphs: [
    "Whether you are exploring BCA and B.Com programmes, seeking admission guidance, or contacting the academic office, our team will respond to your enquiry as soon as possible.",
    "You may call, email, visit the campus, or send a message using the enquiry form below.",
  ],
} as const;

export const CONTACT_METHODS = [
  {
    id: "location",
    label: "Location",
    value: "P.B. No.302, Lake View Campus, S.S. Layout, Davangere-577004, Karnataka, India",
    href: "https://maps.google.com/?q=Bapuji+Institute+of+Hi-Tech+Education+Davangere",
  },
  {
    id: "phone",
    label: "Phone",
    value: "08192-221625",
    href: SITE_LINKS.external.phone,
  },
  {
    id: "email",
    label: "Email",
    value: "principal@bihedvg.org",
    href: SITE_LINKS.external.email,
  },
  {
    id: "fax",
    label: "Fax",
    value: "08192-220987",
    href: undefined,
  },
] as const;

export const CONTACT_OFFICE_HOURS = {
  title: "Office hours",
  items: [
    { day: "Monday – Saturday", time: "9:00 AM – 5:00 PM" },
    { day: "Sunday & public holidays", time: "Closed" },
  ],
} as const;

export const CONTACT_ENQUIRY_TOPICS = [
  "Admission & eligibility",
  "Fee structure & scholarships",
  "Academic programmes (BCA / B.Com)",
  "Examination & certificates",
  "Campus visit & facilities",
  "General enquiry",
] as const;

export const CONTACT_MAP = {
  title: "Scan for location",
  embedUrl:
    "https://maps.google.com/maps?q=Bapuji+Institute+of+Hi-Tech+Education,+Lake+View+Campus,+Davangere&hl=en&z=15&output=embed",
  directionsUrl:
    "https://maps.google.com/?q=P.B.+No.302,+Lake+View+Campus,+S.S.+Layout,+Davangere-577004,+Karnataka,+India",
} as const;

export const CONTACT_FORM_COPY = {
  title: "Send us a message",
  lead: "Fill in the form and our office will get back to you regarding your enquiry.",
  successTitle: "Message ready to send",
  successMessage:
    "Thank you for contacting BIHE. Your message has been prepared — please use your email client to complete sending, or call us directly for urgent enquiries.",
} as const;
