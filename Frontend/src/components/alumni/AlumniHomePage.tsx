import type { ReactNode } from "react";
import Link from "next/link";
import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { ArrowRightIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SmartImage } from "@/components/ui/SmartImage";
import {
  ALUMNI_HOME_HIGHLIGHTS,
  ALUMNI_HOME_LEAD,
  ALUMNI_HOME_NETWORK,
  ALUMNI_HOME_QUICK_LINKS,
  ALUMNI_HOME_QUICK_LINKS_LEAD,
  ALUMNI_HOME_QUICK_LINKS_TITLE,
  ALUMNI_HOME_WELCOME,
  type AlumniHomeLinkIcon,
} from "@/lib/alumni-content";
import { images } from "@/lib/images";
import { SITE_LINKS } from "@/lib/site-links";

function AlumniHomeLinkIcon({ icon }: { icon: AlumniHomeLinkIcon }) {
  const paths: Record<AlumniHomeLinkIcon, ReactNode> = {
    events: (
      <>
        <rect x="4" y="6" width="16" height="14" rx="2" />
        <path d="M8 4v4M16 4v4M4 10h16" />
        <path d="M8 14h3M8 17h6" />
      </>
    ),
    register: (
      <>
        <path d="M12 3 4 7v6c0 4.2 3.4 7.2 8 9 4.6-1.8 8-4.8 8-9V7l-8-4z" />
        <path d="M12 10v5M9.5 12.5h5" />
      </>
    ),
    contact: (
      <>
        <path d="M4 6h16v12H4z" />
        <path d="m4 7 8 6 8-6" />
      </>
    ),
  };

  return (
    <svg
      className="alumni-home-page__link-icon-svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {paths[icon]}
    </svg>
  );
}

function AlumniHomePills({ tags }: { tags: readonly string[] }) {
  return (
    <ul className="alumni-home-page__pills" aria-label="Key themes">
      {tags.map((tag) => (
        <li key={tag}>
          <span className="alumni-home-page__pill">{tag}</span>
        </li>
      ))}
    </ul>
  );
}

export function AlumniHomePage() {
  return (
    <article className="alumni-home-page alumni-page about-bihe-page">
      <AboutInnerHero
        currentPage="Alumni Home"
        title="Alumni Home"
        lead={ALUMNI_HOME_LEAD}
        eyebrow="Alumni"
        sectionLabel="Alumni"
        sectionHref={SITE_LINKS.alumniHome}
      />

      <section className="alumni-home-page__welcome" aria-labelledby="alumni-home-welcome-title">
        <div className="alumni-home-page__container">
          <Reveal>
            <div className="alumni-home-page__welcome-split">
              <div className="alumni-home-page__welcome-copy">
                <SectionHeader
                  badge={ALUMNI_HOME_WELCOME.badge}
                  title={ALUMNI_HOME_WELCOME.title}
                  align="left"
                  titleId="alumni-home-welcome-title"
                />
                {ALUMNI_HOME_WELCOME.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="alumni-home-page__text">
                    {paragraph}
                  </p>
                ))}
                <AlumniHomePills tags={ALUMNI_HOME_WELCOME.tags} />
              </div>
              <figure className="alumni-home-page__welcome-media">
                <SmartImage
                  src={images.alumniHomeWelcome}
                  alt="BIHE alumni committee programme with faculty and students"
                  fill
                  className="alumni-home-page__welcome-img"
                  sizes="(max-width: 960px) 100vw, 36rem"
                />
              </figure>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="alumni-home-page__network" aria-labelledby="alumni-home-network-title">
        <div className="alumni-home-page__container">
          <Reveal>
            <div className="alumni-home-page__network-panel">
              <SectionHeader
                badge={ALUMNI_HOME_NETWORK.badge}
                title={ALUMNI_HOME_NETWORK.title}
                align="left"
                titleId="alumni-home-network-title"
              />
              {ALUMNI_HOME_NETWORK.paragraphs.map((paragraph) => (
                <p key={paragraph} className="alumni-home-page__text">
                  {paragraph}
                </p>
              ))}
              <AlumniHomePills tags={ALUMNI_HOME_NETWORK.tags} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="alumni-home-page__highlights" aria-labelledby="alumni-home-highlights-title">
        <div className="alumni-home-page__container">
          <Reveal>
            <SectionHeader
              badge={ALUMNI_HOME_HIGHLIGHTS.badge}
              title={ALUMNI_HOME_HIGHLIGHTS.title}
              align="left"
              titleId="alumni-home-highlights-title"
            />
            <p className="alumni-home-page__text alumni-home-page__text--lead">
              {ALUMNI_HOME_HIGHLIGHTS.intro}
            </p>
            <ul className="bihe-bullet-list alumni-home-page__highlights-list">
              {ALUMNI_HOME_HIGHLIGHTS.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="alumni-home-page__text">{ALUMNI_HOME_HIGHLIGHTS.closing}</p>
            <div className="alumni-home-page__highlight-cards">
              <article className="alumni-home-page__highlight-card">
                <h3 className="alumni-home-page__highlight-card-title">
                  {ALUMNI_HOME_HIGHLIGHTS.givingBack.title}
                </h3>
                <p className="alumni-home-page__highlight-card-text">
                  {ALUMNI_HOME_HIGHLIGHTS.givingBack.text}
                </p>
              </article>
              <article className="alumni-home-page__highlight-card alumni-home-page__highlight-card--accent">
                <h3 className="alumni-home-page__highlight-card-title">
                  {ALUMNI_HOME_HIGHLIGHTS.ourPride.title}
                </h3>
                <p className="alumni-home-page__highlight-card-text">
                  {ALUMNI_HOME_HIGHLIGHTS.ourPride.text}
                </p>
              </article>
            </div>
            <AlumniHomePills tags={ALUMNI_HOME_HIGHLIGHTS.tags} />
          </Reveal>
        </div>
      </section>

      <section className="alumni-home-page__links" aria-labelledby="alumni-home-links-title">
        <div className="alumni-home-page__container">
          <div className="alumni-home-page__section-head">
            <div className="alumni-home-page__section-copy">
              <h2 className="alumni-home-page__section-title" id="alumni-home-links-title">
                {ALUMNI_HOME_QUICK_LINKS_TITLE}
              </h2>
              <p className="alumni-home-page__section-lead">{ALUMNI_HOME_QUICK_LINKS_LEAD}</p>
            </div>
          </div>
          <ul className="alumni-home-page__link-grid alumni-home-page__link-grid--quick">
            {ALUMNI_HOME_QUICK_LINKS.map((item, index) => (
              <li key={item.href}>
                <Reveal delay={50 + index * 40} direction="up">
                  <Link href={item.href} className="alumni-home-page__link-card">
                    <span className="alumni-home-page__link-icon" aria-hidden>
                      <AlumniHomeLinkIcon icon={item.icon} />
                    </span>
                    <span className="alumni-home-page__link-body">
                      <span className="alumni-home-page__link-title">{item.label}</span>
                      <span className="alumni-home-page__link-desc">{item.description}</span>
                    </span>
                    <span className="alumni-home-page__link-arrow" aria-hidden>
                      <ArrowRightIcon className="alumni-home-page__link-arrow-icon" />
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}
