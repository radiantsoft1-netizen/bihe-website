import { images } from "@/lib/images";

export const CRF_PAGE_LEAD =
  "Shared research infrastructure supporting the Research and Development Cell at Bapuji Institute of Hi-Tech Education.";

export type CentralResearchFacility = {
  id: string;
  title: string;
  paragraph: string;
  image: string;
  imageAlt: string;
};

export const CRF_FACILITIES: readonly CentralResearchFacility[] = [
  {
    id: "computer-laboratories",
    title: "Research and Development – Computer Laboratories",
    image: images.crfComputerLaboratories,
    imageAlt: "Students working in a modern computer laboratory at BIHE",
    paragraph:
      "The Research and Development Cell is supported by well-established computer laboratories equipped with modern computing systems and updated software. These laboratories provide students and faculty with hands-on experience in programming, data analysis, and research-based activities. The lab infrastructure encourages innovation, experimentation, and problem-solving skills. Adequate seating, networking facilities, and power backup ensure uninterrupted research work. The laboratories are regularly upgraded to meet current academic and research requirements. They also support interdisciplinary research and project development. Overall, the labs create a dynamic environment that fosters technical excellence and research culture.",
  },
  {
    id: "library",
    title: "Research and Development – Library",
    image: images.crfLibrary,
    imageAlt: "Students browsing books in the BIHE library",
    paragraph:
      "The library serves as a strong knowledge backbone for the Research and Development Cell. It houses a wide collection of textbooks, reference materials, research journals, and magazines across various disciplines. The library supports academic research through both print and digital resources. A quiet and spacious reading environment enables focused study and research work. Faculty and students utilize the library for literature surveys and research publications. Regular updates to the collection ensure access to the latest knowledge. The library significantly contributes to enhancing research quality and academic growth.",
  },
] as const;
