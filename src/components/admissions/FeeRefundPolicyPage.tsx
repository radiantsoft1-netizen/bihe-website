import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { Reveal } from "@/components/ui/Reveal";
import { ADMISSIONS_BASE_PATH } from "@/lib/admissions-routes";
import {
  FEE_REFUND_POLICY_INTRO,
  FEE_REFUND_POLICY_PAGE_LEAD,
} from "@/lib/fee-refund-policy-content";

export function FeeRefundPolicyPage() {
  return (
    <article className="fee-refund-policy-page about-bihe-page">
      <AboutInnerHero
        currentPage="Fee Refund Policy"
        title="Fee Refund Policy"
        lead={FEE_REFUND_POLICY_PAGE_LEAD}
        eyebrow="Admissions"
        sectionLabel="Admissions"
        sectionHref={ADMISSIONS_BASE_PATH}
      />

      <section className="fee-refund-policy-page__intro" aria-labelledby="fee-refund-intro-title">
        <div className="fee-refund-policy-page__container">
          <Reveal>
            <div className="fee-refund-policy-page__intro-copy">
              <p className="fee-refund-policy-page__eyebrow">{FEE_REFUND_POLICY_INTRO.eyebrow}</p>
              <h2 className="fee-refund-policy-page__intro-title" id="fee-refund-intro-title">
                {FEE_REFUND_POLICY_INTRO.title}
              </h2>
              {FEE_REFUND_POLICY_INTRO.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="fee-refund-policy-page__intro-text">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
