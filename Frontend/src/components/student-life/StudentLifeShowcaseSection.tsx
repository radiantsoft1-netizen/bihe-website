import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import type { StudentLifeShowcase } from "@/lib/student-life-showcase";

function renderParagraph(paragraph: NonNullable<StudentLifeShowcase["paragraphs"]>[number]) {
  if (paragraph.emphasis) {
    const firstSentenceEnd = paragraph.text.indexOf(".");
    if (firstSentenceEnd === -1) {
      return <strong>{paragraph.text}</strong>;
    }

    return (
      <>
        <strong>{paragraph.text.slice(0, firstSentenceEnd + 1)}</strong>
        {paragraph.text.slice(firstSentenceEnd + 1)}
      </>
    );
  }

  return paragraph.text;
}

export function StudentLifeShowcaseSection({
  section,
  sectionIndex,
  isFirst,
  pageId,
}: {
  section: StudentLifeShowcase;
  sectionIndex: number;
  isFirst: boolean;
  pageId: string;
}) {
  const titleId = `${pageId}-${section.id}-title`;

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
            section.hideVisual ? "principal-page__grid--content-only" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {!section.hideVisual ? (
            <Reveal
              direction={section.reverse ? "right" : "left"}
              className="principal-page__visual"
            >
              <div className="principal-page__portrait">
                <div className="principal-page__portrait-frame">
                  <SmartImage
                    src={section.image}
                    alt={section.imageAlt}
                    fill
                    className="principal-page__portrait-img differently-abled-page__portrait-img"
                    sizes="(max-width: 960px) 90vw, 28rem"
                    priority={isFirst}
                  />
                </div>

                {section.profile ? (
                  <div className="principal-page__float-card principal-page__float-card--bottom">
                    <p className="principal-page__float-name">{section.profile.name}</p>
                    <p className="principal-page__float-role">{section.profile.role}</p>
                    {section.profile.detail ? (
                      <p className="principal-page__float-quals">{section.profile.detail}</p>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </Reveal>
          ) : null}

          <Reveal
            delay={100}
            direction={section.reverse ? "left" : "right"}
            className="principal-page__content"
          >
            {section.closingHighlight ? (
              <p className="differently-abled-page__closing-highlight">
                {section.closingHighlight}
              </p>
            ) : null}

            {!section.hideBadge ? (
              <span className="principal-page__badge">{section.badge}</span>
            ) : null}

            {section.titleVariant === "plain" ? (
              <h2 className="principal-page__title principal-page__title--plain" id={titleId}>
                {section.title.accent ? (
                  <>
                    {section.title.lead}{" "}
                    <span className="principal-page__title-accent">{section.title.accent}</span>
                  </>
                ) : (
                  section.title.lead
                )}
              </h2>
            ) : (
              <h2 className="principal-page__title" id={titleId}>
                &ldquo;{section.title.lead}{" "}
                <span className="principal-page__title-accent">{section.title.accent}</span>
                &rdquo;
              </h2>
            )}

            <div className="principal-page__body">
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph.text.slice(0, 48)} className="principal-page__paragraph">
                  {renderParagraph(paragraph)}
                </p>
              ))}
              {section.bullets && section.bullets.length > 0 ? (
                <ul className="bihe-bullet-list differently-abled-page__bullet-list">
                  {section.bullets.map((bullet) => (
                    <li key={bullet.slice(0, 48)}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
