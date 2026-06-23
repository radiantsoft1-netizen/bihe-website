import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

export type AcademicsDepartmentConfig = {
  id: string;
  label: string;
  title: string;
  paragraphs: readonly string[];
};

type AcademicsDepartmentSectionProps = {
  config: AcademicsDepartmentConfig;
};

export function AcademicsDepartmentSection({ config }: AcademicsDepartmentSectionProps) {
  const titleId = `${config.id}-department-title`;

  return (
    <section className="about-bihe-intro administration-page" aria-labelledby={titleId}>
      <div className="about-bihe-hero__container">
        <Reveal>
          <SectionHeader badge={config.label} title={config.title} align="left" showIcon={false} />
          <div className="about-bihe-intro__body" id={titleId}>
            {config.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)} className="about__desc">
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
