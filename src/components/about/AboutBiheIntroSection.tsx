import { AboutVisualDecor } from "@/components/landing/AboutVisualDecor";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SmartImage } from "@/components/ui/SmartImage";
import { ABOUT_BIHE_OVERVIEW_PARAGRAPHS } from "@/lib/about-bihe-content";
import { images } from "@/lib/images";

export function AboutBiheIntroSection() {
  return (
    <section
      className="about about-bihe-intro"
      aria-labelledby="about-bihe-overview"
    >
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
                badge="About BIHE"
                title="Overview"
                align="left"
                showIcon={false}
              />
              <div className="about-bihe-intro__body" id="about-bihe-overview">
                {ABOUT_BIHE_OVERVIEW_PARAGRAPHS.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)} className="about__desc">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
