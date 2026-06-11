import { AboutBiheIntroSection } from "@/components/about/AboutBiheIntroSection";
import { AboutInnerHero } from "@/components/about/AboutInnerHero";

export function AboutBihePage() {
  return (
    <article className="about-bihe-page">
      <AboutInnerHero
        currentPage="About BIHE"
        title="About BIHE"
        lead="Learn about Bapuji Institute of Hi-Tech Education — our history, vision, programmes, and commitment to quality education in Davangere."
      />
      <AboutBiheIntroSection />
    </article>
  );
}
