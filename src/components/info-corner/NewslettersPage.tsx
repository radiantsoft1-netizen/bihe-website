import Link from "next/link";
import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { NewsletterEditionCard } from "@/components/info-corner/NewsletterEditionCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { INFO_CORNER_BASE_PATH } from "@/lib/info-corner-routes";
import { buildInfoCornerSidebarLinks } from "@/lib/info-corner-nav";
import {
  getInfoCornerCategories,
  getInfoCornerItems,
} from "@/lib/info-corner-items-service";
import { NEWSLETTERS_FEED_TITLE } from "@/lib/info-corner-pages/newsletters-content";
import { getInfoCornerPage } from "@/lib/info-corner-service";

export async function NewslettersPage() {
  const [categories, items, page] = await Promise.all([
    getInfoCornerCategories(),
    getInfoCornerItems("newsletters"),
    getInfoCornerPage("newsletters"),
  ]);

  const lead =
    page?.lead ??
    "Institutional newsletters highlighting campus news, academic updates, and community activities.";
  const sidebarLinks = buildInfoCornerSidebarLinks(categories);

  return (
    <article className="ic-page ic-page--category ic-page--newsletters about-bihe-page">
      <AboutInnerHero
        currentPage="Newsletters"
        title={page?.title ?? "Newsletters"}
        titleId="info-corner-newsletters"
        lead={lead}
        eyebrow="Info - Corner"
        sectionLabel="Info - Corner"
        sectionHref={INFO_CORNER_BASE_PATH}
      />

      {page?.paragraphs?.length ? (
        <section className="ic-page__intro" aria-labelledby="info-corner-newsletters-intro">
          <div className="ic-page__container">
            <Reveal>
              <SectionHeader
                badge={page.introBadge}
                title={page.introTitle}
                align="left"
                showIcon={false}
                titleId="info-corner-newsletters-intro"
              />
              <div className="ic-page__intro-body">
                {page.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)} className="ic-page__text">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      ) : null}

      <section className="ic-page__notifications" aria-labelledby="info-corner-newsletters-feed">
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
                        entry.slug === "newsletters" ? " ic-page__notifications-sidebar-link--active" : ""
                      }`}
                      aria-current={entry.slug === "newsletters" ? "page" : undefined}
                    >
                      <span className="ic-page__notifications-sidebar-name">{entry.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>

            <div className="ic-page__notifications-main">
              <Reveal>
                <h2 className="ic-page__notifications-feed-title" id="info-corner-newsletters-feed">
                  {NEWSLETTERS_FEED_TITLE}
                </h2>
              </Reveal>

              {items.length > 0 ? (
                <ul className="ic-page__newsletter-grid">
                  {items.map((item, index) => (
                    <Reveal key={item.slug} as="li" delay={index * 70} direction="up">
                      <NewsletterEditionCard item={item} />
                    </Reveal>
                  ))}
                </ul>
              ) : (
                <Reveal>
                  <p className="ic-page__notifications-empty">
                    No newsletter editions have been published yet. Please check back soon.
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
