import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import type { SportsFacilityNavCard } from "@/lib/sports-facilities-content";
import { sportsFacilitiesSectionHref } from "@/lib/sports-facilities-routes";

type SportsFacilityNavCardsProps = {
  cards: readonly SportsFacilityNavCard[];
};

export function SportsFacilityNavCards({ cards }: SportsFacilityNavCardsProps) {
  return (
    <ul className="sf-page__facility-nav-grid">
      {cards.map((card, index) => (
        <li key={card.id}>
          <Reveal delay={50 + index * 40}>
            <Link
              href={sportsFacilitiesSectionHref(card.sectionId)}
              className="sf-page__facility-card sf-page__facility-card-link"
            >
              <div className="sf-page__facility-media">
                <SmartImage
                  src={card.image}
                  alt={card.imageAlt}
                  fill
                  className="sf-page__facility-img"
                  sizes="(max-width: 640px) 92vw, (max-width: 960px) 45vw, 24rem"
                  priority={index < 3}
                />
                <span className="sf-page__facility-scrim" aria-hidden />
                <h3 className="sf-page__facility-label">{card.title}</h3>
              </div>
            </Link>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
