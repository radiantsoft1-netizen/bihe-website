import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BCA_ELIGIBILITY } from "@/lib/bca-academics-content";

function GeneralEligibilityIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3L20 7V12C20 16.4183 16.866 20.1667 12 21C7.13401 20.1667 4 16.4183 4 12V7L12 3Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M9 12L11 14L15 10"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ReservedCategoryIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="17" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M3.5 19.5C3.5 16.4624 5.96243 14 9 14C12.0376 14 14.5 16.4624 14.5 19.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M14.5 17.5C14.5 15.567 16.067 14 18 14C19.933 14 21.5 15.567 21.5 17.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

const ELIGIBILITY_ICONS = {
  general: GeneralEligibilityIcon,
  reserved: ReservedCategoryIcon,
} as const;

export function BcaEligibilitySection() {
  return (
    <section className="b-com-admin__eligibility" aria-labelledby="bca-eligibility-title">
      <div className="b-com-admin__container">
        <Reveal>
          <SectionHeader badge="Admissions" title="Eligibility Criteria" align="center" />
          <p className="b-com-admin__faculty-lead" id="bca-eligibility-title">
            Minimum academic requirements for admission to the BCA undergraduate programme at BIHE.
          </p>
        </Reveal>

        <ul className="b-com-admin__info-grid">
          {BCA_ELIGIBILITY.map((item, index) => {
            const Icon = ELIGIBILITY_ICONS[item.id];

            return (
              <Reveal key={item.id} as="li" delay={index * 80}>
                <article className={`b-com-admin__info-card b-com-admin__info-card--${item.id}`}>
                  <span className="b-com-admin__info-accent" aria-hidden />
                  <span className="b-com-admin__info-icon">
                    <Icon />
                  </span>
                  <div className="b-com-admin__info-body">
                    <span className="b-com-admin__info-kicker">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
