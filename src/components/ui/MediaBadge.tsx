import {
  getMediaBadgeInitial,
  getMediaBadgeTone,
} from "@/lib/media-badge";

type MediaBadgeProps = {
  label: string;
};

export function MediaBadge({ label }: MediaBadgeProps) {
  return (
    <span
      className="media-badge"
      data-tone={getMediaBadgeTone(label)}
      aria-label={`Category: ${label}`}
    >
      <span className="media-badge__icon" aria-hidden>
        {getMediaBadgeInitial(label)}
      </span>
      <span className="media-badge__label">{label}</span>
    </span>
  );
}
