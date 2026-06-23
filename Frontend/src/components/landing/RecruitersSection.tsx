import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SmartImage } from "@/components/ui/SmartImage";
import { FALLBACK_RECRUITING_PARTNERS } from "@/lib/homepage-fallbacks";
import type { RecruitingPartnerItem } from "@/lib/types/content";

type RecruitersSectionProps = {
  partners?: RecruitingPartnerItem[];
};

export function RecruitersSection({
  partners = FALLBACK_RECRUITING_PARTNERS,
}: RecruitersSectionProps) {
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
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="recruiters__panel">
            <p className="recruiters__panel-label">
              <span className="recruiters__count">{partners.length}+</span> hiring partners
            </p>
            <div className="recruiters__grid">
              {partners.map((partner) => (
                <article key={partner.id ?? partner.logo} className="recruiter-card">
                  <div className="recruiter-card__logo">
                    <SmartImage
                      src={partner.logo}
                      alt={partner.name}
                      width={200}
                      height={80}
                    />
                  </div>
                  <span className="recruiter-card__name">{partner.name}</span>
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
