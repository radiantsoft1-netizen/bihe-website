import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { AdmissionsPageNav } from "@/components/admissions/AdmissionsPageNav";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { ADMISSIONS_BASE_PATH } from "@/lib/admissions-routes";
import {
  ONLINE_ADMISSION_FORMAT_PAGE_LEAD,
  ONLINE_ADMISSION_STEP_01_INTRO,
  ONLINE_ADMISSION_STEPS,
} from "@/lib/online-admission-format-content";

export function OnlineAdmissionFormatPage() {
  return (
    <article className="online-admission-format-page about-bihe-page">
      <AboutInnerHero
        currentPage="Online Admission Format"
        title="Online Admission Format"
        lead={ONLINE_ADMISSION_FORMAT_PAGE_LEAD}
        eyebrow="Admissions"
        sectionLabel="Admissions"
        sectionHref={ADMISSIONS_BASE_PATH}
      />

      <AdmissionsPageNav />

      <section
        className="online-admission-format-page__intro"
        aria-labelledby="online-admission-format-intro-title"
      >
        <div className="online-admission-format-page__container">
          <Reveal>
            <h2
              className="online-admission-format-page__step-title"
              id="online-admission-format-intro-title"
            >
              {ONLINE_ADMISSION_STEP_01_INTRO.title}
            </h2>
            <p className="online-admission-format-page__lead">
              {ONLINE_ADMISSION_STEP_01_INTRO.lead}
            </p>
            <p className="online-admission-format-page__portal-line">
              {ONLINE_ADMISSION_STEP_01_INTRO.portalLabel}{" "}
              <a
                className="online-admission-format-page__portal-link"
                href={ONLINE_ADMISSION_STEP_01_INTRO.portalHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                {ONLINE_ADMISSION_STEP_01_INTRO.portalText}
              </a>
            </p>
            <figure className="online-admission-format-page__form-panel">
              <SmartImage
                src={ONLINE_ADMISSION_STEP_01_INTRO.image.src}
                alt={ONLINE_ADMISSION_STEP_01_INTRO.image.alt}
                width={960}
                height={540}
                className="online-admission-format-page__form-img"
                sizes="(max-width: 960px) 92vw, 56rem"
              />
              <figcaption className="online-admission-format-page__form-caption">
                {ONLINE_ADMISSION_STEP_01_INTRO.imageCaption}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {ONLINE_ADMISSION_STEPS.map((step, index) => (
        <section
          key={step.id}
          className={`online-admission-format-page__step online-admission-format-page__step--${index % 2 === 0 ? "light" : "cream"}`}
          aria-labelledby={`online-admission-${step.id}-title`}
        >
          <div className="online-admission-format-page__container">
            <Reveal>
              <h2
                className="online-admission-format-page__step-title"
                id={`online-admission-${step.id}-title`}
              >
                {step.hideStepPrefix ? step.title : `Step ${step.step}: ${step.title}`}
              </h2>

              {step.paragraphs?.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="online-admission-format-page__step-text">
                  {paragraph}
                </p>
              ))}

              {step.portal ? (
                <p className="online-admission-format-page__portal-line">
                  {step.portal.label}{" "}
                  <a
                    className="online-admission-format-page__portal-link"
                    href={step.portal.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {step.portal.text}
                  </a>
                </p>
              ) : null}

              {step.image ? (
                <figure className="online-admission-format-page__form-panel">
                  <SmartImage
                    src={step.image.src}
                    alt={step.image.alt}
                    width={960}
                    height={540}
                    className="online-admission-format-page__form-img"
                    sizes="(max-width: 960px) 92vw, 56rem"
                  />
                  {step.image.caption ? (
                    <figcaption className="online-admission-format-page__form-caption">
                      {step.image.caption}
                    </figcaption>
                  ) : null}
                </figure>
              ) : null}

              {step.listTitle && step.listItems ? (
                <div className="online-admission-format-page__sub-block">
                  <h3 className="online-admission-format-page__sub-title">{step.listTitle}</h3>
                  <ul className="bihe-bullet-list online-admission-format-page__bullet-list">
                    {step.listItems.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {step.orderedItems ? (
                <ol className="online-admission-format-page__ordered-list">
                  {step.orderedItems.map((item) => (
                    <li key={item.slice(0, 48)}>{item}</li>
                  ))}
                </ol>
              ) : null}
            </Reveal>
          </div>
        </section>
      ))}
    </article>
  );
}
