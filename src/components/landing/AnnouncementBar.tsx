const ANNOUNCEMENT =
  "Bapuji Institute of Hi-Tech Education (BIHE) Established in 2000. offers UG Programs. Known for its academic Excellence and Extensive campus, focusing on student placement, leadership and ethical values with AICTE approval and Davangere University affiliation.";

export function AnnouncementBar() {
  return (
    <section className="announcement" id="announcement" aria-label="Announcements">
      <div className="announcement__inner">
        <p className="announcement__label">Announcement</p>
        <div className="announcement__marquee" aria-live="polite">
          <div className="announcement__track">
            <span>{ANNOUNCEMENT}</span>
            <span aria-hidden>{ANNOUNCEMENT}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
