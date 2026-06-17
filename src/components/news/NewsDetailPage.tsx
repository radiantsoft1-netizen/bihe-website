import Link from "next/link";
import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { MediaBadge } from "@/components/ui/MediaBadge";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import type { NewsItem } from "@/lib/types/news";
import { SITE_LINKS } from "@/lib/site-links";

type NewsDetailPageProps = {
  item: NewsItem;
};

function contentParagraphs(item: NewsItem): string[] {
  const source = item.content || item.body || item.description;
  if (!source) return [];

  return source
    .split(/\n{2,}|\r\n\r\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export function NewsDetailPage({ item }: NewsDetailPageProps) {
  const paragraphs = contentParagraphs(item);

  return (
    <article className="news-detail-page about-bihe-page">
      <AboutInnerHero
        currentPage={item.title}
        title={item.title}
        lead={item.description}
        eyebrow={item.tag}
        sectionLabel="News & Events"
        sectionHref={SITE_LINKS.news}
      />

      <section className="news-detail-page__hero" aria-label="Featured image">
        <div className="news-detail-page__container">
          <Reveal direction="scale">
            <div className="news-detail-page__hero-frame">
              <SmartImage
                src={item.image}
                alt={item.title}
                fill
                className="news-detail-page__hero-img"
                sizes="(max-width: 900px) 100vw, 72rem"
                priority
              />
              <MediaBadge label={item.tag} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="news-detail-page__content" aria-labelledby="news-detail-body-title">
        <div className="news-detail-page__container news-detail-page__content-grid">
          <Reveal className="news-detail-page__meta">
            <p className="news-detail-page__meta-label">Details</p>
            <ul className="news-detail-page__meta-list">
              <li>
                <span className="news-detail-page__meta-key">Category</span>
                <span className="news-detail-page__meta-value">{item.tag}</span>
              </li>
              {item.date ? (
                <li>
                  <span className="news-detail-page__meta-key">Date</span>
                  <span className="news-detail-page__meta-value">{item.date}</span>
                </li>
              ) : null}
            </ul>

            {item.pdf ? (
              <a href={item.pdf} className="news-detail-page__pdf-link" target="_blank" rel="noopener">
                {item.pdfName ?? "Download PDF attachment"}
              </a>
            ) : null}

            <Link href={SITE_LINKS.news} className="news-detail-page__back-link">
              Back to news & events
            </Link>
          </Reveal>

          <Reveal delay={80} className="news-detail-page__copy">
            <h2 className="news-detail-page__section-title" id="news-detail-body-title">
              Full story
            </h2>

            {paragraphs.length > 0 ? (
              paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="news-detail-page__text">
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="news-detail-page__text">{item.description}</p>
            )}
          </Reveal>
        </div>
      </section>
    </article>
  );
}
