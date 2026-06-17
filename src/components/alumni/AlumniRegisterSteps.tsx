"use client";

import { ALUMNI_REGISTER_STEPS } from "@/lib/alumni-content";
import type { AlumniRegistrationStatus } from "@/lib/types/alumni-registration";

type AlumniRegisterStepsProps = {
  activeStep: number;
  formSectionProgress?: number;
  isAdvancing?: boolean;
  statusSnapshot?: AlumniRegistrationStatus | null;
};

type StepVisual = {
  id: string;
  title: string;
  description: string;
};

function stepStatus(stepIndex: number, activeStep: number): "completed" | "active" | "pending" {
  const stepNumber = stepIndex + 1;

  if (activeStep > ALUMNI_REGISTER_STEPS.length || stepNumber < activeStep) {
    return "completed";
  }

  if (stepNumber === activeStep) {
    return "active";
  }

  return "pending";
}

function StepIcon({ stepId }: { stepId: string }) {
  if (stepId === "submit") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
        <path d="M8 4h8l2 4v12H6V4l2-4z" strokeLinejoin="round" />
        <path d="M8 8h8M9 12h6M9 16h4" strokeLinecap="round" />
      </svg>
    );
  }

  if (stepId === "review") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
        <path d="M12 3l7 3v6c0 4.2-2.9 7.4-7 9-4.1-1.6-7-4.8-7-9V6l7-3z" strokeLinejoin="round" />
        <path d="M9.5 12.2 11 13.7 14.8 9.9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M3.5 19c0-3 2.7-5 5.5-5s5.5 2 5.5 5M14 19c0-2.2 1.8-4 4-4" strokeLinecap="round" />
    </svg>
  );
}

function stepBadgeLabel(status: "completed" | "active" | "pending") {
  if (status === "completed") return "Completed";
  if (status === "active") return "In progress";
  return "Up next";
}

export function AlumniRegisterSteps({
  activeStep,
  isAdvancing = false,
  statusSnapshot = null,
}: AlumniRegisterStepsProps) {
  const currentStep = Math.min(activeStep, ALUMNI_REGISTER_STEPS.length);

  function stepDescription(step: StepVisual, index: number): string {
    if (!statusSnapshot || index === 0) {
      return step.description;
    }

    if (index === 1) {
      if (statusSnapshot.approvalStatus === "approved") {
        return "Your submission has been verified and approved by the admin team.";
      }

      if (statusSnapshot.approvalStatus === "rejected") {
        return statusSnapshot.rejectionNote
          ? `Review completed. ${statusSnapshot.rejectionNote}`
          : "Your submission was reviewed but not approved.";
      }

      return "Your profile is currently under admin review.";
    }

    if (index === 2 && statusSnapshot.approvalStatus === "approved") {
      return "Your profile is now part of the public alumni directory.";
    }

    return step.description;
  }

  return (
    <div
      className={[
        "alumni-register-page__steps-panel",
        isAdvancing ? "alumni-register-page__steps-panel--advancing" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="alumni-register-page__steps-panel-head">
        <p className="alumni-register-page__steps-eyebrow">Registration journey</p>
        <p className="alumni-register-page__steps-progress-label" aria-live="polite">
          Step {currentStep} of {ALUMNI_REGISTER_STEPS.length}
        </p>
      </div>

      <ol
        className="alumni-register-page__steps-track"
        data-active-step={currentStep}
      >
        {ALUMNI_REGISTER_STEPS.map((step: StepVisual, index) => {
          const status = stepStatus(index, activeStep);
          const stepNumber = String(index + 1).padStart(2, "0");

          return (
            <li
              key={step.id}
              className={[
                "alumni-register-page__step",
                `alumni-register-page__step--${status}`,
              ].join(" ")}
              aria-current={status === "active" ? "step" : undefined}
            >
              <div className="alumni-register-page__step-marker-wrap">
                <span className="alumni-register-page__step-marker">
                  {status === "completed" ? (
                    <svg viewBox="0 0 16 16" fill="none" aria-hidden>
                      <path
                        d="M3.5 8.2 6.4 11.1 12.5 4.9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : status === "active" ? (
                    <StepIcon stepId={step.id} />
                  ) : (
                    <span className="alumni-register-page__step-number">{stepNumber}</span>
                  )}
                </span>
              </div>

              <div className="alumni-register-page__step-body">
                <span
                  className={[
                    "alumni-register-page__step-badge",
                    `alumni-register-page__step-badge--${status}`,
                  ].join(" ")}
                >
                  {stepBadgeLabel(status)}
                </span>
                <h3 className="alumni-register-page__step-title">{step.title}</h3>
                <p className="alumni-register-page__step-desc">{stepDescription(step, index)}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
