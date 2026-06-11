import { SmartImage } from "@/components/ui/SmartImage";
import { B_COM_SHOWCASE_GALLERY } from "@/lib/b-com-admin-content";

function PinIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M6 1C4.07 1 2.5 2.57 2.5 4.5 2.5 6.88 6 11 6 11s3.5-4.12 3.5-6.5C9.5 2.57 7.93 1 6 1Zm0 2.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M3.5 10.5L10.5 3.5M10.5 3.5H5.5M10.5 3.5V8.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BComGallery({
  priority = false,
  variant = "showcase",
}: {
  priority?: boolean;
  variant?: "showcase" | "programme";
}) {
  const campus = B_COM_SHOWCASE_GALLERY.find((image) => image.id === "campus");
  const students = B_COM_SHOWCASE_GALLERY.find((image) => image.id === "students");
  const career = B_COM_SHOWCASE_GALLERY.find((image) => image.id === "career");

  if (!campus || !students || !career) {
    return null;
  }

  const cards = [
    { image: campus, gridClass: "b-com-gallery__card--tall" },
    { image: students, gridClass: "b-com-gallery__card--wide-top" },
    { image: career, gridClass: "b-com-gallery__card--wide-bottom" },
  ];

  return (
    <div
      className={`b-com-gallery b-com-gallery--${variant}`}
      aria-label="B.Com programme gallery"
    >
      <div className="b-com-gallery__grid">
        {cards.map(({ image, gridClass }, index) => (
          <figure key={image.id} className={`b-com-gallery__card ${gridClass}`}>
            <div className="b-com-gallery__media">
              <SmartImage
                src={image.src}
                alt={image.alt}
                fill
                className="b-com-gallery__img"
                sizes={
                  image.layout === "tall"
                    ? "(max-width: 960px) 45vw, 20rem"
                    : "(max-width: 960px) 45vw, 20rem"
                }
                priority={priority && index === 0}
              />
              <div className="b-com-gallery__glass">
                <div className="b-com-gallery__glass-copy">
                  <h3 className="b-com-gallery__title">{image.title}</h3>
                  <p className="b-com-gallery__subtitle">
                    <PinIcon />
                    <span>{image.subtitle}</span>
                  </p>
                </div>
                <div className="b-com-gallery__glass-stat">
                  <strong>{image.stat}</strong>
                  <span>{image.statLabel}</span>
                </div>
              </div>
            </div>
          </figure>
        ))}

        <div className="b-com-gallery__cta">
          <div className="b-com-gallery__cta-copy">
            <strong>180+</strong>
            <span>B.Com Intake at BIHE</span>
          </div>
          <a href="#b-com-programme-title" className="b-com-gallery__cta-btn">
            Explore Programme
            <ArrowIcon />
          </a>
        </div>
      </div>
    </div>
  );
}
