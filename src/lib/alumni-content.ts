import type { AlumniEvent, AlumniProfile } from "@/lib/types/alumni";

export const ALUMNI_PAGE_LEAD =
  "Connect with BIHE graduates across batches, explore career journeys, and stay updated on alumni events and reunions.";

export const ALUMNI_HOME_LEAD =
  "Welcome to Bapuji Institute of Hi-Tech Education, a place where knowledge meets innovation, values shape character, and dreams turn into achievements.";

export const ALUMNI_HOME_WELCOME = {
  badge: "Welcome",
  title: "Welcome to Bapuji Institute of Hi-Tech Education",
  paragraphs: [
    "Our institution is committed to providing quality education, practical skills, and a strong foundation for future success. We believe in nurturing young minds through academic excellence, discipline, creativity, and leadership.",
    "At Bapuji Institute of Hi-Tech Education, students are empowered to grow personally and professionally in a supportive and inspiring environment. With dedicated faculty, modern learning methods, and a focus on real-world opportunities, we prepare students to meet the challenges of tomorrow.",
    "We take pride in our vibrant student community, successful alumni, and commitment to continuous progress.",
    "Join us in shaping a brighter future through education, innovation, and excellence.",
  ],
  tags: ["Learn", "Grow", "Succeed"],
} as const;

export const ALUMNI_HOME_NETWORK = {
  badge: "Alumni Network",
  title: "Alumni Network Introduction",
  paragraphs: [
    "The Alumni Network of Bapuji Institute of Hi-Tech Education is a strong and inspiring community of graduates who continue to make a positive impact in various fields across the world.",
    "Our alumni are entrepreneurs, software professionals, educators, artists, business leaders, and innovators who represent the values and excellence of our institution. They serve as role models for current students and contribute to the growth of the college through mentorship, career guidance, industry connections, and support.",
    "The alumni network creates a lifelong bond between former students and the institution, encouraging collaboration, knowledge sharing, and meaningful relationships. Through reunions, events, workshops, and professional interactions, we celebrate achievements and strengthen our community.",
    "We proudly honour the success of our alumni and welcome every graduate to stay connected, inspire others, and grow together with the Bapuji family.",
  ],
  tags: ["Connected Forever", "Growing Together", "Inspiring Generations"],
} as const;

export const ALUMNI_HOME_HIGHLIGHTS = {
  badge: "Success Stories",
  title: "Highlights / Success Stories",
  intro:
    "The success of our alumni is a reflection of the strong academic foundation and values built at Bapuji Institute of Hi-Tech Education. Our graduates have achieved excellence in diverse fields and continue to inspire future generations.",
  bullets: [
    "Leading professionals working in top multinational companies.",
    "Successful entrepreneurs creating jobs and innovative businesses.",
    "Experts in technology, education, healthcare, finance, and media.",
    "Creative artists making their mark in film, music, and design industries.",
    "Alumni serving society through leadership and community initiatives.",
  ],
  closing:
    "From classrooms to corporate boardrooms, startups to global careers, our alumni have transformed their dreams into reality through hard work, determination, and continuous learning.",
  givingBack: {
    title: "Giving Back",
    text: "Many alumni actively support students by offering mentorship, internships, guest lectures, career guidance, and placement opportunities.",
  },
  ourPride: {
    title: "Our Pride",
    text: "Every achievement of our alumni strengthens the legacy of the institution and motivates current students to aim higher and achieve more.",
  },
  tags: ["Success Begins Here", "Excellence Continues Everywhere"],
} as const;

export type AlumniHomeLinkIcon = "register" | "events" | "contact";

export const ALUMNI_HOME_QUICK_LINKS = [
  {
    label: "Register",
    href: "/alumni/register",
    description: "Join the alumni network and share your profile with the BIHE community.",
    icon: "register" as const,
  },
  {
    label: "Events",
    href: "/alumni/events",
    description: "Reunions, workshops, and networking programmes for graduates.",
    icon: "events" as const,
  },
  {
    label: "Contact",
    href: "/contact",
    description: "Reach the college for alumni enquiries, updates, and support.",
    icon: "contact" as const,
  },
] as const;

export const ALUMNI_HOME_QUICK_LINKS_TITLE = "Quick Links";
export const ALUMNI_HOME_QUICK_LINKS_LEAD =
  "Stay engaged with the BIHE alumni community — register your profile, explore events, or get in touch.";

export const ALUMNI_ABOUT_LEAD =
  "The BIHE Alumni Association was established with the objective of building a strong and lasting relationship between the institution and its alumni.";

