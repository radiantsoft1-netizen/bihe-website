export const MOA_INTRO = `The Memorandum of Association defines the constitution, objectives, and governance framework under which Bapuji Institute of Hi-Tech Education (BIHE) operates as a constituent institution of Bapuji Educational Association (BEA), Davangere — a registered educational society established in 1958.`;

export const MOA_SECTIONS = [
  {
    title: "Name & registered office",
    text: "The institution shall be known as Bapuji Institute of Hi-Tech Education (BIHE), functioning under the auspices of Bapuji Educational Association (Regd.), with its campus at Lake View Campus, Davangere, Karnataka, affiliated to Davangere University and approved by AICTE where applicable.",
  },
  {
    title: "Objects of the institute",
    text: "To impart quality undergraduate education in Bachelor of Computer Applications (BCA) and Bachelor of Commerce (B.Com); to promote academic excellence, research orientation, and holistic student development; and to prepare graduates for productive careers in industry, business, and higher education.",
  },
  {
    title: "Membership & governance",
    text: "The affairs of the institute are administered by the Governing Body of BIHE under the overall framework of Bapuji Educational Association. The body meets periodically to review academic, administrative, and financial matters in accordance with university and regulatory requirements.",
  },
  {
    title: "Powers of the governing body",
    text: "To frame policies for academic programmes, appointments, infrastructure, student welfare, and compliance with statutory bodies including the university, AICTE, and government regulations; and to approve annual plans, budgets, and reports placed before the association.",
  },
  {
    title: "Amendments",
    text: "Amendments to the memorandum or articles of association shall be made only in accordance with the provisions of the Societies Registration Act and resolutions passed by the competent authority of Bapuji Educational Association, subject to applicable law and regulatory approval where required.",
  },
] as const;

export const MOA_FOUNDING_MEMBERS = [
  {
    slNo: "01",
    name: "Sri Dharmaprakasa Maddurayappa",
    designation: "Jeweller, Davangere",
  },
  {
    slNo: "02",
    name: "Sri G. Veerappa, B.A., LL.B.",
    designation: "Advocate, Davangere",
  },
  {
    slNo: "03",
    name: "Sri Kassala Srinivasa Setty",
    designation: "Merchant, Davangere",
  },
  {
    slNo: "04",
    name: "Sri Bondade Hanumantha Rao, B.A., LL.B.",
    designation: "Advocate, Davangere",
  },
  {
    slNo: "05",
    name: "Sri Mundasada Veerabhadrappa",
    designation: "Merchant, Davangere",
  },
] as const;

export type MoaDocument = {
  title: string;
  description: string;
  href: string;
  fileName: string;
};

export const MOA_DOCUMENTS: readonly MoaDocument[] = [
  {
    title: "Memorandum of Association",
    description:
      "Constitutional document outlining the name, objects, and governance of the institute.",
    href: "/documents/memorandum-of-association.pdf",
    fileName: "memorandum-of-association.pdf",
  },
];
