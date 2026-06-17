import DOMPurify from "isomorphic-dompurify";

const STORAGE_IMAGE_SRC =
  /^\/storage\/|^(?:https?:)?\/\/[^/]+\/storage\//i;

let imageSrcHookRegistered = false;

function ensureImageSrcHook(): void {
  if (imageSrcHookRegistered) {
    return;
  }

  DOMPurify.addHook("uponSanitizeAttribute", (node, data) => {
    if (data.attrName !== "src" || node.nodeName !== "IMG") {
      return;
    }

    if (!STORAGE_IMAGE_SRC.test(data.attrValue)) {
      data.keepAttr = false;
    }
  });

  imageSrcHookRegistered = true;
}

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
  ensureImageSrcHook();

  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR: ["href", "title", "target", "rel", "src", "alt", "width", "height", "class"],
  });
}

export function isRichHtml(text: string): boolean {
  return /<[a-z][\s\S]*>/i.test(text);
}
