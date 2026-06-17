import { FALLBACK_ANNOUNCEMENTS } from "@/lib/homepage-fallbacks";
import type { AnnouncementItem } from "@/lib/types/content";

type AnnouncementBarProps = {
  announcements?: AnnouncementItem[];
};

function announcementText(announcements: AnnouncementItem[]): string {
  return announcements.map((item) => item.message).join("   •   ");
}

export function AnnouncementBar({
  announcements = FALLBACK_ANNOUNCEMENTS,
}: AnnouncementBarProps) {
  const text = announcementText(announcements);

  return (
    <section className="announcement" id="announcement" aria-label="Announcements">
      <div className="announcement__inner">
        <p className="announcement__label">Announcement</p>
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
