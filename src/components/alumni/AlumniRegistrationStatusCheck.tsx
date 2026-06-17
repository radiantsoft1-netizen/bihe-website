"use client";

import { useState } from "react";
import { ALUMNI_REGISTER_COPY } from "@/lib/alumni-content";
import type { AlumniRegistrationStatus } from "@/lib/types/alumni-registration";

type AlumniRegistrationStatusCheckProps = {
  onStatusFound: (status: AlumniRegistrationStatus) => void;
};

export function AlumniRegistrationStatusCheck({ onStatusFound }: AlumniRegistrationStatusCheckProps) {
  const [trackingId, setTrackingId] = useState("");
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AlumniRegistrationStatus | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setChecking(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/alumni/register/status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tracking_id: trackingId.trim(),
        }),
      });

      const json = await response.json().catch(() => ({}));

      if (!response.ok || !json?.data) {
        setError(json?.message ?? ALUMNI_REGISTER_COPY.statusNotFound);
        setChecking(false);
        return;
      }

      const status = json.data as AlumniRegistrationStatus;
      setResult(status);
      onStatusFound(status);
    } catch {
      setError("Unable to check registration status right now. Please try again later.");
    } finally {
      setChecking(false);
    }
  }

  function statusMessage(status: AlumniRegistrationStatus) {
    if (status.approvalStatus === "approved") {
      return ALUMNI_REGISTER_COPY.statusApproved;
    }

    if (status.approvalStatus === "rejected") {
      return status.rejectionNote
        ? `${ALUMNI_REGISTER_COPY.statusRejected} ${status.rejectionNote}`
        : ALUMNI_REGISTER_COPY.statusRejected;
    }

    return ALUMNI_REGISTER_COPY.statusPending;
  }

  return (
    <div className="alumni-register-page__status-panel">
      <div className="alumni-register-page__status-head">
        <h3 className="alumni-register-page__status-title">{ALUMNI_REGISTER_COPY.statusTitle}</h3>
        <p className="alumni-register-page__status-lead">{ALUMNI_REGISTER_COPY.statusLead}</p>
      </div>

      <form className="alumni-register-page__status-form" onSubmit={handleSubmit} noValidate>
        <label className="contact-page__field">
          <span className="contact-page__label">{ALUMNI_REGISTER_COPY.statusTrackingIdLabel}</span>
          <input
            className="contact-page__input"
            value={trackingId}
            onChange={(event) => setTrackingId(event.target.value)}
            placeholder={ALUMNI_REGISTER_COPY.statusTrackingIdPlaceholder}
            required
            autoComplete="off"
            spellCheck={false}
          />
        </label>

        <button className="contact-page__button alumni-register-page__status-submit" type="submit" disabled={checking}>
          {checking ? ALUMNI_REGISTER_COPY.statusSubmittingLabel : ALUMNI_REGISTER_COPY.statusSubmitLabel}
        </button>
      </form>

      {error ? <p className="contact-page__form-error alumni-register-page__status-error">{error}</p> : null}

      {result ? (
        <div className="alumni-register-page__status-result" role="status" aria-live="polite">
          <p className="alumni-register-page__status-result-title">{ALUMNI_REGISTER_COPY.statusFoundTitle}</p>
          <p className="alumni-register-page__status-result-name">{result.name}</p>
          <p className="alumni-register-page__status-result-meta">
            {result.program}
            {result.passoutYear ? ` · Batch ${result.passoutYear}` : ""}
          </p>
          <p className="alumni-register-page__status-result-message">{statusMessage(result)}</p>
          <p className="alumni-register-page__status-result-id">
            <span>{ALUMNI_REGISTER_COPY.trackingIdLabel}</span>
            <strong>{result.trackingId}</strong>
          </p>
        </div>
      ) : null}
    </div>
  );
}
