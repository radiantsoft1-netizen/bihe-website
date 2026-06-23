import Link from "next/link";
import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { SITE_LINKS } from "@/lib/site-links";
import { isRichHtml, sanitizeRichHtml } from "@/lib/sanitize-html";
import type { AlumniEvent } from "@/lib/types/alumni";

type AlumniEventDetailPageProps = {
  event: AlumniEvent;
};

function contentParagraphs(event: AlumniEvent): string[] {
  if (event.bodyParagraphs?.length) {
    return event.bodyParagraphs;
  }

  const source = event.body || event.summary;
  if (!source) return [];

  return source
    .split(/\n{2,}|\r\n\r\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function renderParagraph(text: string) {
  if (isRichHtml(text)) {
    return (
      <span
        className="principal-page__rich-text"
        dangerouslySetInnerHTML={{ __html: sanitizeRichHtml(text) }}
      />
    );
  }

  return text;
}

export function AlumniEventDetailPage({ event }: AlumniEventDetailPageProps) {
  const paragraphs = contentParagraphs(event);

  return (
    <article className="news-detail-page alumni-event-detail-page about-bihe-page">
      <AboutInnerHero
        currentPage={event.title}
        title={event.title}
        lead={event.summary ?? undefined}
        eyebrow="Alumni Events"
        sectionLabel="Alumni"
        sectionHref={SITE_LINKS.alumni}
        parentPage="Events"
        parentHref={`${SITE_LINKS.alumni}/events`}
      />

      {event.image ? (
        <section className="news-detail-page__hero" aria-label="Featured image">
          <div className="news-detail-page__container">
            <Reveal direction="scale">
              <div className="news-detail-page__hero-frame">
                <SmartImage
                  src={event.image}
                  alt={event.title}
                  fill
                  className="news-detail-page__hero-img"
                  sizes="(max-width: 900px) 100vw, 72rem"
                  priority
                />
              </div>
            </Reveal>
          </div>
        </section>
      ) : null}

      <section className="news-detail-page__content" aria-labelledby="alumni-event-body-title">
        <div className="news-detail-page__container news-detail-page__content-grid">
          <Reveal className="news-detail-page__meta">
            <p className="news-detail-page__meta-label">Event details</p>
            <ul className="news-detail-page__meta-list">
              {event.eventDate ? (
                <li>
                  <span className="news-detail-page__meta-key">Date</span>
                  <span className="news-detail-page__meta-value">
                    {event.dateLabel} {event.yearLabel}
                  </span>
                </li>
              ) : null}
              {event.venue ? (
                <li>
                  <span className="news-detail-page__meta-key">Venue</span>
                  <span className="news-detail-page__meta-value">{event.venue}</span>
                </li>
              ) : null}
            </ul>

            <Link href={`${SITE_LINKS.alumni}/events`} className="news-detail-page__back-link">
              Back to alumni events
            </Link>
          </Reveal>

          <Reveal delay={80} className="news-detail-page__copy">
            <h2 className="news-detail-page__section-title" id="alumni-event-body-title">
              About this event
            </h2>

            {paragraphs.length > 0 ? (
              paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="news-detail-page__text">
                  {renderParagraph(paragraph)}
                </p>
              ))
            ) : (
              <p className="news-detail-page__text">{event.summary}</p>
            )}
          </Reveal>
        </div>
      </section>
    </article>
  );
}
