import { FluxButton } from "@/components/ui/FluxButton";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SmartImage } from "@/components/ui/SmartImage";
import { images } from "@/lib/images";
import { SITE_LINKS } from "@/lib/site-links";

const companyNames = [
  "IonIdea",
  "Tech Mahindra",
  "Mahindra",
  "Flipkart",
  "Amazon",
  "Larsen & Toubro",
  "Honeywell",
  "Wipro",
  "TCS",
  "Deloitte",
  "Capgemini",
  "Cognizant",
];

export function RecruitersSection() {
  return (
    <section className="recruiters" id="recruiters" aria-labelledby="recruiters-title">
      <div className="recruiters__decor" aria-hidden>
        <span className="recruiters__decor-ring" />
        <span className="recruiters__decor-dot recruiters__decor-dot--1" />
        <span className="recruiters__decor-dot recruiters__decor-dot--2" />
      </div>

      <div className="container recruiters__inner">
        <Reveal>
          <div className="recruiters__head">
            <div className="recruiters__head-text">
              <SectionHeader
                badge="Our Recruiters"
                title="Recruiting the Future Leaders"
              />
              <p className="recruiters__lead" id="recruiters-title">
                Trusted by leading organizations across IT, consulting, and commerce.
              </p>
            </div>
            <FluxButton
              href={SITE_LINKS.contact}
              label="View All"
              className="recruiters__head-cta"
              variant="ghost"
            />
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="recruiters__panel">
            <p className="recruiters__panel-label">
              <span className="recruiters__count">{images.recruiters.length}+</span> hiring partners
            </p>
            <div className="recruiters__grid">
              {images.recruiters.map((src, i) => (
                <article key={src} className="recruiter-card">
                  <div className="recruiter-card__logo">
                    <SmartImage
                      src={src}
                      alt={companyNames[i] ?? `Recruiter ${i + 1}`}
                      width={200}
                      height={80}
                    />
                  </div>
                  <span className="recruiter-card__name">
                    {companyNames[i] ?? `Partner ${i + 1}`}
                  </span>
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
