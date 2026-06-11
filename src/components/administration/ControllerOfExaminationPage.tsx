import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { BiheDataTable } from "@/components/ui/BiheDataTable";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BihePdfDocumentCard } from "@/components/ui/BihePdfDocumentCard";
import {
  CONTROLLER_EXAM_SECTION_INTRO,
  CONTROLLER_EXAM_STAFF,
  CONTROLLER_EXAM_SUCCESS_NOTE,
  CONTROLLER_OF_EXAMINATION_PAGE_LEAD,
  CONTROLLER_WORK_ALLOTMENT,
} from "@/lib/controller-of-examination-content";

export function ControllerOfExaminationPage() {
  return (
    <article className="coe-page about-bihe-page">
      <AboutInnerHero
        currentPage="Controller of Examination"
        title="Controller of Examination"
        lead={CONTROLLER_OF_EXAMINATION_PAGE_LEAD}
        eyebrow="Administration"
        sectionLabel="Administration"
        sectionHref="/controller-of-examination"
      />

      <section className="coe-page__exam" aria-labelledby="coe-exam-section-title">
        <div className="coe-page__container">
          <Reveal>
            <SectionHeader
              badge="Examination"
              title="Controller of Examination: Exam Section"
              align="left"
            />
          </Reveal>

          <Reveal delay={60}>
            <div className="coe-page__exam-grid">
              <p className="coe-page__intro-text" id="coe-exam-section-title">
                {CONTROLLER_EXAM_SECTION_INTRO}
              </p>
              <div className="coe-page__intro-decor" aria-hidden>
                <span className="coe-page__decor-circle coe-page__decor-circle--1" />
                <span className="coe-page__decor-circle coe-page__decor-circle--2" />
                <span className="coe-page__decor-circle coe-page__decor-circle--3" />
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="bihe-data-table-card">
              <BiheDataTable
                indexColumn
                columns={[
                  { key: "slNo", header: "SL. NO." },
                  { key: "name", header: "NAME" },
                  { key: "role", header: "ROLE" },
                ]}
                rows={CONTROLLER_EXAM_STAFF.map((member) => ({
                  id: member.slNo,
                  slNo: member.slNo,
                  name: member.name,
                  role: member.role,
                }))}
              />
              <p className="coe-page__success-note">{CONTROLLER_EXAM_SUCCESS_NOTE}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        className="coe-page__allotment"
        aria-labelledby="coe-allotment-title"
      >
        <div className="coe-page__container">
          <Reveal>
            <SectionHeader
              badge="Work Allotment"
              title="Office work allotment for theory examination"
              align="center"
            />
            <p className="coe-page__allotment-institute">
              {CONTROLLER_WORK_ALLOTMENT.institute}
            </p>
            <p className="coe-page__allotment-title" id="coe-allotment-title">
              {CONTROLLER_WORK_ALLOTMENT.title}
            </p>
          </Reveal>

          <ol className="coe-page__role-grid">
            {CONTROLLER_WORK_ALLOTMENT.roles.map((role, index) => (
              <Reveal key={role.title} delay={80 + index * 60} direction="up">
                <li className="coe-page__role-card">
                  <div className="coe-page__role-head">
                    <span className="coe-page__role-num">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="coe-page__role-title">{role.title}</h3>
                  </div>

                  {"duties" in role && role.duties.length > 0 ? (
                    <ul className="bihe-bullet-list">
                      {role.duties.map((duty) => (
                        <li key={duty}>{duty}</li>
                      ))}
                    </ul>
                  ) : null}

                  {"document" in role && role.document ? (
                    <ul className="coe-page__pdf-wrap">
                      <BihePdfDocumentCard
                        title={role.document.title}
                        description={role.document.description}
                        href={role.document.href}
                        fileName={role.document.fileName}
                        titleTag="h4"
                        downloadLabel={role.document.actionLabel}
                      />
                    </ul>
                  ) : null}
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    </article>
  );
}
