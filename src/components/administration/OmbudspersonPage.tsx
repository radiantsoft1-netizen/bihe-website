import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { AboutVisualDecor } from "@/components/landing/AboutVisualDecor";
import { BiheDataTable } from "@/components/ui/BiheDataTable";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SmartImage } from "@/components/ui/SmartImage";
import { images } from "@/lib/images";
import {
  OMBUDSPERSON_COMMITTEE_MEMBERS,
  OMBUDSPERSON_FUNCTIONS,
  OMBUDSPERSON_INTRO_BADGE,
  OMBUDSPERSON_INTRO_IMAGE_ALT,
  OMBUDSPERSON_INTRO_TEXT,
  OMBUDSPERSON_INTRO_TITLE,
  OMBUDSPERSON_OBJECTIVES,
  OMBUDSPERSON_OUTCOME_TEXT,
  OMBUDSPERSON_PAGE_LEAD,
} from "@/lib/ombudsperson-content";

export function OmbudspersonPage() {
  return (
    <article className="ombudsperson-page about-bihe-page">
      <AboutInnerHero
        currentPage="Ombudsperson"
        title="Ombudsperson"
        lead={OMBUDSPERSON_PAGE_LEAD}
        eyebrow="Administration"
        sectionLabel="Administration"
        sectionHref="/ombudsperson"
      />

      <section className="ombudsperson-page__intro" aria-labelledby="ombudsperson-intro-title">
        <div className="ombudsperson-page__container ombudsperson-page__intro-grid">
          <Reveal direction="left">
            <figure className="ombudsperson-page__intro-visual" aria-label={OMBUDSPERSON_INTRO_IMAGE_ALT}>
              <AboutVisualDecor />
              <div className="ombudsperson-page__intro-frame">
                <div className="ombudsperson-page__intro-photo-wrap">
                  <SmartImage
                    src={images.ombudspersonIntro}
                    alt={OMBUDSPERSON_INTRO_IMAGE_ALT}
                    fill
                    sizes="(max-width: 960px) 90vw, 24rem"
                    className="ombudsperson-page__intro-photo"
                  />
                </div>
                <span className="ombudsperson-page__intro-float-badge">Fair & Impartial</span>
              </div>
            </figure>
          </Reveal>

          <Reveal direction="right" delay={80}>
            <div className="ombudsperson-page__intro-panel">
              <p className="ombudsperson-page__intro-eyebrow">{OMBUDSPERSON_INTRO_BADGE}</p>
              <h2 className="ombudsperson-page__intro-title" id="ombudsperson-intro-title">
                {OMBUDSPERSON_INTRO_TITLE}
              </h2>
              <p className="ombudsperson-page__intro-text">{OMBUDSPERSON_INTRO_TEXT}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="ombudsperson-page__lists" aria-label="Committee objectives and functions">
        <div className="ombudsperson-page__container">
          <div className="ombudsperson-page__lists-grid">
            <Reveal direction="left">
              <div className="ombudsperson-page__list-card">
                <h3 className="ombudsperson-page__list-title">Objectives of the Committee</h3>
                <ul className="bihe-bullet-list">
                  {OMBUDSPERSON_OBJECTIVES.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={80} direction="right">
              <div className="ombudsperson-page__list-card">
                <h3 className="ombudsperson-page__list-title">Functions of the Committee</h3>
                <ul className="bihe-bullet-list">
                  {OMBUDSPERSON_FUNCTIONS.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="ombudsperson-page__outcome" aria-labelledby="ombudsperson-outcome-title">
        <div className="ombudsperson-page__container">
          <Reveal>
            <SectionHeader
              badge="Committee"
              title="Outcome"
              align="center"
            />
            <p className="ombudsperson-page__outcome-text" id="ombudsperson-outcome-title">
              {OMBUDSPERSON_OUTCOME_TEXT}
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="bihe-data-table-card">
              <BiheDataTable
                indexColumn
                caption="Grievance Redressal and Welfare Committee members"
                captionId="ombudsperson-committee-table"
                columns={[
                  { key: "slNo", header: "SL. NO." },
                  { key: "name", header: "NAME" },
                  { key: "designation", header: "DESIGNATION" },
                  { key: "status", header: "STATUS" },
                  { key: "mobile", header: "MOBILE" },
                  { key: "email", header: "EMAIL" },
                ]}
                rows={OMBUDSPERSON_COMMITTEE_MEMBERS.map((member) => ({
                  id: member.slNo,
                  slNo: member.slNo,
                  name: member.name,
                  designation: member.designation,
                  status: member.status,
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
