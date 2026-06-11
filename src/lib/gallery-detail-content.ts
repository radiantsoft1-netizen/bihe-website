import type { GalleryPhotoFilterId } from "@/lib/types/gallery";

export type GalleryDetailContent = {
  lead: string;
  paragraphs: string[];
  highlights: string[];
  meta?: {
    date?: string;
    location?: string;
  };
};

const GALLERY_DETAIL_BY_ID: Record<string, GalleryDetailContent> = {
  "campus-overview": {
    lead:
      "A panoramic view of the Bapuji Institute of Hi-Tech Education campus in Davangere — where academic ambition meets a vibrant student community.",
    paragraphs: [
      "The BIHE campus brings together modern classrooms, laboratories, library spaces, and student amenities within a secure and welcoming environment. Students benefit from a setting designed for focused learning and active participation in campus life.",
      "Established with a vision to deliver quality undergraduate education in Computer Applications and Commerce, the institute continues to grow as a preferred destination for students across Karnataka and beyond.",
    ],
    highlights: [
      "AICTE-approved institution affiliated to Davangere University",
      "Spacious academic blocks with well-equipped learning spaces",
      "Green campus environment supporting holistic student development",
    ],
    meta: { location: "BIHE Campus, Davangere" },
  },
  "campus-life": {
    lead:
      "Student life at BIHE blends classroom learning with clubs, cultural programmes, community service, and peer collaboration.",
    paragraphs: [
      "From orientation week to graduation day, students engage in academic projects, festivals, NSS activities, and sports events that build confidence and leadership skills.",
      "The institute encourages participation in co-curricular and extracurricular programmes so learners develop communication, teamwork, and social responsibility alongside their degree.",
    ],
    highlights: [
      "Active student clubs and cultural committees",
      "Peer learning and mentorship across programmes",
      "Inclusive campus culture for diverse student backgrounds",
    ],
    meta: { location: "BIHE Campus, Davangere" },
  },
  "lake-view-campus": {
    lead:
      "The serene lake-view surroundings add natural beauty to the BIHE campus experience.",
    paragraphs: [
      "Open spaces and landscaped areas around the campus provide students with a calm environment for study breaks, informal discussions, and outdoor gatherings.",
      "The scenic setting reflects BIHE's commitment to offering a campus where students feel motivated, comfortable, and connected to their institution.",
    ],
    highlights: [
      "Peaceful outdoor spaces for relaxation",
      "Ideal backdrop for campus events and photography",
      "Part of BIHE's learner-friendly campus planning",
    ],
    meta: { location: "BIHE Campus, Davangere" },
  },
  "library-reading": {
    lead:
      "The library reading hall offers a quiet, resource-rich space for individual study and academic preparation.",
    paragraphs: [
      "Students access textbooks, reference materials, journals, and digital resources that support BCA and B.Com coursework. The reading hall is arranged to encourage concentration and extended study sessions.",
      "Library staff guide students on catalogue search, issue procedures, and research support for projects and internal assessments.",
    ],
    highlights: [
      "Dedicated reading zones with ample seating",
      "Reference and programme-specific collections",
      "Support for project work and examination preparation",
    ],
    meta: { location: "Central Library, BIHE" },
  },
  "library-group-study": {
    lead:
      "Group study areas in the library help students collaborate on assignments, presentations, and project work.",
    paragraphs: [
      "Learners use these spaces to discuss concepts, prepare for internal assessments, and work on team-based academic tasks in a structured academic setting.",
      "Collaborative study complements classroom teaching and strengthens understanding across Computer Applications and Commerce subjects.",
    ],
    highlights: [
      "Shared tables for team-based learning",
      "Close access to library reference materials",
      "Encourages peer discussion and problem-solving",
    ],
    meta: { location: "Central Library, BIHE" },
  },
  "library-bookshelves": {
    lead:
      "The central library collection supports undergraduate programmes with curated academic and general reading material.",
    paragraphs: [
      "Shelves are organised by subject areas relevant to BCA and B.Com, helping students locate resources quickly for coursework and self-study.",
      "The library continues to expand its holdings to meet evolving syllabus requirements and student research needs.",
    ],
    highlights: [
      "Organised programme-wise book sections",
      "Academic and reference titles for all semesters",
      "Regular updates aligned with university syllabus",
    ],
    meta: { location: "Central Library, BIHE" },
  },
  "computer-lab": {
    lead:
      "Computer laboratories at BIHE provide hands-on practice for programming, applications, and practical coursework.",
    paragraphs: [
      "BCA students work on coding exercises, software tools, and lab assignments in environments equipped with updated systems and network connectivity.",
      "Practical sessions bridge theory and application, preparing students for projects, assessments, and industry-oriented skills.",
    ],
    highlights: [
      "Updated systems for programming and software labs",
      "Structured practical sessions for BCA students",
      "Faculty-guided lab demonstrations and assessments",
    ],
    meta: { location: "Computer Lab Block, BIHE" },
  },
  "lab-facilities": {
    lead:
      "Practical training labs strengthen applied learning across science, commerce, and technology-oriented subjects.",
    paragraphs: [
      "Laboratory sessions allow students to experiment, record observations, and build competence in procedures required by their academic programmes.",
      "Faculty supervise practical work to ensure safety, accuracy, and alignment with university guidelines.",
    ],
    highlights: [
      "Hands-on experiments and demonstrations",
      "Faculty-supervised practical assessments",
      "Supports skill-building beyond classroom theory",
    ],
    meta: { location: "Laboratory Block, BIHE" },
  },
  "crf-computer-lab": {
    lead:
      "The research computer lab supports advanced computing work, academic projects, and research-oriented activities.",
    paragraphs: [
      "Students and faculty use this facility for project development, data handling, and computing tasks that require dedicated technical resources.",
      "The lab contributes to BIHE's academic and research culture, especially for students pursuing project-based learning.",
    ],
    highlights: [
      "Computing resources for academic projects",
      "Supports research and development activities",
      "Enables advanced software and data work",
    ],
    meta: { location: "Central Research Facility, BIHE" },
  },
  "annual-day": {
    lead:
      "Annual Day at BIHE celebrates student achievement, cultural talent, and institutional milestones.",
    paragraphs: [
      "The programme brings together performances, awards, and addresses that recognise academic and co-curricular excellence. Students, faculty, and guests gather in the auditorium for this flagship event.",
      "Annual Day reinforces institutional pride and gives students a platform to showcase their abilities before the BIHE community.",
    ],
    highlights: [
      "Cultural performances and student awards",
      "Held in the campus auditorium",
      "Highlights yearly academic and co-curricular achievements",
    ],
    meta: { location: "Auditorium, BIHE" },
  },
  "cultural-fest": {
    lead:
      "Cultural festivals at BIHE celebrate diversity, creativity, and student expression through music, dance, and art.",
    paragraphs: [
      "Students from various backgrounds participate in competitions and stage programmes that build confidence and community spirit.",
      "These festivals are among the most anticipated events on the academic calendar, drawing enthusiastic participation across programmes.",
    ],
    highlights: [
      "Inter-class and inter-programme cultural competitions",
      "Student-led planning and stage performances",
      "Celebrates tradition, talent, and teamwork",
    ],
    meta: { location: "BIHE Campus, Davangere" },
  },
  "graduation-day": {
    lead:
      "Graduation Day marks the successful completion of undergraduate study for BIHE students.",
    paragraphs: [
      "The ceremony honours graduates for their dedication and academic accomplishment, with families, faculty, and leadership sharing the milestone.",
      "Graduation Day reflects BIHE's mission to prepare students for careers, higher education, and responsible citizenship.",
    ],
    highlights: [
      "Formal convocation-style celebration",
      "Recognition of graduating BCA and B.Com students",
      "Milestone event for students and families",
    ],
    meta: { location: "BIHE Campus, Davangere" },
  },
  "ethnic-day": {
    lead:
      "Ethnic Day showcases the rich cultural heritage of students through traditional attire, performances, and celebrations.",
    paragraphs: [
      "Learners represent different regions and communities, promoting respect for diversity on campus. The event is colourful, inclusive, and widely enjoyed across the student body.",
      "Ethnic Day strengthens cultural awareness while creating memorable experiences outside the regular academic schedule.",
    ],
    highlights: [
      "Traditional dress and cultural displays",
      "Celebrates diversity within the student community",
      "Popular annual student life event",
    ],
    meta: { location: "BIHE Campus, Davangere" },
  },
  "placement-drive": {
    lead:
      "The Mega Placement Drive 2025 connected BIHE students with recruiters and career opportunities.",
    paragraphs: [
      "Placement activities include pre-drive training, resume support, interview preparation, and on-campus recruiter interactions. Students from BCA and B.Com programmes participated in the initiative.",
      "BIHE's Training & Placement Cell coordinates these drives to improve employability and industry readiness.",
    ],
    highlights: [
      "On-campus recruiter participation",
      "Pre-placement training and interview support",
      "Coordinated by the Training & Placement Cell",
    ],
    meta: { date: "2025", location: "BIHE Campus, Davangere" },
  },
  "nss-tree-planting": {
    lead:
      "NSS volunteers led a tree plantation drive to promote environmental responsibility on and around campus.",
    paragraphs: [
      "Students participated in planting saplings and awareness activities aligned with the NSS motto, \"Not Me But You.\" Community service remains central to BIHE's student development approach.",
      "Environmental initiatives help students understand sustainability while contributing positively to their surroundings.",
    ],
    highlights: [
      "NSS-led community service activity",
      "Promotes environmental awareness",
      "Active student volunteer participation",
    ],
    meta: { location: "BIHE Campus, Davangere" },
  },
  "nss-eye-camp": {
    lead:
      "An NSS eye check-up camp provided vision screening and health awareness for the campus community.",
    paragraphs: [
      "The camp connected students and community members with basic eye care support and health education, reflecting BIHE's commitment to social outreach.",
      "NSS programmes regularly organise health and welfare activities that extend learning beyond the classroom.",
    ],
    highlights: [
      "Free eye screening and health awareness",
      "NSS community outreach initiative",
      "Supports student social responsibility goals",
    ],
    meta: { location: "BIHE Campus, Davangere" },
  },
  "nss-swachh": {
    lead:
      "NSS Swachh Abhiyan activities encouraged cleanliness, hygiene, and civic responsibility among students.",
    paragraphs: [
      "Volunteers organised campus cleaning drives and awareness sessions to promote tidy learning spaces and responsible habits.",
      "Such initiatives align with national service values and build discipline among participating students.",
    ],
    highlights: [
      "Campus cleanliness and awareness drive",
      "Student volunteers under NSS guidance",
      "Builds civic responsibility and teamwork",
    ],
    meta: { location: "BIHE Campus, Davangere" },
  },
  sports: {
    lead:
      "Sports and recreation facilities help BIHE students stay active, competitive, and physically fit.",
    paragraphs: [
      "Students participate in outdoor games, athletics, and recreational activities that balance academic pressure with healthy living.",
      "Sports events foster teamwork, discipline, and inter-programme camaraderie throughout the academic year.",
    ],
    highlights: [
      "Outdoor sports and recreation spaces",
      "Inter-class and inter-college sporting spirit",
      "Supports physical fitness and teamwork",
    ],
    meta: { location: "Sports Ground, BIHE" },
  },
  extracurricular: {
    lead:
      "Extracurricular activities give students outlets for creativity, leadership, and personal growth beyond academics.",
    paragraphs: [
      "Clubs, competitions, and student-led initiatives allow learners to explore interests in arts, technology, commerce forums, and community engagement.",
      "BIHE encourages students to participate actively so they graduate with broader skills and confidence.",
    ],
    highlights: [
      "Clubs and student-led initiatives",
      "Balances academics with creative expression",
      "Builds leadership and communication skills",
    ],
    meta: { location: "BIHE Campus, Davangere" },
  },
  hostel: {
    lead:
      "Hostel accommodation provides residential students with a safe and structured living environment on campus.",
    paragraphs: [
      "Hostel facilities support outstation students with basic amenities, study-friendly routines, and supervised residential care.",
      "Living on campus helps students stay engaged with academic schedules, library access, and college events.",
    ],
    highlights: [
      "Residential facility for outstation students",
      "Secure and study-oriented living environment",
      "Close to academic blocks and campus amenities",
    ],
    meta: { location: "Hostel Block, BIHE" },
  },
  canteen: {
    lead:
      "The campus canteen offers convenient dining for students and staff throughout the college day.",
    paragraphs: [
      "Fresh meals and snacks are served in a hygienic setting, giving students a reliable place to eat between classes and activities.",
      "The canteen is a daily social hub where students relax and connect during breaks.",
    ],
    highlights: [
      "Hygienic food service on campus",
      "Affordable meals for students and staff",
      "Convenient location near academic areas",
    ],
    meta: { location: "Campus Canteen, BIHE" },
  },
  auditorium: {
    lead:
      "The BIHE auditorium hosts academic ceremonies, cultural programmes, seminars, and institutional events.",
    paragraphs: [
      "With seating for large gatherings, the auditorium is the primary venue for Annual Day, guest lectures, workshops, and major student programmes.",
      "Its central role makes it one of the most important spaces in campus life.",
    ],
    highlights: [
      "Venue for ceremonies and seminars",
      "Hosts cultural and academic programmes",
      "Large-capacity institutional event space",
    ],
    meta: { location: "Auditorium, BIHE" },
  },
  "placement-training": {
    lead:
      "The Training & Placement Cell prepares students for interviews, internships, and graduate employment.",
    paragraphs: [
      "Workshops on aptitude, communication, resume writing, and interview skills are conducted throughout the year. The cell also coordinates campus recruitment activities.",
      "Placement support is integrated into the student experience so graduates are better prepared for professional opportunities.",
    ],
    highlights: [
      "Interview and soft-skills training",
      "Campus recruitment coordination",
      "Career guidance for BCA and B.Com students",
    ],
    meta: { location: "Training & Placement Cell, BIHE" },
  },
  "health-awareness": {
    lead:
      "Health awareness programmes educate students on wellness, preventive care, and healthy lifestyle choices.",
    paragraphs: [
      "BIHE organises talks, camps, and awareness sessions so students understand physical and mental well-being during their college years.",
      "These programmes complement academic life and encourage responsible health habits in the campus community.",
    ],
    highlights: [
      "Wellness and preventive health education",
      "Campus talks and awareness sessions",
      "Supports holistic student development",
    ],
    meta: { location: "BIHE Campus, Davangere" },
  },
  library: {
    lead:
      "The central library is a cornerstone of academic life at BIHE, supporting research, reading, and self-study.",
    paragraphs: [
      "Students rely on the library for textbooks, reference works, and quiet study spaces throughout their undergraduate programmes.",
      "The facility is designed to help learners stay academically prepared from the first semester through graduation.",
    ],
    highlights: [
      "Core academic resource centre",
      "Quiet study and reference access",
      "Supports BCA and B.Com programmes",
    ],
    meta: { location: "Central Library, BIHE" },
  },
  placement: {
    lead:
      "Placement activities connect BIHE graduates with employers and career pathways.",
    paragraphs: [
      "The institute works with recruiters and training partners to create opportunities for students completing BCA and B.Com degrees.",
      "Career readiness remains a key outcome of the BIHE undergraduate experience.",
    ],
    highlights: [
      "Recruiter engagement and job pathways",
      "Career readiness for graduating students",
      "Supported by the Placement Cell",
    ],
    meta: { location: "BIHE Campus, Davangere" },
  },
  community: {
    lead:
      "Community outreach programmes extend BIHE's educational mission into social service and civic engagement.",
    paragraphs: [
      "Students participate in awareness drives, volunteer work, and neighbourhood initiatives that build empathy and social responsibility.",
      "These activities reflect the institute's belief that education should benefit both learners and society.",
    ],
    highlights: [
      "Volunteer and outreach participation",
      "Builds civic awareness among students",
      "Part of BIHE's community engagement ethos",
    ],
    meta: { location: "Davangere community" },
  },
};

function defaultContent(
  title: string,
  category: string,
  filterId: GalleryPhotoFilterId,
): GalleryDetailContent {
  return {
    lead: `${title} — a highlight from BIHE's ${category.toLowerCase()} gallery showcasing campus life at Davangere.`,
    paragraphs: [
      `This photograph captures ${title.toLowerCase()} at Bapuji Institute of Hi-Tech Education. It reflects the institute's focus on quality undergraduate education, student engagement, and campus development.`,
      `BIHE students and faculty continue to build memorable experiences across academics, events, sports, and facilities that support holistic learning.`,
    ],
    highlights: [
      `Category: ${category}`,
      `Gallery section: ${filterId}`,
      "Part of the BIHE campus photo collection",
    ],
    meta: { location: "BIHE Campus, Davangere" },
  };
}

export function getGalleryDetailContent(
  id: string,
  title: string,
  category: string,
  filterId: GalleryPhotoFilterId,
): GalleryDetailContent {
  return GALLERY_DETAIL_BY_ID[id] ?? defaultContent(title, category, filterId);
}
