import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { StudentLifeIntroImageSlider } from "@/components/student-life/StudentLifeIntroImageSlider";
import { StudentLifePageRefCards } from "@/components/student-life/StudentLifePageRefCards";
import { Reveal } from "@/components/ui/Reveal";
import type { PlacementDriveDetail } from "@/lib/placement-drives-service";
import { PLACEMENT_CELL_PATH } from "@/lib/placement-routes";
import { STUDENT_LIFE_BASE_PATH } from "@/lib/student-life-routes";
import type { StudentLifePageRefCard } from "@/lib/student-life-pages/types";

type PlacementDriveDetailPageProps = {
  drive: PlacementDriveDetail;
  relatedCards: readonly StudentLifePageRefCard[];
};

export function PlacementDriveDetailPage({ drive, relatedCards }: PlacementDriveDetailPageProps) {
  const sliderImages = drive.galleryImages.map((image) => ({
    src: image.src,
    alt: image.alt,
    fit: image.fit,
    caption: image.caption,
  }));

  return (
    <article className="pd-drive-page about-bihe-page">
      <AboutInnerHero
        currentPage={drive.title}
        title={drive.title}
        lead={drive.heroLead}
        eyebrow="Student Life"
        sectionLabel="Student Life"
        sectionHref={STUDENT_LIFE_BASE_PATH}
        parentPage="Placement Cell & Activities"
        parentHref={PLACEMENT_CELL_PATH}
      />

      <section className="pd-drive-page__intro" aria-labelledby="pd-drive-intro-title">
        <div className="pd-drive-page__container">
          <Reveal>
            <div className="pd-drive-page__intro-panel">
              {drive.eyebrow ? (
                <span className="pd-drive-page__badge">{drive.eyebrow}</span>
              ) : null}
              <h2 className="pd-drive-page__section-title" id="pd-drive-intro-title">
                {drive.title}
              </h2>
              <div className="pd-drive-page__intro-body">
                {drive.introParagraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)} className="pd-drive-page__text">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pd-drive-page__highlights" aria-labelledby="pd-drive-highlights-title">
        <div className="pd-drive-page__container pd-drive-page__highlights-grid">
          <Reveal direction="left">
            <div className="pd-drive-page__highlights-copy">
              <h2 className="pd-drive-page__section-title" id="pd-drive-highlights-title">
                {drive.section2Title ?? "Event Highlights"}
              </h2>
              {drive.section2Paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="pd-drive-page__text">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          {sliderImages.length > 0 ? (
            <Reveal direction="right" delay={80}>
              <StudentLifeIntroImageSlider
                images={sliderImages}
                ariaLabel={`${drive.title} photo gallery`}
              />
            </Reveal>
          ) : null}
        </div>
      </section>

      {relatedCards.length > 0 ? <StudentLifePageRefCards cards={relatedCards} /> : null}
    </article>
  );
}
