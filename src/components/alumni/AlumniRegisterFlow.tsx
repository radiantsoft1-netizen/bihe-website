"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { ALUMNI_REGISTER_COPY, ALUMNI_REGISTER_INTRO } from "@/lib/alumni-content";
import { SITE_LINKS } from "@/lib/site-links";
import { AlumniRegisterSteps } from "@/components/alumni/AlumniRegisterSteps";
import { AlumniRegistrationForm } from "@/components/alumni/AlumniRegistrationForm";
import { AlumniRegistrationStatusCheck } from "@/components/alumni/AlumniRegistrationStatusCheck";
import type {
  AlumniRegistrationStatus,
  AlumniRegistrationSubmitResult,
} from "@/lib/types/alumni-registration";

const FORM_SECTION_COUNT = 3;

export function AlumniRegisterFlow() {
  const [activeStep, setActiveStep] = useState(1);
  const [formSectionProgress, setFormSectionProgress] = useState(0);
  const [isAdvancing, setIsAdvancing] = useState(false);
  const [statusSnapshot, setStatusSnapshot] = useState<AlumniRegistrationStatus | null>(null);
  const formAreaRef = useRef<HTMLDivElement>(null);
  const stepsSectionRef = useRef<HTMLElement>(null);
  const advanceTimersRef = useRef<number[]>([]);

  const updateFormSectionProgress = useCallback(() => {
    const formArea = formAreaRef.current;
    if (!formArea || activeStep !== 1) {
      return;
    }

    const sections = formArea.querySelectorAll<HTMLElement>(".alumni-register__section");
    if (sections.length === 0) {
      return;
    }

    const viewportMiddle = window.innerHeight * 0.42;
    let reachedIndex = 0;

    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= viewportMiddle) {
        reachedIndex = index + 1;
      }
    });

    const progress = Math.round((reachedIndex / FORM_SECTION_COUNT) * 100);
    setFormSectionProgress(progress);
  }, [activeStep]);

  useEffect(() => {
    if (activeStep !== 1) {
      return;
    }

    updateFormSectionProgress();
    window.addEventListener("scroll", updateFormSectionProgress, { passive: true });
    window.addEventListener("resize", updateFormSectionProgress);

    return () => {
      window.removeEventListener("scroll", updateFormSectionProgress);
      window.removeEventListener("resize", updateFormSectionProgress);
    };
  }, [activeStep, updateFormSectionProgress]);

  useEffect(() => {
    return () => {
      advanceTimersRef.current.forEach((timerId) => window.clearTimeout(timerId));
      advanceTimersRef.current = [];
    };
  }, []);

  function advanceToStep(step: number) {
    advanceTimersRef.current.forEach((timerId) => window.clearTimeout(timerId));
    advanceTimersRef.current = [];

    setIsAdvancing(true);
    setFormSectionProgress(100);
    stepsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });

    const advanceTimer = window.setTimeout(() => {
      setActiveStep(step);
    }, 520);
    advanceTimersRef.current.push(advanceTimer);

    const resetTimer = window.setTimeout(() => {
      setIsAdvancing(false);
    }, 1650);
    advanceTimersRef.current.push(resetTimer);
  }

  function handleSubmitted(result: AlumniRegistrationSubmitResult) {
    setStatusSnapshot(null);
    advanceToStep(result.activeStep);
  }

  function handleStatusFound(status: AlumniRegistrationStatus) {
    setStatusSnapshot(status);
    setActiveStep(status.activeStep);
    stepsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  const shellTitle =
    activeStep >= 2 && statusSnapshot?.approvalStatus === "approved"
      ? ALUMNI_REGISTER_COPY.statusApproved
      : activeStep >= 2 && statusSnapshot?.approvalStatus === "rejected"
        ? ALUMNI_REGISTER_COPY.statusRejected
        : activeStep >= 2
          ? ALUMNI_REGISTER_COPY.successTitle
          : ALUMNI_REGISTER_COPY.formTitle;

  const shellLead =
    activeStep >= 2 && statusSnapshot
      ? statusSnapshot.approvalStatus === "rejected" && statusSnapshot.rejectionNote
        ? statusSnapshot.rejectionNote
        : statusSnapshot.approvalStatus === "approved"
          ? ALUMNI_REGISTER_COPY.statusApproved
          : ALUMNI_REGISTER_COPY.statusPending
      : activeStep >= 2
        ? ALUMNI_REGISTER_COPY.successMessage
        : ALUMNI_REGISTER_COPY.lead;

  return (
    <>
      <section
        ref={stepsSectionRef}
        className="alumni-register-page__steps"
        aria-label="Registration process"
      >
        <div className="contact-page__container">
          <Reveal>
            <AlumniRegisterSteps
              activeStep={activeStep}
              formSectionProgress={formSectionProgress}
              isAdvancing={isAdvancing}
              statusSnapshot={statusSnapshot}
            />
          </Reveal>

          <Reveal>
            <AlumniRegistrationStatusCheck onStatusFound={handleStatusFound} />
          </Reveal>
        </div>
      </section>

      <section className="alumni-register-page__main" aria-labelledby="alumni-register-form-title">
        <Reveal className="alumni-register-page__shell">
          <div className="alumni-register-page__shell-top">
            <div className="about-bihe-hero__container">
              <div className="alumni-register-page__shell-top-bar">
                <div className="alumni-register-page__shell-copy">
                  <span className="alumni-register-page__eyebrow">{ALUMNI_REGISTER_INTRO.badge}</span>
                  <h2 className="alumni-register-page__shell-title" id="alumni-register-form-title">
                    {shellTitle}
                  </h2>
                  <p className="alumni-register-page__shell-lead">{shellLead}</p>
                </div>
                <Link href={SITE_LINKS.alumni} className="alumni-register-page__back">
                  ← Back to directory
                </Link>
              </div>
            </div>
          </div>

          <div className="alumni-register-page__form-area" ref={formAreaRef}>
            <div className="about-bihe-hero__container">
              <AlumniRegistrationForm onSubmitted={handleSubmitted} />
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
