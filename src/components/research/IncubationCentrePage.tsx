import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { IncubationCentreShowcase } from "@/components/research/IncubationCentreShowcase";
import { BiheDataTable } from "@/components/ui/BiheDataTable";
import { Reveal } from "@/components/ui/Reveal";
import {
  IC_BENEFICIARY_SECTION,
  IC_CELL_BANNER,
  IC_COMMITTEE_MEMBERS,
  IC_COMMITTEE_TITLE,
  IC_CURRENT_STATUS,
  IC_CURRENT_STATUS_TITLE,
  IC_OBJECTIVES,
  IC_OBJECTIVES_TITLE,
  IC_PAGE_LEAD,
  IC_WHY_SECTION,
} from "@/lib/incubation-centre-content";
import { RESEARCH_BASE_PATH } from "@/lib/research-routes";

const IC_SHOWCASE_SECTIONS = [IC_WHY_SECTION, IC_BENEFICIARY_SECTION] as const;

export function IncubationCentrePage() {
  return (
    <article className="ic-page incubation-centre-page about-bihe-page">
      <AboutInnerHero
        currentPage="Incubation Centre"
        title="Incubation Centre"
        lead={IC_PAGE_LEAD}
        eyebrow="Research"
        sectionLabel="Research"
        sectionHref={RESEARCH_BASE_PATH}
      />

      {IC_SHOWCASE_SECTIONS.map((section, index) => (
        <IncubationCentreShowcase key={section.id} section={section} index={index} />
      ))}

      <section className="ic-page__banner" aria-labelledby="ic-banner-title">
        <div className="ic-page__container">
          <div className="ic-page__banner-panel">
            <div className="ic-page__banner-decor" aria-hidden />
            <div className="ic-page__banner-inner">
              <Reveal>
                <h2 className="ic-page__banner-title" id="ic-banner-title">
                  {IC_CELL_BANNER.title}
                </h2>
                {IC_CELL_BANNER.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)} className="ic-page__banner-text">
                    {paragraph}
                  </p>
                ))}
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="ic-page__committee" aria-labelledby="ic-committee-title">
        <div className="ic-page__container">
          <Reveal>
            <h2 className="ic-page__section-title" id="ic-committee-title">
              {IC_COMMITTEE_TITLE}
            </h2>
          </Reveal>

          <Reveal delay={80}>
            <div className="bihe-data-table-card ic-page__table-card">
              <BiheDataTable
                indexColumn
                caption="Incubation Centre committee members"
                captionId="ic-committee-table"
                columns={[
                  { key: "slNo", header: "SL. NO." },
                  { key: "name", header: "Name" },
                  { key: "designation", header: "Designation" },
                  { key: "profession", header: "Profession" },
                ]}
                rows={IC_COMMITTEE_MEMBERS.map((member) => ({
                  id: member.slNo,
                  slNo: member.slNo,
                  name: member.name,
                  designation: member.designation,
                  profession: member.profession,
                }))}
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="ic-page__objectives" aria-labelledby="ic-objectives-title">
        <div className="ic-page__container">
          <Reveal>
            <h2 className="ic-page__section-title" id="ic-objectives-title">
              {IC_OBJECTIVES_TITLE}
            </h2>
          </Reveal>

          <Reveal delay={80}>
            <ul className="bihe-bullet-list ic-page__objectives-list">
              {IC_OBJECTIVES.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="ic-page__status" aria-labelledby="ic-status-title">
        <div className="ic-page__container">
          <Reveal>
            <h2 className="ic-page__section-title" id="ic-status-title">
              {IC_CURRENT_STATUS_TITLE}
            </h2>
            <p className="ic-page__status-text">{IC_CURRENT_STATUS}</p>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
