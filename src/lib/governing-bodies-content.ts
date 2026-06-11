import { images } from "@/lib/images";

export type GoverningBodiesShowcase = {
  id: string;
  reverse?: boolean;
  profile: {
    name: string;
    titleLine: string;
    qualifications: string;
  };
  badge: string;
  title: {
    lead: string;
    accent: string;
  };
  paragraphs: readonly { text: string; emphasis: boolean }[];
  image: string;
  imageAlt: string;
};

export const GOVERNING_BODIES_PAGE_LEAD =
  "Governance structure, policy oversight, and institutional accountability at Bapuji Institute of Hi-Tech Education.";

export const GOVERNING_BODIES_SHOWCASES: readonly GoverningBodiesShowcase[] = [
  {
    id: "institutional-governance",
    profile: {
      name: "Dr Shamanur Shivashankarappa",
      titleLine: "Hon. Secretary & MLA, Bapuji Educational Association",
      qualifications: "Member, BIHE Governing Body",
    },
    badge: "Message from the Hon. Secretary & MLA",
    title: {
      lead: "Ordinary things done in an extraordinary way",
      accent: "make people Great",
    },
    paragraphs: [
      {
        text: "As education has become the key to promote participation in today's global knowledge economy, more and more people are seeking innovations using digital technologies that would facilitate a paradigm shift in education process and outcomes. To this end, educated people need to create a dynamic academic environment that will provide its learners the opportunities to explore the potentials of Information and Communications Technology (ICT) and acquire the core competencies required in the 21st century.",
        emphasis: false,
      },
      {
        text: "We at Bapuji Educational Association, believe that education is a serious thing for you and for us. On our part, we are committed to quality in every aspect of the process of imparting education. Our curriculum, teaching methods and infrastructure are benchmarked on par with the best Educational Institutes in India. Continuous improvements are being made to take the Association to be one of the premier associations in the country. This is reflected in the quality of placements our students are getting.",
        emphasis: true,
      },
      {
        text: "We seek to develop you to be successful education leaders of tomorrow. But we need your commitment to learn, to imbibe and contribute to the process. We believe that achievement is high when each member of the association does everything they can, going above and beyond to do so. We believe that your success and the achievements of the Institute synergize in an environment of mutual acceptance, support goodwill and working together.",
        emphasis: false,
      },
    ],
    image: images.governingBodiesHonSecretary,
    imageAlt: "Dr Shamanur Shivashankarappa, Hon. Secretary & MLA",
  },
  {
    id: "educational-association",
    reverse: true,
    profile: {
      name: "Sri S S Mallikarjuna",
      titleLine: "Joint Secretary & Minister, Bapuji Educational Association",
      qualifications: "Member, BIHE Governing Body",
    },
    badge: "Message from the Joint Secretary & Minister",
    title: {
      lead: "The Computer Technology could be a very positive step towards",
      accent: "education, organization and participation in a meaning society",
    },
    paragraphs: [
      {
        text: "Providing the knowledge and framework to meet the diverse challenges is the purpose of our BCA program. The program has great relevance today when \"competition\" is the \"buzzword\" of the day.",
        emphasis: false,
      },
      {
        text: "Just as computer technology and the Internet created whole new industries and extraordinary benefits for people that extend into almost every realm of human endeavour from education to transportation to medicine, genetics will undoubtedly benefit people, everywhere in ways we can't even imagine but know will surely occur.",
        emphasis: true,
      },
    ],
    image: images.governingBodiesJointSecretary,
    imageAlt: "Sri S S Mallikarjuna, Joint Secretary & Minister",
  },
  {
    id: "chairman-message",
    profile: {
      name: "Dr Athani S Veeranna",
      titleLine: "Chairman, BIHE Governing Body",
      qualifications: "President, Bapuji Educational Association",
    },
    badge: "Message from the Chairman",
    title: {
      lead: "Excellence is not a names,",
      accent: "it is an end itself",
    },
    paragraphs: [
      {
        text: "In today's society every young man and woman dreams of becoming an Information Technology Professional. With about 200 institutes offering BCA or similar programs, one often find themselves in a state of confusion while deciding which institution to choose. People look at Information Technology colleges from multiple perspectives.",
        emphasis: false,
      },
      {
        text: "With the environment getting increasingly more turbulent every moment in BIHE, learning to learn and adapting to change have become critical elements for success. Experienced IT professionals know that Education is not about earning another degree or a diploma. It is about broadening the scope of thinking to identify possible challenges and understanding of various issues surrounding any given situation. Students are not only made conscious of these but are also helped to build these abilities in them. Last but not least, a sense of entrepreneurship is also developed in the students of BIHE as it gives the courage to plunge into the uncertain future of risks and opportunities.",
        emphasis: true,
      },
      {
        text: "Whatever may be the individual's goals and aspirations, the bottom line always is, good education. Good education in Institute would mean a system of education that effectively and pragmatically combines theory and practice in order to ensure both rigor as well as relevance, in all of what it accomplished inside the classrooms.",
        emphasis: false,
      },
      {
        text: "The selection process is transparent, fair and ensures that outstanding young people from among the brightest are selected. The students are provided with a good grounding in the socio -economic-political realities of India and outside world to make them worthy and productive global citizens.",
        emphasis: false,
      },
    ],
    image: images.governingBodiesChairman,
    imageAlt: "Dr Athani S Veeranna, Chairman of BIHE Governing Body",
  },
] as const;
