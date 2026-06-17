import Link from "next/link";
import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { InfoCornerAttachmentCard } from "@/components/info-corner/InfoCornerAttachmentCard";
import { Reveal } from "@/components/ui/Reveal";
import { RichTextParagraph } from "@/components/ui/RichTextParagraph";
import { INFO_CORNER_BASE_PATH } from "@/lib/info-corner-routes";
import { images } from "@/lib/images";
import { isRichHtml } from "@/lib/sanitize-html";
import { type InfoCornerItem } from "@/lib/info-corner-items-service";

type InfoCornerItemDetailPageProps = {
  item: InfoCornerItem;
  categoryLead?: string;
};

type AttachmentEntry = {
  id: string;
  title: string;
  previewSrc: string;
  previewAlt: string;
  href: string;
  kind: "image" | "pdf";
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
  const galleryImages =
    item.images && item.images.length > 0
      ? item.images
      : item.image
        ? [{ id: "primary", url: item.image, alt: item.imageAlt ?? item.title }]
        : [];

  const attachments: AttachmentEntry[] = [
    ...galleryImages.map((image, index) => ({
      id: `image-${image.id}`,
      title:
        galleryImages.length > 1
          ? `${item.title} — Image ${index + 1}`
          : item.title,
      previewSrc: image.url,
      previewAlt: image.alt ?? item.title,
      href: image.url,
      kind: "image" as const,
    })),
    ...(item.pdf
      ? [
          {
            id: "pdf",
            title: item.pdfName?.trim() || `${item.title} (PDF)`,
            previewSrc: galleryImages[0]?.url ?? images.aboutBiheCampus,
            previewAlt: item.title,
            href: item.pdf,
            kind: "pdf" as const,
          },
        ]
      : []),
  ];

  return (
    <article className="ic-page ic-page--item-detail about-bihe-page">
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
        <div className="ic-page__container">
          <Reveal className="ic-page__notice-detail-content">
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
              <Link
                href={categoryHref}
                className="ic-page__notice-detail-btn ic-page__notice-detail-btn--ghost"
              >
                ← Back to {categoryName}
              </Link>
            </footer>
          </Reveal>

          {attachments.length > 0 ? (
            <Reveal delay={80} className="ic-page__notice-detail-attachments">
              <ul className="ic-page__notice-detail-attachment-list">
                {attachments.map((attachment) => (
                  <InfoCornerAttachmentCard
                    key={attachment.id}
                    title={attachment.title}
                    previewSrc={attachment.previewSrc}
                    previewAlt={attachment.previewAlt}
                    href={attachment.href}
                    kind={attachment.kind}
                  />
                ))}
              </ul>
            </Reveal>
          ) : null}
        </div>
      </section>
    </article>
  );
}
