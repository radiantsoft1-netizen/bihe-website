import sanitizeHtml from "sanitize-html";

const STORAGE_IMAGE_SRC =
  /^\/storage\/|^(?:https?:)?\/\/[^/]+\/storage\//i;

const ALLOWED_TAGS = [
  "p",
  "br",
  "strong",
  "b",
  "em",
  "i",
  "ul",
  "ol",
  "li",
  "a",
  "blockquote",
  "img",
];

export function sanitizeRichHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: {
      a: ["href", "title", "target", "rel"],
      img: ["src", "alt", "width", "height", "class"],
    },
    exclusiveFilter(frame) {
      if (frame.tag !== "img") {
        return false;
      }

      const src = frame.attribs.src ?? "";
      return !STORAGE_IMAGE_SRC.test(src);
    },
  });
}

export function isRichHtml(text: string): boolean {
  return /<[a-z][\s\S]*>/i.test(text);
}
