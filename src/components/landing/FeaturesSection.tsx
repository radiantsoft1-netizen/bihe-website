import { SmartImage } from "@/components/ui/SmartImage";
import { images } from "@/lib/images";

const features = [
  {
    icon: "👨‍🏫",
    title: "Expert Faculty",
    desc: "Experienced teachers guiding BCA and B.Com students toward excellence.",
  },
  {
    icon: "📖",
    title: "Updated Syllabus",
    desc: "Industry-aligned curriculum with practical labs and projects.",
  },
  {
    icon: "🌐",
    title: "Campus Life",
    desc: "Sports, cultural events, and clubs for holistic development.",
  },
  {
    icon: "✅",
    title: "NAAC Focus",
    desc: "Committed to quality benchmarks and continuous improvement.",
  },
];

export function FeaturesSection() {
  return (
    <section className="edu-section" aria-labelledby="features-heading">
      <div className="edu-container edu-features__grid">
        <div>
          <span className="edu-eyebrow">Why BIHE</span>
          <h2 className="edu-heading" id="features-heading">
            Transform Your Education & Your Life
          </h2>
          <div className="edu-features__list" style={{ marginTop: "2rem" }}>
            {features.map((f) => (
              <div key={f.title} className="edu-features__item">
                <div className="edu-features__item-icon" aria-hidden>
                  {f.icon}
                </div>
                <div>
                  <h4>{f.title}</h4>
                  <p className="edu-sub" style={{ marginTop: "0.25rem" }}>
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="edu-features__img">
          <SmartImage src={images.aboutMain} alt="BIHE students" fill />
        </div>
      </div>
    </section>
  );
}
