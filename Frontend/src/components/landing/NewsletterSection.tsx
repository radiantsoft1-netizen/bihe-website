export function NewsletterSection() {
  return (
    <section className="edu-newsletter" aria-labelledby="newsletter-heading">
      <div className="edu-container edu-newsletter__inner">
        <h2 className="edu-newsletter__title" id="newsletter-heading">
          Subscribe to Our Newsletter for Latest Updates
        </h2>
        <form className="edu-newsletter__form" action="#" method="post">
          <input
            type="email"
            className="edu-newsletter__input"
            placeholder="Enter your email"
            aria-label="Email address"
            required
          />
          <button type="submit" className="edu-newsletter__submit">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
