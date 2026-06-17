import Link from "next/link";
import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { Reveal } from "@/components/ui/Reveal";
import { RichTextParagraph } from "@/components/ui/RichTextParagraph";
import { SmartImage } from "@/components/ui/SmartImage";
import {
  resolveInfoCornerDetailImage,
  resolveInfoCornerViewerBadge,
} from "@/lib/info-corner-detail";
import type { InfoCornerItem } from "@/lib/info-corner-items-service";
import {
  NEWSLETTERS_BASE_PATH,
  resolveNewsletterSeriesLabel,
} from "@/lib/info-corner-pages/newsletters-content";
import { isRichHtml } from "@/lib/sanitize-html";

type NewsletterEditionDetailPageProps = {
  item: InfoCornerItem;
  categoryLead?: string;
};

export function NewsletterEditionDetailPage({
  item,
  categoryLead = "",
}: NewsletterEditionDetailPageProps) {
  const bodyHtml = item.body?.trim() ?? "";
  const hasRichBody = bodyHtml !== "" && isRichHtml(bodyHtml);
  const plainBodyParagraphs =
    bodyHtml && !hasRichBody
      ? (() => {
          const blocks = bodyHtml
            .split(/\n{2,}/)
            .map((paragraph) => paragraph.trim())
            .filter(Boolean);

          return blocks.length > 0 ? blocks : [bodyHtml];
        })()
      : [];
  const paragraphs = item.content?.length
    ? item.content
    : plainBodyParagraphs.length
      ? plainBodyParagraphs
      : item.excerpt
        ? [item.excerpt]
        : [];
  const { src: previewSrc, alt: previewAlt } = resolveInfoCornerDetailImage(item);
  const seriesLabel = resolveNewsletterSeriesLabel(item);
  const viewerBadge = resolveInfoCornerViewerBadge(item) || seriesLabel;
  const pdfHref = item.pdf?.trim() || null;

  return (
    <article className="cu-page ic-page ic-page--newsletter-detail about-bihe-page">
      <AboutInnerHero
        currentPage={item.title}
        title={item.title}
        lead={categoryLead}
        eyebrow="Info - Corner"
        sectionLabel="Newsletters"
        sectionHref={NEWSLETTERS_BASE_PATH}
      />

      <section className="ic-page__notice-detail-panel" aria-labelledby="newsletter-detail-body">
        <div className="cu-page__container">
          <Reveal className="ic-page__notice-detail-shell">
            <div className="ic-page__notice-detail-panel-inner">
              <div className="ic-page__notice-detail-copy">
                <header className="ic-page__notice-detail-header">
                  <div className="ic-page__notice-detail-meta">
                    <span className="ic-page__notice-detail-meta-chip">{seriesLabel}</span>
                    {item.publishedDateLabel ? (
                      <time
                        className="ic-page__notice-detail-meta-date"
                        dateTime={item.publishedDate ?? undefined}
                      >
                        {item.publishedDateLabel}
                      </time>
                    ) : null}
                  </div>
                  <h2 className="ic-page__notice-detail-title" id="newsletter-detail-body">
                    {item.title}
                  </h2>
                  {item.subtitle ? (
                    <p className="ic-page__notice-detail-subtitle">{item.subtitle}</p>
                  ) : null}
                </header>

                <div className="ic-page__notice-detail-prose">
                  <div className="ic-page__notice-detail-text-block">
                    {hasRichBody ? (
                      <RichTextParagraph html={bodyHtml} className="ic-page__notice-detail-text" />
                    ) : (
                      paragraphs.map((paragraph) => (
                        <p key={paragraph.slice(0, 48)} className="ic-page__notice-detail-text">
                          {paragraph}
                        </p>
                      ))
                    )}
                  </div>
                </div>

                <footer className="ic-page__notice-detail-actions">
                  {pdfHref ? (
                    <a
                      href={pdfHref}
                      className="ic-page__notice-detail-btn ic-page__notice-detail-btn--primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download PDF
                    </a>
                  ) : null}
                  <Link
                    href={NEWSLETTERS_BASE_PATH}
                    className="ic-page__notice-detail-btn ic-page__notice-detail-btn--ghost"
                  >
                    ← Back to newsletters
                  </Link>
                </footer>
              </div>

              <div className="ic-page__notice-detail-visual">
                <div className="ic-page__notice-detail-viewer">
                  <div className="ic-page__notice-detail-viewer-bar">
                    <span className="ic-page__notice-detail-viewer-label">Newsletters</span>
                    <span className="ic-page__notice-detail-viewer-badge">{viewerBadge}</span>
                  </div>
                  <div className="ic-page__notice-detail-gallery">
                    <figure className="ic-page__notice-detail-frame">
                      <SmartImage
                        src={previewSrc}
                        alt={previewAlt}
                        fill
                        className="ic-page__notice-detail-img"
                        sizes="(max-width: 900px) 100vw, 52vw"
                        priority
                      />
                    </figure>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
