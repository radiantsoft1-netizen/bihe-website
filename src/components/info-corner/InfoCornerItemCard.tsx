import Link from "next/link";
import { SmartImage } from "@/components/ui/SmartImage";
import {
  resolveInfoCornerBadgeLabel,
  type InfoCornerItem,
} from "@/lib/info-corner-items-service";

export type InfoCornerItemCardProps = {
  title: string;
  subtitle?: string | null;
  badgeLabel: string;
  showBadge: boolean;
  publishedDate: string;
  publishedDateIso?: string | null;
  excerpt: string;
  detailHref: string;
  image?: string | null;
  imageAlt?: string | null;
};

export function InfoCornerItemCard({
  title,
  subtitle,
  badgeLabel,
  showBadge,
  publishedDate,
  publishedDateIso,
  excerpt,
  detailHref,
  image,
  imageAlt,
}: InfoCornerItemCardProps) {
  const hasMedia = Boolean(image?.trim());

  return (
    <article
      className={
        "ic-page__notification-card" +
        (showBadge ? "" : " ic-page__notification-card--no-badge") +
        (hasMedia ? " ic-page__notification-card--has-media" : "")
      }
    >
      {showBadge ? (
        <span className="ic-page__notification-card-badge">{badgeLabel}</span>
      ) : null}
      <Link
        href={detailHref}
        className={
          "ic-page__notification-card-link" +
          (hasMedia ? " ic-page__notification-card-link--has-media" : "")
        }
      >
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

        {hasMedia ? (
          <figure className="ic-page__notification-card-thumb">
            <SmartImage
              src={image!}
              alt={imageAlt ?? title}
              fill
              className="ic-page__notification-card-thumb-img"
              sizes="(max-width: 640px) 28vw, 9rem"
            />
          </figure>
        ) : null}
      </Link>
    </article>
  );
}

export function infoCornerItemToCardProps(item: InfoCornerItem): InfoCornerItemCardProps {
  return {
    title: item.title,
    subtitle: item.subtitle,
    badgeLabel: resolveInfoCornerBadgeLabel(item),
    showBadge: item.badgeVisible !== false,
    publishedDate: item.publishedDateLabel ?? item.publishedDate ?? "",
    publishedDateIso: item.publishedDate,
    excerpt: item.excerpt ?? "",
    detailHref: item.href ?? "#",
    image: item.image,
    imageAlt: item.imageAlt,
  };
}
