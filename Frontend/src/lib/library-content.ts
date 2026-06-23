export const LIBRARY_PAGE_LEAD =
  "Digital and print learning resources, reference services, and quiet study spaces for BCA and B.Com students.";

export const LIBRARY_INTRO_BADGE = "Library details";

export const LIBRARY_INTRO_HIGHLIGHTS = [
  { value: "3,000+", label: "Books & volumes" },
  { value: "Digital", label: "Library access" },
  { value: "Wi-Fi", label: "High-speed internet" },
] as const;

export const LIBRARY_INTRO_PARAGRAPHS = [
  "Library is an essential part of every institution which helps staff and students to enhance the knowledge through various resources such as books, newspapers, journals, magazines and electronic library. Our institution library provides borrowing, book bank, reference services, digital library with high speed internet facilities, Wi-Fi etc.",
  "Library has well-equipped professional facilities which include collection of more than 3000 books, journals, national and international weekly and monthly magazines, daily newspapers in English, Kannada and Hindi are made available for students and staff. To make the students gain up-to-date knowledge on the Information Technology. Current affairs and education are also made available.",
] as const;

export const LIBRARY_RESOURCES_TITLE = "Library Resources";

export const LIBRARY_RESOURCES = [
  { resource: "Total No of Books", quantity: "3714" },
  { resource: "Total No of Titles", quantity: "1148" },
  { resource: "Donated Books", quantity: "120" },
  { resource: "Journals", quantity: "04" },
  { resource: "News Papers", quantity: "08" },
  { resource: "Magazines", quantity: "04" },
] as const;

export const LIBRARY_FACILITIES_TITLE = "Facilities";

export const LIBRARY_FACILITIES = [
  {
    id: "reading-rooms",
    label: "Reading rooms",
    description: "Quiet spaces for focused study and research.",
    icon: "reading" as const,
  },
  {
    id: "digital-library",
    label: "Digital Library",
    description: "Online resources and e-learning access.",
    icon: "digital" as const,
  },
  {
    id: "reprography",
    label: "Reprography",
    description: "Printing and document copying services.",
    icon: "reprography" as const,
  },
  {
    id: "reference-section",
    label: "Reference Section",
    description: "In-library reference books and materials.",
    icon: "reference" as const,
  },
  {
    id: "internet",
    label: "Internet",
    description: "High-speed connectivity for students and staff.",
    icon: "internet" as const,
  },
  {
    id: "newspaper-clipping",
    label: "Newspaper Clipping",
    description: "Current affairs and news archive support.",
    icon: "newspaper" as const,
  },
] as const;

export type LibraryFacilityIcon = (typeof LIBRARY_FACILITIES)[number]["icon"];

export const LIBRARY_RULES_TITLE = "Library Rules";

export const LIBRARY_RULES = [
  "A borrower's card is issued to every student. It is not transferable and it should be surrendered at the end of the year.",
  "The book can be issued only on the production of the identity card.",
  "Duplicate identity card and borrower's card will be issued on payment of a minimum fine.",
  "The student has to maintain discipline and silence in the library.",
] as const;

export const LIBRARY_TIMINGS_TITLE = "Library Timings";

export const LIBRARY_TIMINGS_SUBTITLE = "Days and library working hours";

export const LIBRARY_TIMINGS_COLUMNS = ["Days", "Borrowing Timings", "Reference Timings"] as const;

export const LIBRARY_TIMINGS_ROWS = [
  {
    days: "Monday to Friday",
    borrowing: "09:30 AM – 01:00 PM\n02:30 PM – 05:30 PM",
    reference: "09:30 AM – 01:00 PM\n02:30 PM – 05:30 PM",
  },
  {
    days: "Saturday",
    borrowing: "09:30 AM – 01:30 PM",
    reference: "09:30 AM – 01:30 PM",
  },
] as const;

export const LIBRARY_GALLERY_TITLE = "Photo Gallery";

export const LIBRARY_GALLERY_LEAD =
  "A glimpse of our reading halls, collaborative study, and reference collections.";

export type LibraryGalleryLayout = "main" | "accent-a" | "accent-b";

export type LibraryGalleryImageKey = "readingHall" | "groupStudy" | "bookshelves";

export const LIBRARY_GALLERY = [
  {
    id: "gallery-1",
    title: "Reading Hall",
    category: "Study Space",
    alt: "Students studying together in the BIHE library reading hall",
    imageKey: "readingHall" as LibraryGalleryImageKey,
    layout: "main" as LibraryGalleryLayout,
    position: "center",
  },
  {
    id: "gallery-2",
    title: "Group Study",
    category: "Collaboration",
    alt: "BIHE students collaborating with books in the library",
    imageKey: "groupStudy" as LibraryGalleryImageKey,
    layout: "accent-a" as LibraryGalleryLayout,
    position: "center",
  },
  {
    id: "gallery-3",
    title: "Reference Section",
    category: "Collections",
    alt: "Students browsing books in the BIHE library reference section",
    imageKey: "bookshelves" as LibraryGalleryImageKey,
    layout: "accent-b" as LibraryGalleryLayout,
    position: "center",
  },
] as const;
