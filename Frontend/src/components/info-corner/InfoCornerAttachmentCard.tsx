import { PdfFileIcon } from "@/components/ui/icons";
import { SmartImage } from "@/components/ui/SmartImage";
import { images } from "@/lib/images";

type InfoCornerAttachmentCardProps = {
  title: string;
  previewSrc: string;
  previewAlt: string;
  href: string;
  kind: "image" | "pdf";
  institutionLabel?: string;
};

function AttachmentTypeIcon({ kind }: { kind: "image" | "pdf" }) {
  if (kind === "pdf") {
    return <PdfFileIcon className="ic-page__attachment-card-type-icon" />;
  }

  return (
    <svg
      className="ic-page__attachment-card-type-icon"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <rect
        x="4"
        y="5"
        width="16"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="9" cy="11" r="1.6" fill="currentColor" />
      <path
        d="M4 16l4.2-4.2a1.2 1.2 0 0 1 1.7 0L16 18"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 14l2.1-2.1a1.2 1.2 0 0 1 1.7 0L20 14"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function InfoCornerAttachmentCard({
  title,
  previewSrc,
  previewAlt,
  href,
  kind,
  institutionLabel = "Bapuji Institute of Hi-Tech Education",
}: InfoCornerAttachmentCardProps) {
  const typeLabel = kind === "pdf" ? "PDF" : "Image";

  return (
    <li
      className={
        "ic-page__attachment-card" +
        (kind === "image" ? " ic-page__attachment-card--document" : "")
      }
    >
      <a
        href={href}
        className="ic-page__attachment-card-media"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${title}`}
      >
        <SmartImage
          src={previewSrc}
          alt={previewAlt}
          fill
          className="ic-page__attachment-card-img"
          sizes="(max-width: 640px) 92vw, 22rem"
          unoptimized={kind === "image"}
        />
        <span className="ic-page__attachment-card-overlay" aria-hidden />
        <span className="ic-page__attachment-card-brand">
          <SmartImage
            src={images.logo}
            alt=""
            width={34}
            height={34}
            className="ic-page__attachment-card-logo"
          />
        </span>
        <span className="ic-page__attachment-card-caption">
          <span className="ic-page__attachment-card-institution">{institutionLabel}</span>
        </span>
        <span className="ic-page__attachment-card-type" aria-hidden>
          <AttachmentTypeIcon kind={kind} />
          <span>{typeLabel}</span>
        </span>
      </a>
      <div className="ic-page__attachment-card-footer">
        <p className="ic-page__attachment-card-title">{title}</p>
        <a
          href={href}
          className="ic-page__attachment-card-view"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AttachmentTypeIcon kind={kind} />
          View
        </a>
      </div>
    </li>
  );
}
