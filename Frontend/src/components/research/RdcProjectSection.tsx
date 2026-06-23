import { Reveal } from "@/components/ui/Reveal";
import { RichTextParagraph } from "@/components/ui/RichTextParagraph";
import { SmartImage } from "@/components/ui/SmartImage";
import type { RdcProject, RdcProjectImage } from "@/lib/research-development-cell-content";

function RdcSplitImage({ image, priority }: { image: RdcProjectImage; priority?: boolean }) {
  return (
    <figure className="rdc-page__split-media">
      <div
        className={[
          "rdc-page__split-frame",
          image.tone ? `rdc-page__split-frame--${image.tone}` : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <SmartImage
          src={image.src}
          alt={image.alt}
          fill
          className="rdc-page__split-img"
          sizes="(max-width: 960px) 88vw, 28rem"
          priority={priority}
        />
      </div>
    </figure>
  );
}

export function RdcProjectSection({
  project,
  index,
}: {
  project: RdcProject;
  index: number;
}) {
  const variant = index % 2 === 0 ? "light" : "muted";
  const titleId = `rdc-project-${project.id}-title`;
  const [primaryImage, secondaryImage] = project.images;

  return (
    <section
      id={`rdc-project-${project.id}`}
      className={`rdc-page__showcase rdc-page__showcase--${variant}`}
      aria-labelledby={titleId}
    >
      <div className="rdc-page__container">
        <h2 className="sr-only" id={titleId}>
          {project.title}
        </h2>

        <div className="rdc-page__showcase-track">
          <article className="rdc-page__chapter rdc-page__split rdc-page__split--image-left">
            <Reveal direction="left" className="rdc-page__split-visual">
              <RdcSplitImage image={primaryImage} priority={index === 0} />
            </Reveal>

            <Reveal delay={80} direction="right" className="rdc-page__split-copy">
              <div className="rdc-page__chapter-label">
                <span className="rdc-page__split-step" aria-hidden>
                  01
                </span>
                <h3 className="rdc-page__panel-title">Aim</h3>
              </div>
              <RichTextParagraph html={project.aim} className="rdc-page__panel-text" />
            </Reveal>
          </article>

          <article className="rdc-page__chapter rdc-page__chapter--conclusion rdc-page__split rdc-page__split--image-right">
            <Reveal delay={80} direction="left" className="rdc-page__split-copy">
              <div className="rdc-page__chapter-label rdc-page__chapter-label--conclusion">
                <span className="rdc-page__split-step" aria-hidden>
                  02
                </span>
                <h3 className="rdc-page__panel-title">Conclusion</h3>
              </div>
              <RichTextParagraph html={project.conclusion} className="rdc-page__panel-text" />
            </Reveal>

            <Reveal direction="right" className="rdc-page__split-visual">
              <RdcSplitImage image={secondaryImage} />
            </Reveal>
          </article>
        </div>
      </div>
    </section>
  );
}
