import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { StudentFacilitiesNavSection } from "@/components/student-life/StudentFacilitiesNavSection";
import { StudentLifeShowcaseSection } from "@/components/student-life/StudentLifeShowcaseSection";
import { StudentLifeStatsBar } from "@/components/student-life/StudentLifeStatsBar";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import {
  MEGA_PLACEMENT_DRIVE_BANNER,
  MEGA_PLACEMENT_DRIVE_BANNER_ALT,
  MEGA_PLACEMENT_DRIVE_BANNER_CONTENT,
  MEGA_PLACEMENT_DRIVE_SPECIAL_THANKS,
  MEGA_PLACEMENT_DRIVE_INTRO,
  MEGA_PLACEMENT_DRIVE_PAGE_LEAD,
  MEGA_PLACEMENT_DRIVE_SHOWCASES,
  MEGA_PLACEMENT_DRIVE_STATS,
} from "@/lib/mega-placement-drive-content";
import { PLACEMENT_CELL_PATH } from "@/lib/placement-routes";
import { STUDENT_LIFE_BASE_PATH } from "@/lib/student-life-routes";

export function MegaPlacementDrivePage() {
  return (
    <article className="mpd-page about-bihe-page">
      <AboutInnerHero
        currentPage="Mega Placement Drive 2025"
        title="Mega Placement Drive 2025"
        lead={MEGA_PLACEMENT_DRIVE_PAGE_LEAD}
        eyebrow="Student Life"
        sectionLabel="Student Life"
        sectionHref={STUDENT_LIFE_BASE_PATH}
        parentPage="Placement Cell & Activities"
        parentHref={PLACEMENT_CELL_PATH}
      />

      <section className="mpd-page__intro" aria-labelledby="mpd-intro-title">
        <div className="mpd-page__container">
          <Reveal>
            <div className="mpd-page__intro-panel">
              <span className="mpd-page__badge">{MEGA_PLACEMENT_DRIVE_INTRO.kicker}</span>
              <h2 className="mpd-page__section-title" id="mpd-intro-title">
                {MEGA_PLACEMENT_DRIVE_INTRO.title}
              </h2>
              <div className="mpd-page__intro-body">
                {MEGA_PLACEMENT_DRIVE_INTRO.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)} className="mpd-page__text">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <StudentLifeStatsBar stats={MEGA_PLACEMENT_DRIVE_STATS} variant="cards" />

      {MEGA_PLACEMENT_DRIVE_SHOWCASES.map((section, index) => (
        <StudentLifeShowcaseSection
          key={section.id}
          section={{ ...section, reverse: index % 2 === 1 }}
          sectionIndex={index}
          isFirst={index === 0}
          pageId="mega-placement-drive"
        />
      ))}

      <section
        className="mpd-page__banner"
        aria-labelledby="mpd-banner-title"
      >
        <div className="mpd-page__container">
          <Reveal>
            <div className="mpd-page__banner-frame">
              <SmartImage
                src={MEGA_PLACEMENT_DRIVE_BANNER}
                alt={MEGA_PLACEMENT_DRIVE_BANNER_ALT}
                fill
                className="mpd-page__banner-img"
                sizes="(max-width: 960px) 100vw, var(--container-max)"
              />
              <p className="mpd-page__banner-caption">{MEGA_PLACEMENT_DRIVE_BANNER_CONTENT.caption}</p>
            </div>
            <div className="mpd-page__banner-content">
              <h2 className="mpd-page__section-title" id="mpd-banner-title">
                {MEGA_PLACEMENT_DRIVE_BANNER_CONTENT.title}
              </h2>
              {MEGA_PLACEMENT_DRIVE_BANNER_CONTENT.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="mpd-page__text">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mpd-page__thanks" aria-labelledby="mpd-thanks-title">
        <div className="mpd-page__container">
          <Reveal>
            <div className="mpd-page__thanks-panel">
              <h2 className="mpd-page__section-title" id="mpd-thanks-title">
                {MEGA_PLACEMENT_DRIVE_SPECIAL_THANKS.title}
              </h2>
              <ul className="bihe-bullet-list mpd-page__thanks-list">
                {MEGA_PLACEMENT_DRIVE_SPECIAL_THANKS.items.map((item) => (
                  <li key={item.slice(0, 48)}>{item}</li>
                ))}
              </ul>
              <p className="mpd-page__text">{MEGA_PLACEMENT_DRIVE_SPECIAL_THANKS.closing}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <StudentFacilitiesNavSection />
    </article>
  );
}
