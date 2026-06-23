import { InfoCornerItemCard, type InfoCornerItemCardProps } from "@/components/info-corner/InfoCornerItemCard";
import { Reveal } from "@/components/ui/Reveal";
import type { InfoCornerFeedEntry } from "@/lib/info-corner-category-feed";

type InfoCornerListFeedProps = {
  entries: InfoCornerFeedEntry[];
  emptyMessage: string;
};

export function InfoCornerListFeed({ entries, emptyMessage }: InfoCornerListFeedProps) {
  if (entries.length === 0) {
    return (
      <Reveal>
        <p className="ic-page__notifications-empty">{emptyMessage}</p>
      </Reveal>
    );
  }

  return (
    <div className="ic-page__notifications-feed">
      {entries.map((entry, index) => (
        <Reveal key={entry.key} delay={index * 70} direction="up">
          <InfoCornerItemCard {...entry.card} />
        </Reveal>
      ))}
    </div>
  );
}

export type { InfoCornerItemCardProps };
