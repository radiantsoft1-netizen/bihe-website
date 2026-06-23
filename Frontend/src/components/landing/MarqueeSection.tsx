const items = [
  { word: "Inspire", sub: "the next generation" },
  { word: "Prepare", sub: "for future success" },
  { word: "Energise", sub: "to pursue passion" },
];

export function MarqueeSection() {
  const track = [...items, ...items, ...items];

  return (
    <section className="bihe-marquee" aria-hidden>
      <div className="bihe-marquee__track">
        {track.map((item, i) => (
          <span key={`${item.word}-${i}`} className="bihe-marquee__item">
            {item.word}
            <span>·</span>
            {item.sub}
          </span>
        ))}
      </div>
    </section>
  );
}
