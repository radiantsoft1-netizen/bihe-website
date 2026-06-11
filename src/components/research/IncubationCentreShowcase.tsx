import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import type { IncubationShowcaseSection } from "@/lib/incubation-centre-content";

export function IncubationCentreShowcase({
  section,
  index,
}: {
  section: IncubationShowcaseSection;
  index: number;
}) {
  const reverse = section.reverse ?? index % 2 === 1;
  const titleId = `ic-showcase-${section.id}-title`;

  return (
    <section
      className={[
        "ic-page__showcase",
        reverse ? "ic-page__showcase--reverse" : "",
        index % 2 === 1 ? "ic-page__showcase--muted" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-labelledby={titleId}
    >
      <div className="ic-page__container">
        <div
          className={[
            "ic-page__showcase-grid",
            reverse ? "ic-page__showcase-grid--reverse" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <Reveal direction={reverse ? "right" : "left"}>
            <figure className="ic-page__showcase-visual" aria-label={section.floatBadge}>
              <div className="ic-page__dual-cards">
                {section.imageCards.map((card, cardIndex) => (
                  <article
                    key={card.src}
                    className={[
                      "ic-page__image-card",
                      cardIndex === 0
                        ? "ic-page__image-card--primary"
                        : "ic-page__image-card--secondary",
                      card.tone ? `ic-page__image-card--${card.tone}` : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <div className="ic-page__image-card-frame">
                      <SmartImage
                        src={card.src}
                        alt={card.alt}
                        fill
                        className="ic-page__image-card-img"
                        sizes="(max-width: 960px) 42vw, 14rem"
                        priority={index === 0 && cardIndex === 0}
                      />
                    </div>
                  </article>
                ))}
                <span className="ic-page__dual-cards-badge">{section.floatBadge}</span>
              </div>
            </figure>
          </Reveal>

          <Reveal
            delay={80}
            direction={reverse ? "left" : "right"}
            className="ic-page__showcase-copy"
          >
            <p className="ic-page__showcase-eyebrow">{section.badge}</p>
            <h2 className="ic-page__showcase-title" id={titleId}>
              {section.title}
            </h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)} className="ic-page__showcase-text">
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
