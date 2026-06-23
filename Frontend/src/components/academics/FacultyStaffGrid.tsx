import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import type { FacultyMember } from "@/lib/types/faculty";

type FacultyStaffGridProps = {
  members: FacultyMember[];
};

type FacultyDetailRow = {
  label: string;
  value: string;
};

function facultyDetailRows(member: FacultyMember): FacultyDetailRow[] {
  const rows: FacultyDetailRow[] = [];

  if (member.qualification) {
    rows.push({ label: "Qualification", value: member.qualification });
  }
  if (member.experience) {
    rows.push({ label: "Teaching Experience", value: member.experience });
  }
  if (member.seminarWorkshop) {
    rows.push({ label: "Seminar/Workshop", value: member.seminarWorkshop });
  }
  if (member.subjectTeaching) {
    rows.push({ label: "Subjects Teaching", value: member.subjectTeaching });
  }

  return rows;
}

export function FacultyStaffGrid({ members }: FacultyStaffGridProps) {
  if (members.length === 0) {
    return <p className="faculty-staff__empty">Details will be updated soon.</p>;
  }

  return (
    <ul className="faculty-staff__grid">
      {members.map((member, index) => {
        const detailRows = facultyDetailRows(member);

        return (
          <Reveal key={member.id} as="li" delay={index * 60} direction="up" className="faculty-staff__item">
            <article className="faculty-staff__card" tabIndex={0}>
              <div className="faculty-staff__media">
                <div className="faculty-staff__photo-wrap">
                  <SmartImage
                    src={member.photo ?? ""}
                    alt={`${member.name}, ${member.designation}`}
                    fill
                    className="faculty-staff__photo"
                    sizes="(max-width: 640px) 50vw, (max-width: 1100px) 33vw, 420px"
                    quality={90}
                  />
                </div>
              </div>
              <div className="faculty-staff__footer">
                <div className="faculty-staff__footer-head">
                  <h3 className="faculty-staff__name" title={member.name}>
                    {member.name}
                  </h3>
                  <span className="faculty-staff__footer-arrow" aria-hidden="true">
                    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 15L15 5" />
                      <path d="M8 5h7v7" />
                    </svg>
                  </span>
                  <p className="faculty-staff__designation">{member.designation}</p>
                </div>
                {detailRows.length > 0 ? (
                  <div className="faculty-staff__footer-details">
                    <table className="faculty-staff__table">
                      <tbody>
                        {detailRows.map((row) => (
                          <tr key={row.label}>
                            <th scope="row">{row.label}</th>
                            <td>{row.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {member.resume ? (
                      <a href={member.resume} className="faculty-staff__resume" download>
                        {member.resumeName ?? "Download Profile PDF"}
                      </a>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </article>
          </Reveal>
        );
      })}
    </ul>
  );
}
