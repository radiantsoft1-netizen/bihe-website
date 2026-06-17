import Link from "next/link";
import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { JobOpeningCard } from "@/components/info-corner/JobOpeningCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { INFO_CORNER_BASE_PATH } from "@/lib/info-corner-routes";
import { buildInfoCornerSidebarLinks } from "@/lib/info-corner-nav";
import {
  getInfoCornerCategories,
  getInfoCornerItems,
} from "@/lib/info-corner-items-service";
import { JOB_OPENINGS_FEED_TITLE } from "@/lib/info-corner-pages/job-openings-content";
import { getInfoCornerPage } from "@/lib/info-corner-service";

export async function JobOpeningsPage() {
  const [categories, items, page] = await Promise.all([
    getInfoCornerCategories(),
    getInfoCornerItems("job-openings"),
    getInfoCornerPage("job-openings"),
  ]);

  const lead =
    page?.lead ??
    "Current faculty and staff recruitment opportunities at Bapuji Institute of Hi-Tech Education.";
  const sidebarLinks = buildInfoCornerSidebarLinks(categories);

  return (
    <article className="ic-page ic-page--category ic-page--job-openings about-bihe-page">
      <AboutInnerHero
        currentPage="Job Openings"
        title={page?.title ?? "Job Openings"}
        titleId="info-corner-job-openings"
        lead={lead}
        eyebrow="Info - Corner"
        sectionLabel="Info - Corner"
        sectionHref={INFO_CORNER_BASE_PATH}
      />

      {page?.paragraphs?.length ? (
        <section className="ic-page__intro" aria-labelledby="info-corner-job-openings-intro">
          <div className="ic-page__container">
            <Reveal>
              <SectionHeader
                badge={page.introBadge}
                title={page.introTitle}
                align="left"
                showIcon={false}
                titleId="info-corner-job-openings-intro"
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

      <section className="ic-page__notifications" aria-labelledby="info-corner-job-openings-feed">
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
                        entry.slug === "job-openings" ? " ic-page__notifications-sidebar-link--active" : ""
                      }`}
                      aria-current={entry.slug === "job-openings" ? "page" : undefined}
                    >
                      <span className="ic-page__notifications-sidebar-name">{entry.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>

            <div className="ic-page__notifications-main">
              <Reveal>
                <h2 className="ic-page__notifications-feed-title" id="info-corner-job-openings-feed">
                  {JOB_OPENINGS_FEED_TITLE}
                </h2>
              </Reveal>

              <div className="ic-page__job-feed">
                {items.length > 0 ? (
                  items.map((item, index) => (
                    <Reveal key={item.slug} delay={index * 70} direction="up">
                      <JobOpeningCard item={item} />
                    </Reveal>
                  ))
                ) : (
                  <Reveal>
                    <p className="ic-page__notifications-empty">
                      No job openings are listed at this time. Please check back for future recruitment
                      notices.
                    </p>
                  </Reveal>
                )}
              </div>

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
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
