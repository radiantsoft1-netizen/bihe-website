import { AboutVisualDecor } from "@/components/landing/AboutVisualDecor";
import { SmartImage } from "@/components/ui/SmartImage";
import { images } from "@/lib/images";

export function IqacQualityGraphic() {
  return (
    <figure className="iqac-page__graphic" aria-label="IQAC quality assurance imagery">
      <AboutVisualDecor />
      <div className="iqac-page__graphic-stack">
        <div className="iqac-page__graphic-shadow" aria-hidden />

        <div className="iqac-page__graphic-main">
          <div className="iqac-page__graphic-frame">
            <SmartImage
              src={images.iqacQualityMain}
              alt="Faculty reviewing academic performance data and charts"
              fill
              sizes="(max-width: 960px) 92vw, 20rem"
              className="iqac-page__graphic-img"
            />
          </div>
        </div>

        <div className="iqac-page__graphic-accent">
          <div className="iqac-page__graphic-frame">
            <SmartImage
              src={images.iqacQualityPanel}
              alt="IQAC members reviewing quality documentation"
              fill
              sizes="(max-width: 960px) 50vw, 12rem"
              className="iqac-page__graphic-img"
            />
          </div>
        </div>

        <aside className="iqac-page__graphic-info" aria-label="IQAC certified quality assurance">
          <span className="iqac-page__graphic-seal" aria-hidden>
            <SmartImage
              src={images.iqacCertified}
              alt=""
              width={184}
              height={184}
              className="iqac-page__graphic-seal-img"
            />
          </span>
        </aside>
      </div>
    </figure>
  );
}
