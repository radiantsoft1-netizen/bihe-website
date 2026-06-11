import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SmartImage } from "@/components/ui/SmartImage";
import type { RdcProject } from "@/lib/research-development-cell-content";

export function RdcProjectSection({
  project,
  index,
}: {
  project: RdcProject;
  index: number;
}) {
  const reverse = index % 2 === 1;
  const variant = index % 2 === 0 ? "light" : "muted";
  const titleId = `rdc-project-${project.id}-title`;

  return (
    <section
      id={`rdc-project-${project.id}`}
      className={`rdc-page__showcase rdc-page__showcase--${variant}`}
      aria-labelledby={titleId}
    >
      <div className="rdc-page__showcase-decor" aria-hidden>
        <span className="rdc-page__decor-blob rdc-page__decor-blob--1" />
        <span className="rdc-page__decor-blob rdc-page__decor-blob--2" />
      </div>

      <div className="rdc-page__container">
        <div
          className={[
            "rdc-page__showcase-grid",
            reverse ? "rdc-page__showcase-grid--reverse" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <Reveal direction={reverse ? "right" : "left"} className="rdc-page__showcase-visual">
            <div className="rdc-page__dual-images">
              {project.images.map((image, imageIndex) => (
                <article
                  key={image.src}
                  className={[
                    "rdc-page__image",
                    imageIndex === 0 ? "rdc-page__image--primary" : "rdc-page__image--secondary",
                    image.tone ? `rdc-page__image--${image.tone}` : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <div className="rdc-page__image-shell">
                    <div className="rdc-page__image-frame">
                      <SmartImage
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="rdc-page__image-img"
                        sizes="(max-width: 960px) 42vw, 14rem"
                        priority={index === 0 && imageIndex === 0}
                      />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </Reveal>

          <Reveal
            delay={80}
            direction={reverse ? "left" : "right"}
            className="rdc-page__showcase-copy"
          >
            <span className="rdc-page__category">{project.category}</span>
            <SectionHeader
              badge="Research Project"
              title={project.title}
              align="left"
              showIcon={false}
              titleId={titleId}
            />

            <div className="rdc-page__panels">
              <article className="rdc-page__panel">
                <h3 className="rdc-page__panel-title">Aim</h3>
                <p className="rdc-page__panel-text">{project.aim}</p>
              </article>

              <article className="rdc-page__panel rdc-page__panel--conclusion">
                <h3 className="rdc-page__panel-title">Conclusion</h3>
                <p className="rdc-page__panel-text">{project.conclusion}</p>
              </article>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
