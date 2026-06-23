/** Scrollable vector background — not position: fixed */
export function PageBackgroundShapes() {
  return (
    <div className="bihe-page-bg" aria-hidden>
      <svg
        className="bihe-page-bg__blob bihe-page-bg__blob--1"
        viewBox="0 0 320 320"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor"
          d="M68 24c38-28 98-18 118 28s-8 108-52 128-104 12-128-48S30 52 68 24z"
        />
      </svg>

      <svg
        className="bihe-page-bg__blob bihe-page-bg__blob--2"
        viewBox="0 0 280 280"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor"
          d="M48 200c-36-24-40-76-4-104s88-28 112 16 20 92-36 108-72-4-72 20z"
        />
      </svg>

      <svg
        className="bihe-page-bg__blob bihe-page-bg__blob--3"
        viewBox="0 0 240 240"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor"
          d="M120 20c55 0 100 45 100 100s-45 100-100 100S20 175 20 120 65 20 120 20z"
        />
      </svg>

      <svg
        className="bihe-page-bg__ring bihe-page-bg__ring--1"
        viewBox="0 0 120 120"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="60"
          cy="60"
          r="52"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="6 8"
        />
      </svg>

      <svg
        className="bihe-page-bg__ring bihe-page-bg__ring--2"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>

      <span className="bihe-page-bg__dot bihe-page-bg__dot--1" />
      <span className="bihe-page-bg__dot bihe-page-bg__dot--2" />
      <span className="bihe-page-bg__dot bihe-page-bg__dot--3" />
      <span className="bihe-page-bg__dot bihe-page-bg__dot--4" />

      <svg
        className="bihe-page-bg__zigzag"
        viewBox="0 0 100 48"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          d="M4 32 L24 14 L44 32 L64 14 L84 32"
        />
      </svg>

      <svg
        className="bihe-page-bg__plus"
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fill="currentColor" d="M22 4h4v40h-4V4zm-18 18h40v4H4v-4z" />
      </svg>

      <svg
        className="bihe-page-bg__triangle"
        viewBox="0 0 80 80"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fill="currentColor" d="M40 8 L72 68 H8 Z" />
      </svg>
    </div>
  );
}
