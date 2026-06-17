import Link from "next/link";
import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { NewsEventsAchievementCard } from "@/components/info-corner/NewsEventsAchievementCard";
import { Reveal } from "@/components/ui/Reveal";
import { INFO_CORNER_BASE_PATH } from "@/lib/info-corner-routes";
import { buildInfoCornerSidebarLinks } from "@/lib/info-corner-nav";
import {
  getInfoCornerCategories,
  getInfoCornerItems,
} from "@/lib/info-corner-items-service";
import { NEWS_EVENTS_ACHIEVEMENTS_FEED_TITLE } from "@/lib/info-corner-pages/news-events-achievements-content";
import { getInfoCornerPage } from "@/lib/info-corner-service";

export async function NewsEventsAchievementsPage() {
  const [categories, items, page] = await Promise.all([
    getInfoCornerCategories(),
    getInfoCornerItems("news-events-achievements"),
    getInfoCornerPage("news-events-achievements"),
  ]);

  const lead =
    page?.lead ??
    "Latest news, campus events, student achievements, and institutional milestones at BIHE.";
  const sidebarLinks = buildInfoCornerSidebarLinks(categories);

  return (
    <article className="ic-page ic-page--category ic-page--news-events-achievements about-bihe-page">
      <AboutInnerHero
        currentPage="News, Events & Achievements"
        title={page?.title ?? "News, Events & Achievements"}
        titleId="info-corner-news-events-achievements"
        lead={lead}
        eyebrow="Info - Corner"
        sectionLabel="Info - Corner"
        sectionHref={INFO_CORNER_BASE_PATH}
      />

      <section
        className="ic-page__notifications"
        aria-labelledby="info-corner-news-events-achievements-feed"
      >
        <div className="ic-page__container">
          <div className="ic-page__notifications-layout">
            <Reveal className="ic-page__notifications-sidebar">
              <h2 className="ic-page__notifications-sidebar-title">Important Links</h2>
              <ul className="ic-page__notifications-sidebar-list">
                {sidebarLinks.map((entry) => (
                  <li key={entry.slug}>
                    <Link
                      href={entry.href}
                      className={`ic-page__notifications-sidebar-link${
                        entry.slug === "news-events-achievements"
                          ? " ic-page__notifications-sidebar-link--active"
                          : ""
                      }`}
                      aria-current={entry.slug === "news-events-achievements" ? "page" : undefined}
                    >
                      <span className="ic-page__notifications-sidebar-name">{entry.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>

            <div className="ic-page__notifications-main">
              <Reveal>
                <h2
                  className="ic-page__notifications-feed-title"
                  id="info-corner-news-events-achievements-feed"
                >
                  {NEWS_EVENTS_ACHIEVEMENTS_FEED_TITLE}
                </h2>
              </Reveal>

              {items.length > 0 ? (
                <ul className="ic-page__highlights-grid">
                  {items.map((item, index) => (
                    <Reveal key={item.slug} as="li" delay={index * 70} direction="up">
                      <NewsEventsAchievementCard item={item} />
                    </Reveal>
                  ))}
                </ul>
              ) : (
                <Reveal>
                  <p className="ic-page__notifications-empty">
                    No news, events, or achievements have been published yet. Please check back soon.
                  </p>
                </Reveal>
              )}
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
