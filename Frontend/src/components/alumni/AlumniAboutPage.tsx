import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { BiheDataTable } from "@/components/ui/BiheDataTable";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SmartImage } from "@/components/ui/SmartImage";
import {
  ALUMNI_ABOUT_COMMITTEE,
  ALUMNI_ABOUT_LEAD,
  ALUMNI_ABOUT_MISSION,
  ALUMNI_ABOUT_OBJECTIVES,
  ALUMNI_ABOUT_OVERVIEW,
  ALUMNI_ABOUT_VISION,
  ALUMNI_COMMITTEE_MEMBERS,
} from "@/lib/alumni-content";
import { images } from "@/lib/images";
import { SITE_LINKS } from "@/lib/site-links";

export function AlumniAboutPage() {
  return (
    <article className="alumni-about-page alumni-page about-bihe-page">
      <AboutInnerHero
        currentPage="About Alumni Association"
        title="About Alumni Association"
        lead={ALUMNI_ABOUT_LEAD}
        eyebrow="Alumni"
        sectionLabel="Alumni"
        sectionHref={SITE_LINKS.alumniAbout}
        parentPage="Alumni"
        parentHref={SITE_LINKS.alumniHome}
      />

      <section className="alumni-about-page__overview" aria-labelledby="alumni-about-overview-title">
        <div className="alumni-about-page__container">
          <Reveal>
            <div className="alumni-about-page__overview-copy">
              <SectionHeader
                badge={ALUMNI_ABOUT_OVERVIEW.badge}
                title={ALUMNI_ABOUT_OVERVIEW.title}
                align="left"
                titleId="alumni-about-overview-title"
              />
              {ALUMNI_ABOUT_OVERVIEW.paragraphs.map((paragraph) => (
                <p key={paragraph} className="alumni-about-page__text">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="alumni-about-page__vision" aria-labelledby="alumni-about-vision-title">
        <div className="alumni-about-page__container">
          <Reveal>
            <div className="alumni-about-page__vision-panel">
              <SectionHeader
                badge="Vision"
                title={ALUMNI_ABOUT_VISION.title}
                align="center"
                titleId="alumni-about-vision-title"
              />
              <p className="alumni-about-page__vision-text">{ALUMNI_ABOUT_VISION.text}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="alumni-about-page__showcase alumni-about-page__showcase--mission" aria-labelledby="alumni-about-mission-title">
        <div className="alumni-about-page__container">
          <div className="alumni-about-page__showcase-grid">
            <Reveal direction="left" className="alumni-about-page__showcase-visual">
              <figure className="alumni-about-page__showcase-frame">
                <SmartImage
                  src={images.alumniAboutMission}
                  alt="BIHE alumni committee programme with faculty and students"
                  fill
                  className="alumni-about-page__showcase-img"
                  sizes="(max-width: 960px) 100vw, 32rem"
                />
              </figure>
            </Reveal>

            <Reveal delay={80} direction="right" className="alumni-about-page__showcase-copy">
              <SectionHeader
                badge="Mission"
                title={ALUMNI_ABOUT_MISSION.title}
                align="left"
                titleId="alumni-about-mission-title"
              />
              <ul className="bihe-bullet-list alumni-about-page__showcase-list">
                {ALUMNI_ABOUT_MISSION.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section
        className="alumni-about-page__showcase alumni-about-page__showcase--objectives alumni-about-page__showcase--reverse"
        aria-labelledby="alumni-about-objectives-title"
      >
        <div className="alumni-about-page__container">
          <div className="alumni-about-page__showcase-grid">
            <Reveal direction="left" className="alumni-about-page__showcase-copy">
              <SectionHeader
                badge="Objectives"
                title={ALUMNI_ABOUT_OBJECTIVES.title}
                align="left"
                titleId="alumni-about-objectives-title"
              />
              <ul className="bihe-bullet-list alumni-about-page__showcase-list">
                {ALUMNI_ABOUT_OBJECTIVES.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={80} direction="right" className="alumni-about-page__showcase-visual">
              <figure className="alumni-about-page__showcase-frame">
                <SmartImage
                  src={images.alumniAboutObjectives}
                  alt="BIHE students at a placement and career development programme"
                  fill
                  className="alumni-about-page__showcase-img"
                  sizes="(max-width: 960px) 100vw, 32rem"
                />
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="alumni-about-page__committee" aria-labelledby="alumni-about-committee-title">
        <div className="alumni-about-page__container">
          <Reveal>
            <div className="alumni-about-page__committee-intro">
              <SectionHeader
                badge="Committee"
                title={ALUMNI_ABOUT_COMMITTEE.title}
                align="center"
                titleId="alumni-about-committee-title"
              />
              <p className="alumni-about-page__committee-lead">{ALUMNI_ABOUT_COMMITTEE.lead}</p>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <div className="bihe-data-table-card alumni-about-page__table-card">
              <BiheDataTable
                indexColumn
                caption="Alumni committee members"
                captionId="alumni-committee-table"
                columns={[
                  { key: "slNo", header: "SL. NO." },
                  { key: "name", header: "Name" },
                  { key: "designation", header: "Designation" },
                  { key: "profession", header: "Profession" },
                  { key: "mobile", header: "Mobile" },
                  { key: "email", header: "Email" },
                ]}
                rows={ALUMNI_COMMITTEE_MEMBERS.map((member) => ({
                  id: member.slNo,
                  slNo: member.slNo,
                  name: member.name,
                  designation: member.designation,
                  profession: member.profession,
                  mobile: member.mobile,
                  email: member.email,
                }))}
              />
            </div>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
