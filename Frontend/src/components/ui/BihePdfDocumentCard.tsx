import { ArrowRightIcon, PdfFileIcon } from "@/components/ui/icons";

export type BihePdfDocumentCardProps = {
  title: string;
  description: string;
  href: string;
  fileName: string;
  titleId?: string;
  titleTag?: "h3" | "h4";
  variant?: "cu" | "moa";
  downloadLabel?: string;
};

export function BihePdfDocumentCard({
  title,
  description,
  href,
  fileName,
  titleId,
  titleTag = "h3",
  variant = "cu",
  downloadLabel = "Download PDF",
}: BihePdfDocumentCardProps) {
  const prefix = variant === "moa" ? "moa-page" : "cu-page";
  const TitleTag = titleTag;

  return (
    <li className={`${prefix}__doc-card ${prefix}__doc-card--pdf`}>
      <div className={`${prefix}__doc-card-body`}>
        <span className={`${prefix}__doc-pdf-badge`} aria-hidden>
          <PdfFileIcon className={`${prefix}__doc-pdf-icon`} />
          <span className={`${prefix}__doc-pdf-label`}>PDF</span>
        </span>
        <TitleTag className={`${prefix}__doc-title`} id={titleId}>
          {title}
        </TitleTag>
        <p className={`${prefix}__doc-desc`}>{description}</p>
      </div>
      <div className={`${prefix}__doc-actions`}>
        <a
          href={href}
          className={`${prefix}__doc-btn ${prefix}__doc-btn--view`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View
        </a>
        <a
          href={href}
          className={`${prefix}__doc-btn ${prefix}__doc-btn--download`}
          download={fileName}
        >
          {downloadLabel}
          <ArrowRightIcon className={`${prefix}__doc-link-icon`} />
        </a>
      </div>
    </li>
  );
}
