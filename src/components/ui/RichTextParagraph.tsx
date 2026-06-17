import { isRichHtml, sanitizeRichHtml } from "@/lib/sanitize-html";

type RichTextParagraphProps = {
  html: string;
  className?: string;
};

export function RichTextParagraph({ html, className }: RichTextParagraphProps) {
  const sanitized = sanitizeRichHtml(html);

  if (!sanitized) {
    return null;
  }

  if (isRichHtml(sanitized)) {
    return (
      <div
        className={className}
        dangerouslySetInnerHTML={{ __html: sanitized }}
      />
    );
  }

  return <p className={className}>{sanitized}</p>;
}
