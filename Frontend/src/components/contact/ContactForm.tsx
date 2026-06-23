"use client";

import { useCallback, useEffect, useState } from "react";
import { CONTACT_ENQUIRY_TOPICS, CONTACT_FORM_COPY } from "@/lib/contact-page-content";
import { SITE_LINKS } from "@/lib/site-links";

type FormState = {
  name: string;
  email: string;
  mobile: string;
  subject: string;
  message: string;
  captchaAnswer: string;
};

const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  mobile: "",
  subject: CONTACT_ENQUIRY_TOPICS[0],
  message: "",
  captchaAnswer: "",
};

type CaptchaState = {
  captchaId: string;
  question: string;
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [captcha, setCaptcha] = useState<CaptchaState | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const loadCaptcha = useCallback(async () => {
    try {
      const response = await fetch("/api/contact/captcha", { cache: "no-store" });
      const json = await response.json();

      if (!response.ok || !json?.data?.captchaId) {
        throw new Error("captcha");
      }

      setCaptcha({
        captchaId: json.data.captchaId,
        question: json.data.question,
      });
      setForm((current) => ({ ...current, captchaAnswer: "" }));
    } catch {
      setError("Unable to load security check. Please refresh and try again.");
    }
  }, []);

  useEffect(() => {
    void loadCaptcha();
  }, [loadCaptcha]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    setFieldErrors({});

    if (!captcha?.captchaId) {
      setError("Security check is not ready. Please wait a moment and try again.");
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          mobile: form.mobile.trim(),
          subject: form.subject,
          message: form.message.trim(),
          captcha_id: captcha.captchaId,
          captcha_answer: Number(form.captchaAnswer),
        }),
      });

      const json = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (json?.errors && typeof json.errors === "object") {
          const mapped: Record<string, string> = {};
          for (const [key, messages] of Object.entries(json.errors)) {
            if (Array.isArray(messages) && messages[0]) {
              mapped[key] = String(messages[0]);
            }
          }
          setFieldErrors(mapped);
        }

        setError(json?.message ?? "Unable to send your message. Please try again.");
        await loadCaptcha();
        setSubmitting(false);
        return;
      }

      setSubmitted(true);
      setForm(INITIAL_FORM);
      await loadCaptcha();
    } catch {
      setError("Unable to send your message. Please try again or contact us by phone.");
      await loadCaptcha();
    } finally {
      setSubmitting(false);
    }
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
            onClick={() => setSubmitted(false)}
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
    <form className="contact-page__form" onSubmit={handleSubmit} noValidate>
      {error ? <p className="contact-page__form-error">{error}</p> : null}

      <label className="contact-page__field">
        <span className="contact-page__label">Full name *</span>
        <input
          className="contact-page__input"
          value={form.name}
          onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
          required
          autoComplete="name"
        />
        {fieldErrors.name ? <span className="contact-page__field-error">{fieldErrors.name}</span> : null}
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
        {fieldErrors.email ? <span className="contact-page__field-error">{fieldErrors.email}</span> : null}
      </label>

      <label className="contact-page__field">
        <span className="contact-page__label">Mobile *</span>
        <input
          className="contact-page__input"
          type="tel"
          value={form.mobile}
          onChange={(event) => setForm((current) => ({ ...current, mobile: event.target.value }))}
          required
          autoComplete="tel"
          inputMode="tel"
        />
        {fieldErrors.mobile ? <span className="contact-page__field-error">{fieldErrors.mobile}</span> : null}
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
        {fieldErrors.subject ? <span className="contact-page__field-error">{fieldErrors.subject}</span> : null}
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
        {fieldErrors.message ? <span className="contact-page__field-error">{fieldErrors.message}</span> : null}
      </label>

      <div className="contact-page__captcha">
        <label className="contact-page__field">
          <span className="contact-page__label">Security check *</span>
          <div className="contact-page__captcha-row">
            <span className="contact-page__captcha-question" aria-live="polite">
              {captcha?.question ?? "Loading…"}
            </span>
            <button
              type="button"
              className="contact-page__captcha-refresh"
              onClick={() => void loadCaptcha()}
              aria-label="Refresh security check"
            >
              ↻
            </button>
          </div>
          <input
            className="contact-page__input"
            type="number"
            inputMode="numeric"
            value={form.captchaAnswer}
            onChange={(event) =>
              setForm((current) => ({ ...current, captchaAnswer: event.target.value }))
            }
            required
          />
          {fieldErrors.captcha_answer ? (
            <span className="contact-page__field-error">{fieldErrors.captcha_answer}</span>
          ) : null}
        </label>
      </div>

      <button className="contact-page__button" type="submit" disabled={submitting}>
        {submitting ? "Sending…" : "Submit enquiry"}
      </button>
    </form>
  );
}
