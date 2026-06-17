import Link from "next/link";
import { resolveJobOpeningBadgeLabel } from "@/lib/info-corner-pages/job-openings-content";
import type { InfoCornerItem } from "@/lib/info-corner-items-service";

type JobOpeningCardProps = {
  item: InfoCornerItem;
};

export function JobOpeningCard({ item }: JobOpeningCardProps) {
  const detailHref = item.href ?? "#";
  const badgeLabel = resolveJobOpeningBadgeLabel(item);
  const publishedDate = item.publishedDateLabel ?? item.publishedDate ?? "";

  return (
    <article className="ic-page__job-card">
      <span className="ic-page__job-card-badge">{badgeLabel}</span>
      <Link href={detailHref} className="ic-page__job-card-link">
        <div className="ic-page__job-card-accent" aria-hidden />

        <div className="ic-page__job-card-content">
          <div className="ic-page__job-card-meta">
            {publishedDate ? (
              <time
                className="ic-page__job-card-date"
                dateTime={item.publishedDate ?? publishedDate}
              >
                {publishedDate}
              </time>
            ) : null}
            <span className="ic-page__job-card-status">Open</span>
          </div>

          <h3 className="ic-page__job-card-title">{item.title}</h3>
          {item.subtitle ? <p className="ic-page__job-card-subtitle">{item.subtitle}</p> : null}
          {item.excerpt ? <p className="ic-page__job-card-excerpt">{item.excerpt}</p> : null}

          <span className="ic-page__job-card-action">View vacancy</span>
        </div>
      </Link>
    </article>
  );
}
