# BIHE College Website

Landing page for **Bapuji Institute of Hi-Tech Education**, built from the [Figma design](https://www.figma.com/design/iJhaFUCwUHxeLeOQVHxTJe/BIHE-College?node-id=139-23100) with layout patterns inspired by the Univet reference theme.

## Brand

- Primary navy: `#1E3A75`
- Secondary maroon: `#740000`
- Font: **Cabin** (body/UI), **Assistant** (hero headline)

Global design tokens live in `src/styles/tokens.css`.

## Development

```bash
npm install
npm run download-assets   # Pull images from Figma (expires after ~7 days)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Project structure

- `src/components/landing/` — Homepage sections
- `src/styles/` — Global CSS and tokens
- `public/images/` — Downloaded Figma assets
