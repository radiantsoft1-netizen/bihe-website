import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { StudentFacilitiesNavSection } from "@/components/student-life/StudentFacilitiesNavSection";
import { IccObjectivesGraphic } from "@/components/administration/IccObjectivesGraphic";
import { BiheDataTable } from "@/components/ui/BiheDataTable";
import { Reveal } from "@/components/ui/Reveal";
import {
  ICC_COMMITTEE_LEAD,
  ICC_COMMITTEE_MEMBERS,
  ICC_INTRO_PARAGRAPHS,
  ICC_INTRO_TITLE,
  ICC_OBJECTIVES,
  ICC_PAGE_LEAD,
} from "@/lib/internal-complaint-committee-content";

export function InternalComplaintCommitteePage() {
  return (
    <article className="icc-page about-bihe-page">
      <AboutInnerHero
        currentPage="Internal Complaint Committee"
        title="Internal Complaint Committee"
        lead={ICC_PAGE_LEAD}
        eyebrow="Administration"
        sectionLabel="Administration"
        sectionHref="/internal-complaint-committee"
      />

      <section className="icc-page__intro" aria-labelledby="icc-intro-title">
        <div className="icc-page__container">
          <Reveal>
            <h2 className="icc-page__intro-title" id="icc-intro-title">
              {ICC_INTRO_TITLE}
            </h2>
            {ICC_INTRO_PARAGRAPHS.map((paragraph) => (
              <p className="icc-page__intro-text" key={paragraph}>
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="icc-page__objectives" aria-label="ICC objectives">
        <div className="icc-page__container">
          <div className="icc-page__objectives-grid">
            <Reveal direction="left">
              <IccObjectivesGraphic />
            </Reveal>

            <Reveal delay={80} direction="right">
              <ul className="bihe-bullet-list icc-page__objectives-list">
                {ICC_OBJECTIVES.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="icc-page__committee" aria-labelledby="icc-committee-lead">
        <div className="icc-page__container">
          <Reveal>
            <p className="icc-page__committee-lead" id="icc-committee-lead">
              {ICC_COMMITTEE_LEAD}
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="bihe-data-table-card">
              <BiheDataTable
                indexColumn
                caption="Internal Complaint Committee members"
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
