import type { CSSProperties } from "react";

import { FacilityIcon } from "@/components/landing/FacilityIcon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SmartImage } from "@/components/ui/SmartImage";
import { FACILITIES_ITEMS } from "@/lib/facilities-content";

export function FacilitiesSection() {
  return (
    <section className="facilities" id="facilities" aria-labelledby="facilities-title">
      <div className="facilities__container">
        <Reveal>
          <div className="facilities__head">
            <div className="facilities__head-main">
              <SectionHeader
                badge="Campus Facilities"
                title="Amenities that support your journey"
                align="left"
              />
              <p className="facilities__lead" id="facilities-title">
                Purpose-built spaces for academics, accommodation, careers, and
                campus life at Bapuji Institute of Hi-Tech Education.
              </p>
            </div>
            <ul className="facilities__highlights" aria-label="Facility highlights">
              <li>8+ campus amenities</li>
              <li>Modern labs & library</li>
              <li>Placement support</li>
            </ul>
          </div>
        </Reveal>

        <ul className="facilities__grid">
          {FACILITIES_ITEMS.map((item, index) => {
            const column = index % 4;
            const row = Math.floor(index / 4);
            const enterX =
              column === 0 ? "-44px" : column === 3 ? "44px" : "0px";

            return (
            <Reveal key={item.title} as="li" className="facilities__cell">
              <article
                className="facilities__card"
                style={
                  {
                    "--facilities-delay": `${row * 160 + column * 110}ms`,
                    "--facilities-x": enterX,
                  } as CSSProperties
                }
              >
                <div className="facilities__card-media">
                  <SmartImage
                    src={item.image}
                    alt={item.title}
                    fill
                    className="facilities__card-img"
                    sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 25vw"
                  />
                </div>
                <div className="facilities__card-body">
                  <span className="facilities__card-icon" aria-hidden>
                    <FacilityIcon name={item.icon} />
                  </span>
                  <h3 className="facilities__card-title">{item.title}</h3>
                  <p className="facilities__card-desc">{item.description}</p>
                </div>
              </article>
            </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
