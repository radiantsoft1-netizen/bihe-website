import Link from "next/link";

export type CircularNoticeListItemProps = {
  title: string;
  subtitle?: string;
  publishedDate: string;
  publishedDateIso?: string;
  excerpt: string;
  detailHref: string;
};

export function CircularNoticeListItem({
  title,
  subtitle,
  publishedDate,
  publishedDateIso,
  excerpt,
  detailHref,
}: CircularNoticeListItemProps) {
  return (
    <article className="ic-page__notification-card">
      <span className="ic-page__notification-card-badge">Notice</span>
      <Link href={detailHref} className="ic-page__notification-card-link">
        <div className="ic-page__notification-card-accent" aria-hidden />

        <div className="ic-page__notification-card-content">
          <div className="ic-page__notification-card-meta">
            <time className="ic-page__notification-card-date" dateTime={publishedDateIso ?? publishedDate}>
              {publishedDate}
            </time>
          </div>

          <h3 className="ic-page__notification-card-title">{title}</h3>
          {subtitle ? <p className="ic-page__notification-card-subtitle">{subtitle}</p> : null}
          <p className="ic-page__notification-card-excerpt">{excerpt}</p>

          <span className="ic-page__notification-card-action">View notice</span>
        </div>
      </Link>
    </article>
  );
}
