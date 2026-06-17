import Link from "next/link";
import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { InfoCornerListFeed } from "@/components/info-corner/InfoCornerListFeed";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  getInfoCornerCategoryFeed,
  resolveInfoCornerEmptyMessage,
  resolveInfoCornerFeedTitle,
} from "@/lib/info-corner-category-feed";
import { INFO_CORNER_BASE_PATH } from "@/lib/info-corner-routes";
import { buildInfoCornerSidebarLinks } from "@/lib/info-corner-nav";
import { getInfoCornerCategories, type InfoCornerCategory } from "@/lib/info-corner-items-service";
import { getInfoCornerPage } from "@/lib/info-corner-service";

type InfoCornerCategoryPageProps = {
  categorySlug: string;
};

export async function InfoCornerCategoryPage({ categorySlug }: InfoCornerCategoryPageProps) {
  const [categories, feedEntries, page] = await Promise.all([
    getInfoCornerCategories(),
    getInfoCornerCategoryFeed(categorySlug),
    getInfoCornerPage(categorySlug),
  ]);

  const category =
    categories.find((entry) => entry.slug === categorySlug) ??
    ({
      slug: categorySlug,
      name: page?.title ?? categorySlug,
      description: page?.lead ?? "",
      href: `/info-corner/${categorySlug}`,
    } as InfoCornerCategory);

  const lead = page?.lead ?? category.description ?? "";
  const sidebarLinks = buildInfoCornerSidebarLinks(categories);
  const feedTitle = resolveInfoCornerFeedTitle(categorySlug, category.name);
  const emptyMessage = resolveInfoCornerEmptyMessage(categorySlug);

  const categoryModifierClass =
    categorySlug === "circulars-and-notices" ? " ic-page--circulars" : "";

  return (
    <article
      className={`ic-page ic-page--category ic-page--${categorySlug}${categoryModifierClass} about-bihe-page`}
    >
      <AboutInnerHero
        currentPage={category.name}
        title={page?.title ?? category.name}
        titleId={`info-corner-${categorySlug}`}
        lead={lead}
        eyebrow="Info - Corner"
        sectionLabel="Info - Corner"
        sectionHref={INFO_CORNER_BASE_PATH}
      />

      {page?.paragraphs?.length ? (
        <section className="ic-page__intro" aria-labelledby={`info-corner-${categorySlug}-intro`}>
          <div className="ic-page__container">
            <Reveal>
              <SectionHeader
                badge={page.introBadge}
                title={page.introTitle}
                align="left"
                showIcon={false}
                titleId={`info-corner-${categorySlug}-intro`}
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

      <section className="ic-page__notifications" aria-labelledby={`info-corner-${categorySlug}-feed`}>
        <div className="ic-page__container">
          <div className="ic-page__notifications-layout">
            <div className="ic-page__notifications-sidebar-sticky">
              <Reveal className="ic-page__notifications-sidebar">
                <h2 className="ic-page__notifications-sidebar-title">Important Links</h2>
                <ul className="ic-page__notifications-sidebar-list">
                  {sidebarLinks.map((entry) => (
                    <li key={entry.slug}>
                      <Link
                        href={entry.href}
                        className={`ic-page__notifications-sidebar-link${
                          entry.slug === categorySlug ? " ic-page__notifications-sidebar-link--active" : ""
                        }`}
                        aria-current={entry.slug === categorySlug ? "page" : undefined}
                      >
                        <span className="ic-page__notifications-sidebar-name">{entry.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <div className="ic-page__notifications-main">
              <Reveal>
                <h2 className="ic-page__notifications-feed-title" id={`info-corner-${categorySlug}-feed`}>
                  {feedTitle}
                </h2>
              </Reveal>

              <InfoCornerListFeed entries={feedEntries} emptyMessage={emptyMessage} />

              {categorySlug === "job-openings" ? (
                <Reveal>
                  <aside className="ic-page__job-contact" aria-label="Recruitment contact information">
                    <h3 className="ic-page__job-contact-title">How to apply</h3>
                    <p className="ic-page__job-contact-text">
                      Submit applications to the college office during working hours or email{" "}
                      <a href="mailto:principal@bihedvg.org" className="ic-page__job-contact-link">
                        principal@bihedvg.org
                      </a>{" "}
                      with the post title in the subject line. For enquiries, call{" "}
                      <a href="tel:+918192221625" className="ic-page__job-contact-link">
                        08192-221625
                      </a>
                      .
                    </p>
                  </aside>
                </Reveal>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
