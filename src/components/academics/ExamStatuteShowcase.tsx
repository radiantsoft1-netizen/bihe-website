import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import {
  type ExamImageSlug,
  type ExamRuleGroup,
  type ExamStatuteSection,
} from "@/lib/academics-examination-content";
import { images } from "@/lib/images";

const STATUTE_IMAGES = {
  examInternalMain: images.examInternalMain,
  examInternalPanel1: images.examInternalPanel1,
  examInternalPanel2: images.examInternalPanel2,
  examUniversityMain: images.examUniversityMain,
  examUniversityPanel1: images.examUniversityPanel1,
  examUniversityPanel2: images.examUniversityPanel2,
} as const satisfies Record<ExamImageSlug, string>;

const PROGRAMME_COLUMN_COUNT = 4;

type ExamStatuteShowcaseProps = {
  section: ExamStatuteSection;
};

function ExamRuleGroupItem({ group }: { group: ExamRuleGroup }) {
  return (
    <article className="exam-page__programme-item">
      <h3 className="exam-page__programme-item-title">{group.title}</h3>
      <ul className="bihe-bullet-list exam-page__programme-item-list">
        {group.rules.map((rule) => (
          <li key={rule.slice(0, 48)}>{rule}</li>
        ))}
      </ul>
    </article>
  );
}

export function ExamStatuteShowcase({ section }: ExamStatuteShowcaseProps) {
  const main = section.gallery.find((image) => image.layout === "main");
  const columnGroups = section.ruleGroups
    .slice(0, PROGRAMME_COLUMN_COUNT)
    .filter((group) => !group.fullWidth);
  const fullWidthGroups = section.ruleGroups.filter(
    (group, index) => group.fullWidth || index >= PROGRAMME_COLUMN_COUNT,
  );

  return (
    <section
      id={`exam-section-${section.id}`}
      className={`exam-page__programme exam-page__programme--${section.id}`}
      aria-labelledby={`exam-title-${section.id}`}
    >
      <div className="exam-page__container">
        <Reveal>
          <h2 className="exam-page__section-title" id={`exam-title-${section.id}`}>
            {section.title}
          </h2>
        </Reveal>

        <div className="exam-page__programme-layout">
          {main ? (
            <Reveal direction="left">
              <figure className="exam-page__programme-media">
                <SmartImage
                  src={STATUTE_IMAGES[main.imageSlug]}
                  alt={main.alt}
                  fill
                  sizes="(max-width: 960px) 100vw, 28rem"
                  className="exam-page__programme-img"
                  priority={section.id === "internal"}
                />
              </figure>
            </Reveal>
          ) : null}

          <Reveal delay={60} direction="right">
            <div className="exam-page__programme-list">
              {columnGroups.map((group) => (
                <ExamRuleGroupItem key={group.title} group={group} />
              ))}
            </div>
          </Reveal>
        </div>

        {fullWidthGroups.length > 0 ? (
          <Reveal delay={80}>
            <div className="exam-page__programme-list exam-page__programme-list--full">
              {fullWidthGroups.map((group) => (
                <ExamRuleGroupItem key={group.title} group={group} />
              ))}
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