export const ALUMNI_ABOUT_OVERVIEW = {
  badge: "Overview",
  title: "Alumni Association with Details",
  paragraphs: [
    "The BIHE Alumni Association was established with the objective of building a strong and lasting relationship between the institution and its alumni. The association acts as a platform to connect former students with the college, faculty members, and current students, fostering mutual growth and professional development.",
    "Our alumni are placed in various reputed IT companies, startups, government organizations, and higher education institutions across the country and abroad. The Alumni Association plays a vital role in sharing industry knowledge, career guidance, technical expertise, and real-world experience with present students.",
    "The association actively supports the college by organizing workshops, seminars, alumni meets, mentoring programs, internships, and placement assistance. It also contributes to curriculum enrichment by providing valuable feedback based on industry trends and emerging technologies.",
  ],
} as const;

export const ALUMNI_ABOUT_VISION = {
  title: "Vision of the Alumni Association",
  text: "To build a strong, vibrant, and lifelong relationship between the college and its alumni, fostering professional excellence, knowledge sharing, and continuous development while contributing to the growth of students, the institution, and society.",
} as const;

export const ALUMNI_ABOUT_MISSION = {
  title: "Mission of the Alumni Association",
  items: [
    "To strengthen the bond between the BCA department and its alumni through continuous interaction and engagement.",
    "To provide a platform for alumni to share professional experience, technical knowledge, and industry insights with current students.",
    "To support students in career development, internships, placements, and higher education guidance.",
    "To encourage alumni participation in academic, co-curricular, and institutional development activities.",
    "To promote networking, mentorship, and lifelong learning among alumni for mutual growth and social responsibility.",
  ],
} as const;

export const ALUMNI_ABOUT_OBJECTIVES = {
  title: "Objectives of the Alumni Association",
  items: [
    "To support students in career guidance, skill development, internships, placements, and higher education opportunities.",
    "To organize alumni meets, technical events, and professional development programs.",
    "To promote collaboration among alumni for knowledge sharing, innovation, and entrepreneurship.",
    "To recognize and celebrate the achievements of alumni in professional, academic, and social fields.",
    "To strengthen institutional development through alumni feedback, support, and participation.",
  ],
} as const;

export const ALUMNI_ABOUT_COMMITTEE = {
  title: "Alumni Committee Members",
  lead:
    "Alumni committee members build and maintain the alumni network by managing databases, organizing events (reunions, lectures), facilitating communication, and fundraising for the institution, while also guiding current students through mentoring and providing industry insights, fostering a mutually beneficial relationship for alumni, students, and the alma mater's growth. Key roles include coordinators, secretaries, and treasurers, each handling specific duties like event planning, financial reporting, and acting as spokespersons.",
} as const;

export type AlumniCommitteeMember = {
  slNo: string;
  name: string;
  designation: string;
  profession: string;
  mobile: string;
  email: string;
};

export const ALUMNI_COMMITTEE_MEMBERS: AlumniCommitteeMember[] = [
  {
    slNo: "01",
    name: "Dr. B. veerappa",
    designation: "Chairperson",
    profession: "Principal",
    mobile: "9844260695",
    email: "bveerappa@gmail.com",
  },
  {
    slNo: "02",
    name: "Naveen H",
    designation: "Co-ordinator",
    profession: "Asst. Professor",
    mobile: "9035495421",
    email: "naveen.jayappa28@gmail.com",
  },
  {
    slNo: "03",
    name: "Bakkesh K S",
    designation: "Member",
    profession: "Asst. Professor",
    mobile: "9008765418",
    email: "bakkeshks@gmail.com",
  },
  {
    slNo: "04",
    name: "Vageesh M V",
    designation: "Member",
    profession: "Asst. Professor",
    mobile: "9844491775",
    email: "vagvageesh@gfmail.com",
  },
  {
    slNo: "05",
    name: "Thanushree P",
    designation: "Student representative",
    profession: "Student",
    mobile: "7483138256",
    email: "tshanushreep2015@gmail.com",
  },
  {
    slNo: "06",
    name: "Alisha D",
    designation: "Student representative",
    profession: "Student",
    mobile: "9448534625",
    email: "alishadaishass34@gmail.com",
  },
];

export const ALUMNI_GALLERY_LEAD =
  "Photographs from alumni reunions, campus visits, career guidance sessions, and association gatherings at BIHE.";

export const ALUMNI_EVENTS_PAGE_LEAD =
  "Upcoming reunions, career guidance sessions, and networking events for the BIHE alumni community.";

export const ALUMNI_PROGRAMS = ["BCA", "B.Com"] as const;

export const ALUMNI_GENDERS = ["Male", "Female", "Other", "Prefer not to say"] as const;

export const ALUMNI_CURRENT_STATUSES = [
  "Employed",
  "Self-employed",
  "Higher studies",
  "Entrepreneur",
  "Homemaker",
  "Retired",
  "Other",
] as const;

