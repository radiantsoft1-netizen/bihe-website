import { SmartImage } from "@/components/ui/SmartImage";
import { images } from "@/lib/images";

const services = [
  {
    icon: "🎓",
    title: "Quality Academics",
    desc: "AICTE-approved BCA & B.Com programs affiliated to Davangere University.",
    image: images.bcaLab,
  },
  {
    icon: "💼",
    title: "Placement Support",
    desc: "Dedicated training and recruiter partnerships for career-ready graduates.",
    image: images.facility.placement,
  },
  {
    icon: "🏛️",
    title: "Campus Facilities",
    desc: "Modern labs, library, hostel, sports, and auditorium on a vibrant campus.",
    image: images.facility.library,
  },
];

export function ServicesSection() {
  return (
    <section className="edu-section edu-section--muted" id="services" aria-labelledby="services-heading">
      <div className="edu-container">
        <div className="edu-section-head">
          <span className="edu-eyebrow">What We Offer</span>
          <h2 className="edu-heading" id="services-heading">
            Our Creative Education Services
          </h2>
          <p className="edu-sub" style={{ marginInline: "auto" }}>
            Comprehensive learning, industry exposure, and student support at BIHE.
          </p>
        </div>
        <div className="edu-services__grid">
          {services.map((s) => (
            <article key={s.title} className="edu-service-card">
              <div className="edu-service-card__top">
                <div className="edu-service-card__icon" aria-hidden>
                  {s.icon}
                </div>
                <h3 className="edu-service-card__title">{s.title}</h3>
                <p className="edu-service-card__desc">{s.desc}</p>
              </div>
              <div className="edu-service-card__img">
                <SmartImage src={s.image} alt="" fill />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
