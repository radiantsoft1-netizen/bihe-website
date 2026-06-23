/** Decorative vector shapes behind the About section photo */
export function AboutVisualDecor() {
  return (
    <div className="about__decor" aria-hidden>
      <svg
        className="about__shape about__shape--blob-maroon"
        viewBox="0 0 280 280"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor"
          d="M68 24c38-28 98-18 118 28s-8 108-52 128-104 12-128-48S30 52 68 24z"
        />
      </svg>

      <svg
        className="about__shape about__shape--blob-navy"
        viewBox="0 0 240 240"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor"
          d="M48 200c-36-24-40-76-4-104s88-28 112 16 20 92-36 108-72-4-72 20z"
        />
      </svg>

      <svg
        className="about__shape about__shape--ring"
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
          strokeDasharray="8 10"
        />
      </svg>

      <span className="about__shape about__shape--dot about__shape--dot-1" />
      <span className="about__shape about__shape--dot about__shape--dot-2" />
      <span className="about__shape about__shape--dot about__shape--dot-3" />

      <svg
        className="about__shape about__shape--zigzag"
        viewBox="0 0 80 40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          d="M4 28 L20 12 L36 28 L52 12 L68 28"
        />
      </svg>

      <svg
        className="about__shape about__shape--plus"
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor"
          d="M22 4h4v40h-4V4zm-18 18h40v4H4v-4z"
          opacity="0.35"
        />
      </svg>
    </div>
  );
}
