import Link from "next/link";
import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { Reveal } from "@/components/ui/Reveal";
import { RichTextParagraph } from "@/components/ui/RichTextParagraph";
import { SmartImage } from "@/components/ui/SmartImage";
import { INFO_CORNER_BASE_PATH } from "@/lib/info-corner-routes";
import {
  resolveInfoCornerDetailImage,
  resolveInfoCornerViewerBadge,
} from "@/lib/info-corner-detail";
import { isRichHtml } from "@/lib/sanitize-html";
import { type InfoCornerItem } from "@/lib/info-corner-items-service";

type InfoCornerItemDetailPageProps = {
  item: InfoCornerItem;
  categoryLead?: string;
};

export function InfoCornerItemDetailPage({ item, categoryLead = "" }: InfoCornerItemDetailPageProps) {
  const categoryName = item.category?.name ?? "Info - Corner";
  const categoryHref = item.category?.href ?? INFO_CORNER_BASE_PATH;
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
  const viewerBadge = resolveInfoCornerViewerBadge(item);

  return (
    <article className="cu-page ic-page ic-page--item-detail about-bihe-page">
      <AboutInnerHero
        currentPage={item.title}
        title={item.title}
        lead={categoryLead}
        eyebrow="Info - Corner"
        sectionLabel="Info - Corner"
        sectionHref={INFO_CORNER_BASE_PATH}
        parentPage={categoryName}
        parentHref={categoryHref}
      />

      <section className="ic-page__notice-detail-panel" aria-labelledby="notice-detail-body">
        <div className="cu-page__container">
          <Reveal className="ic-page__notice-detail-shell">
            <div className="ic-page__notice-detail-panel-inner">
              <div className="ic-page__notice-detail-copy">
                <header className="ic-page__notice-detail-header">
                  <div className="ic-page__notice-detail-meta">
                    <span className="ic-page__notice-detail-meta-chip">{categoryName}</span>
                    {item.publishedDateLabel ? (
                      <time
                        className="ic-page__notice-detail-meta-date"
                        dateTime={item.publishedDate ?? undefined}
                      >
                        {item.publishedDateLabel}
                      </time>
                    ) : null}
                  </div>

                  <h2 className="ic-page__notice-detail-title" id="notice-detail-body">
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
                  {item.pdf ? (
                    <a
                      href={item.pdf}
                      className="ic-page__notice-detail-btn ic-page__notice-detail-btn--primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.pdfName?.trim() || "Download PDF"}
                    </a>
                  ) : null}
                  <Link
                    href={categoryHref}
                    className="ic-page__notice-detail-btn ic-page__notice-detail-btn--ghost"
                  >
                    ← Back to {categoryName}
                  </Link>
                </footer>
              </div>

              <div className="ic-page__notice-detail-visual">
                <div className="ic-page__notice-detail-viewer">
                  <div className="ic-page__notice-detail-viewer-bar">
                    <span className="ic-page__notice-detail-viewer-label">{categoryName}</span>
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
