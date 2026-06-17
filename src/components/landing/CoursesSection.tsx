import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SmartImage } from "@/components/ui/SmartImage";
import { ArrowRightIcon } from "@/components/ui/icons";
import { COURSES } from "@/lib/courses-content";

export function CoursesSection() {
  return (
    <section className="courses" id="courses" aria-labelledby="courses-title">
      <div className="courses__decor" aria-hidden>
        <span className="courses__decor-ring" />
        <span className="courses__decor-dot courses__decor-dot--1" />
        <span className="courses__decor-dot courses__decor-dot--2" />
      </div>

      <div className="container courses__inner">
        <Reveal>
          <div className="courses__head">
            <SectionHeader
              badge="Learn, Innovate, Succeed"
              title="Courses We Offer"
              titleId="courses-title"
            />
          </div>
        </Reveal>

        <div className="courses__list">
          {COURSES.map((course, index) => (
            <Reveal
              key={course.code}
              delay={index * 120}
              direction={index % 2 === 0 ? "left" : "right"}
            >
              <article
                className={`course-card${course.reverse ? " course-card--reverse" : ""}`}
              >
                <div className="course-card__visual">
                  <div className="course-card__media">
                    <SmartImage
                      src={course.image}
                      alt={`${course.code} program`}
                      fill
                      className="course-card__img"
                      sizes="(max-width: 900px) 100vw, 50vw"
                    />
                  </div>
                  <span className="course-card__code" aria-hidden>
                    {course.code}
                  </span>
                  <span className="course-card__index" aria-hidden>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="course-card__body">
                  <span className="course-card__kicker">{course.kicker}</span>
                  <h3 className="course-card__title">{course.name}</h3>
                  <p className="course-card__subtitle">{course.code}</p>

                  {course.highlights.length > 0 ? (
                    <ul className="course-card__highlights">
                      {course.highlights.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}

                  <p className="course-card__desc">{course.description}</p>

                  <ul className="course-card__meta" aria-label="Program details">
                    {course.meta.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>

                  <Link
                    href={course.href}
                    className="btn btn--primary btn--shine course-card__cta"
                  >
                    View Program
                    <ArrowRightIcon />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
