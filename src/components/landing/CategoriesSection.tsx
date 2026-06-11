import Link from "next/link";

const categories = [
  { icon: "💻", name: "BCA Program", count: "3 Years" },
  { icon: "📊", name: "B.Com Program", count: "3 Years" },
  { icon: "📚", name: "Library", count: "Digital + Print" },
  { icon: "🔬", name: "Computer Labs", count: "Modern IT" },
  { icon: "🏠", name: "Hostel", count: "On Campus" },
  { icon: "⚽", name: "Sports", count: "Active Life" },
  { icon: "🍽️", name: "Canteen", count: "Hygienic Food" },
  { icon: "🎭", name: "Auditorium", count: "Events Hub" },
];

export function CategoriesSection() {
  return (
    <section className="edu-section edu-section--tint" id="facilities" aria-labelledby="categories-heading">
      <div className="edu-container">
        <div className="edu-section-head edu-section-head--row">
          <div>
            <span className="edu-eyebrow">Explore BIHE</span>
            <h2 className="edu-heading" id="categories-heading">
              Top Campus & Academic Categories
            </h2>
          </div>
          <Link href="#facilities" className="btn btn--primary btn--shine">
            View All
          </Link>
        </div>
        <div className="edu-categories__grid">
          {categories.map((c) => (
            <Link key={c.name} href="#" className="edu-category-card">
              <div className="edu-category-card__icon" aria-hidden>
                {c.icon}
              </div>
              <h4>{c.name}</h4>
              <span>{c.count}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
