import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon } from "@/components/ui/icons";
import { SmartImage } from "@/components/ui/SmartImage";
import type { StudentLifePageRefCard } from "@/lib/student-life-pages/types";

function PageRefCardContent({ card }: { card: StudentLifePageRefCard }) {
  if (card.image) {
    return (
      <div className="sl-rich-page__page-ref-media">
        <SmartImage
          src={card.image}
          alt={card.imageAlt ?? card.title}
          fill
          className="sl-rich-page__page-ref-img"
          sizes="(max-width: 960px) 92vw, 36rem"
        />
        <span className="sl-rich-page__page-ref-scrim" aria-hidden />
        <div className="sl-rich-page__page-ref-copy">
          <h3 className="sl-rich-page__page-ref-title">{card.title}</h3>
          {card.description ? (
            <p className="sl-rich-page__page-ref-desc">{card.description}</p>
          ) : null}
          <span className="sl-rich-page__page-ref-cta">
            View details
            <ArrowRightIcon className="sl-rich-page__page-ref-cta-icon" />
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="sl-rich-page__page-ref-panel">
      <span className="sl-rich-page__page-ref-decor" aria-hidden>
        {card.yearLabel ? (
          <span className="sl-rich-page__page-ref-watermark">{card.yearLabel}</span>
        ) : null}
        <span className="sl-rich-page__page-ref-ring" />
      </span>

      <div className="sl-rich-page__page-ref-layout">
        <div className="sl-rich-page__page-ref-content">
          {card.eyebrow ? (
            <span className="sl-rich-page__page-ref-eyebrow">{card.eyebrow}</span>
          ) : null}
          <h3 className="sl-rich-page__page-ref-title">{card.title}</h3>
          {card.description ? (
            <p className="sl-rich-page__page-ref-desc">{card.description}</p>
          ) : null}
          <span className="sl-rich-page__page-ref-link-hint">Open event page</span>
        </div>

        <div className="sl-rich-page__page-ref-side">
          {card.dateLabel ? (
            <div className="sl-rich-page__page-ref-date">
              <span className="sl-rich-page__page-ref-date-day">{card.dateLabel}</span>
              {card.yearLabel ? (
                <span className="sl-rich-page__page-ref-date-year">{card.yearLabel}</span>
              ) : null}
            </div>
          ) : null}
          <span className="sl-rich-page__page-ref-go" aria-hidden>
            <ArrowRightIcon />
          </span>
        </div>
      </div>
    </div>
  );
}

export function StudentLifePageRefCards({
  cards,
}: {
  cards: readonly StudentLifePageRefCard[];
}) {
  return (
    <section className="sl-rich-page__page-refs" aria-label="Related pages">
      <div className="sl-rich-page__container">
        <ul className="sl-rich-page__page-ref-grid">
          {cards.map((card, index) => (
            <li key={card.id}>
              <Reveal delay={50 + index * 40}>
                <Link
                  href={card.href}
                  className={[
                    "sl-rich-page__page-ref-card",
                    card.image ? "" : "sl-rich-page__page-ref-card--panel",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <PageRefCardContent card={card} />
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
