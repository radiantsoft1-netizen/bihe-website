import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { BCA_DEPARTMENT } from "@/lib/bca-academics-content";

export function BcaDepartmentSection() {
  const titleId = `${BCA_DEPARTMENT.id}-department-title`;

  return (
    <section
      className="b-com-admin__department"
      aria-labelledby={titleId}
    >
      <div className="b-com-admin__container b-com-admin__department-grid">
        <Reveal direction="left">
          <figure
            className="b-com-admin__editorial b-com-admin__editorial--department"
            aria-label={BCA_DEPARTMENT.imageAlt}
          >
            <div className="b-com-admin__editorial-mat">
              <span className="b-com-admin__editorial-accent" aria-hidden />
              <div className="b-com-admin__editorial-image b-com-admin__editorial-image--department">
                <SmartImage
                  src={BCA_DEPARTMENT.image}
                  alt={BCA_DEPARTMENT.imageAlt}
                  fill
                  sizes="(max-width: 960px) 90vw, 28rem"
                  className="b-com-admin__editorial-img"
                />
                <span className="b-com-admin__editorial-vignette" aria-hidden />
                <span className="b-com-admin__department-badge">{BCA_DEPARTMENT.imageBadge}</span>
              </div>
            </div>
          </figure>
        </Reveal>

        <Reveal direction="right" delay={80}>
          <div className="b-com-admin__department-panel">
            <p className="b-com-admin__department-eyebrow">{BCA_DEPARTMENT.label}</p>
            <h2 className="b-com-admin__department-title" id={titleId}>
              {BCA_DEPARTMENT.title}
            </h2>
            {BCA_DEPARTMENT.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)} className="b-com-admin__department-text">
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
