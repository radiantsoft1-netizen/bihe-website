import { SmartImage } from "@/components/ui/SmartImage";
import { images } from "@/lib/images";

const steps = [
  {
    title: "Choose Your Program",
    desc: "Select BCA or B.Com based on your career goals.",
    image: images.bcaLab,
  },
  {
    title: "Complete Admission",
    desc: "Submit application and required documents online or on campus.",
    image: images.aboutMain,
  },
  {
    title: "Start Learning",
    desc: "Join classes, labs, and campus life at BIHE Davangere.",
    image: images.bcom,
  },
];

export function ProcessSection() {
  return (
    <section className="edu-section edu-section--muted" aria-labelledby="process-heading">
      <div className="edu-container">
        <div className="edu-section-head">
          <span className="edu-eyebrow">Simple Steps</span>
          <h2 className="edu-heading" id="process-heading">
            How Does BIHE Admission Work?
          </h2>
        </div>
        <div className="edu-process__steps">
          {steps.map((step, i) => (
            <div key={step.title} className="edu-process__step">
              <div className="edu-process__diamond">
                <SmartImage src={step.image} alt="" fill />
              </div>
              <span className="edu-eyebrow">Step {i + 1}</span>
              <h4>{step.title}</h4>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
