import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SmartImage } from "@/components/ui/SmartImage";
import { images } from "@/lib/images";

const trustPoints = ["AICTE Approved", "NAAC Focus", "Davangere University Affiliated"];

export function AccreditationSection() {
  const logos = images.accreditation;
  const scrollLogos = [...logos, ...logos];

  return (
    <section className="accreditation" id="accreditation" aria-labelledby="accreditation-title">
      <div className="accreditation__decor" aria-hidden>
        <span className="accreditation__decor-blob" />
        <span className="accreditation__decor-ring" />
      </div>

      <div className="accreditation__inner">
        <Reveal>
          <div className="accreditation__head">
            <div className="accreditation__head-main">
              <SectionHeader
                badge="Recognitions & Accreditations"
                title="Recognitions, Accreditations & Approvals"
              />
              <p className="accreditation__lead" id="accreditation-title">
                Nationally recognized quality standards that strengthen your degree and career path.
              </p>
            </div>
            <ul className="accreditation__trust">
              {trustPoints.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="accreditation__track-wrap">
            <div className="accreditation__marquee">
              <ul className="accreditation__logo-grid" aria-label="Accreditation and approval logos">
                {scrollLogos.map((src, i) => (
                  <li key={`${src}-${i}`} className="accreditation__logo-item">
                    <SmartImage
                      src={src}
                      alt={`Accreditation partner ${(i % logos.length) + 1}`}
                      width={120}
                      height={80}
                      className="accreditation__logo"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
