import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

type AboutInnerHeroProps = {
  currentPage: string;
  title: string;
  lead: string;
  eyebrow?: string;
  sectionLabel?: string;
  sectionHref?: string;
  parentPage?: string;
  parentHref?: string;
};

export function AboutInnerHero({
  currentPage,
  title,
  lead,
  eyebrow = "About Us",
  sectionLabel = "About Us",
  sectionHref = "/about-bihe",
  parentPage,
  parentHref,
}: AboutInnerHeroProps) {
  return (
    <header className="about-bihe-hero" id="page-hero">
      <div className="about-bihe-hero__container">
        <nav className="about-bihe-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden>/</span>
          <Link href={sectionHref}>{sectionLabel}</Link>
          {parentPage && parentHref ? (
            <>
              <span aria-hidden>/</span>
              <Link href={parentHref}>{parentPage}</Link>
            </>
          ) : null}
          <span aria-hidden>/</span>
          <span aria-current="page">{currentPage}</span>
        </nav>
        <Reveal>
          <p className="about-bihe-hero__eyebrow">{eyebrow}</p>
          <h1 className="about-bihe-hero__title">{title}</h1>
          <p className="about-bihe-hero__lead">{lead}</p>
        </Reveal>
      </div>
    </header>
  );
}