export const ALUMNI_REGISTER_COPY = {
  title: "Alumni Registration",
  lead: "Fill in your details below. All submissions are reviewed before appearing in the public directory.",
  formTitle: "Complete your profile",
  sections: {
    personal: "Personal Information",
    academic: "Academic Information",
    additional: "Additional Information",
  },
  successTitle: "Registration submitted",
  successMessage:
    "Thank you. Your alumni profile has been submitted and will appear in the directory after admin approval.",
  successNotificationEmail:
    "A confirmation with your registration ID has been sent to your email address.",
  successNotificationFallback:
    "We could not send the confirmation email right now. Save your registration ID below and use it to track your application.",
  successNotificationFailedPrefix: "Email delivery issue:",
  trackingIdLabel: "Your registration ID",
  statusTitle: "Track your registration",
  statusLead:
    "Already submitted? Enter the registration ID sent to your email to see where your application stands.",
  statusTrackingIdLabel: "Registration ID",
  statusTrackingIdPlaceholder: "NameBIHE#1414",
  statusSubmitLabel: "Check status",
  statusSubmittingLabel: "Checking…",
  statusNotFound: "No registration found for that ID. Please check your registration ID and try again.",
  statusFoundTitle: "Registration found",
  statusPending: "Your profile is under admin review.",
  statusApproved: "Your profile has been approved and is listed in the alumni directory.",
  statusRejected: "Your registration was not approved.",
} as const;

export const ALUMNI_REGISTER_INTRO = {
  badge: "Registration",
  title: "Join the BIHE alumni network",
  paragraphs: [
    "Share your academic journey and current professional details to reconnect with classmates and support current students.",
    "Required fields are marked with an asterisk (*). Your profile remains unpublished until approved by the college admin team.",
  ],
  requiredFields: [
    "Full name",
    "Email address",
    "Mobile number",
    "Course / department",
    "Passout year",
  ],
} as const;

export const ALUMNI_REGISTER_STEPS = [
  {
    id: "submit",
    title: "Submit your profile",
    description: "Complete the form with your academic and professional details.",
  },
  {
    id: "review",
    title: "Admin review",
    description: "Our team verifies your submission before it goes live.",
  },
  {
    id: "publish",
    title: "Join the directory",
    description: "Approved profiles appear in the public alumni directory.",
  },
] as const;

export const FALLBACK_ALUMNI_PROFILES: AlumniProfile[] = [
  {
    id: "priya-sharma",
    slug: "priya-sharma",
    name: "Priya Sharma",
    batchYear: 2018,
    passoutYear: 2018,
    program: "BCA",
    currentRole: "Software Engineer",
    currentEmployer: "Infosys",
    currentLocation: "Bengaluru",
    bio: "Priya graduated from BIHE with a BCA degree and built a strong foundation in application development.",
    testimonial: "BIHE gave me the confidence and skills to launch my career in software development.",
    isFeatured: true,
    href: "/alumni/priya-sharma",
  },
  {
    id: "rahul-patil",
    slug: "rahul-patil",
    name: "Rahul Patil",
    batchYear: 2019,
    passoutYear: 2019,
    program: "B.Com",
    currentRole: "Accounts Manager",
    currentEmployer: "HDFC Bank",
    currentLocation: "Davangere",
    bio: "Rahul completed his B.Com at BIHE and pursued professional certification in banking and finance.",
    testimonial: "The commerce faculty at BIHE shaped my analytical thinking and professional discipline.",
    isFeatured: true,
    href: "/alumni/rahul-patil",
  },
  {
    id: "ananya-reddy",
    slug: "ananya-reddy",
    name: "Ananya Reddy",
    batchYear: 2020,
    passoutYear: 2020,
    program: "BCA",
    currentRole: "Product Analyst",
    currentEmployer: "Wipro",
    currentLocation: "Hyderabad",
    href: "/alumni/ananya-reddy",
  },
  {
    id: "kiran-kumar",
    slug: "kiran-kumar",
    name: "Kiran Kumar",
    batchYear: 2017,
    passoutYear: 2017,
    program: "B.Com",
    currentRole: "Entrepreneur",
    currentEmployer: "Kiran Retail Solutions",
    currentLocation: "Davangere",
    href: "/alumni/kiran-kumar",
  },
];

export const FALLBACK_ALUMNI_EVENTS: AlumniEvent[] = [
  {
    id: "annual-alumni-meet-2025",
    slug: "annual-alumni-meet-2025",
    title: "Annual Alumni Meet 2025",
    summary: "Reconnect with classmates, faculty, and the BIHE campus community.",
    eventDate: "2025-12-20",
    venue: "BIHE Campus, Davangere",
    href: "/alumni/events/annual-alumni-meet-2025",
    dateLabel: "20 Dec 2025",
    yearLabel: "2025",
  },
  {
    id: "alumni-career-guidance-2025",
    slug: "alumni-career-guidance-2025",
    title: "Alumni Career Guidance Session 2025",
    summary: "Industry alumni share insights on placements, higher studies, and career growth.",
    eventDate: "2025-08-15",
    venue: "BIHE Auditorium",
    href: "/alumni/events/alumni-career-guidance-2025",
    dateLabel: "15 Aug 2025",
    yearLabel: "2025",
  },
];
