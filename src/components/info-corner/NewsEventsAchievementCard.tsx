import Link from "next/link";
import { SmartImage } from "@/components/ui/SmartImage";
import { images } from "@/lib/images";
import { resolveNewsEventsBadgeLabel } from "@/lib/info-corner-pages/news-events-achievements-content";
import type { InfoCornerItem } from "@/lib/info-corner-items-service";

type NewsEventsAchievementCardProps = {
  item: InfoCornerItem;
};

export function NewsEventsAchievementCard({ item }: NewsEventsAchievementCardProps) {
  const detailHref = item.href ?? "#";
  const previewSrc = item.image?.trim() || images.news[0];
  const previewAlt = item.imageAlt ?? item.title;
  const badgeLabel = resolveNewsEventsBadgeLabel(item);
  const publishedDate = item.publishedDateLabel ?? item.publishedDate ?? "";

  return (
    <article className="ic-page__highlight-card">
      <Link href={detailHref} className="ic-page__highlight-card-media" aria-label={`Read ${item.title}`}>
        <SmartImage
          src={previewSrc}
          alt={previewAlt}
          fill
          className="ic-page__highlight-card-img"
          sizes="(max-width: 640px) 92vw, (max-width: 960px) 44vw, 20rem"
        />
        <span className="ic-page__highlight-card-overlay" aria-hidden />
        <span className="ic-page__highlight-card-badge">{badgeLabel}</span>
        {publishedDate ? (
          <time
            className="ic-page__highlight-card-date"
            dateTime={item.publishedDate ?? publishedDate}
          >
            {publishedDate}
          </time>
        ) : null}
      </Link>

      <div className="ic-page__highlight-card-body">
        <h3 className="ic-page__highlight-card-title">
          <Link href={detailHref}>{item.title}</Link>
        </h3>
        {item.excerpt ? <p className="ic-page__highlight-card-excerpt">{item.excerpt}</p> : null}
        <Link href={detailHref} className="ic-page__highlight-card-action">
          Read story
        </Link>
      </div>
    </article>
  );
}
