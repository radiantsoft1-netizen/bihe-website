export type AdministrationSubmenuItem = {
  label: string;
  href: string;
  description: string;
};

export const ADMINISTRATION_SUBMENU: AdministrationSubmenuItem[] = [
  {
    label: "Governing Bodies",
    href: "/governing-bodies",
    description:
      "Governance structure, committees, and institutional oversight.",
  },
  {
    label: "Principal",
    href: "/principal",
    description:
      "Leadership, academic vision, and institutional administration at BIHE.",
  },
  {
    label: "Controller of Examinations",
    href: "/controller-of-examination",
    description:
      "Examination schedules, evaluation processes, and academic records.",
  },
  {
    label: "Ombudsperson",
    href: "/ombudsperson",
    description:
      "Independent grievance redressal and stakeholder support.",
  },
  {
    label: "Finance Officer",
    href: "/finance-section",
    description:
      "Financial planning, fee administration, and institutional accounts.",
  },
  {
    label: "Internal Complaint Committee",
    href: "/internal-complaint-committee",
    description:
      "Internal complaints committee and campus safety compliance.",
  },
  {
    label: "Academic Leadership of BCA",
    href: "/bca",
    description:
      "Academic leadership, coordination, and department information for BCA.",
  },
  {
    label: "Academic Leadership of B.com",
    href: "/b-com",
    description:
      "Academic leadership, coordination, and department information for B.Com.",
  },
];
