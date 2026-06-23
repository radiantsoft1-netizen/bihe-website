import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { images } from "@/lib/images";

export function PrincipalMessage() {
  return (
    <section className="bihe-section bihe-quote" aria-labelledby="quote-title">
      <div className="bihe-container bihe-quote__grid">
        <Reveal direction="left" className="bihe-quote__media">
          <SmartImage src={images.aboutMain} alt="BIHE leadership" fill />
        </Reveal>
        <Reveal direction="right" delay={120}>
          <p className="bihe-eyebrow" style={{ color: "var(--maroon-100)" }}>
            A message from our Principal
          </p>
          <h2 className="bihe-display bihe-display--lg" id="quote-title" style={{ color: "#fff" }}>
            Excellence beyond the classroom
          </h2>
          <blockquote>
            &ldquo;At Bapuji Institute of Hi-Tech Education, we believe true excellence goes beyond
            textbooks and lectures. It is about hands-on learning, collaboration, and exposure to
            real-world challenges — preparing graduates who are ready to lead in IT and commerce.&rdquo;
          </blockquote>
          <p className="bihe-quote__author">Principal</p>
          <p className="bihe-quote__role">Bapuji Institute of Hi-Tech Education</p>
        </Reveal>
      </div>
    </section>
  );
}
