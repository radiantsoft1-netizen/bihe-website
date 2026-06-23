import Link from "next/link";
import { SmartImage } from "@/components/ui/SmartImage";
import { images } from "@/lib/images";

export function CtaBanner() {
  return (
    <section className="edu-cta" id="apply" aria-labelledby="cta-heading">
      <SmartImage src={images.hero} alt="" fill className="edu-cta__bg" />
      <div className="edu-cta__overlay" aria-hidden />
      <div className="edu-container edu-cta__inner">
        <div>
          <h2 className="edu-heading edu-heading--light" id="cta-heading">
            Admissions Open — Start Your Journey at BIHE Today
          </h2>
          <p className="edu-sub" style={{ color: "rgba(255,255,255,0.85)", marginTop: "0.75rem" }}>
            Limited seats for BCA & B.Com. Apply online or visit our Davangere campus.
          </p>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
          <Link href="#apply" className="btn btn--accent btn--shine">
            Join Now
          </Link>
          <a href="#" className="edu-cta__play">
            <span className="edu-cta__play-icon">▶</span>
            Watch Campus Tour
          </a>
        </div>
      </div>
    </section>
  );
}
