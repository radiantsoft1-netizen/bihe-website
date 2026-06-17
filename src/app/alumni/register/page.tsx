import type { Metadata } from "next";
import { AboutInnerHero } from "@/components/about/AboutInnerHero";
import { AlumniRegisterFlow } from "@/components/alumni/AlumniRegisterFlow";
import { SitePageShell } from "@/components/layout/SitePageShell";
import { ALUMNI_REGISTER_COPY } from "@/lib/alumni-content";
import { SITE_LINKS } from "@/lib/site-links";

export const metadata: Metadata = {
  title: "Register | Alumni",
  description: "Register your alumni profile for the BIHE alumni directory.",
};

export default function AlumniRegisterPage() {
  return (
    <SitePageShell>
      <article className="alumni-register-page about-bihe-page">
        <AboutInnerHero
          currentPage="Register"
          title={ALUMNI_REGISTER_COPY.title}
          lead={ALUMNI_REGISTER_COPY.lead}
          eyebrow="Alumni"
          sectionLabel="Alumni"
          sectionHref={SITE_LINKS.alumni}
          parentPage="Alumni"
          parentHref={SITE_LINKS.alumni}
        />

        <AlumniRegisterFlow />
      </article>
    </SitePageShell>
  );
}
