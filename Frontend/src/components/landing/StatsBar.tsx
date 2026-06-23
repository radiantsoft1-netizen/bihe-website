import { CountUp } from "@/components/ui/CountUp";

const stats = [
  { icon: "🎓", value: 650, suffix: "+", label: "Students" },
  { icon: "📘", value: 2, suffix: "", label: "Degree Programs" },
  { icon: "👩‍🏫", value: 30, suffix: "+", label: "Faculty" },
  { icon: "🌍", value: 4500, suffix: "+", label: "Alumni" },
];

export function StatsBar() {
  return (
    <section className="edu-stats" aria-label="Institute statistics">
      <div className="edu-container edu-stats__grid">
        {stats.map((s) => (
          <div key={s.label} className="edu-stats__item">
            <span className="edu-stats__icon" aria-hidden>
              {s.icon}
            </span>
            <span className="edu-stats__value">
              <CountUp end={s.value} suffix={s.suffix} />
            </span>
            <span className="edu-stats__label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
