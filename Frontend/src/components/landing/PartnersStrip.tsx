import { SmartImage } from "@/components/ui/SmartImage";
import { images } from "@/lib/images";

export function PartnersStrip() {
  return (
    <section className="edu-partners" aria-label="Accreditation partners">
      <div className="edu-container edu-partners__grid">
        {images.accreditation.slice(0, 5).map((src, i) => (
          <SmartImage
            key={src + i}
            src={src}
            alt={`Partner ${i + 1}`}
            width={120}
            height={48}
            className="edu-partners__item"
          />
        ))}
      </div>
    </section>
  );
}
