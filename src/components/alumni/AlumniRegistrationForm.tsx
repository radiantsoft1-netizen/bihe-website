"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  ALUMNI_CURRENT_STATUSES,
  ALUMNI_GENDERS,
  ALUMNI_PROGRAMS,
  ALUMNI_REGISTER_COPY,
} from "@/lib/alumni-content";
import { SITE_LINKS } from "@/lib/site-links";
import type { AlumniRegistrationSubmitResult } from "@/lib/types/alumni-registration";

type FormState = {
  name: string;
  gender: string;
  dateOfBirth: string;
  phone: string;
  email: string;
  currentLocation: string;
  currentRole: string;
  currentEmployer: string;
  linkedinUrl: string;
  program: string;
  classSection: string;
  admissionYear: string;
  passoutYear: string;
  registerNumber: string;
  bio: string;
  currentStatus: string;
  willingToMentor: "yes" | "no";
  captchaAnswer: string;
};

const INITIAL_FORM: FormState = {
  name: "",
  gender: "",
  dateOfBirth: "",
  phone: "",
  email: "",
  currentLocation: "",
  currentRole: "",
  currentEmployer: "",
  linkedinUrl: "",
  program: ALUMNI_PROGRAMS[0],
  classSection: "",
  admissionYear: "",
  passoutYear: "",
  registerNumber: "",
  bio: "",
  currentStatus: "",
  willingToMentor: "no",
  captchaAnswer: "",
};

type CaptchaState = {
  captchaId: string;
  question: string;
};

function FieldError({ name, errors }: { name: string; errors: Record<string, string> }) {
  return errors[name] ? <span className="contact-page__field-error">{errors[name]}</span> : null;
}

