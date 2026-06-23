import type { CSSProperties } from "react";
import {
  FacilityIcon,
  type FacilityIconName,
} from "@/components/landing/FacilityIcon";
import { SmartImage } from "@/components/ui/SmartImage";

type FacilityCardProps = {
  title: string;
  image: string;
  icon: FacilityIconName;
  titleId?: string;
  style?: CSSProperties;
};

export function FacilityCard({
  title,
  image,
  icon,
  titleId,
  style,
}: FacilityCardProps) {
  return (
    <article className="facility-card facility-card--attract" style={style}>
      <div className="facility-card__visual">
        <SmartImage
          src={image}
          alt={title}
          fill
          className="facility-card__photo"
          sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 25vw"
        />
        <div className="facility-card__visual-overlay" aria-hidden />
      </div>
      <div className="facility-card__footer">
        <span className="facility-card__icon" aria-hidden>
          <FacilityIcon name={icon} />
        </span>
        <div className="facility-card__copy">
          <h3 className="facility-card__title" id={titleId}>
            {title}
          </h3>
          <span className="facility-card__line" aria-hidden />
        </div>
      </div>
    </article>
  );
}
