import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { StudentFacilitiesNavSection } from "@/components/student-life/StudentFacilitiesNavSection";
import { BiheDataTable } from "@/components/ui/BiheDataTable";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  ICC_ABOUT_TEXT,
  ICC_ABOUT_TITLE,
  ICC_COMMITMENT_TEXT,
  ICC_COMMITMENT_TITLE,
  ICC_COMMITTEE_LEAD,
  ICC_COMMITTEE_MEMBERS,
  ICC_COMMITTEE_TITLE,
  ICC_FUNCTIONS,
  ICC_FUNCTIONS_TITLE,
  ICC_MISSION,
  ICC_MISSION_TITLE,
  ICC_MOTTO,
  ICC_MOTTO_TITLE,
  ICC_OBJECTIVES,
  ICC_OBJECTIVES_TITLE,
  ICC_PAGE_LEAD,
  ICC_PAGE_TITLE,
  ICC_RESPONSIBILITIES,
  ICC_RESPONSIBILITIES_TITLE,
  ICC_VISION,
  ICC_VISION_TITLE,
} from "@/lib/internal-complaint-committee-content";

export function InternalComplaintCommitteePage() {
  return (
    <article className="icc-page about-bihe-page">
      <AboutInnerHero
        currentPage="Internal Complaint Committee"
        title={ICC_PAGE_TITLE}
        lead={ICC_PAGE_LEAD}
        eyebrow="Student Life"
        sectionLabel="Student Life"
        sectionHref="/internal-complaint-committee"
      />

      <section className="icc-page__about" aria-labelledby="icc-about-title">
        <div className="icc-page__container">
          <div className="icc-page__about-grid">
            <Reveal direction="left">
              <div className="icc-page__about-copy">
                <SectionHeader badge="ICC" title={ICC_ABOUT_TITLE} align="left" />
                <p className="icc-page__about-text">{ICC_ABOUT_TEXT}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="icc-page__pillars" aria-label="ICC objectives, functions, and responsibilities">
        <div className="icc-page__container">
          <div className="icc-page__pillars-grid">
            <Reveal>
              <article className="icc-page__pillar-card">
                <h3 className="icc-page__pillar-title">{ICC_OBJECTIVES_TITLE}</h3>
                <ul className="bihe-bullet-list">
                  {ICC_OBJECTIVES.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </Reveal>

            <Reveal delay={60}>
              <article className="icc-page__pillar-card">
                <h3 className="icc-page__pillar-title">{ICC_FUNCTIONS_TITLE}</h3>
                <ul className="bihe-bullet-list">
                  {ICC_FUNCTIONS.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </Reveal>

            <Reveal delay={120}>
              <article className="icc-page__pillar-card">
                <h3 className="icc-page__pillar-title">{ICC_RESPONSIBILITIES_TITLE}</h3>
                <ul className="bihe-bullet-list">
                  {ICC_RESPONSIBILITIES.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="icc-page__values" aria-label="ICC vision, mission, and motto">
        <div className="icc-page__container">
          <div className="icc-page__values-grid">
            <Reveal>
              <article className="icc-page__value-card">
                <h3 className="icc-page__value-title">{ICC_VISION_TITLE}</h3>
                <p className="icc-page__value-text">{ICC_VISION}</p>
              </article>
            </Reveal>

            <Reveal delay={60}>
              <article className="icc-page__value-card">
                <h3 className="icc-page__value-title">{ICC_MISSION_TITLE}</h3>
                <p className="icc-page__value-text">{ICC_MISSION}</p>
              </article>
            </Reveal>

            <Reveal delay={120}>
              <article className="icc-page__value-card icc-page__value-card--motto">
                <h3 className="icc-page__value-title">{ICC_MOTTO_TITLE}</h3>
                <blockquote className="icc-page__motto">&ldquo;{ICC_MOTTO}&rdquo;</blockquote>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="icc-page__commitment" aria-labelledby="icc-commitment-title">
        <div className="icc-page__container">
          <Reveal>
            <div className="icc-page__commitment-panel">
              <h2 className="icc-page__commitment-title" id="icc-commitment-title">
                {ICC_COMMITMENT_TITLE}
              </h2>
              <p className="icc-page__commitment-text">{ICC_COMMITMENT_TEXT}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="icc-page__committee" aria-labelledby="icc-committee-heading">
        <div className="icc-page__container">
          <Reveal>
            <SectionHeader
              badge="ICC"
              title={ICC_COMMITTEE_TITLE}
              align="center"
              titleId="icc-committee-heading"
            />
            <p className="icc-page__committee-lead">{ICC_COMMITTEE_LEAD}</p>
          </Reveal>

          <Reveal delay={100}>
            <div className="bihe-data-table-card">
              <BiheDataTable
                indexColumn
                caption="Internal Complaints Committee members"
                captionId="icc-committee-table"
                columns={[
                  { key: "slNo", header: "SL. NO." },
                  { key: "name", header: "NAME" },
                  { key: "designation", header: "DESIGNATION" },
                  { key: "profession", header: "PROFESSION" },
                  { key: "mobile", header: "MOBILE" },
                  { key: "email", header: "EMAIL" },
                ]}
                rows={ICC_COMMITTEE_MEMBERS.map((member) => ({
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

      <StudentFacilitiesNavSection />
    </article>
  );
}
