import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { ProgrammeStatIcon } from "@/components/academics/ProgrammeStatIcon";

type ProgrammeStat = {
  value: string;
  label: string;
  suffix: string;
  icon: "intake" | "duration" | "level";
  tone?: "navy" | "maroon";
};

export type AcademicsProgrammeShowcaseConfig = {
  ariaLabel: string;
  badge: string;
  headline: string;
  subline: string;
  description?: string;
  stats: readonly ProgrammeStat[];
  tagsLabel: string;
  tags: readonly string[];
  image: string;
  imageAlt: string;
};

type AcademicsProgrammeShowcaseProps = {
  config: AcademicsProgrammeShowcaseConfig;
};

export function AcademicsProgrammeShowcase({ config }: AcademicsProgrammeShowcaseProps) {
  return (
    <section
      className="b-com-admin__programme b-com-admin__programme--showcase"
      aria-label={config.ariaLabel}
    >
      <div className="b-com-admin__programme-decor" aria-hidden>
        <span className="b-com-admin__programme-blob b-com-admin__programme-blob--1" />
        <span className="b-com-admin__programme-blob b-com-admin__programme-blob--2" />
        <span className="b-com-admin__programme-ring" />
        <span className="b-com-admin__programme-grid" />
      </div>

      <div className="b-com-admin__container">
        <div className="b-com-admin__programme-stage">
          <Reveal direction="left" className="b-com-admin__programme-visual">
            <figure className="b-com-admin__editorial b-com-admin__editorial--showcase">
              <div className="b-com-admin__editorial-mat">
                <span className="b-com-admin__editorial-accent" aria-hidden />
                <div className="b-com-admin__editorial-image">
                  <SmartImage
                    src={config.image}
                    alt={config.imageAlt}
                    fill
                    sizes="(max-width: 960px) 100vw, min(55vw, 42rem)"
                    className="b-com-admin__editorial-img"
                    priority
                  />
                  <span className="b-com-admin__editorial-vignette" aria-hidden />
                </div>
              </div>
            </figure>
          </Reveal>

          <Reveal delay={100} direction="right" className="b-com-admin__programme-panel">
            <span className="b-com-admin__programme-badge">{config.badge}</span>
            <h2 className="b-com-admin__programme-headline">{config.headline}</h2>
            <p className="b-com-admin__programme-subline">{config.subline}</p>

            {config.description ? (
              <p className="b-com-admin__programme-desc">{config.description}</p>
            ) : null}

            <ul className="b-com-admin__programme-stats" aria-label={`${config.headline} programme highlights`}>
              {config.stats.map((stat) => (
                <li
                  key={stat.label}
                  className={
                    "b-com-admin__programme-stat" +
                    (stat.tone === "maroon"
                      ? " b-com-admin__programme-stat--maroon"
                      : " b-com-admin__programme-stat--navy")
                  }
                >
                  <span className="b-com-admin__programme-stat-icon" aria-hidden>
                    <ProgrammeStatIcon icon={stat.icon} />
                  </span>
                  <div className="b-com-admin__programme-stat-body">
                    <strong>
                      {stat.value}
                      {stat.suffix}
                    </strong>
                    <span>{stat.label}</span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="b-com-admin__programme-tags">
              <p className="b-com-admin__programme-tags-label">{config.tagsLabel}</p>
              <ul className="b-com-admin__meta-list" aria-label={`${config.headline} focus areas`}>
                {config.tags.map((tag) => (
                  <li key={tag} className="b-com-admin__meta-pill">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
