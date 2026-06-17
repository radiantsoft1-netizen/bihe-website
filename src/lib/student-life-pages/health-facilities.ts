import { images } from "@/lib/images";
import type { StudentLifeAlternatingSection } from "@/lib/student-life-pages/types";
import type { StudentLifeRichPageConfig } from "./types";

export const HEALTH_FACILITIES_HIGHLIGHTS: readonly StudentLifeAlternatingSection[] = [
  {
    id: "first-aid",
    title: "First-Aid",
    paragraphs: [
      "First-aid facilities are made available in various departments of the college to provide immediate medical assistance during minor injuries or health emergencies. Each department is equipped with basic first-aid kits containing essential medical supplies. Faculty and staff members are trained to offer initial care and professional medical help is arranged if required.",
    ],
    image: {
      src: images.healthFacilities.firstAidKit,
      alt: "Red first-aid kit with medical supplies at BIHE campus",
    },
  },
  {
    id: "health-awareness",
    title: "Health Awareness Initiatives",
    paragraphs: [
      "The institution ensures the availability of health awareness initiatives within the campus to support physical and mental wellness. Students and staff are encouraged to participate in programmes that promote hygiene, preventive care, and healthy living practices.",
    ],
    image: {
      src: images.healthFacilities.healthAwarenessCamp,
      alt: "Students at a health awareness camp organized at BIHE campus",
    },
  },
  {
    id: "medical-assistance",
    title: "Preventive Care & Medical Assistance",
    paragraphs: [
      "Through systematic health record maintenance, preventive care measures, and timely medical assistance, the college strives to provide a safe, hygienic, and supportive environment for all members of the institution.",
    ],
    image: {
      src: images.healthFacilities.fireSafetyEquipment,
      alt: "Fire safety training demonstration on BIHE campus",
    },
  },
] as const;

export const HEALTH_FACILITIES_PAGE: StudentLifeRichPageConfig = {
  slug: "health-facilities",
  currentPage: "Health Facilities",
  title: "Health Facilities",
  lead:
    "First-aid support, health awareness programmes, and referral assistance for students on campus.",
  banner: {
    src: images.healthFacilities.banner,
    alt: "Medical professional with first-aid kit available at BIHE campus",
    kicker: "Student Life",
    overlayTitle: "Health Facilities",
  },
  intro: {
    title: "HEALTH FACILITIES",
    paragraphs: [
      "Bapuji Institute of Hi-Tech Education (BIHE) places strong emphasis on the health, safety, and well-being of its students, faculty members, and staff, recognizing that a healthy academic environment is essential for effective learning, professional growth, and overall personality development. The institution is committed to providing basic healthcare support and promoting awareness of physical, mental, and emotional well-being among all stakeholders.",
      "The college maintains essential first-aid facilities on campus to provide immediate medical assistance in case of minor injuries, illnesses, or emergencies. First-aid kits are made available at designated locations and are regularly replenished to ensure readiness and effectiveness. Faculty members and staff are encouraged to respond promptly to health-related emergencies and facilitate access to medical care whenever required.",
      "To ensure the health and safety of students, the institution maintains systematic health records and monitors student well-being through periodic interactions and health-related activities. The college also encourages students to adopt healthy lifestyles through awareness programmes focusing on nutrition, personal hygiene, fitness, mental health, stress management, and disease prevention.",
      "The institution organizes health awareness programmes, medical check-up camps, blood donation camps, and wellness initiatives in collaboration with healthcare professionals, hospitals, and community organizations. These programmes aim to educate students about preventive healthcare practices and promote health-conscious behaviour.",
      "Special attention is given to maintaining a clean, hygienic, and eco-friendly campus environment. Regular sanitation measures, proper waste management practices, access to safe drinking water, and clean restroom facilities contribute to creating a healthy and comfortable atmosphere for all members of the institution.",
      "The college also recognizes the importance of mental health and emotional well-being. Students are encouraged to seek guidance and support from faculty mentors and counsellors whenever needed. Through mentoring, counselling, and student support mechanisms, the institution strives to create a positive and stress-free academic environment.",
      "In case of medical emergencies, students and staff are provided with timely assistance and are referred to nearby hospitals or healthcare centres for specialized treatment. The institution maintains coordination with local healthcare facilities to ensure prompt medical support whenever necessary.",
      "Through systematic health record maintenance, preventive healthcare measures, awareness programmes, and timely medical assistance, Bapuji Institute of Hi-Tech Education remains committed to fostering a safe, healthy, and supportive environment that promotes the overall well-being and holistic development of its students and staff.",
    ],
  },
  tables: [
    {
      id: "committee",
      title: "THE DETAILS OF COMMITTEE AS GIVEN BELOW",
      caption: "Health facilities committee members",
      columns: [
        { key: "slNo", header: "SL. NO." },
        { key: "name", header: "Name" },
        { key: "designation", header: "Designation" },
        { key: "profession", header: "Profession" },
      ],
      rows: [
        { id: "1", slNo: "01", name: "Dr. B. Veerappa", designation: "President", profession: "Principal" },
        { id: "2", slNo: "02", name: "Siddalingappa K", designation: "Program officer", profession: "Vice principal" },
        { id: "3", slNo: "03", name: "Sidasivappa G R", designation: "Program officer", profession: "Physical director" },
      ],
    },
  ],
  highlightVariant: "cards",
  alternating: HEALTH_FACILITIES_HIGHLIGHTS,
};
