const ICC_PILLARS = [
  {
    id: "dignity",
    label: "Dignity & rights",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path
          d="M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3Zm0 2.2 6 2.25V11c0 3.8-2.5 7.4-6 8.7-3.5-1.3-6-4.9-6-8.7V6.45l6-2.25Z"
          fill="currentColor"
        />
        <path d="m10.2 12.2 1.8 1.8 3.8-3.8" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "confidential",
    label: "Confidential complaints",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path
          d="M7 10V8a5 5 0 0 1 10 0v2h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1Zm2 0h6V8a3 3 0 0 0-6 0v2Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    id: "sensitivity",
    label: "Gender sensitivity",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden>
        <circle cx="9" cy="8" r="3" fill="currentColor" />
        <circle cx="15" cy="8" r="3" fill="currentColor" opacity="0.55" />
        <path
          d="M4 20c0-3.3 2.7-5 5-5s5 1.7 5 5M10 20c0-3.3 2.7-5 5-5s5 1.7 5 5"
          stroke="currentColor"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "campus",
    label: "Safe campus climate",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M3 10.5 12 4l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5Z" fill="currentColor" />
      </svg>
    ),
  },
] as const;

export function IccObjectivesGraphic() {
  return (
    <figure className="icc-objectives-graphic" aria-label="ICC objectives graphic">
      <div className="icc-objectives-graphic__panel">
        <div className="icc-objectives-graphic__hub" aria-hidden>
          <span className="icc-objectives-graphic__ring icc-objectives-graphic__ring--inner" />
          <div className="icc-objectives-graphic__core">
            <svg className="icc-objectives-graphic__shield" viewBox="0 0 24 24" aria-hidden>
              <path
                d="M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3Z"
                fill="currentColor"
              />
            </svg>
            <span className="icc-objectives-graphic__core-label">ICC</span>
          </div>

          <div className="icc-objectives-graphic__orbit" aria-hidden>
            <span className="icc-objectives-graphic__ring icc-objectives-graphic__ring--outer" />
            <ul className="icc-objectives-graphic__pillars">
              {ICC_PILLARS.map((pillar, index) => (
                <li
                  key={pillar.id}
                  className={`icc-objectives-graphic__pillar icc-objectives-graphic__pillar--${index + 1}`}
                >
                  <div className="icc-objectives-graphic__pillar-upright">
                    <span className="icc-objectives-graphic__icon">{pillar.icon}</span>
                    <span className="icc-objectives-graphic__pillar-label">{pillar.label}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="icc-objectives-graphic__badge">UGC &amp; Government guidelines</p>
      </div>
    </figure>
  );
}
