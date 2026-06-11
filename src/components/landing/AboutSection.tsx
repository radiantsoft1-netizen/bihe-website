import Link from "next/link";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SmartImage } from "@/components/ui/SmartImage";
import { ArrowRightIcon } from "@/components/ui/icons";
import { AboutVisualDecor } from "@/components/landing/AboutVisualDecor";
import { images } from "@/lib/images";

const stats = [
  { value: 650, suffix: "+", label: "Students Placed" },
  { value: 30, suffix: "+", label: "Experienced Faculty" },
  { value: 4500, suffix: "+", label: "Alumni Worldwide" },
];

export function AboutSection() {
  return (
    <section className="about" id="about-bihe" aria-labelledby="about-heading">
      <div className="about__grid">
        <Reveal direction="left" className="about__visual">
          <AboutVisualDecor />
          <div className="about__photo-frame">
            <div className="about__photo-wrap">
              <SmartImage
                src={images.aboutMain}
                alt="BIHE students at graduation"
                fill
                className="about__photo"
                sizes="(max-width: 960px) 100vw, 29rem"
              />
            </div>
          </div>
          <div className="about__badge" aria-label="25 plus years of excellence">
            <span className="about__badge-ring" aria-hidden />
            <span className="about__badge-years">25+</span>
            <span className="about__badge-label">Years of excellence</span>
          </div>
        </Reveal>

        <div className="about__content">
          <Reveal direction="right" delay={80}>
            <div className="about__intro">
              <SectionHeader
                badge="About Bapuji Institute"
                title="Empowering Students Through Quality Education"
                align="left"
              />
              <p className="about__desc" id="about-heading">
                Bapuji Institute of Hi-Tech Education imparts advanced curriculum course on
                Bachelor of Computer Application (BCA) & Bachelor of Commerce (B.Com). At BIHE,
                we believe that learning is most fruitful when knowledge and expertise of
                individuals from various disciplines and diverse backgrounds are shared.
              </p>
              <Link href="/about-bihe" className="about__more">
                Discover More
                <ArrowRightIcon />
              </Link>
            </div>
          </Reveal>

          <div className="stats">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={120 + i * 100} direction="up">
                <div className="stat-card">
                  <span className="stat-card__value">
                    <CountUp end={s.value} suffix={s.suffix} />
                  </span>
                  <span className="stat-card__label">{s.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
