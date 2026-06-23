import { images } from "@/lib/images";
import galleryManifest from "@/lib/sports-facilities-gallery.json";

export const SF_PAGE_LEAD =
  "Outdoor grounds, indoor games, and fitness activities that encourage teamwork, discipline, and student wellness at BIHE.";

export const SF_INTRO_TITLE = "Sports Facilities";

export const SF_INTRO_PARAGRAPHS = [
  "Sports and games form an integral part of BIHE education and contribute significantly to the physical, mental, and social development of students. Regular participation in sports helps in maintaining physical fitness, developing discipline, teamwork, leadership qualities, and a healthy competitive spirit among students.",
  "The college encourages students to participate in various indoor and outdoor sports activities and provides necessary infrastructure, equipment, and coaching facilities. Inter-class, inter-collegiate, and university-level competitions are organized and students are motivated to represent the institution in different events. Equal opportunities are provided to both men and women students to ensure inclusive participation in sports activities.",
  "Through systematic training, competitions, and encouragement, the institution aims to promote sportsmanship, resilience, and overall personality development of students.",
  "As per the directions of the Principal, the Inter-Class Sports Competitions for BCA students will be organized as part of the Annual Sports Meet 2024–25.",
  "All students are encouraged to actively participate and exhibit true sportsmanship, discipline, and team spirit.",
  "Sports and games play a vital role in the holistic development of students by promoting physical fitness, mental alertness, discipline, leadership, and team spirit. The institution strongly believes that participation in sports complements academic learning and helps in building character, confidence, and a sense of responsibility among students.",
  "The college provides adequate infrastructure and facilities for indoor and outdoor sports and encourages students to participate actively in inter-class, inter-collegiate, and university-level competitions. Regular coaching, practice sessions, and guidance are provided under the supervision of the Physical Director. Equal opportunities are extended to both men and women students to ensure inclusive participation in sports activities.",
] as const;

export type SportsFacilityNavCard = {
  id: string;
  title: string;
  sectionId: string;
  image: string;
  imageAlt: string;
};

export type SportsFacilityCard = {
  id: string;
  title: string;
  image: string;
  imageAlt: string;
};

export const SF_FACILITIES_TITLE = "Facilities";

export const SF_FACILITY_CARDS: readonly SportsFacilityCard[] = [
  {
    id: "cricket-ground",
    title: "Cricket Ground",
    image: images.sportsFacilities.cricketGround,
    imageAlt: "Students playing cricket on the BIHE campus ground",
  },
  {
    id: "basketball-court",
    title: "Basket Ball Court",
    image: images.sportsFacilities.basketballCourt,
    imageAlt: "BIHE faculty and students at a basketball court inauguration on campus",
  },
  {
    id: "football-ground",
    title: "Foot Ball Ground",
    image: images.sportsFacilities.footballGround,
    imageAlt: "Students on the football ground at BIHE",
  },
] as const;

export const SF_EVENTS_SECTION_ID = "events-2024-25";

export const SF_EVENTS_TITLE = "Sports Events";

export const SF_EVENTS_PAGE_LEAD =
  "Annual sports events and Davangere University inter college tournaments at Bapuji Institute of Hi-Tech Education.";

export const SF_TEAM_EVENTS = [
  "Volley Ball",
  "Tug of War",
  "Kabaddi",
  "Kho-Kho",
] as const;

export const SF_ATHLETICS_EVENTS = [
  "100m Running",
  "200m Running",
  "400m Running",
  "Shot Put",
  "Discus Throw",
  "Broad Jump",
  "4 × 100m Relay",
] as const;

export const SF_EVENTS_IMAGE = images.sportsFacilities.events;
export const SF_EVENTS_IMAGE_ALT =
  "BIHE students competing in an inter college volleyball match on campus";

export const SF_INTER_COLLEGE_TITLE = "Inter College Event";

export const SF_INTER_COLLEGE_INTRO =
  "BIHE students regularly represent the institution in Davangere University inter college sports tournaments. These events provide competitive exposure, team-building experience, and opportunities to showcase talent beyond the classroom.";

export type SportsTournament = {
  id: string;
  title: string;
  paragraph: string;
  image: string;
  imageAlt: string;
};

export const SF_TOURNAMENTS: readonly SportsTournament[] = [
  {
    id: "badminton",
    title: "Davangere University Inter College Badminton Tournament – 2024–25",
    paragraph:
      "BIHE badminton teams participated with strong competitive spirit in the university inter college tournament. Coordinated practice sessions and faculty guidance helped players perform consistently across singles and doubles categories.",
    image: images.sportsFacilities.badminton,
    imageAlt: "BIHE students participating in a badminton tournament",
  },
  {
    id: "football",
    title: "Davangere University Inter College Football Tournament – 2024–25",
    paragraph:
      "The college football team represented BIHE in the university-level tournament with disciplined teamwork and energetic performances. Regular ground practice and inter-class selections strengthened squad coordination throughout the season.",
    image: images.sportsFacilities.footballTournament,
    imageAlt: "BIHE football team in action during an inter college match",
  },
  {
    id: "table-tennis",
    title: "Davangere University Inter College Table Tennis Tournament – 2024–25",
    paragraph:
      "Table tennis players from BIHE competed in the inter college championship, demonstrating focus, agility, and sportsmanship. The event encouraged more students to take up indoor racket sports alongside outdoor games.",
    image: images.sportsFacilities.tableTennis,
    imageAlt: "Students playing table tennis at an inter college event",
  },
  {
    id: "chess",
    title: "Davangere University Inter College Chess Tournament – 2024–25",
    paragraph:
      "BIHE chess participants demonstrated strategic thinking and concentration in the university tournament. Mind-sport events complement physical activities by promoting analytical ability and calm decision-making under pressure.",
    image: images.sportsFacilities.chess,
    imageAlt: "Students competing in a chess tournament",
  },
] as const;

export const SF_FACILITY_NAV_CARDS: readonly SportsFacilityNavCard[] = [
  {
    id: SF_EVENTS_SECTION_ID,
    title: SF_EVENTS_TITLE,
    sectionId: SF_EVENTS_SECTION_ID,
    image: SF_EVENTS_IMAGE,
    imageAlt: SF_EVENTS_IMAGE_ALT,
  },
  ...SF_TOURNAMENTS.map((tournament) => ({
    id: tournament.id,
    title: tournament.title,
    sectionId: tournament.id,
    image: tournament.image,
    imageAlt: tournament.imageAlt,
  })),
];

export type SportsGalleryImage = {
  id: string;
  src: string;
  alt: string;
};

export const SF_GALLERY_TITLE = "Sports Gallery";

export const SF_GALLERY_IMAGES = galleryManifest as readonly SportsGalleryImage[];
