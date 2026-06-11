"use client";

import { useState } from "react";
import { CONTACT_ENQUIRY_TOPICS, CONTACT_FORM_COPY } from "@/lib/contact-page-content";
import { SITE_LINKS } from "@/lib/site-links";

type FormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  phone: "",
  subject: CONTACT_ENQUIRY_TOPICS[0],
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.phone ? `Phone: ${form.phone}` : null,
      `Subject: ${form.subject}`,
      "",
      form.message,
    ]
      .filter(Boolean)
      .join("\n");

    const mailto = `mailto:principal@bihedvg.org?subject=${encodeURIComponent(
      `[BIHE Website] ${form.subject}`,
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="contact-page__form-success">
        <h3 className="contact-page__form-success-title">{CONTACT_FORM_COPY.successTitle}</h3>
        <p className="contact-page__form-success-text">{CONTACT_FORM_COPY.successMessage}</p>
        <div className="contact-page__form-success-actions">
          <button
            type="button"
            className="contact-page__button contact-page__button--ghost"
            onClick={() => {
              setSubmitted(false);
              setForm(INITIAL_FORM);
            }}
          >
            Send another message
          </button>
          <a className="contact-page__button" href={SITE_LINKS.external.phone}>
            Call office
          </a>
        </div>
      </div>
    );
  }

  return (
    <form className="contact-page__form" onSubmit={handleSubmit}>
      <label className="contact-page__field">
        <span className="contact-page__label">Full name *</span>
        <input
          className="contact-page__input"
          value={form.name}
          onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
          required
          autoComplete="name"
        />
      </label>

      <label className="contact-page__field">
        <span className="contact-page__label">Email *</span>
        <input
          className="contact-page__input"
          type="email"
          value={form.email}
          onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
          required
          autoComplete="email"
        />
      </label>

      <label className="contact-page__field">
        <span className="contact-page__label">Phone</span>
        <input
          className="contact-page__input"
          type="tel"
          value={form.phone}
          onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
          autoComplete="tel"
        />
      </label>

      <label className="contact-page__field">
        <span className="contact-page__label">Subject *</span>
        <select
          className="contact-page__input"
          value={form.subject}
          onChange={(event) => setForm((current) => ({ ...current, subject: event.target.value }))}
          required
        >
          {CONTACT_ENQUIRY_TOPICS.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </label>

      <label className="contact-page__field">
        <span className="contact-page__label">Message *</span>
        <textarea
          className="contact-page__textarea"
          rows={5}
          value={form.message}
          onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
          required
        />
      </label>

      <button className="contact-page__button" type="submit">
        Submit enquiry
      </button>
    </form>
  );
}
