import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { AboutVisualDecor } from "@/components/landing/AboutVisualDecor";
import { LibraryFacilityIcon } from "@/components/academics/LibraryFacilityIcon";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { ACADEMICS_BASE_PATH } from "@/lib/academics-routes";
import {
  LIBRARY_FACILITIES,
  LIBRARY_FACILITIES_TITLE,
  LIBRARY_GALLERY,
  LIBRARY_GALLERY_LEAD,
  LIBRARY_GALLERY_TITLE,
  LIBRARY_INTRO_BADGE,
  LIBRARY_INTRO_PARAGRAPHS,
  LIBRARY_PAGE_LEAD,
  LIBRARY_RESOURCES,
  LIBRARY_RESOURCES_TITLE,
  LIBRARY_RULES,
  LIBRARY_RULES_TITLE,
  LIBRARY_TIMINGS_COLUMNS,
  LIBRARY_TIMINGS_ROWS,
  LIBRARY_TIMINGS_SUBTITLE,
  LIBRARY_TIMINGS_TITLE,
} from "@/lib/library-content";
import type { LibraryGalleryImageKey } from "@/lib/library-content";
import { images } from "@/lib/images";

const LIBRARY_GALLERY_IMAGES: Record<LibraryGalleryImageKey, string> = {
  readingHall: images.libraryGallery.readingHall,
  groupStudy: images.libraryGallery.groupStudy,
  bookshelves: images.libraryGallery.bookshelves,
};

