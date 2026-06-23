import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import type { InternationalStudentsShowcase } from "@/lib/info-corner-pages/international-students-admission-content";

function renderParagraph(paragraph: InternationalStudentsShowcase["paragraphs"][number]) {
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

export function InternationalStudentsShowcaseSection({
  section,
  sectionIndex,
  isFirst,
}: {
  section: InternationalStudentsShowcase;
  sectionIndex: number;
  isFirst: boolean;
}) {
  const titleId = `international-students-${section.id}-title`;

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
                    className="principal-page__portrait-img international-students-page__portrait-img"
                    sizes="(max-width: 960px) 90vw, 28rem"
                    priority={isFirst}
                  />
                </div>
              </div>
            </Reveal>
          ) : null}

          <Reveal
            delay={100}
            direction={section.reverse ? "left" : "right"}
            className="principal-page__content"
          >
            <span className="principal-page__badge">{section.badge}</span>

            <h2 className="principal-page__title" id={titleId}>
              &ldquo;{section.title.lead}{" "}
              <span className="principal-page__title-accent">{section.title.accent}</span>
              &rdquo;
            </h2>

            <div className="principal-page__body">
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.text.slice(0, 48)}
                  className="principal-page__paragraph"
                >
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
