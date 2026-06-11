import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BCA_HIGHLIGHTS } from "@/lib/bca-academics-content";

function IntegrityIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <path
        d="M11 2.5L18 6V11C18 14.866 15.313 18.194 11 19C6.68629 18.194 4 14.866 4 11V6L11 2.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 11L10.2 12.7L13.8 9.1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TrustIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <path
        d="M4.5 11.5C4.5 7.63401 7.63401 4.5 11.5 4.5C15.366 4.5 18.5 7.63401 18.5 11.5C18.5 15.366 15.366 18.5 11.5 18.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M11.5 8.5V11.5L13.5 13.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DedicationIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <path
        d="M11 4.5L12.6 8.4L16.8 8.9L13.8 11.8L14.6 16L11 14L7.4 16L8.2 11.8L5.2 8.9L9.4 8.4L11 4.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ExcellenceIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <path
        d="M6 17.5L11 5.5L16 17.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M7.8 14H14.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

const HIGHLIGHT_ICONS = {
  integrity: IntegrityIcon,
  trust: TrustIcon,
  dedication: DedicationIcon,
  excellence: ExcellenceIcon,
} as const;

export function BcaHighlightsSection() {
  return (
    <section className="b-com-admin__values" aria-label="Course highlights">
      <div className="b-com-admin__container">
        <Reveal>
          <SectionHeader badge="Programme Values" title="Course Highlights" align="center" />
        </Reveal>

        <ul className="b-com-admin__values-grid">
          {BCA_HIGHLIGHTS.map((item, index) => {
            const Icon = HIGHLIGHT_ICONS[item.id];

            return (
              <Reveal key={item.id} as="li" delay={index * 70}>
                <article className={`b-com-admin__highlight-card b-com-admin__highlight-card--${item.tone}`}>
                  <span className="b-com-admin__highlight-watermark" aria-hidden>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="b-com-admin__highlight-icon">
                    <Icon />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <span className="b-com-admin__highlight-foot" aria-hidden />
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
