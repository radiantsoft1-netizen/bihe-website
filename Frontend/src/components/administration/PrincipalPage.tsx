import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { images } from "@/lib/images";
import {
  PRINCIPAL_QUOTE_TITLE,
  PRINCIPAL_MESSAGE_PARAGRAPHS,
  PRINCIPAL_PAGE_LEAD,
  PRINCIPAL_PROFILE,
  PRINCIPAL_SECTION_BADGE,
} from "@/lib/principal-content";

export function PrincipalPage() {
  return (
    <article className="principal-page about-bihe-page">
      <AboutInnerHero
        currentPage="Principal"
        title="Principal"
        lead={PRINCIPAL_PAGE_LEAD}
        eyebrow="Administration"
        sectionLabel="Administration"
        sectionHref="/principal"
      />

      <section
        className="principal-page__showcase principal-page__showcase--s1"
        aria-labelledby="principal-showcase-title"
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
                    src={images.principal}
                    alt={`${PRINCIPAL_PROFILE.name}, Principal of BIHE`}
                    fill
                    className="principal-page__portrait-img"
                    sizes="(max-width: 960px) 90vw, 28rem"
                    priority
                  />
                </div>

                <div className="principal-page__float-card principal-page__float-card--bottom">
                  <p className="principal-page__float-name">{PRINCIPAL_PROFILE.name}</p>
                  <p className="principal-page__float-role">{PRINCIPAL_PROFILE.titleLine}</p>
                  <p className="principal-page__float-quals">
                    {PRINCIPAL_PROFILE.qualifications}
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={100} direction="right" className="principal-page__content">
              <span className="principal-page__badge">{PRINCIPAL_SECTION_BADGE}</span>

              <h2 className="principal-page__title" id="principal-showcase-title">
                &ldquo;{PRINCIPAL_QUOTE_TITLE.lead}{" "}
                <span className="principal-page__title-accent">
                  {PRINCIPAL_QUOTE_TITLE.accent}
                </span>
                &rdquo;
              </h2>

              <div className="principal-page__body">
                {PRINCIPAL_MESSAGE_PARAGRAPHS.map((paragraph) => (
                  <p
                    key={paragraph.text.slice(0, 48)}
                    className="principal-page__paragraph"
                  >
                    {paragraph.emphasis ? (
                      <>
                        <strong>{paragraph.text.split(".")[0]}.</strong>
                        {paragraph.text.slice(paragraph.text.indexOf(".") + 1)}
                      </>
                    ) : (
                      paragraph.text
                    )}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </article>
  );
}
