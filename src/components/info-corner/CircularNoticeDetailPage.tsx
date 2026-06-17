import Link from "next/link";
import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import type { CircularNotice } from "@/lib/info-corner-pages/circulars-and-notices-content";
import { CIRCULARS_BASE_PATH } from "@/lib/info-corner-pages/circulars-and-notices-content";

type CircularNoticeDetailPageProps = {
  notice: CircularNotice;
};

export function CircularNoticeDetailPage({ notice }: CircularNoticeDetailPageProps) {
  return (
    <article className="cu-page ic-page ic-page--circular-detail about-bihe-page">
      <AboutInnerHero
        currentPage={notice.title}
        title={notice.title}
        eyebrow="Info - Corner"
        sectionLabel="Circulars and Notices"
        sectionHref={CIRCULARS_BASE_PATH}
      />

      <section className="ic-page__notice-detail-panel" aria-labelledby="notice-detail-body">
        <div className="cu-page__container">
          <Reveal className="ic-page__notice-detail-shell">
            <div className="ic-page__notice-detail-panel-inner">
              <div className="ic-page__notice-detail-copy">
                <header className="ic-page__notice-detail-header">
                  <div className="ic-page__notice-detail-meta">
                    <span className="ic-page__notice-detail-meta-chip">Circulars and Notices</span>
                  </div>
                  <h2 className="ic-page__notice-detail-title" id="notice-detail-body">
                    {notice.title}
                  </h2>
                  {notice.subtitle ? (
                    <p className="ic-page__notice-detail-subtitle">{notice.subtitle}</p>
                  ) : null}
                </header>

                <div className="ic-page__notice-detail-prose">
                  <div className="ic-page__notice-detail-text-block">
                    {notice.content.map((paragraph) => (
                      <p key={paragraph.slice(0, 48)} className="ic-page__notice-detail-text">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                <footer className="ic-page__notice-detail-actions">
                  {notice.downloadHref ? (
                    <a
                      href={notice.downloadHref}
                      className="ic-page__notice-detail-btn ic-page__notice-detail-btn--primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download PDF
                    </a>
                  ) : null}
                  <Link
                    href={CIRCULARS_BASE_PATH}
                    className="ic-page__notice-detail-btn ic-page__notice-detail-btn--ghost"
                  >
                    ← Back to circulars & notices
                  </Link>
                </footer>
              </div>

              <div className="ic-page__notice-detail-visual">
                <div className="ic-page__notice-detail-viewer">
                  <div className="ic-page__notice-detail-viewer-bar">
                    <span className="ic-page__notice-detail-viewer-label">Circulars and Notices</span>
                    <span className="ic-page__notice-detail-viewer-badge">Official</span>
                  </div>
                  <div className="ic-page__notice-detail-gallery">
                    <figure className="ic-page__notice-detail-frame">
                      <SmartImage
                        src={notice.image}
                        alt={notice.imageAlt}
                        fill
                        className="ic-page__notice-detail-img"
                        sizes="(max-width: 900px) 100vw, 52vw"
                        priority
                      />
                    </figure>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
