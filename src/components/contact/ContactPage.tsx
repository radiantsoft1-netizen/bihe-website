import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  CONTACT_FORM_COPY,
  CONTACT_INTRO,
  CONTACT_MAP,
  CONTACT_METHODS,
  CONTACT_OFFICE_HOURS,
  CONTACT_PAGE_LEAD,
} from "@/lib/contact-page-content";
import { SITE_LINKS } from "@/lib/site-links";

function ContactMethodIcon({ id }: { id: string }) {
  if (id === "location") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M12 21s7-5.2 7-11a7 7 0 10-14 0c0 5.8 7 11 7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    );
  }

  if (id === "phone") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
      </svg>
    );
  }

  if (id === "email") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8 10h8M8 14h5" />
    </svg>
  );
}

export function ContactPage() {
  return (
    <article className="contact-page about-bihe-page">
      <AboutInnerHero
        currentPage="Contact Us"
        title="Contact Us"
        lead={CONTACT_PAGE_LEAD}
        eyebrow="Contact"
        sectionLabel="Contact"
        sectionHref={SITE_LINKS.contact}
      />

      <section className="contact-page__methods" aria-label="Contact methods">
        <div className="contact-page__container">
          <ul className="contact-page__methods-grid">
            {CONTACT_METHODS.map((method, index) => (
              <Reveal key={method.id} as="li" delay={index * 50} direction="scale">
                <div className="contact-page__method-card">
                  <span className="contact-page__method-icon" aria-hidden>
                    <ContactMethodIcon id={method.id} />
                  </span>
                  <p className="contact-page__method-label">{method.label}</p>
                  {method.href ? (
                    <a className="contact-page__method-value" href={method.href}>
                      {method.value}
                    </a>
                  ) : (
                    <p className="contact-page__method-value">{method.value}</p>
                  )}
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="contact-page__main" aria-labelledby="contact-intro-title">
        <div className="contact-page__container contact-page__main-grid">
          <Reveal className="contact-page__intro">
            <SectionHeader
              badge={CONTACT_INTRO.badge}
              title={CONTACT_INTRO.title}
              align="left"
              showIcon={false}
            />
            <div className="contact-page__intro-body">
              {CONTACT_INTRO.paragraphs.map((paragraph) => (
                <p key={paragraph} className="contact-page__text">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="contact-page__hours">
              <h3 className="contact-page__hours-title">{CONTACT_OFFICE_HOURS.title}</h3>
              <ul className="contact-page__hours-list">
                {CONTACT_OFFICE_HOURS.items.map((item) => (
                  <li key={item.day}>
                    <span>{item.day}</span>
                    <span>{item.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={80} className="contact-page__form-panel">
            <h2 className="contact-page__form-title" id="contact-intro-title">
              {CONTACT_FORM_COPY.title}
            </h2>
            <p className="contact-page__form-lead">{CONTACT_FORM_COPY.lead}</p>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <section className="contact-page__map" aria-labelledby="contact-map-title">
        <div className="contact-page__container">
          <Reveal>
            <h2 className="contact-page__map-title" id="contact-map-title">
              {CONTACT_MAP.title}
            </h2>
            <p className="contact-page__map-lead">
              Lake View Campus, S.S. Layout, Davangere — Karnataka, India
            </p>
          </Reveal>

          <Reveal delay={60}>
            <div className="contact-page__map-frame">
              <iframe
                title="BIHE campus location on Google Maps"
                src={CONTACT_MAP.embedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <a
              className="contact-page__map-link"
              href={CONTACT_MAP.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open directions in Google Maps
            </a>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
