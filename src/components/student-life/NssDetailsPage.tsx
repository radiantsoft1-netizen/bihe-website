import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { StudentFacilitiesNavSection } from "@/components/student-life/StudentFacilitiesNavSection";
import { StudentLifeShowcaseSection } from "@/components/student-life/StudentLifeShowcaseSection";
import { BiheDataTable } from "@/components/ui/BiheDataTable";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import {
  NSS_ACTIVITIES,
  NSS_ACTIVITIES_TITLE,
  NSS_BANNER_IMAGE,
  NSS_DETAILS_PARAGRAPHS,
  NSS_DETAILS_TITLE,
  NSS_BANNER_IMAGE_ALT,
  NSS_COMMITTEE_MEMBERS,
  NSS_COMMITTEE_TITLE,
  NSS_FEATURED_IMAGE,
  NSS_FEATURED_IMAGE_ALT,
  NSS_ACTIVITY_SHOWCASES,
  NSS_PAGE_LEAD,
  NSS_PROGRAMME_TITLE,
  NSS_REPORT_SECTIONS,
} from "@/lib/nss-details-content";
import { STUDENT_LIFE_BASE_PATH } from "@/lib/student-life-routes";

export function NssDetailsPage() {
  return (
    <article className="nss-page about-bihe-page">
      <AboutInnerHero
        currentPage="NSS Details"
        title="NSS Details"
        lead={NSS_PAGE_LEAD}
        eyebrow="Student Life"
        sectionLabel="Student Life"
        sectionHref={STUDENT_LIFE_BASE_PATH}
      />

      <section className="nss-page__banner" aria-label="NSS campus highlight">
        <div className="nss-page__banner-frame">
          <SmartImage
            src={NSS_BANNER_IMAGE}
            alt={NSS_BANNER_IMAGE_ALT}
            fill
            priority
            className="nss-page__banner-img"
            sizes="100vw"
          />
          <div className="nss-page__banner-overlay">
            <p className="nss-page__banner-kicker">Student Life</p>
            <h2 className="nss-page__banner-title">National Service Scheme</h2>
          </div>
        </div>
      </section>

      <section className="nss-page__leadership" aria-labelledby="nss-leadership-title">
        <div className="nss-page__container">
          <Reveal>
            <div className="nss-page__leadership-header">
              <h2
                className="nss-page__section-title nss-page__section-title--maroon"
                id="nss-leadership-title"
              >
                {NSS_DETAILS_TITLE}
              </h2>
              {NSS_DETAILS_PARAGRAPHS.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="nss-page__text">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="nss-page__records" aria-labelledby="nss-records-title">
        <div className="nss-page__container">
          <Reveal>
            <h2 className="nss-page__section-title nss-page__section-title--center" id="nss-records-title">
              Committee &amp; Activities
            </h2>
          </Reveal>

          <div className="nss-page__tables">
            <Reveal delay={60}>
              <div className="nss-page__table-block">
                <h3 className="nss-page__table-title">{NSS_COMMITTEE_TITLE}</h3>
                <div className="bihe-data-table-card">
                  <BiheDataTable
                    indexColumn
                    caption="NSS advisory committee members"
                    captionId="nss-committee-table"
                    columns={[
                      { key: "slNo", header: "SL. NO." },
                      { key: "name", header: "Name" },
                      { key: "designation", header: "Designation" },
                      { key: "role", header: "Role" },
                    ]}
                    rows={NSS_COMMITTEE_MEMBERS.map((member) => ({
                      id: member.slNo,
                      slNo: member.slNo,
                      name: member.name,
                      designation: member.designation,
                      role: member.role,
                    }))}
                  />
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="nss-page__table-block">
                <h3 className="nss-page__table-title">{NSS_ACTIVITIES_TITLE}</h3>
                <div className="bihe-data-table-card">
                  <BiheDataTable
                    indexColumn
                    caption="NSS unit activities"
                    captionId="nss-activities-table"
                    columns={[
                      { key: "slNo", header: "SL. NO." },
                      { key: "event", header: "Event" },
                      { key: "date", header: "Date" },
                    ]}
                    rows={NSS_ACTIVITIES.map((activity) => ({
                      id: activity.slNo,
                      slNo: activity.slNo,
                      event: activity.event,
                      date: activity.date,
                    }))}
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="nss-page__programme" aria-labelledby="nss-programme-title">
        <div className="nss-page__container">
          <Reveal>
            <h2 className="nss-page__section-title" id="nss-programme-title">
              {NSS_PROGRAMME_TITLE}
            </h2>
          </Reveal>

          <div className="nss-page__programme-layout">
            <Reveal direction="left">
              <figure className="nss-page__programme-media">
                <SmartImage
                  src={NSS_FEATURED_IMAGE}
                  alt={NSS_FEATURED_IMAGE_ALT}
                  fill
                  className="nss-page__programme-img"
                  sizes="(max-width: 960px) 100vw, 28rem"
                />
              </figure>
            </Reveal>

            <Reveal delay={60} direction="right">
              <div className="nss-page__programme-list">
                {NSS_REPORT_SECTIONS.slice(0, 4).map((section) => (
                  <article key={section.id} className="nss-page__programme-item">
                    <h3 className="nss-page__programme-item-title">{section.title}</h3>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 48)} className="nss-page__text">
                        {paragraph}
                      </p>
                    ))}
                  </article>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={80}>
            <div className="nss-page__programme-list nss-page__programme-list--full">
              {NSS_REPORT_SECTIONS.slice(4).map((section) => (
                <article key={section.id} className="nss-page__programme-item">
                  <h3 className="nss-page__programme-item-title">{section.title}</h3>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 48)} className="nss-page__text">
                      {paragraph}
                    </p>
                  ))}
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {NSS_ACTIVITY_SHOWCASES.map((section, index) => (
        <StudentLifeShowcaseSection
          key={section.id}
          section={{ ...section, reverse: index % 2 === 1 }}
          sectionIndex={index}
          isFirst={index === 0}
          pageId="nss-details"
        />
      ))}

      <StudentFacilitiesNavSection />
    </article>
  );
}
