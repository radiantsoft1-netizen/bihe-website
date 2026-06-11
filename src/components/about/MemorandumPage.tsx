import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { BiheDataTable } from "@/components/ui/BiheDataTable";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BihePdfDocumentCard } from "@/components/ui/BihePdfDocumentCard";
import {
  MOA_DOCUMENTS,
  MOA_FOUNDING_MEMBERS,
  MOA_INTRO,
  MOA_SECTIONS,
} from "@/lib/memorandum-content";

export function MemorandumPage() {
  return (
    <article className="moa-page about-bihe-page">
      <AboutInnerHero
        currentPage="Memorandum of Association"
        title="Memorandum of Association"
        lead="Constitutional framework and governance documents that guide BIHE's operations, accountability, and affiliation with Bapuji Educational Association."
      />

      <section className="moa-page__intro" aria-labelledby="moa-overview">
        <div className="moa-page__container">
          <Reveal>
            <SectionHeader
              badge="Governance"
              title="Constitution of the institute"
              align="left"
            />
            <p className="moa-page__lead" id="moa-overview">
              {MOA_INTRO}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="moa-page__sections" aria-label="Memorandum clauses">
        <div className="moa-page__container">
          <ol className="moa-page__clause-list">
            {MOA_SECTIONS.map((section, index) => (
              <Reveal key={section.title} delay={60 + index * 50} direction="up">
                <li className="moa-page__clause">
                  <span className="moa-page__clause-num">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="moa-page__clause-title">{section.title}</h2>
                    <p>{section.text}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="moa-page__governance" aria-labelledby="moa-founding-title">
        <div className="moa-page__container">
          <Reveal>
            <SectionHeader
              badge="BIHE Founding Members"
              title="Founding members"
              align="center"
            />
          </Reveal>
          <Reveal delay={80}>
            <div className="bihe-data-table-card">
              <BiheDataTable
                indexColumn
                caption="BIHE founding members"
                captionId="moa-founding-title"
                columns={[
                  { key: "slNo", header: "SL. NO." },
                  { key: "name", header: "NAME" },
                  { key: "designation", header: "OCCUPATION" },
                ]}
                rows={MOA_FOUNDING_MEMBERS.map((member) => ({
                  id: member.slNo,
                  slNo: member.slNo,
                  name: member.name,
                  designation: member.designation,
                }))}
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="moa-page__documents" aria-labelledby="moa-documents-title">
        <div className="moa-page__container">
          <Reveal>
            <SectionHeader
              badge="PDF"
              title="Related governance documents"
              align="center"
            />
          </Reveal>
          <ul className="moa-page__doc-grid">
            {MOA_DOCUMENTS.map((doc, index) => (
              <Reveal key={doc.title} delay={80 + index * 60} direction="up">
                <BihePdfDocumentCard
                  title={doc.title}
                  description={doc.description}
                  href={doc.href}
                  fileName={doc.fileName}
                  titleId={index === 0 ? "moa-documents-title" : undefined}
                  variant="moa"
                />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}
