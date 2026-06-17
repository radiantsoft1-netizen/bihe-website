import { images } from "@/lib/images";

export const INTERNATIONAL_STUDENTS_PAGE_LEAD =
  "Admission guidelines, eligibility criteria, required documentation, and campus facilities for international students at BIHE, Davangere.";

const ADMISSION_PROCEDURE_TEXT =
  "The admission process at BIHE College begins with students completing the online registration form available on the college website and submitting it along with the required academic documents and ID proof. After receiving the application, the admissions team verifies all documents and checks the eligibility criteria for the chosen course. If applicable, candidates may be asked to attend an entrance assessment or interview. Once shortlisted, students must pay the admission or registration fee to confirm their seat. After successful verification and payment, the college issues an official admission confirmation, followed by details regarding orientation, class schedules, and academic guidelines.";

export type InternationalStudentsShowcase = {
  id: string;
  reverse?: boolean;
  hideVisual?: boolean;
  badge: string;
  title: {
    lead: string;
    accent: string;
  };
  paragraphs: readonly { text: string; emphasis: boolean }[];
  image: string;
  imageAlt: string;
};

export const INTERNATIONAL_STUDENTS_SHOWCASES: readonly InternationalStudentsShowcase[] = [
  {
    id: "admission-procedure",
    hideVisual: true,
    badge: "International Admissions",
    title: {
      lead: "Admission",
      accent: "procedure",
    },
    paragraphs: [
      {
        text: ADMISSION_PROCEDURE_TEXT,
        emphasis: false,
      },
    ],
    image: images.internationalStudentsAdmissionProcess,
    imageAlt: "International students admission process at BIHE, Davangere",
  },
  {
    id: "hostel-details",
    badge: "Accommodation",
    title: {
      lead: "Hostel",
      accent: "Details",
    },
    paragraphs: [
      {
        text: "Bapuji Institute of Hi-Tech Education provides safe and comfortable Boys and Girls hostel facilities for international students, along with Wi-Fi connectivity and food facilities through a spacious mess, ensuring a secure and supportive living environment on campus.",
        emphasis: false,
      },
    ],
    image: images.internationalStudentsHostelFacilities,
    imageAlt: "BIHE hostel and residential facilities for international students",
  },
  {
    id: "library-facilities",
    reverse: true,
    badge: "Library Facilities",
    title: {
      lead: "Library",
      accent: "facilities",
    },
    paragraphs: [
      {
        text: "Bapuji Institute of Hi-Tech Education provides well-equipped library facilities with access to international journals for international students, supporting quality learning and academic research.",
        emphasis: false,
      },
    ],
    image: images.internationalStudentsLibraryFacilities,
    imageAlt: "BIHE library facilities for international students",
  },
  {
    id: "lab-facilities",
    badge: "Lab Facilities",
    title: {
      lead: "Lab",
      accent: "facilities",
    },
    paragraphs: [
      {
        text: "Bapuji Institute of Hi-Tech Education provides well-equipped laboratory facilities for international students, featuring modern systems, updated software, high-speed internet access, and a supportive learning environment. The labs are regularly maintained and guided by experienced faculty to ensure effective hands-on training and practical exposure aligned with academic and industry standards.",
        emphasis: false,
      },
    ],
    image: images.internationalStudentsLabFacilities,
    imageAlt: "BIHE computer laboratory facilities for international students",
  },
  {
    id: "health-facilities",
    reverse: true,
    badge: "Health Facilities",
    title: {
      lead: "Health",
      accent: "Facilities",
    },
    paragraphs: [
      {
        text: "Bapuji Institute of Hi-Tech Education College places strong emphasis on the health and well-being of its international students, recognizing that a healthy academic environment is essential for effective learning and personal development. The institution ensures the availability of basic healthcare facilities, first-aid services, and health awareness initiatives within the campus to support physical and mental wellness. Through systematic health record maintenance, preventive care measures, and timely medical assistance, the college strives to provide a safe, hygienic, and supportive environment for all members of the institution.",
        emphasis: false,
      },
    ],
    image: images.internationalStudentsHealthFacilities,
    imageAlt: "BIHE health facilities and wellness support for international students",
  },
] as const;
