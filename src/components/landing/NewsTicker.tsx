import Link from "next/link";
import "@/styles/news-ticker.css";
import { ArrowRightIcon } from "@/components/ui/icons";
import { getNewsTickerItems } from "@/lib/news-service";
import { SITE_LINKS } from "@/lib/site-links";

type NewsTickerProps = {
  items?: Awaited<ReturnType<typeof getNewsTickerItems>>;
};

function tickerText(items: NewsTickerProps["items"]): string {
  if (!items || items.length === 0) {
    return "Latest campus news and events from BIHE.";
  }

  return items.map((item) => item.title).join("   •   ");
}

export async function NewsTicker({ items }: NewsTickerProps) {
  const tickerItems = items ?? (await getNewsTickerItems());
  const text = tickerText(tickerItems);
  const hasItems = tickerItems.length > 0;

  return (
    <section className="news-ticker" aria-label="Latest news">
      <div className="news-ticker__inner">
        <div className="news-ticker__lead">
          <span className="news-ticker__live" aria-hidden />
          <span className="news-ticker__label">News</span>
        </div>

        <div className="news-ticker__marquee" aria-live="polite">
          <div className="news-ticker__track">
            <span className="news-ticker__run">
              {hasItems ? (
                tickerItems.map((item, index) => (
                  <span key={item.id} className="news-ticker__item">
                    {index > 0 ? (
                      <span className="news-ticker__dot" aria-hidden>
                        •
                      </span>
                    ) : null}
                    <Link href={SITE_LINKS.newsDetail(item.slug)}>{item.title}</Link>
                  </span>
                ))
              ) : (
                <span className="news-ticker__item">{text}</span>
              )}
            </span>
            <span className="news-ticker__run" aria-hidden>
              {text}
            </span>
          </div>
        </div>

        <Link href={SITE_LINKS.news} className="news-ticker__cta">
          View all
          <ArrowRightIcon className="news-ticker__cta-icon" />
        </Link>
      </div>
    </section>
  );
}
