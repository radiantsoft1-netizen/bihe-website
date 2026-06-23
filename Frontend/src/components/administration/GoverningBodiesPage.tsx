import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import {
  GOVERNING_BODIES_PAGE_LEAD,
  type GoverningBodiesShowcase,
} from "@/lib/governing-bodies-content";
import { isRichHtml, sanitizeRichHtml } from "@/lib/sanitize-html";

function renderParagraph(paragraph: GoverningBodiesShowcase["paragraphs"][number]) {
  if (isRichHtml(paragraph.text)) {
    return (
      <span
        className="principal-page__rich-text"
        dangerouslySetInnerHTML={{ __html: sanitizeRichHtml(paragraph.text) }}
      />
    );
  }

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

function GovernanceShowcaseSection({
  section,
  sectionIndex,
  isFirst,
}: {
  section: GoverningBodiesShowcase;
  sectionIndex: number;
  isFirst: boolean;
}) {
  const titleId = `governing-bodies-${section.id}-title`;

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
            <div className="principal-page__portrait">
              <div className="principal-page__portrait-frame">
                <SmartImage
                  src={section.image}
                  alt={section.imageAlt}
                  fill
                  className="principal-page__portrait-img governing-bodies-page__portrait-img"
                  sizes="(max-width: 960px) 90vw, 28rem"
                  priority={isFirst}
                />
              </div>

              <div className="principal-page__float-card principal-page__float-card--bottom">
                <p className="principal-page__float-name">{section.profile.name}</p>
                <p className="principal-page__float-role">{section.profile.titleLine}</p>
                <p className="principal-page__float-quals">{section.profile.qualifications}</p>
              </div>
            </div>
          </Reveal>

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

type GoverningBodiesPageProps = {
  showcases: readonly GoverningBodiesShowcase[];
};

export function GoverningBodiesPage({ showcases }: GoverningBodiesPageProps) {
  return (
    <article className="principal-page governing-bodies-page about-bihe-page">
      <AboutInnerHero
        currentPage="Governing Bodies"
        title="Governing Bodies"
        lead={GOVERNING_BODIES_PAGE_LEAD}
        eyebrow="Administration"
        sectionLabel="Administration"
        sectionHref="/governing-bodies"
      />

      {showcases.map((section, index) => (
        <GovernanceShowcaseSection
          key={section.id}
          section={section}
          sectionIndex={index}
          isFirst={index === 0}
        />
      ))}
    </article>
  );
}
