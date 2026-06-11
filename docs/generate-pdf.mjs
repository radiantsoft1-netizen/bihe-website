import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { mdToPdf } from "md-to-pdf";

const __dirname = dirname(fileURLToPath(import.meta.url));
const mdPath = join(__dirname, "BIHE-Admin-Integration-Guide.md");
const pdfPath = join(__dirname, "BIHE-Admin-Integration-Guide.pdf");

const markdown = readFileSync(mdPath, "utf8");

const pdf = await mdToPdf(
  { content: markdown },
  {
    dest: pdfPath,
    pdf_options: {
      format: "A4",
      margin: { top: "20mm", right: "18mm", bottom: "20mm", left: "18mm" },
      printBackground: true,
    },
    css: `
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        font-size: 11pt;
        line-height: 1.55;
        color: #1a1a1a;
      }
      h1 {
        color: #1e3a75;
        font-size: 22pt;
        border-bottom: 3px solid #740000;
        padding-bottom: 8px;
        margin-top: 0;
      }
      h2 {
        color: #1e3a75;
        font-size: 15pt;
        margin-top: 28px;
        page-break-after: avoid;
      }
      h3 {
        color: #740000;
        font-size: 12pt;
        margin-top: 18px;
        page-break-after: avoid;
      }
      code, pre {
        font-family: "SF Mono", Menlo, Monaco, Consolas, monospace;
        font-size: 9pt;
        background: #f4f6fa;
      }
      pre {
        padding: 12px;
        border: 1px solid #d8dee8;
        border-radius: 6px;
        white-space: pre-wrap;
        word-break: break-word;
        page-break-inside: avoid;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin: 12px 0 20px;
        font-size: 10pt;
        page-break-inside: avoid;
      }
      th, td {
        border: 1px solid #c8d0dc;
        padding: 8px 10px;
        text-align: left;
        vertical-align: top;
      }
      th {
        background: #eef2f8;
        color: #1e3a75;
        font-weight: 700;
      }
      tr:nth-child(even) td {
        background: #f9fafb;
      }
      blockquote {
        border-left: 4px solid #740000;
        margin: 12px 0;
        padding: 8px 16px;
        background: #fdf6f6;
        color: #333;
      }
      hr {
        border: none;
        border-top: 1px solid #d8dee8;
        margin: 24px 0;
      }
      ul, ol {
        padding-left: 22px;
      }
      li {
        margin-bottom: 4px;
      }
    `,
  }
);

if (!pdf) {
  throw new Error("PDF generation failed");
}

writeFileSync(pdfPath, pdf.content);
console.log(`PDF created: ${pdfPath}`);
