import Link from "next/link";
import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { AlumniDirectory } from "@/components/alumni/AlumniDirectory";
import { ALUMNI_PAGE_LEAD } from "@/lib/alumni-content";
import { SITE_LINKS } from "@/lib/site-links";
import type { AlumniProfile } from "@/lib/types/alumni";

type AlumniPageProps = {
  profiles: AlumniProfile[];
};

export function AlumniPage({ profiles }: AlumniPageProps) {
  return (
    <article className="principal-page academic-leadership-page alumni-page about-bihe-page">
      <AboutInnerHero
        currentPage="Alumni Directory"
        title="Alumni Directory"
        lead={ALUMNI_PAGE_LEAD}
        eyebrow="Alumni"
        sectionLabel="Alumni"
        sectionHref={SITE_LINKS.alumniHome}
        parentPage="Alumni Home"
        parentHref={SITE_LINKS.alumniHome}
      />

      <section className="alumni-page__directory" aria-labelledby="alumni-directory-title">
        <div className="about-bihe-hero__container">
          <div className="alumni-page__directory-head">
            <h2 className="faculty-staff__title" id="alumni-directory-title">
              Alumni Profiles
            </h2>
            <Link href={`${SITE_LINKS.alumni}/register`} className="alumni-page__register-link">
              Register as alumni
            </Link>
          </div>
          <AlumniDirectory profiles={profiles} />
        </div>
      </section>
    </article>
  );
}
