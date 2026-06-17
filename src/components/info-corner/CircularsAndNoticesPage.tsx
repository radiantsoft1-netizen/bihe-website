import Link from "next/link";
import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { CircularNoticeListItem } from "@/components/info-corner/CircularNoticeListItem";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getCircularNotices } from "@/lib/circular-notices-service";
import { buildInfoCornerSidebarLinks } from "@/lib/info-corner-nav";
import { INFO_CORNER_BASE_PATH } from "@/lib/info-corner-routes";
import {
  CIRCULARS_PAGE_LEAD,
  circularNoticeHref,
} from "@/lib/info-corner-pages/circulars-and-notices-content";
import { getInfoCornerCategories } from "@/lib/info-corner-items-service";
import { getInfoCornerPage } from "@/lib/info-corner-service";

export async function CircularsAndNoticesPage() {
  const [categories, notices, page] = await Promise.all([
    getInfoCornerCategories(),
    getCircularNotices(),
    getInfoCornerPage("circulars-and-notices"),
  ]);

  const lead = page?.lead ?? CIRCULARS_PAGE_LEAD;
  const sidebarLinks = buildInfoCornerSidebarLinks(categories);

  return (
    <article className="ic-page ic-page--category ic-page--circulars ic-page--circulars-and-notices about-bihe-page">
      <AboutInnerHero
        currentPage="Circulars and Notices"
        title={page?.title ?? "Circulars and Notices"}
        titleId="circulars-title"
        lead={lead}
        eyebrow="Info - Corner"
        sectionLabel="Info - Corner"
        sectionHref={INFO_CORNER_BASE_PATH}
      />

      {page?.paragraphs?.length ? (
        <section className="ic-page__intro" aria-labelledby="info-corner-circulars-intro">
          <div className="ic-page__container">
            <Reveal>
              <SectionHeader
                badge={page.introBadge}
                title={page.introTitle}
                align="left"
                showIcon={false}
                titleId="info-corner-circulars-intro"
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

      <section className="ic-page__notifications" aria-labelledby="circulars-feed-title">
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
                        entry.slug === "circulars-and-notices"
                          ? " ic-page__notifications-sidebar-link--active"
                          : ""
                      }`}
                      aria-current={entry.slug === "circulars-and-notices" ? "page" : undefined}
                    >
                      <span className="ic-page__notifications-sidebar-name">{entry.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>

            <div className="ic-page__notifications-main">
              <Reveal>
                <h2 className="ic-page__notifications-feed-title" id="circulars-feed-title">
                  All notifications
                </h2>
              </Reveal>

              <div className="ic-page__notifications-feed">
                {notices.length > 0 ? (
                  notices.map((notice, index) => (
                    <Reveal key={notice.slug} delay={index * 70} direction="up">
                      <CircularNoticeListItem
                        title={notice.title}
                        subtitle={notice.subtitle}
                        publishedDate={notice.publishedDate}
                        publishedDateIso={notice.publishedDateIso}
                        excerpt={notice.excerpt}
                        detailHref={circularNoticeHref(notice.slug)}
                      />
                    </Reveal>
                  ))
                ) : (
                  <Reveal>
                    <p className="ic-page__notifications-empty">
                      No circulars or notices have been published yet. Please check back soon.
                    </p>
                  </Reveal>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
