import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { StudentFacilitiesNavSection } from "@/components/student-life/StudentFacilitiesNavSection";
import { BiheDataTable } from "@/components/ui/BiheDataTable";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  GRIEVANCE_COMMITMENT_PARAGRAPHS,
  GRIEVANCE_COMMITTEE_TABLE,
  GRIEVANCE_COMMITTEE_TITLE,
  GRIEVANCE_INTRO_PARAGRAPHS,
  GRIEVANCE_INTRO_TITLE,
  GRIEVANCE_ISSUES,
  GRIEVANCE_ISSUES_TITLE,
  GRIEVANCE_OBJECTIVES,
  GRIEVANCE_OBJECTIVES_TITLE,
  GRIEVANCE_PAGE_LEAD,
  GRIEVANCE_PAGE_TITLE,
  GRIEVANCE_PROCESS_TEXT,
  GRIEVANCE_PROCESS_TITLE,
} from "@/lib/student-life-pages/student-grievance-redressal-committee";
import { STUDENT_LIFE_BASE_PATH } from "@/lib/student-life-routes";

export function StudentGrievanceRedressalPage() {
  return (
    <article className="grc-page about-bihe-page">
      <AboutInnerHero
        currentPage="Student Grievance Redressal Committee"
        title={GRIEVANCE_PAGE_TITLE}
        lead={GRIEVANCE_PAGE_LEAD}
        eyebrow="Student Life"
        sectionLabel="Student Life"
        sectionHref={STUDENT_LIFE_BASE_PATH}
      />

      <section className="grc-page__about" aria-labelledby="grc-intro-title">
        <div className="grc-page__container">
          <Reveal direction="left">
            <div className="grc-page__about-copy">
              <SectionHeader badge="SGRC" title={GRIEVANCE_INTRO_TITLE} align="left" titleId="grc-intro-title" />
              {GRIEVANCE_INTRO_PARAGRAPHS.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="grc-page__text">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="grc-page__objectives" aria-labelledby="grc-objectives-title">
        <div className="grc-page__container">
          <Reveal>
            <SectionHeader
              badge="SGRC"
              title={GRIEVANCE_OBJECTIVES_TITLE}
              align="center"
              titleId="grc-objectives-title"
            />
          </Reveal>

          <ul className="grc-page__objective-grid">
            {GRIEVANCE_OBJECTIVES.map((objective, index) => (
              <li key={objective}>
                <Reveal delay={40 + index * 40}>
                  <article className="grc-page__objective-card">
                    <span className="grc-page__objective-index" aria-hidden>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="grc-page__objective-text">{objective}</p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="grc-page__process" aria-labelledby="grc-process-title">
        <div className="grc-page__container">
          <Reveal>
            <div className="grc-page__process-panel">
              <h2 className="grc-page__panel-title" id="grc-process-title">
                {GRIEVANCE_PROCESS_TITLE}
              </h2>
              <p className="grc-page__text">{GRIEVANCE_PROCESS_TEXT}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="grc-page__issues" aria-labelledby="grc-issues-title">
        <div className="grc-page__container">
          <Reveal>
            <article className="grc-page__issues-card">
              <h2 className="grc-page__panel-title" id="grc-issues-title">
                {GRIEVANCE_ISSUES_TITLE}
              </h2>
              <ul className="bihe-bullet-list grc-page__issues-list">
                {GRIEVANCE_ISSUES.map((issue) => (
                  <li key={issue}>{issue}</li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="grc-page__commitment" aria-label="Institutional commitment">
        <div className="grc-page__container">
          <Reveal>
            <div className="grc-page__commitment-panel">
              {GRIEVANCE_COMMITMENT_PARAGRAPHS.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="grc-page__text">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="grc-page__committee" aria-labelledby="grc-committee-title">
        <div className="grc-page__container">
          <Reveal>
            <SectionHeader
              badge="SGRC"
              title={GRIEVANCE_COMMITTEE_TITLE}
              align="center"
              titleId="grc-committee-title"
            />
          </Reveal>

          <Reveal delay={100}>
            <div className="bihe-data-table-card">
              <BiheDataTable
                indexColumn
                caption={GRIEVANCE_COMMITTEE_TABLE.caption}
                captionId="grc-committee-table"
                columns={GRIEVANCE_COMMITTEE_TABLE.columns.map((column) => ({
                  key: column.key,
                  header: column.header,
                }))}
                rows={GRIEVANCE_COMMITTEE_TABLE.rows.map((row) => ({ ...row }))}
              />
            </div>
          </Reveal>
        </div>
      </section>

      <StudentFacilitiesNavSection />
    </article>
  );
}
