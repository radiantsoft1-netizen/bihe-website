export const MOA_INTRO =
  "The Memorandum of Association of Bapuji Educational Association, Davangere is the foundational legal document that defines the name, address, objectives, and founding members of the Association. To establish, continue, and manage schools, colleges, research bureaus, and other educational institutions, and to obtain recognition or affiliation from universities and other competent authorities. To introduce and implement desirable improvements in the methods and systems of education in the institutions run by the Association, in accordance with prevailing educational standards and regulations.";

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
    fileName: "MOA_MOA1_merged.pdf",
  },
];
