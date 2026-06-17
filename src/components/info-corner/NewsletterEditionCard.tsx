import Link from "next/link";
import { PdfFileIcon } from "@/components/ui/icons";
import { SmartImage } from "@/components/ui/SmartImage";
import { images } from "@/lib/images";
import { resolveNewsletterSeriesLabel } from "@/lib/info-corner-pages/newsletters-content";
import type { InfoCornerItem } from "@/lib/info-corner-items-service";

type NewsletterEditionCardProps = {
  item: InfoCornerItem;
};

export function NewsletterEditionCard({ item }: NewsletterEditionCardProps) {
  const detailHref = item.href ?? "#";
  const previewSrc = item.image?.trim() || images.aboutBiheCampus;
  const previewAlt = item.imageAlt ?? item.title;
  const seriesLabel = resolveNewsletterSeriesLabel(item);
  const publishedDate = item.publishedDateLabel ?? item.publishedDate ?? "";
  const pdfHref = item.pdf?.trim() || null;

  return (
    <article className="ic-page__newsletter-card">
        <Link href={detailHref} className="ic-page__newsletter-card-media" aria-label={`Open ${item.title}`}>
          <SmartImage
            src={previewSrc}
            alt={previewAlt}
            fill
            className="ic-page__newsletter-card-img"
            sizes="(max-width: 640px) 92vw, (max-width: 960px) 44vw, 18rem"
          />
          <span className="ic-page__newsletter-card-overlay" aria-hidden />
          <span className="ic-page__newsletter-card-series">{seriesLabel}</span>
          <span className="ic-page__newsletter-card-brand">
            <SmartImage
              src={images.logo}
              alt=""
              width={30}
              height={30}
              className="ic-page__newsletter-card-logo"
            />
          </span>
        </Link>

        <div className="ic-page__newsletter-card-body">
          {publishedDate ? (
            <time
              className="ic-page__newsletter-card-date"
              dateTime={item.publishedDate ?? publishedDate}
            >
              {publishedDate}
            </time>
          ) : null}
          <h3 className="ic-page__newsletter-card-title">
            <Link href={detailHref}>{item.title}</Link>
          </h3>
          {item.excerpt ? <p className="ic-page__newsletter-card-excerpt">{item.excerpt}</p> : null}
          <div className="ic-page__newsletter-card-actions">
            <Link href={detailHref} className="ic-page__newsletter-card-action ic-page__newsletter-card-action--primary">
              Read edition
            </Link>
            {pdfHref ? (
              <a
                href={pdfHref}
                className="ic-page__newsletter-card-action ic-page__newsletter-card-action--pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <PdfFileIcon className="ic-page__newsletter-card-action-icon" aria-hidden />
                PDF
              </a>
            ) : null}
          </div>
        </div>
    </article>
  );
}
