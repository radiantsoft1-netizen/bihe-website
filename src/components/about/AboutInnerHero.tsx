import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { RichTextParagraph } from "@/components/ui/RichTextParagraph";

type AboutInnerHeroProps = {
  currentPage: string;
  title: string;
  lead?: string;
  titleId?: string;
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
  titleId,
  eyebrow = "About the Institution",
  sectionLabel = "About the Institution",
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
          <h1 className="about-bihe-hero__title" id={titleId}>
            {title}
          </h1>
          {lead?.trim() ? (
            <RichTextParagraph html={lead} className="about-bihe-hero__lead" />
          ) : null}
        </Reveal>
      </div>
    </header>
  );
}
