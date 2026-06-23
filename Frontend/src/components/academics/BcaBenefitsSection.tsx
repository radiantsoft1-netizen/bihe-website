import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BCA_BENEFITS } from "@/lib/bca-academics-content";

export function BcaBenefitsSection() {
  return (
    <section className="b-com-admin__benefits" aria-labelledby="bca-benefits-title">
      <div className="b-com-admin__container">
        <Reveal>
          <SectionHeader
            badge="Why BIHE"
            title="Benefits of Studying at BIHE"
            align="center"
          />
        </Reveal>

        <ul className="bihe-bullet-list b-com-admin__benefits-list" id="bca-benefits-title">
          {BCA_BENEFITS.map((benefit) => (
            <li key={benefit.slice(0, 48)}>{benefit}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
