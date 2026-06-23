import { Reveal } from "@/components/ui/Reveal";
import { StaggerReveal } from "@/components/ui/StaggerReveal";

const pillars = [
  {
    num: "01",
    title: "To Inspire",
    text: "The next generation of innovators and leaders in technology and commerce.",
  },
  {
    num: "02",
    title: "To Prepare",
    text: "Our students for productive careers in industry, business, and higher education.",
  },
  {
    num: "03",
    title: "To Energise",
    text: "Our students to pursue their passions through campus life and holistic growth.",
  },
];

export function MissionSection() {
  return (
    <section className="bihe-section bihe-mission" id="mission" aria-labelledby="mission-title">
      <div className="bihe-container">
        <Reveal>
          <p className="bihe-eyebrow">Our Mission</p>
          <h2 className="bihe-display bihe-display--lg" id="mission-title">
            Shaping futures at BIHE
          </h2>
        </Reveal>
        <StaggerReveal className="bihe-mission__grid">
          {pillars.map((p) => (
            <article key={p.title} className="bihe-mission__card">
              <span className="bihe-mission__num">{p.num}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </article>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
