import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "images");

const sources = {
  "logo.webp": "https://www.figma.com/api/mcp/asset/570bbbb6-e398-4605-936a-f613aa360d29",
  "hero.webp": "https://www.figma.com/api/mcp/asset/eb335cf7-13b8-4421-8bec-742e1402cbe8",
  "about-main.webp": "https://www.figma.com/api/mcp/asset/ed9ccf96-a100-4431-b5ba-b8a0bb0d51b4",
  "bca-lab.webp":
    "https://www.figma.com/api/mcp/asset/595bb578-04e9-4bff-891c-a22fd57a3f8d",
  "bcom.webp": "https://www.figma.com/api/mcp/asset/2440ff4c-ff00-4d26-9a29-b1a8058b5432",
  "world-map.webp":
    "https://www.figma.com/api/mcp/asset/bae560d0-5adb-48f7-a257-d7f108bb8bd1",
  "facility-library.webp":
    "https://www.figma.com/api/mcp/asset/625fdf71-47d3-42ae-b91c-949647155d60",
  "facility-computer-labs.webp":
    "https://www.figma.com/api/mcp/asset/234d1802-5c89-45c1-9849-3f05e3a9ff01",
  "facility-hostel.webp":
    "https://www.figma.com/api/mcp/asset/1dff7ba8-6623-4bed-a013-5d7c0c30f537",
  "facility-placement.webp":
    "https://www.figma.com/api/mcp/asset/44418dc5-4bfb-47e4-af25-3987cbd2fd73",
  "facility-extracurricular.webp":
    "https://www.figma.com/api/mcp/asset/817421ff-641e-48f9-ac6c-e320b4859e96",
  "facility-canteen.webp":
    "https://www.figma.com/api/mcp/asset/e8e0dddf-e10f-4d1e-8a0b-743bbb17aa85",
  "facility-sports.webp":
    "https://www.figma.com/api/mcp/asset/680f81f0-0719-4b6b-9abd-100899cd0d66",
  "facility-auditorium.webp":
    "https://www.figma.com/api/mcp/asset/3aa65f33-46b3-4a19-8cad-4910874c90d4",
  "news-1.webp": "https://www.figma.com/api/mcp/asset/fb9d4ce6-5707-4efa-8a52-a47adc05ed99",
  "news-2.webp": "https://www.figma.com/api/mcp/asset/2e339c45-9cc0-4525-8f69-33c83213d9fb",
  "news-3.webp": "https://www.figma.com/api/mcp/asset/bf0efe57-e7d0-4436-b478-6a51454d80b4",
  "news-4.webp": "https://www.figma.com/api/mcp/asset/46ac5065-9286-4ea6-bfed-4a974960757c",
  "accreditation-1.webp":
    "https://www.figma.com/api/mcp/asset/ea334caa-dcb3-4ea2-8558-3d328e878a19",
  "accreditation-2.webp":
    "https://www.figma.com/api/mcp/asset/a64af101-b7d8-4c7a-8b26-d3cfc7ad02b2",
  "recruiter-1.webp":
    "https://www.figma.com/api/mcp/asset/66b2bcdc-4806-48d5-8d1c-01e1dd320d62",
  "recruiter-2.webp":
    "https://www.figma.com/api/mcp/asset/ab902d57-958e-429e-8ad6-57eb64b970c0",
  "recruiter-3.webp":
    "https://www.figma.com/api/mcp/asset/18f49987-28ed-4dd8-9ba3-cb4ea4d5584d",
  "recruiter-4.webp":
    "https://www.figma.com/api/mcp/asset/8f8ffce4-6a20-4f0a-8766-123c29c9d70f",
  "recruiter-5.webp":
    "https://www.figma.com/api/mcp/asset/8ac3a20d-e2c2-4dbd-b7f8-40b29e3e7f30",
  "recruiter-6.webp":
    "https://www.figma.com/api/mcp/asset/00a26663-3532-4d46-8c12-8fca9e763d71",
  "recruiter-7.webp":
    "https://www.figma.com/api/mcp/asset/9f7510f3-5071-45bf-a653-a5f6db913ae0",
  "recruiter-8.webp":
    "https://www.figma.com/api/mcp/asset/fa104fd4-f755-4c0a-ab11-e2e69d5349bc",
  "recruiter-9.webp":
    "https://www.figma.com/api/mcp/asset/700eeb8f-53a1-4952-849b-5390e8c02553",
  "recruiter-10.webp":
    "https://www.figma.com/api/mcp/asset/b65b40d9-84b0-4162-8e50-0d841246ede1",
  "recruiter-11.webp":
    "https://www.figma.com/api/mcp/asset/f84c6062-18c8-43cc-b160-136d6970bcd8",
  "recruiter-12.webp":
    "https://www.figma.com/api/mcp/asset/58175b0f-7550-4522-b7e4-6d9ca71014b3",
};

await mkdir(outDir, { recursive: true });

for (const [name, url] of Object.entries(sources)) {
  const res = await fetch(url);
  if (!res.ok) {
    console.warn(`Skip ${name}: ${res.status}`);
    continue;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(path.join(outDir, name), buf);
  console.log(`Saved ${name}`);
}

console.log("Done.");
