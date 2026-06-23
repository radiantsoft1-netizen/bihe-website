import { unstable_noStore as noStore } from "next/cache";

import { FacultyStaffGrid } from "@/components/academics/FacultyStaffGrid";
import { FacultyStaffIntro } from "@/components/academics/FacultyStaffIntro";
import { FACULTY_DEPARTMENT_TITLES } from "@/lib/faculty-pages";
import { getFacultyByDepartment, getFacultySections } from "@/lib/faculty-service";
import type { FacultyDepartmentId, FacultySection } from "@/lib/types/faculty";

type FacultyStaffSectionProps = {
  department?: FacultyDepartmentId;
  sections?: FacultySection[];
};

export async function FacultyStaffSection({
  department,
  sections,
}: FacultyStaffSectionProps) {
  noStore();

  if (department) {
    const members = await getFacultyByDepartment(department);
    const title = FACULTY_DEPARTMENT_TITLES[department];

    return (
      <section className="b-com-admin__faculty faculty-staff" aria-labelledby={`faculty-${department}`}>
        <div className="b-com-admin__container">
          <FacultyStaffIntro title={title} id={`faculty-${department}`} />
          <FacultyStaffGrid members={members} />
        </div>
      </section>
    );
  }

  const resolvedSections = sections ?? (await getFacultySections());

  return (
    <>
      {resolvedSections.map((section) => (
        <section
          key={section.id}
          className="b-com-admin__faculty faculty-staff"
          aria-labelledby={`faculty-section-${section.id}`}
        >
          <div className="b-com-admin__container">
            <FacultyStaffIntro title={section.title} id={`faculty-section-${section.id}`} />
            <FacultyStaffGrid members={section.members} />
          </div>
        </section>
      ))}
    </>
  );
}