export function AlumniRegistrationForm({
  onSubmitted,
}: {
  onSubmitted?: (result: AlumniRegistrationSubmitResult) => void;
}) {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [captcha, setCaptcha] = useState<CaptchaState | null>(null);
  const [submitResult, setSubmitResult] = useState<AlumniRegistrationSubmitResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const loadCaptcha = useCallback(async () => {
    try {
      const response = await fetch("/api/alumni/register/captcha", { cache: "no-store" });
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

  function validateClient(): boolean {
    const errors: Record<string, string> = {};

    if (!form.name.trim()) errors.name = "Full name is required.";
    if (!form.email.trim()) errors.email = "Email address is required.";
    if (!form.phone.trim()) errors.phone = "Mobile number is required.";
    if (!form.program) errors.program = "Course / department is required.";
    if (!form.passoutYear.trim()) errors.passout_year = "Passout year is required.";
    if (!form.willingToMentor) errors.willing_to_mentor = "Please select mentoring preference.";

    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = "Enter a valid email address.";
    }

    if (form.phone && !/^[0-9+\-\s()]{7,20}$/.test(form.phone)) {
      errors.phone = "Enter a valid mobile number.";
    }

    if (form.passoutYear) {
      const year = Number(form.passoutYear);
      if (Number.isNaN(year) || year < 1950 || year > 2100) {
        errors.passout_year = "Enter a valid passout year.";
      }
    }

    if (form.admissionYear) {
      const year = Number(form.admissionYear);
      if (Number.isNaN(year) || year < 1950 || year > 2100) {
        errors.admission_year = "Enter a valid admission year.";
      }
    }

    if (photo && photo.size > 20 * 1024 * 1024) {
      setPhotoError("Photo must be under 20 MB.");
      return false;
    }

    setPhotoError(null);
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    setFieldErrors({});

    if (!validateClient()) {
      setSubmitting(false);
      return;
    }

    if (!captcha?.captchaId) {
      setError("Security check is not ready. Please wait a moment and try again.");
      setSubmitting(false);
      return;
    }

    const body = new FormData();
    body.append("name", form.name.trim());
    body.append("email", form.email.trim());
    body.append("phone", form.phone.trim());
    if (form.gender) body.append("gender", form.gender);
    if (form.dateOfBirth) body.append("date_of_birth", form.dateOfBirth);
    if (form.currentLocation.trim()) body.append("current_location", form.currentLocation.trim());
    body.append("program", form.program);
    if (form.classSection.trim()) body.append("class_section", form.classSection.trim());
    if (form.admissionYear.trim()) body.append("admission_year", form.admissionYear.trim());
    body.append("passout_year", form.passoutYear.trim());
    if (form.registerNumber.trim()) body.append("register_number", form.registerNumber.trim());
    if (form.currentRole.trim()) body.append("current_role", form.currentRole.trim());
    if (form.currentEmployer.trim()) body.append("current_employer", form.currentEmployer.trim());
    if (form.currentStatus) body.append("current_status", form.currentStatus);
    if (form.bio.trim()) body.append("bio", form.bio.trim());
    if (form.linkedinUrl.trim()) body.append("linkedin_url", form.linkedinUrl.trim());
    body.append("willing_to_mentor", form.willingToMentor === "yes" ? "1" : "0");
    if (photo) body.append("photo", photo);
    body.append("captcha_id", captcha.captchaId);
    body.append("captcha_answer", form.captchaAnswer);

    try {
      const response = await fetch("/api/alumni/register", {
        method: "POST",
        body,
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

        setError(json?.message ?? "Unable to submit your profile. Please check the form and try again.");
        await loadCaptcha();
        setSubmitting(false);
        return;
      }

      const result: AlumniRegistrationSubmitResult = {
        trackingId: String(json?.data?.trackingId ?? ""),
        notificationSent: Boolean(json?.data?.notificationSent),
        notificationLogged: Boolean(json?.data?.notificationLogged),
        notificationError: typeof json?.data?.notificationError === "string" ? json.data.notificationError : null,
        activeStep: Number(json?.data?.activeStep ?? 2),
      };

      setSubmitResult(result);
      onSubmitted?.(result);
      setForm(INITIAL_FORM);
      setPhoto(null);
      await loadCaptcha();
    } catch {
      setError("Unable to submit your profile. Please try again later.");
      await loadCaptcha();
    } finally {
      setSubmitting(false);
    }
  }

  if (submitResult) {
    const notificationMessage = submitResult.notificationSent
      ? ALUMNI_REGISTER_COPY.successNotificationEmail
      : submitResult.notificationError
        ? `${ALUMNI_REGISTER_COPY.successNotificationFailedPrefix} ${submitResult.notificationError}`
        : ALUMNI_REGISTER_COPY.successNotificationFallback;

    return (
      <div className="alumni-register__success">
        <div className="alumni-register__success-icon" aria-hidden>
          ✓
        </div>
        <h3 className="contact-page__form-success-title">{ALUMNI_REGISTER_COPY.successTitle}</h3>
        <p className="contact-page__form-success-text">{ALUMNI_REGISTER_COPY.successMessage}</p>
        <p className="contact-page__form-success-text">{notificationMessage}</p>
        {submitResult.trackingId ? (
          <div className="alumni-register__tracking-id">
            <span className="alumni-register__tracking-id-label">{ALUMNI_REGISTER_COPY.trackingIdLabel}</span>
            <strong className="alumni-register__tracking-id-value">{submitResult.trackingId}</strong>
          </div>
        ) : null}
        <div className="contact-page__form-success-actions">
          <Link className="contact-page__button" href={SITE_LINKS.alumni}>
            Back to directory
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form className="alumni-register__form" onSubmit={handleSubmit} noValidate>
      {error ? <p className="contact-page__form-error">{error}</p> : null}

      <section className="alumni-register__section" aria-labelledby="alumni-register-personal">
        <header className="alumni-register__section-head">
          <span className="alumni-register__section-step" aria-hidden>
            01
          </span>
          <h3 className="alumni-register__section-title" id="alumni-register-personal">
            {ALUMNI_REGISTER_COPY.sections.personal}
          </h3>
        </header>

        <div className="alumni-register__fields">
          <label className="contact-page__field alumni-register__field--full">
            <span className="contact-page__label">Full name *</span>
            <input
              className="contact-page__input"
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              required
              autoComplete="name"
            />
            <FieldError name="name" errors={fieldErrors} />
          </label>

          <label className="contact-page__field alumni-register__field--full">
            <span className="contact-page__label">Profile photo</span>
            <input
              className="contact-page__input alumni-register__file-input"
              type="file"
              accept="image/jpeg,image/png,image/gif,image/webp"
              onChange={(event) => {
                setPhoto(event.target.files?.[0] ?? null);
                setPhotoError(null);
              }}
            />
            <span className="alumni-register__field-hint">JPEG, PNG, GIF, or WebP — max 20 MB</span>
            <FieldError name="photo" errors={fieldErrors} />
            {photoError ? <span className="contact-page__field-error">{photoError}</span> : null}
          </label>

          <label className="contact-page__field">
            <span className="contact-page__label">Gender</span>
            <select
              className="contact-page__input"
              value={form.gender}
              onChange={(event) => setForm((current) => ({ ...current, gender: event.target.value }))}
            >
              <option value="">Select gender</option>
              {ALUMNI_GENDERS.map((gender) => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
            <FieldError name="gender" errors={fieldErrors} />
          </label>

          <label className="contact-page__field">
            <span className="contact-page__label">Date of birth</span>
            <input
              className="contact-page__input"
              type="date"
              value={form.dateOfBirth}
              onChange={(event) => setForm((current) => ({ ...current, dateOfBirth: event.target.value }))}
            />
            <FieldError name="date_of_birth" errors={fieldErrors} />
          </label>

          <label className="contact-page__field">
            <span className="contact-page__label">Mobile number *</span>
            <input
              className="contact-page__input"
              type="tel"
              value={form.phone}
              onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
              required
              autoComplete="tel"
              inputMode="tel"
            />
            <FieldError name="phone" errors={fieldErrors} />
          </label>

          <label className="contact-page__field">
            <span className="contact-page__label">Email address *</span>
            <input
              className="contact-page__input"
              type="email"
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              required
              autoComplete="email"
            />
            <FieldError name="email" errors={fieldErrors} />
          </label>

          <label className="contact-page__field alumni-register__field--full">
            <span className="contact-page__label">Current location</span>
            <input
              className="contact-page__input"
              value={form.currentLocation}
              onChange={(event) => setForm((current) => ({ ...current, currentLocation: event.target.value }))}
              placeholder="City, State / Country"
            />
            <FieldError name="current_location" errors={fieldErrors} />
          </label>

          <label className="contact-page__field">
            <span className="contact-page__label">Occupation / designation</span>
            <input
              className="contact-page__input"
              value={form.currentRole}
              onChange={(event) => setForm((current) => ({ ...current, currentRole: event.target.value }))}
            />
            <FieldError name="current_role" errors={fieldErrors} />
          </label>

          <label className="contact-page__field">
            <span className="contact-page__label">Company / organization</span>
            <input
              className="contact-page__input"
              value={form.currentEmployer}
              onChange={(event) => setForm((current) => ({ ...current, currentEmployer: event.target.value }))}
            />
            <FieldError name="current_employer" errors={fieldErrors} />
          </label>

          <label className="contact-page__field alumni-register__field--full">
            <span className="contact-page__label">LinkedIn profile (optional)</span>
            <input
              className="contact-page__input"
              type="url"
              value={form.linkedinUrl}
              onChange={(event) => setForm((current) => ({ ...current, linkedinUrl: event.target.value }))}
              placeholder="https://linkedin.com/in/..."
            />
            <FieldError name="linkedin_url" errors={fieldErrors} />
          </label>
        </div>
      </section>

      <section className="alumni-register__section" aria-labelledby="alumni-register-academic">
        <header className="alumni-register__section-head">
          <span className="alumni-register__section-step" aria-hidden>
            02
          </span>
          <h3 className="alumni-register__section-title" id="alumni-register-academic">
            {ALUMNI_REGISTER_COPY.sections.academic}
          </h3>
        </header>

        <div className="alumni-register__fields">
          <label className="contact-page__field">
            <span className="contact-page__label">Course / department *</span>
            <select
              className="contact-page__input"
              value={form.program}
              onChange={(event) => setForm((current) => ({ ...current, program: event.target.value }))}
              required
            >
              {ALUMNI_PROGRAMS.map((program) => (
                <option key={program} value={program}>
                  {program}
                </option>
              ))}
            </select>
            <FieldError name="program" errors={fieldErrors} />
          </label>

          <label className="contact-page__field">
            <span className="contact-page__label">Class / section</span>
            <input
              className="contact-page__input"
              value={form.classSection}
              onChange={(event) => setForm((current) => ({ ...current, classSection: event.target.value }))}
              placeholder="e.g. A, B"
            />
            <FieldError name="class_section" errors={fieldErrors} />
          </label>

          <label className="contact-page__field">
            <span className="contact-page__label">Admission year</span>
            <input
              className="contact-page__input"
              type="number"
              min={1950}
              max={2100}
              value={form.admissionYear}
              onChange={(event) => setForm((current) => ({ ...current, admissionYear: event.target.value }))}
            />
            <FieldError name="admission_year" errors={fieldErrors} />
          </label>

          <label className="contact-page__field">
            <span className="contact-page__label">Passout year *</span>
            <input
              className="contact-page__input"
              type="number"
              min={1950}
              max={2100}
              value={form.passoutYear}
              onChange={(event) => setForm((current) => ({ ...current, passoutYear: event.target.value }))}
              required
            />
            <FieldError name="passout_year" errors={fieldErrors} />
          </label>

          <label className="contact-page__field alumni-register__field--full">
            <span className="contact-page__label">Register number (optional)</span>
            <input
              className="contact-page__input"
              value={form.registerNumber}
              onChange={(event) => setForm((current) => ({ ...current, registerNumber: event.target.value }))}
            />
            <FieldError name="register_number" errors={fieldErrors} />
          </label>
        </div>
      </section>

      <section className="alumni-register__section" aria-labelledby="alumni-register-additional">
        <header className="alumni-register__section-head">
          <span className="alumni-register__section-step" aria-hidden>
            03
          </span>
          <h3 className="alumni-register__section-title" id="alumni-register-additional">
            {ALUMNI_REGISTER_COPY.sections.additional}
          </h3>
        </header>

        <div className="alumni-register__fields">
          <label className="contact-page__field alumni-register__field--full">
            <span className="contact-page__label">Achievements / bio</span>
            <textarea
              className="contact-page__textarea"
              rows={4}
              value={form.bio}
              onChange={(event) => setForm((current) => ({ ...current, bio: event.target.value }))}
              placeholder="Share highlights from your career, studies, or community work."
            />
            <FieldError name="bio" errors={fieldErrors} />
          </label>

          <label className="contact-page__field alumni-register__field--full">
            <span className="contact-page__label">Current status</span>
            <select
              className="contact-page__input"
              value={form.currentStatus}
              onChange={(event) => setForm((current) => ({ ...current, currentStatus: event.target.value }))}
            >
              <option value="">Select status</option>
              {ALUMNI_CURRENT_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <FieldError name="current_status" errors={fieldErrors} />
          </label>

          <fieldset className="alumni-register__mentor alumni-register__field--full">
            <legend className="contact-page__label">Willing to mentor students? *</legend>
            <div className="alumni-register__radio-group">
              <label className="alumni-register__radio">
                <input
                  type="radio"
                  name="willing_to_mentor"
                  value="yes"
                  checked={form.willingToMentor === "yes"}
                  onChange={() => setForm((current) => ({ ...current, willingToMentor: "yes" }))}
                />
                <span>Yes</span>
              </label>
              <label className="alumni-register__radio">
                <input
                  type="radio"
                  name="willing_to_mentor"
                  value="no"
                  checked={form.willingToMentor === "no"}
                  onChange={() => setForm((current) => ({ ...current, willingToMentor: "no" }))}
                />
                <span>No</span>
              </label>
            </div>
            <FieldError name="willing_to_mentor" errors={fieldErrors} />
          </fieldset>
        </div>
      </section>

      <div className="alumni-register__submit-block">
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
            <FieldError name="captcha_answer" errors={fieldErrors} />
          </label>
        </div>

        <button className="contact-page__button alumni-register__submit" type="submit" disabled={submitting}>
          {submitting ? "Submitting…" : "Submit profile"}
        </button>
      </div>
    </form>
  );
}
