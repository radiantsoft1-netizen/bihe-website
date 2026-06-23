import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SmartImage } from "@/components/ui/SmartImage";
import { INFO_CORNER_BASE_PATH } from "@/lib/info-corner-routes";
import {
  RTI_CPIO_SHOWCASE,
  RTI_INTRO,
  RTI_PAGE_LEAD,
} from "@/lib/info-corner-pages/rti-details-content";

export function RtiDetailsPage() {
  return (
    <article className="ic-page ic-page--rti principal-page about-bihe-page">
      <AboutInnerHero
        currentPage="RTI Details"
        title="RTI Details"
        lead={RTI_PAGE_LEAD}
        eyebrow="Info - Corner"
        sectionLabel="Info - Corner"
        sectionHref={INFO_CORNER_BASE_PATH}
      />

      <section className="ic-page__intro" aria-labelledby="rti-intro-title">
        <div className="ic-page__container">
          <Reveal>
            <SectionHeader
              badge={RTI_INTRO.badge}
              title={RTI_INTRO.title}
              align="left"
              titleId="rti-intro-title"
            />
            <div className="ic-page__intro-body">
              {RTI_INTRO.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="ic-page__text">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section
        className="principal-page__showcase principal-page__showcase--s1 ic-page__cpio-showcase"
        aria-labelledby="rti-cpio-title"
      >
        <div className="principal-page__decor" aria-hidden>
          <span className="principal-page__decor-blob principal-page__decor-blob--1" />
          <span className="principal-page__decor-blob principal-page__decor-blob--2" />
          <span className="principal-page__decor-ring principal-page__decor-ring--1" />
          <span className="principal-page__decor-ring principal-page__decor-ring--2" />
          <span className="principal-page__decor-grid" />
        </div>

        <div className="principal-page__container">
          <div className="principal-page__grid">
            <Reveal direction="left" className="principal-page__visual">
              <div className="principal-page__portrait">
                <div className="principal-page__portrait-frame">
                  <SmartImage
                    src={RTI_CPIO_SHOWCASE.image}
                    alt={RTI_CPIO_SHOWCASE.imageAlt}
                    fill
                    className="principal-page__portrait-img ic-page__cpio-portrait"
                    sizes="(max-width: 960px) 90vw, 28rem"
                    priority
                  />
                </div>

                <div className="principal-page__float-card principal-page__float-card--bottom">
                  <p className="principal-page__float-name">{RTI_CPIO_SHOWCASE.profile.name}</p>
                  <p className="principal-page__float-role">{RTI_CPIO_SHOWCASE.profile.titleLine}</p>
                  <p className="principal-page__float-quals">
                    {RTI_CPIO_SHOWCASE.profile.qualifications}
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={100} direction="right" className="principal-page__content">
              <span className="principal-page__badge">{RTI_CPIO_SHOWCASE.badge}</span>

              <h2 className="principal-page__title ic-page__cpio-title" id="rti-cpio-title">
                {RTI_CPIO_SHOWCASE.title.lead}{" "}
                <span className="principal-page__title-accent">{RTI_CPIO_SHOWCASE.title.accent}</span>
              </h2>

              <dl className="ic-page__cpio-details">
                {RTI_CPIO_SHOWCASE.details.map((detail) => (
                  <div key={detail.label} className="ic-page__cpio-detail-row">
                    <dt className="ic-page__cpio-detail-label">{detail.label}</dt>
                    <dd className="ic-page__cpio-detail-value">
                      {detail.href ? (
                        <a href={detail.href} className="ic-page__cpio-detail-link">
                          {detail.value}
                        </a>
                      ) : (
                        detail.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="principal-page__paragraph ic-page__cpio-summary">
                {RTI_CPIO_SHOWCASE.paragraph}
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </article>
  );
}
