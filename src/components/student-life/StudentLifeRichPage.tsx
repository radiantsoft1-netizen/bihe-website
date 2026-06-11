import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { StudentFacilitiesNavSection } from "@/components/student-life/StudentFacilitiesNavSection";
import { StudentLifeShowcaseSection } from "@/components/student-life/StudentLifeShowcaseSection";
import { StudentLifePageRefCards } from "@/components/student-life/StudentLifePageRefCards";
import { StudentLifeStatsBar } from "@/components/student-life/StudentLifeStatsBar";
import { BiheDataTable } from "@/components/ui/BiheDataTable";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SmartImage } from "@/components/ui/SmartImage";
import { STUDENT_LIFE_BASE_PATH } from "@/lib/student-life-routes";
import type {
  StudentLifeRichPageConfig,
  StudentLifeSubsection,
} from "@/lib/student-life-pages/types";

function StudentLifeIntroCopy({
  kicker,
  title,
  paragraphs,
  bulletsTitle,
  bullets,
  titleId = "sl-rich-intro-title",
}: {
  kicker?: string;
  title: string;
  paragraphs: readonly string[];
  bulletsTitle?: string;
  bullets?: readonly string[];
  titleId?: string;
}) {
  return (
    <>
      <SectionHeader
        badge={kicker || "Student Life"}
        title={title}
        align="left"
        showIcon={false}
        titleId={titleId}
      />
      <div className="sl-rich-page__intro-body">
        {paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 48)} className="sl-rich-page__text">
            {paragraph}
          </p>
        ))}
        {bullets && bullets.length > 0 ? (
          <div className="sl-rich-page__intro-objectives">
            {bulletsTitle ? (
              <h3 className="sl-rich-page__intro-subtitle">{bulletsTitle}</h3>
            ) : null}
            <ul className="bihe-bullet-list sl-rich-page__section-list">
              {bullets.map((bullet) => (
                <li key={bullet.slice(0, 48)}>{bullet}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </>
  );
}

function StudentLifePageIntro({
  pageTitle,
  banner,
  intro,
}: {
  pageTitle: string;
  banner?: StudentLifeRichPageConfig["banner"];
  intro?: StudentLifeRichPageConfig["intro"];
}) {
  const unifiedLogoIntro = Boolean(banner && intro && banner.imageFit === "contain");

  if (unifiedLogoIntro && banner && intro) {
    return (
      <section className="sl-rich-page__page-intro" aria-labelledby="sl-rich-intro-title">
        <div className="sl-rich-page__container">
          <Reveal>
            <div className="sl-rich-page__page-intro-grid">
              <figure className="sl-rich-page__page-intro-visual" aria-label={banner.alt}>
                <div className="sl-rich-page__page-intro-frame">
                  <div className="sl-rich-page__page-intro-emblem">
                    <SmartImage
                      src={banner.src}
                      alt={banner.alt}
                      width={352}
                      height={352}
                      priority
                      quality={90}
                      className="sl-rich-page__page-intro-logo-img"
                    />
                  </div>
                </div>
              </figure>
              <div className="sl-rich-page__page-intro-panel sl-rich-page__page-intro-panel--wide">
                <StudentLifeIntroCopy
                  kicker={banner.kicker || intro.kicker}
                  title={intro.title}
                  paragraphs={intro.paragraphs}
                  bulletsTitle={intro.bulletsTitle}
                  bullets={intro.bullets}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <>
      {banner ? (
        <section className="sl-rich-page__banner" aria-label={`${pageTitle} highlight`}>
          <div className="sl-rich-page__banner-frame">
            <SmartImage
              src={banner.src}
              alt={banner.alt}
              fill
              priority
              className="sl-rich-page__banner-img"
              sizes="100vw"
            />
            <div className="sl-rich-page__banner-overlay">
              {banner.kicker ? (
                <p className="sl-rich-page__banner-kicker">{banner.kicker}</p>
              ) : null}
              {banner.overlayTitle ? (
                <h2 className="sl-rich-page__banner-title">{banner.overlayTitle}</h2>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      {intro ? (
        <section
          className={[
            "sl-rich-page__intro",
            banner ? "sl-rich-page__intro--after-banner" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          aria-labelledby="sl-rich-intro-title"
        >
          <div className="sl-rich-page__container">
            <Reveal>
              {intro.images && intro.images.length > 0 ? (
                <div className="sl-rich-page__intro-feature">
                  <div className="sl-rich-page__intro-panel">
                    <StudentLifeIntroCopy
                      kicker={intro.kicker}
                      title={intro.title}
                      paragraphs={intro.paragraphs}
                      bulletsTitle={intro.bulletsTitle}
                      bullets={intro.bullets}
                    />
                  </div>
                  <ul className="sl-rich-page__intro-cards" aria-label={`${pageTitle} photos`}>
                    {intro.images.map((image, index) => (
                      <li
                        key={`${image.src}-${index}`}
                        className={`sl-rich-page__intro-card sl-rich-page__intro-card--${index + 1}`}
                      >
                        <figure className="sl-rich-page__intro-card-frame">
                          <div className="sl-rich-page__intro-card-media">
                            <SmartImage
                              src={image.src}
                              alt={image.alt}
                              fill
                              priority={index === 0}
                              className="sl-rich-page__intro-card-img"
                              sizes="(max-width: 960px) 42vw, 20rem"
                            />
                          </div>
                        </figure>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : intro.image ? (
                <div className="sl-rich-page__intro-split">
                  <div className="sl-rich-page__intro-panel">
                    <StudentLifeIntroCopy
                      kicker={intro.kicker}
                      title={intro.title}
                      paragraphs={intro.paragraphs}
                      bulletsTitle={intro.bulletsTitle}
                      bullets={intro.bullets}
                    />
                  </div>
                  <figure className="sl-rich-page__intro-media">
                    <SmartImage
                      src={intro.image.src}
                      alt={intro.image.alt}
                      fill
                      priority
                      className="sl-rich-page__intro-img"
                      sizes="(max-width: 960px) 100vw, 36rem"
                    />
                  </figure>
                </div>
              ) : (
                <div className="sl-rich-page__intro-panel sl-rich-page__intro-panel--wide">
                  <StudentLifeIntroCopy
                    kicker={intro.kicker}
                    title={intro.title}
                    paragraphs={intro.paragraphs}
                    bulletsTitle={intro.bulletsTitle}
                    bullets={intro.bullets}
                  />
                </div>
              )}
            </Reveal>
          </div>
        </section>
      ) : null}
    </>
  );
}

function StudentLifeBulletList({
  bullets,
  bulletColumns,
}: {
  bullets: readonly string[];
  bulletColumns?: 1 | 2;
}) {
  if (bulletColumns === 2) {
    const midpoint = Math.ceil(bullets.length / 2);

    return (
      <div className="sl-rich-page__section-list-columns">
        <ul className="bihe-bullet-list sl-rich-page__section-list">
          {bullets.slice(0, midpoint).map((bullet) => (
            <li key={bullet.slice(0, 48)}>{bullet}</li>
          ))}
        </ul>
        <ul className="bihe-bullet-list sl-rich-page__section-list">
          {bullets.slice(midpoint).map((bullet) => (
            <li key={bullet.slice(0, 48)}>{bullet}</li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <ul className="bihe-bullet-list sl-rich-page__section-list">
      {bullets.map((bullet) => (
        <li key={bullet.slice(0, 48)}>{bullet}</li>
      ))}
    </ul>
  );
}

function StudentLifeSubsectionBlock({ subsection }: { subsection: StudentLifeSubsection }) {
  const className = [
    "sl-rich-page__subsection",
    subsection.span === "full" ? "sl-rich-page__subsection--full" : "",
    subsection.variant === "objective" ? "sl-rich-page__subsection--objective" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className}>
      <h3 className="sl-rich-page__subsection-title">{subsection.title}</h3>
      {subsection.paragraphs?.map((paragraph) => (
        <p key={paragraph.slice(0, 48)} className="sl-rich-page__text">
          {paragraph}
        </p>
      ))}
      {subsection.bullets && subsection.bullets.length > 0 ? (
        <StudentLifeBulletList
          bullets={subsection.bullets}
          bulletColumns={subsection.bulletColumns}
        />
      ) : null}
    </div>
  );
}

type StudentLifeRichPageProps = {
  config: StudentLifeRichPageConfig;
};

export function StudentLifeRichPage({ config }: StudentLifeRichPageProps) {
  const {
    slug,
    currentPage,
    title,
    lead,
    banner,
    intro,
    officers,
    showcase,
    showcases,
    postIntroSections,
    tables,
    sections,
    facilityCards,
    stats,
    pageRefCards,
    splitPanel,
    alternating,
  } = config;

  return (
    <article className="sl-rich-page about-bihe-page">
      <AboutInnerHero
        currentPage={currentPage}
        title={title}
        lead={lead}
        eyebrow="Student Life"
        sectionLabel="Student Life"
        sectionHref={STUDENT_LIFE_BASE_PATH}
      />

      {banner || intro ? (
        <StudentLifePageIntro pageTitle={title} banner={banner} intro={intro} />
      ) : null}

      {postIntroSections && postIntroSections.length > 0 ? (
        <section className="sl-rich-page__post-intro" aria-label="Further information">
          <div className="sl-rich-page__container">
            {postIntroSections.map((section, index) => (
              <Reveal key={section.id} delay={40 + index * 30}>
                <article className="sl-rich-page__post-intro-block" id={section.id}>
                  <h2 className="sl-rich-page__section-title sl-rich-page__section-title--maroon">
                    {section.title}
                  </h2>
                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph.slice(0, 48)} className="sl-rich-page__text">
                      {paragraph}
                    </p>
                  ))}
                  {section.bullets && section.bullets.length > 0 ? (
                    <StudentLifeBulletList
                      bullets={section.bullets}
                      bulletColumns={section.bulletColumns}
                    />
                  ) : null}
                </article>
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      {showcase ? (
        <StudentLifeShowcaseSection
          section={showcase}
          sectionIndex={0}
          isFirst
          pageId={slug}
        />
      ) : null}

      {officers && officers.length > 0 ? (
        <section className="sl-rich-page__officers" aria-label="Leadership">
          <div className="sl-rich-page__container">
            <ul className="sl-rich-page__officer-grid">
              {officers.map((officer, index) => (
                <li key={officer.name}>
                  <Reveal delay={60 + index * 50}>
                    <article className="sl-rich-page__officer-card">
                      <div className="sl-rich-page__officer-media">
                        <SmartImage
                          src={officer.image}
                          alt={officer.imageAlt}
                          fill
                          className="sl-rich-page__officer-img"
                          sizes="(max-width: 640px) 70vw, 16rem"
                        />
                      </div>
                      <div className="sl-rich-page__officer-copy">
                        <p className="sl-rich-page__officer-badge">{officer.title}</p>
                        <h3 className="sl-rich-page__officer-name">{officer.name}</h3>
                        <p className="sl-rich-page__officer-role">{officer.role}</p>
                      </div>
                    </article>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {facilityCards && facilityCards.length > 0 ? (
        <section className="sl-rich-page__facilities" aria-label="Facility highlights">
          <div className="sl-rich-page__container">
            <ul className="sl-rich-page__facility-grid">
              {facilityCards.map((card, index) => (
                <li key={card.number}>
                  <Reveal delay={50 + index * 40}>
                    <article className="sl-rich-page__facility-card">
                      <span className="sl-rich-page__facility-number" aria-hidden>
                        {card.number}
                      </span>
                      <div className="sl-rich-page__facility-body">
                        <h3 className="sl-rich-page__facility-title">{card.title}</h3>
                        <p className="sl-rich-page__facility-text">{card.text}</p>
                      </div>
                      <span className="sl-rich-page__facility-foot" aria-hidden />
                    </article>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {splitPanel ? (
        <section className="sl-rich-page__split" aria-labelledby="sl-rich-split-title">
          <div className="sl-rich-page__container">
            <div
              className={[
                "sl-rich-page__split-grid",
                splitPanel.dark ? "sl-rich-page__split-grid--dark" : "",
                splitPanel.image ? "" : "sl-rich-page__split-grid--text-only",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <Reveal direction="left">
                <div className="sl-rich-page__split-copy">
                  <h2 className="sl-rich-page__section-title" id="sl-rich-split-title">
                    {splitPanel.title}
                  </h2>
                  <ul className="bihe-bullet-list sl-rich-page__split-list">
                    {splitPanel.bullets.map((bullet) => (
                      <li key={bullet.slice(0, 48)}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              {splitPanel.image ? (
                <Reveal delay={80} direction="right">
                  <div className="sl-rich-page__split-media">
                    <SmartImage
                      src={splitPanel.image.src}
                      alt={splitPanel.image.alt}
                      fill
                      className="sl-rich-page__split-img"
                      sizes="(max-width: 960px) 100vw, 36rem"
                    />
                  </div>
                </Reveal>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      {tables && tables.length > 0 ? (
        <section className="sl-rich-page__records" aria-labelledby="sl-rich-records-title">
          <div className="sl-rich-page__container">
            <Reveal>
              <h2
                className="sl-rich-page__section-title sl-rich-page__section-title--center"
                id="sl-rich-records-title"
              >
                Records &amp; Committees
              </h2>
            </Reveal>

            <div className="sl-rich-page__tables">
              {tables.map((table, index) => (
                <Reveal key={table.id} delay={60 + index * 40}>
                  <div className="sl-rich-page__table-block">
                    <h3 className="sl-rich-page__table-title">{table.title}</h3>
                    <div className="bihe-data-table-card">
                      <BiheDataTable
                        indexColumn={table.columns[0]?.key === "slNo"}
                        caption={table.caption}
                        captionId={`sl-rich-table-${table.id}`}
                        columns={table.columns.map((column) => ({
                          key: column.key,
                          header: column.header,
                        }))}
                        rows={table.rows.map((row) => ({
                          id: row.id,
                          ...row,
                        }))}
                      />
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {showcases && showcases.length > 0
        ? showcases.map((section, index) => (
            <StudentLifeShowcaseSection
              key={section.id}
              section={{ ...section, reverse: index % 2 === 1 }}
              sectionIndex={index}
              isFirst={index === 0}
              pageId={slug}
            />
          ))
        : null}

      {sections && sections.length > 0 ? (
        <section className="sl-rich-page__sections" aria-label="Additional information">
          <div className="sl-rich-page__container">
            <div className="sl-rich-page__sections-grid">
              {sections.map((section, index) => (
                <Reveal key={section.id} delay={50 + index * 40}>
                  <article className="sl-rich-page__section-card" id={section.id}>
                    <h2 className="sl-rich-page__section-title sl-rich-page__section-title--maroon">
                      {section.title}
                    </h2>
                    {section.image ? (
                      <figure className="sl-rich-page__section-figure">
                        <div className="sl-rich-page__section-media">
                          <SmartImage
                            src={section.image.src}
                            alt={section.image.alt}
                            fill
                            className="sl-rich-page__section-img"
                            sizes="(max-width: 960px) 100vw, 72rem"
                          />
                        </div>
                        <figcaption className="sl-rich-page__section-caption">
                          {section.image.alt}
                        </figcaption>
                      </figure>
                    ) : null}
                    {section.paragraphs?.map((paragraph) => (
                      <p key={paragraph.slice(0, 48)} className="sl-rich-page__text">
                        {paragraph}
                      </p>
                    ))}
                    {section.bullets && section.bullets.length > 0 ? (
                      <StudentLifeBulletList
                        bullets={section.bullets}
                        bulletColumns={section.bulletColumns}
                      />
                    ) : null}
                    {section.subsections && section.subsections.length > 0 ? (
                      <div className="sl-rich-page__subsections">
                        {section.subsections.map((subsection) => (
                          <StudentLifeSubsectionBlock
                            key={`${subsection.title}-${subsection.bullets?.[0] ?? subsection.paragraphs?.[0] ?? ""}`}
                            subsection={subsection}
                          />
                        ))}
                      </div>
                    ) : null}
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {stats && stats.length > 0 ? <StudentLifeStatsBar stats={stats} /> : null}

      {alternating && alternating.length > 0 ? (
        <section className="sl-rich-page__alternating" aria-label="Facility details">
          <div className="sl-rich-page__container">
            {alternating.map((block, index) => (
              <Reveal key={block.id} delay={50 + index * 40}>
                <article
                  className={`sl-rich-page__alt-row${block.reverse ? " sl-rich-page__alt-row--reverse" : ""}`}
                >
                  <div className="sl-rich-page__alt-copy">
                    <h2 className="sl-rich-page__section-title">{block.title}</h2>
                    {block.paragraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 48)} className="sl-rich-page__text">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {block.image ? (
                    <div className="sl-rich-page__alt-media">
                      <SmartImage
                        src={block.image.src}
                        alt={block.image.alt}
                        fill
                        className="sl-rich-page__alt-img"
                        sizes="(max-width: 960px) 100vw, 28rem"
                      />
                    </div>
                  ) : null}
                </article>
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      {pageRefCards && pageRefCards.length > 0 ? (
        <StudentLifePageRefCards cards={pageRefCards} />
      ) : null}

      <StudentFacilitiesNavSection />
    </article>
  );
}
