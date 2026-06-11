import Link from "next/link";
import { FluxButton } from "@/components/ui/FluxButton";
import { MediaBadge } from "@/components/ui/MediaBadge";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SmartImage } from "@/components/ui/SmartImage";
import { ArrowRightIcon } from "@/components/ui/icons";
import { images } from "@/lib/images";
import { SITE_LINKS } from "@/lib/site-links";

const events = [
  {
    title: "Academic Excellence & Intellectual Development",
    tag: "Academics",
    date: "Mar 2026",
    image: images.news[0],
  },
  {
    title: "Annual Day & Cultural Celebrations",
    tag: "Campus Life",
    date: "Feb 2026",
    image: images.news[1],
  },
  {
    title: "National Festival & Community Outreach",
    tag: "Events",
    date: "Jan 2026",
    image: images.news[2],
  },
  {
    title: "Student Leadership & Orientation Program",
    tag: "Student Life",
    date: "Dec 2025",
    image: images.news[3],
  },
];

export function NewsEventsSection() {
  return (
    <section className="news" id="events" aria-labelledby="events-title">
      <div className="news__decor" aria-hidden>
        <span className="news__decor-ring" />
        <span className="news__decor-dot" />
      </div>

      <div className="container news__inner">
        <Reveal>
          <div className="news__head">
            <div className="news__head-text">
              <SectionHeader badge="News & Events" title="Events" />
              <p className="news__lead" id="events-title">
                Stay updated with campus programs, celebrations, and student achievements.
              </p>
            </div>
            <FluxButton
              href={SITE_LINKS.events}
              label="View All"
              className="news__head-cta"
              variant="ghost"
            />
          </div>
        </Reveal>

        <div className="news__grid">
          {events.map((event, i) => (
            <Reveal key={event.image} delay={i * 90} direction="up">
              <article className="news-card">
                <Link href={SITE_LINKS.events} className="news-card__media media-card__media">
                  <SmartImage
                    src={event.image}
                    alt={event.title}
                    fill
                    className="news-card__img"
                    sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 25vw"
                  />
                  <MediaBadge label={event.tag} />
                  <span className="news-card__date">{event.date}</span>
                </Link>
                <div className="news-card__body">
                  <h3 className="news-card__title">{event.title}</h3>
                  <Link href={SITE_LINKS.events} className="news-card__link">
                    Read more
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
