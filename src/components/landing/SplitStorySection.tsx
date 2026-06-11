import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

export function SplitStorySection() {
  return (
    <>
      <section className="bihe-split" aria-labelledby="ambition-title">
        <div className="bihe-split__panel bihe-split__panel--light">
          <Reveal>
            <p className="bihe-eyebrow">About us</p>
            <h2 className="bihe-display bihe-display--lg" id="ambition-title">
              Turning academic ambition into career success.
            </h2>
            <p className="bihe-lead" style={{ marginTop: "1rem" }}>
              Our principle is simple: provide students with a world-class education in computer
              applications and commerce at Davangere.
            </p>
            <Link href="#about" className="bihe-btn bihe-btn--maroon" style={{ marginTop: "1.5rem", alignSelf: "flex-start" }}>
              Read our story
            </Link>
          </Reveal>
        </div>
        <div className="bihe-split__panel bihe-split__panel--navy">
          <Reveal delay={100}>
            <p className="bihe-eyebrow" style={{ color: "var(--maroon-100)" }}>
              Why us
            </p>
            <h2 className="bihe-display bihe-display--lg">
              We prepare our students for future success.
            </h2>
            <p className="bihe-lead" style={{ marginTop: "1rem" }}>
              Tailored BCA & B.Com curriculum complemented by placement support, modern labs, and
              vibrant campus life.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
