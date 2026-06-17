import type { InfoCornerItem } from "@/lib/info-corner-items-service";

type InfoCornerHomeScrollerProps = {
  items?: InfoCornerItem[];
};

function scrollerText(items: InfoCornerItem[]): string {
  return items
    .map((item) => {
      const category = item.category?.name ? `${item.category.name}: ` : "";
      return `${category}${item.title}`;
    })
    .join("   •   ");
}

export function InfoCornerHomeScroller({ items = [] }: InfoCornerHomeScrollerProps) {
  if (items.length === 0) {
    return null;
  }

  const text = scrollerText(items);

  return (
    <section className="announcement" id="announcement" aria-label="Info Corner updates">
      <div className="announcement__inner">
        <p className="announcement__label">Info Corner</p>
        <div className="announcement__marquee" aria-live="polite">
          <div className="announcement__track">
            <span>{text}</span>
            <span aria-hidden>{text}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
