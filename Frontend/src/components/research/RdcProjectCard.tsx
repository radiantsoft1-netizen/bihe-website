import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { ArrowRightIcon } from "@/components/ui/icons";
import type { RdcProject } from "@/lib/research-development-cell-content";
import { rdcProjectPath } from "@/lib/research-routes";

export function RdcProjectCard({
  project,
  index,
}: {
  project: RdcProject;
  index: number;
}) {
  const coverImage = project.images[0];
  const detailHref = rdcProjectPath(project.id);

  return (
    <Reveal delay={60 + index * 50} direction="up">
      <article className="rdc-page__project-card">
        <Link href={detailHref} className="rdc-page__project-card-link">
          <div className="rdc-page__project-card-media">
            <div className="rdc-page__project-card-frame">
              <SmartImage
                src={coverImage.src}
                alt={coverImage.alt}
                fill
                className="rdc-page__project-card-img"
                sizes="(max-width: 640px) 92vw, (max-width: 960px) 46vw, 30vw"
                priority={index < 2}
              />
            </div>
            <span className="rdc-page__project-card-scrim" aria-hidden />
          </div>

          <div className="rdc-page__project-card-body">
            <span className="rdc-page__project-card-category">{project.category}</span>
            <h2 className="rdc-page__project-card-title">{project.title}</h2>
            <span className="rdc-page__project-card-cta">
              View project
              <ArrowRightIcon className="rdc-page__project-card-cta-icon" />
            </span>
          </div>
        </Link>
      </article>
    </Reveal>
  );
}
