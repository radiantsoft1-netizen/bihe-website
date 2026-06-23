import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import type { AdmissionProcessShowcase } from "@/lib/admission-process-content";

function renderParagraph(paragraph: AdmissionProcessShowcase["paragraphs"][number]) {
  if (paragraph.emphasis) {
    const firstSentenceEnd = paragraph.text.indexOf(".");
    return (
      <>
        <strong>{paragraph.text.slice(0, firstSentenceEnd + 1)}</strong>
        {paragraph.text.slice(firstSentenceEnd + 1)}
      </>
    );
  }

  return paragraph.text;
}

export function AdmissionProcessShowcaseSection({
  section,
  sectionIndex,
  isFirst,
}: {
  section: AdmissionProcessShowcase;
  sectionIndex: number;
  isFirst: boolean;
}) {
  const titleId = `admission-process-${section.id}-title`;

  return (
    <section
      className={`principal-page__showcase principal-page__showcase--s${sectionIndex + 1}`}
      aria-labelledby={titleId}
    >
      <div className="principal-page__decor" aria-hidden>
        <span className="principal-page__decor-blob principal-page__decor-blob--1" />
        <span className="principal-page__decor-blob principal-page__decor-blob--2" />
        <span className="principal-page__decor-ring principal-page__decor-ring--1" />
        <span className="principal-page__decor-ring principal-page__decor-ring--2" />
        <span className="principal-page__decor-grid" />
      </div>

      <div className="principal-page__container">
        <div
          className={[
            "principal-page__grid",
            section.reverse ? "principal-page__grid--reverse" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <Reveal
            direction={section.reverse ? "right" : "left"}
            className="principal-page__visual"
          >
            {section.imageCards?.length ? (
              <div className="admission-process-page__dual-visual">
                {section.imageCards.map((card, cardIndex) => (
                  <article
                    key={card.profile.name}
                    className={[
                      "admission-process-page__image-card",
                      cardIndex === 0
                        ? "admission-process-page__image-card--primary"
                        : "admission-process-page__image-card--secondary",
                      card.tone ? `admission-process-page__image-card--${card.tone}` : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <div className="admission-process-page__image-card-frame">
                      <SmartImage
                        src={card.image}
                        alt={card.imageAlt}
                        fill
                        className="admission-process-page__image-card-img"
                        sizes="(max-width: 960px) 42vw, 14rem"
                        priority={isFirst && cardIndex === 0}
                      />
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="principal-page__portrait">
                <div className="principal-page__portrait-frame">
                  <SmartImage
                    src={section.image ?? ""}
                    alt={section.imageAlt ?? ""}
                    fill
                    className="principal-page__portrait-img admission-process-page__portrait-img"
                    sizes="(max-width: 960px) 90vw, 28rem"
                    priority={isFirst}
                  />
                </div>

                {section.profile ? (
                  <div className="principal-page__float-card principal-page__float-card--bottom">
                    <p className="principal-page__float-name">{section.profile.name}</p>
                    <p className="principal-page__float-role">{section.profile.titleLine}</p>
                    <p className="principal-page__float-quals">{section.profile.qualifications}</p>
                  </div>
                ) : null}
              </div>
            )}
          </Reveal>

          <Reveal
            delay={100}
            direction={section.reverse ? "left" : "right"}
            className="principal-page__content"
          >
            <span className="principal-page__badge">{section.badge}</span>

            <h2 className="principal-page__title" id={titleId}>
              {section.plainTitle ? (
                <>
                  {section.title.lead}{" "}
                  <span className="principal-page__title-accent">{section.title.accent}</span>
                </>
              ) : (
                <>
                  &ldquo;{section.title.lead}{" "}
                  <span className="principal-page__title-accent">{section.title.accent}</span>
                  &rdquo;
                </>
              )}
            </h2>

            <div className="principal-page__body">
              {section.items?.length ? (
                <ul className="admission-process-page__document-list">
                  {section.items.map((item) => (
                    <li key={item.title} className="admission-process-page__document-item">
                      <strong className="admission-process-page__document-title">{item.title}</strong>
                      {item.subtitle ? (
                        <span className="admission-process-page__document-subtitle">
                          {item.subtitle}
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              ) : null}
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.text.slice(0, 48)} className="principal-page__paragraph">
                  {renderParagraph(paragraph)}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
