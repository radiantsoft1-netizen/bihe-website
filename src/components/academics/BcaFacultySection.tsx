import { BiheDataTable } from "@/components/ui/BiheDataTable";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BCA_PROGRAM_TABLE } from "@/lib/bca-academics-content";

export function BcaFacultySection() {
  return (
    <section className="b-com-admin__faculty" aria-labelledby="bca-faculty-title">
      <div className="b-com-admin__container">
        <div className="b-com-admin__faculty-intro">
          <SectionHeader badge="Programme Details" title="BCA Programme Overview" align="center" />
          <p className="b-com-admin__faculty-lead" id="bca-faculty-title">
            Undergraduate computer applications programme offered by the Department of BCA at BIHE.
          </p>
        </div>

        <div className="bihe-data-table-card b-com-admin__faculty-table">
          <BiheDataTable
            caption="BCA programme details"
            captionId="bca-program-table"
            columns={BCA_PROGRAM_TABLE.columns}
            rows={BCA_PROGRAM_TABLE.rows}
          />
        </div>
      </div>
    </section>
  );
}
