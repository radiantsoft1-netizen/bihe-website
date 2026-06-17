import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import type { SportsFacilityCard } from "@/lib/sports-facilities-content";

type SportsFacilityCardsProps = {
  cards: readonly SportsFacilityCard[];
};

export function SportsFacilityCards({ cards }: SportsFacilityCardsProps) {
  return (
    <ul className="sf-page__grounds-grid">
      {cards.map((card, index) => (
        <li key={card.id}>
          <Reveal delay={50 + index * 40}>
            <article className="sf-page__ground-card">
              <div className="sf-page__ground-media">
                <SmartImage
                  src={card.image}
                  alt={card.imageAlt}
                  fill
                  className="sf-page__ground-img"
                  sizes="(max-width: 640px) 92vw, (max-width: 960px) 45vw, 24rem"
                  priority={index < 3}
                />
                <span className="sf-page__ground-scrim" aria-hidden />
                <h3 className="sf-page__ground-label">{card.title}</h3>
              </div>
            </article>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