export function LibraryPage() {
  return (
    <article className="library-page about-bihe-page">
      <AboutInnerHero
        currentPage="Library"
        title="Library"
        lead={LIBRARY_PAGE_LEAD}
        eyebrow="Academics"
        sectionLabel="Academics"
        sectionHref={ACADEMICS_BASE_PATH}
      />

      <section className="library-page__intro" aria-labelledby="library-intro-title">
        <div className="library-page__container library-page__intro-grid">
          <Reveal direction="left">
            <figure className="library-page__intro-visual" aria-label="BIHE library">
              <AboutVisualDecor />
              <div className="library-page__intro-frame">
                <div className="library-page__intro-photo-wrap">
                  <SmartImage
                    src={images.libraryIntro}
                    alt="BIHE students reading books in the BIHE library"
                    fill
                    sizes="(max-width: 960px) 90vw, 24rem"
                    className="library-page__intro-photo"
                  />
                </div>
                <span className="library-page__intro-float-badge">Knowledge Hub</span>
              </div>
            </figure>
          </Reveal>

          <Reveal direction="right" delay={80}>
            <div className="library-page__intro-panel">
              <p className="library-page__intro-eyebrow">{LIBRARY_INTRO_BADGE}</p>
              <h2 className="library-page__intro-title" id="library-intro-title">
                Library
              </h2>
              {LIBRARY_INTRO_PARAGRAPHS.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="library-page__intro-text">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="library-page__resources" aria-labelledby="library-resources-title">
        <div className="library-page__container">
          <Reveal>
            <h2 className="library-page__section-title" id="library-resources-title">
              {LIBRARY_RESOURCES_TITLE}
            </h2>
          </Reveal>

          <Reveal delay={80}>
            <div className="bihe-data-table-card library-page__table-card">
              <div className="bihe-data-table-wrap">
                <table className="bihe-data-table">
                  <thead>
                    <tr>
                      <th scope="col">Library Resources</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {LIBRARY_RESOURCES.map((row) => (
                      <tr key={row.resource}>
                        <td data-label="Library Resources">{row.resource}</td>
                        <td data-label="Quantity">{row.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="library-page__facilities" aria-labelledby="library-facilities-title">
        <div className="library-page__container">
          <Reveal>
            <h2 className="library-page__section-title" id="library-facilities-title">
              {LIBRARY_FACILITIES_TITLE}
            </h2>
          </Reveal>

          <ul className="library-page__facility-grid">
            {LIBRARY_FACILITIES.map((facility, index) => (
              <li key={facility.id} className="library-page__facility-item">
                <Reveal delay={60 + index * 50} direction="up">
                  <article className="library-page__facility-card">
                    <span className="library-page__facility-icon" aria-hidden>
                      <LibraryFacilityIcon name={facility.icon} />
                    </span>
                    <h3 className="library-page__facility-label">{facility.label}</h3>
                    <p className="library-page__facility-desc">{facility.description}</p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="library-page__rules" aria-labelledby="library-rules-title">
        <div className="library-page__container">
          <Reveal>
            <h2 className="library-page__section-title library-page__section-title--maroon" id="library-rules-title">
              {LIBRARY_RULES_TITLE}
            </h2>
          </Reveal>

          <Reveal delay={80}>
            <ul className="bihe-bullet-list library-page__rules-list">
              {LIBRARY_RULES.map((rule) => (
                <li key={rule.slice(0, 48)}>{rule}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="library-page__timings" aria-labelledby="library-timings-title">
        <div className="library-page__container">
          <Reveal>
            <h2 className="library-page__section-title library-page__section-title--maroon" id="library-timings-title">
              {LIBRARY_TIMINGS_TITLE}
            </h2>
            <p className="library-page__timings-subtitle">{LIBRARY_TIMINGS_SUBTITLE}</p>
          </Reveal>

          <Reveal delay={80}>
            <div className="bihe-data-table-card library-page__table-card">
              <div className="bihe-data-table-wrap">
                <table className="bihe-data-table library-page__timings-table">
                  <thead>
                    <tr>
                      {LIBRARY_TIMINGS_COLUMNS.map((column) => (
                        <th key={column} scope="col">
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {LIBRARY_TIMINGS_ROWS.map((row) => (
                      <tr key={row.days}>
                        <td className="library-page__timing-days" data-label={LIBRARY_TIMINGS_COLUMNS[0]}>
                          {row.days}
                        </td>
                        <td className="library-page__timing-cell" data-label={LIBRARY_TIMINGS_COLUMNS[1]}>
                          {row.borrowing.split("\n").map((line, index) => (
                            <span key={`${row.days}-borrow-${index}`}>{line}</span>
                          ))}
                        </td>
                        <td className="library-page__timing-cell" data-label={LIBRARY_TIMINGS_COLUMNS[2]}>
                          {row.reference.split("\n").map((line, index) => (
                            <span key={`${row.days}-ref-${index}`}>{line}</span>
                          ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="library-page__gallery" aria-labelledby="library-gallery-title">
        <div className="library-page__container">
          <Reveal>
            <div className="library-page__gallery-head">
              <p className="library-page__gallery-eyebrow">Campus life</p>
              <h2
                className="library-page__section-title library-page__section-title--maroon library-page__gallery-title"
                id="library-gallery-title"
              >
                {LIBRARY_GALLERY_TITLE}
              </h2>
              <p className="library-page__gallery-lead">{LIBRARY_GALLERY_LEAD}</p>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <figure className="library-page__gallery-mosaic">
              <div className="library-page__gallery-decor" aria-hidden>
                <span className="library-page__gallery-ring" />
                <span className="library-page__gallery-bar" />
              </div>

              {(() => {
                const main = LIBRARY_GALLERY.find((item) => item.layout === "main");
                const accents = LIBRARY_GALLERY.filter((item) => item.layout !== "main");

                if (!main) return null;

                return (
                  <>
                    <div className="library-page__gallery-main">
                      <article className="library-page__gallery-card library-page__gallery-card--main">
                        <div className="library-page__gallery-media">
                          <SmartImage
                            src={LIBRARY_GALLERY_IMAGES[main.imageKey]}
                            alt={main.alt}
                            fill
                            sizes="(max-width: 960px) 100vw, 55vw"
                            className={`library-page__gallery-img library-page__gallery-img--${main.id}`}
                          />
                          <span className="library-page__gallery-scrim" aria-hidden />
                          <div className="library-page__gallery-overlay">
                            <span className="library-page__gallery-category">{main.category}</span>
                            <h3 className="library-page__gallery-card-title">{main.title}</h3>
                          </div>
                        </div>
                      </article>
                    </div>

                    <ul className="library-page__gallery-accents">
                      {accents.map((item) => (
                        <li
                          key={item.id}
                          className={`library-page__gallery-accent library-page__gallery-accent--${item.layout}`}
                        >
                          <article className="library-page__gallery-card">
                            <div className="library-page__gallery-media">
                              <SmartImage
                                src={LIBRARY_GALLERY_IMAGES[item.imageKey]}
                                alt={item.alt}
                                fill
                                sizes="(max-width: 960px) 45vw, 20vw"
                                className={`library-page__gallery-img library-page__gallery-img--${item.id}`}
                              />
                              <span className="library-page__gallery-scrim" aria-hidden />
                              <div className="library-page__gallery-overlay">
                                <span className="library-page__gallery-category">{item.category}</span>
                                <h3 className="library-page__gallery-card-title">{item.title}</h3>
                              </div>
                            </div>
                          </article>
                        </li>
                      ))}
                    </ul>
                  </>
                );
              })()}
            </figure>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
