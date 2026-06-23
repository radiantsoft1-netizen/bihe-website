import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { images } from "@/lib/images";

export function VideoStrip() {
  return (
    <section className="bihe-video" aria-labelledby="video-title">
      <SmartImage src={images.hero} alt="" fill className="bihe-video__bg" />
      <div className="bihe-video__overlay" aria-hidden />
      <div className="bihe-container bihe-video__inner">
        <Reveal>
          <a href="#" className="bihe-video__play" aria-label="Watch campus video">
            ▶
          </a>
          <h2 className="bihe-display bihe-display--lg" id="video-title">
            Welcome to BIHE
          </h2>
          <p style={{ marginTop: "0.75rem", opacity: 0.9 }}>Watch Video</p>
          <Link
            href="#about"
            className="bihe-btn bihe-btn--ghost"
            style={{ marginTop: "1.5rem" }}
          >
            About Us
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
