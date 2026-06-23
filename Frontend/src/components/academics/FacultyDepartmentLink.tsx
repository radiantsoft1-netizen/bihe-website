import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { getFacultyPageConfig, type FacultyPageSlug } from "@/lib/faculty-pages";

type FacultyDepartmentLinkProps = {
  slug: FacultyPageSlug;
};

export function FacultyDepartmentLink({ slug }: FacultyDepartmentLinkProps) {
  const page = getFacultyPageConfig(slug);

  return (
    <section className="b-com-admin__faculty faculty-staff" aria-labelledby={`${slug}-link-title`}>
      <div className="b-com-admin__container">
        <Reveal direction="up">
          <div className="b-com-admin__faculty-intro">
            <h2 className="b-com-admin__faculty-title" id={`${slug}-link-title`}>
              {page.title}
            </h2>
            <p className="b-com-admin__faculty-lead">{page.lead}</p>
            <Link href={page.href} className="about__more">
              View {page.title}
              <span className="btn__icon" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
