import Link from "next/link";
import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { StudentLifePageRefCards } from "@/components/student-life/StudentLifePageRefCards";
import { Reveal } from "@/components/ui/Reveal";
import { ALUMNI_EVENTS_PAGE_LEAD } from "@/lib/alumni-content";
import { mapAlumniEventToRefCard } from "@/lib/alumni-service";
import { SITE_LINKS } from "@/lib/site-links";
import type { AlumniEventCard } from "@/lib/types/alumni";

type AlumniEventsPageProps = {
  events: AlumniEventCard[];
};

export function AlumniEventsPage({ events }: AlumniEventsPageProps) {
  const cards = events.map(mapAlumniEventToRefCard);

  return (
    <article className="sl-rich-page alumni-events-page about-bihe-page">
      <AboutInnerHero
        currentPage="Events"
        title="Alumni Events"
        lead={ALUMNI_EVENTS_PAGE_LEAD}
        eyebrow="Alumni"
        sectionLabel="Alumni"
        sectionHref={SITE_LINKS.alumni}
        parentPage="Alumni"
        parentHref={SITE_LINKS.alumni}
      />

      <section className="alumni-events-page__list" aria-labelledby="alumni-events-list-title">
        <div className="about-bihe-hero__container">
          <Reveal>
            <div className="alumni-events-page__head">
              <div className="alumni-events-page__head-copy">
                <h2 className="alumni-events-page__title" id="alumni-events-list-title">
                  Upcoming & Recent Events
                </h2>
                <p className="alumni-events-page__lead">
                  Browse reunions, mentorship sessions, and campus gatherings for BIHE graduates.
                </p>
              </div>
              <Link href={SITE_LINKS.alumni} className="alumni-events-page__back">
                Back to alumni profiles
              </Link>
            </div>
          </Reveal>

          {cards.length > 0 ? (
            <StudentLifePageRefCards cards={cards} compactGrid />
          ) : (
            <p className="faculty-staff__empty">Alumni events will be announced soon.</p>
          )}
        </div>
      </section>
    </article>
  );
}
