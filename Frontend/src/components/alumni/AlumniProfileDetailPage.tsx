import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { SITE_LINKS } from "@/lib/site-links";
import { isRichHtml, sanitizeRichHtml } from "@/lib/sanitize-html";
import type { AlumniProfile } from "@/lib/types/alumni";

type AlumniProfileDetailPageProps = {
  profile: AlumniProfile;
};

function renderParagraph(text: string) {
  if (isRichHtml(text)) {
    return (
      <span
        className="principal-page__rich-text"
        dangerouslySetInnerHTML={{ __html: sanitizeRichHtml(text) }}
      />
    );
  }

  return text;
}

function profileParagraphs(profile: AlumniProfile): string[] {
  if (profile.bioParagraphs?.length) {
    return profile.bioParagraphs;
  }

  if (profile.bio) {
    return profile.bio
      .split(/\n{2,}|\r\n\r\n/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);
  }

  return [];
}

function testimonialParagraphs(profile: AlumniProfile): string[] {
  if (profile.testimonialParagraphs?.length) {
    return profile.testimonialParagraphs;
  }

  if (profile.testimonial) {
    return [profile.testimonial];
  }

  return [];
}

function plainTextFromParagraph(paragraph: string): string {
  return paragraph
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function stripBulletMarker(text: string): string {
  return text.replace(/^[•\u2022\-–]\s*/, "").trim();
}

function isBulletListParagraphs(paragraphs: string[]): boolean {
  if (paragraphs.length < 2) {
    return false;
  }

  const plain = paragraphs.map(plainTextFromParagraph).filter(Boolean);
  if (plain.length < 2) {
    return false;
  }

  const markedCount = plain.filter((text) => /^[•\u2022\-–]\s/.test(text)).length;
  return markedCount >= 1;
}

function ProfileParagraphList({ paragraphs }: { paragraphs: string[] }) {
  if (paragraphs.length === 0) {
    return null;
  }

  if (isBulletListParagraphs(paragraphs)) {
    return (
      <ul className="bihe-bullet-list alumni-profile-page__points">
        {paragraphs.map((paragraph) => {
          const text = stripBulletMarker(plainTextFromParagraph(paragraph));
          return <li key={text}>{text}</li>;
        })}
      </ul>
    );
  }

  return (
    <>
      {paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 48)} className="principal-page__paragraph">
          {renderParagraph(paragraph)}
        </p>
      ))}
    </>
  );
}

function profileCardProfession(profile: AlumniProfile): string {
  return profile.currentRole?.trim() || profile.currentEmployer?.trim() || profile.program?.trim() || "";
}
function profileMetaRows(profile: AlumniProfile) {
  const rows: Array<{ label: string; value: string }> = [];
  const passoutYear = profile.passoutYear ?? profile.batchYear;

  if (profile.program) {
    rows.push({ label: "Department", value: profile.program });
  }
  if (passoutYear) {
    rows.push({ label: "Passout year", value: String(passoutYear) });
  }
  if (profile.currentRole) {
    rows.push({ label: "Designation", value: profile.currentRole });
  }
  if (profile.currentEmployer) {
    rows.push({ label: "Company", value: profile.currentEmployer });
  }
  if (profile.currentLocation) {
    rows.push({ label: "Location", value: profile.currentLocation });
  }

  return rows;
}

export function AlumniProfileDetailPage({ profile }: AlumniProfileDetailPageProps) {
  const bioParagraphs = profileParagraphs(profile);
  const testimonialLines = testimonialParagraphs(profile);
  const metaRows = profileMetaRows(profile);
  const subtitle = [profile.currentRole, profile.currentEmployer].filter(Boolean).join(" · ");
  const passoutYear = profile.passoutYear ?? profile.batchYear;

  return (
    <article className="principal-page alumni-profile-page about-bihe-page">
      <AboutInnerHero
        currentPage={profile.name}
        title={profile.name}
        lead={subtitle || `${profile.program}${passoutYear ? ` · Batch ${passoutYear}` : ""}`}
        eyebrow="Alumni"
        sectionLabel="Alumni"
        sectionHref={SITE_LINKS.alumni}
      />

      <section
        className="principal-page__showcase principal-page__showcase--s1"
        aria-labelledby="alumni-profile-title"
      >
        <div className="principal-page__decor" aria-hidden>
          <span className="principal-page__decor-blob principal-page__decor-blob--1" />
          <span className="principal-page__decor-blob principal-page__decor-blob--2" />
          <span className="principal-page__decor-ring principal-page__decor-ring--1" />
          <span className="principal-page__decor-ring principal-page__decor-ring--2" />
          <span className="principal-page__decor-grid" />
        </div>

        <div className="principal-page__container">
          <div className="principal-page__grid">
            <Reveal direction="left" className="principal-page__visual">
              <div className="principal-page__portrait">
                {profile.photo ? (
                  <div className="principal-page__portrait-frame">
                    <SmartImage
                      src={profile.photo}
                      alt={`${profile.name}, BIHE alumni`}
                      fill
                      className="principal-page__portrait-img governing-bodies-page__portrait-img"
                      sizes="(max-width: 960px) 90vw, 28rem"
                      priority
                    />
                  </div>
                ) : null}

                <div className="principal-page__float-card principal-page__float-card--bottom">
                  <p className="principal-page__float-name">{profile.name}</p>
                  <p className="principal-page__float-role">{profileCardProfession(profile)}</p>
                  <p className="principal-page__float-quals">
                    {passoutYear ? `Batch ${passoutYear}` : "Alumni"}
                    {profile.currentLocation ? ` · ${profile.currentLocation}` : ""}
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={100} direction="right" className="principal-page__content">
              <span className="principal-page__badge">Alumni Profile</span>

              <h2 className="principal-page__title" id="alumni-profile-title">
                {profile.name}
              </h2>

              <div className="principal-page__body">
                {metaRows.length > 0 ? (
                  <div className="alumni-profile-page__meta-table">
                    <table className="faculty-staff__table">
                      <tbody>
                        {metaRows.map((row) => (
                          <tr key={row.label}>
                            <th scope="row">{row.label}</th>
                            <td>{row.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : null}

                <ProfileParagraphList paragraphs={testimonialLines} />
                <ProfileParagraphList paragraphs={bioParagraphs} />
              </div>

              {profile.linkedinUrl ? (
                <div className="alumni-profile-page__meta">
                  <a
                    href={profile.linkedinUrl}
                    className="alumni-profile-page__linkedin"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View LinkedIn profile
                  </a>
                </div>
              ) : null}
            </Reveal>
          </div>
        </div>
      </section>
    </article>
  );
}
