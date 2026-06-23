import { BiheDataTable } from "@/components/ui/BiheDataTable";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { B_COM_PROGRAM_TABLE } from "@/lib/b-com-admin-content";

export function BComFacultySection() {
  return (
    <section className="b-com-admin__faculty" aria-labelledby="b-com-faculty-title">
      <div className="b-com-admin__container">
        <div className="b-com-admin__faculty-intro">
          <SectionHeader
            badge="Programme Details"
            title="B.Com Programme Overview"
            align="center"
          />
          <p className="b-com-admin__faculty-lead" id="b-com-faculty-title">
            Undergraduate commerce programme offered by the Department of B.Com at BIHE.
          </p>
        </div>

        <div className="bihe-data-table-card b-com-admin__faculty-table">
          <BiheDataTable
            caption="B.Com programme details"
            captionId="b-com-program-table"
            columns={B_COM_PROGRAM_TABLE.columns}
            rows={B_COM_PROGRAM_TABLE.rows}
          />
        </div>
      </div>
    </section>
  );
}
